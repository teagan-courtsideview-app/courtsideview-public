#!/usr/bin/env python3
"""Validate the bounded SEO candidate directly from Git, excluding local edits.

Usage: python3 scripts/qa-marketing.py BASE CANDIDATE
This is a marketing-content check, never an app/FanView release waiver.
"""
import json
import posixpath
import subprocess
import sys
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote

ROOT = Path(__file__).resolve().parents[1]
BASE, CANDIDATE = sys.argv[1:]
PAGES = set('press.html privacy.html support.html volleyball-scorekeeper.html volleyball-player-stats.html press-release-courtsideview-volleyball-app-launch.html index.html download.html courtsideview-app.html vs-gamechanger.html volleyball-apps.html best-volleyball-scorekeeping-apps-2026.html best-volleyball-stat-tracking-apps-2026.html best-apps-for-volleyball-clubs.html best-apps-for-volleyball-parents.html volleyball-app-comparison-study.html'.split())
ALLOWED = PAGES | {'assets/website-20261023/brand-v2.css', 'assets/website-20261023/brand-v3.css', 'scripts/marketing-text-geometry.js', 'docs/marketing-text-qa-followup-20261023.md', 'docs/marketing-typography-qa-20261023.md', 'marketing-accessibility.css', 'sitemap.xml', 'scripts/build-geo-guides.mjs', 'scripts/verify-homepage-release.mjs', 'scripts/qa-marketing.py', 'docs/marketing-release-2026-10-21.md'}

def git(*args):
    return subprocess.check_output(['git', '-C', str(ROOT), *args], text=True)

def read(path, revision=CANDIDATE):
    return git('show', revision + ':' + path)

class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.tags, self.text, self.scripts = [], [], []
        self.script = None
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag, attrs))
        if tag == 'script':
            self.script = [attrs, '']

    def handle_endtag(self, tag):
        if tag == 'script' and self.script is not None:
            self.scripts.append(self.script)
            self.script = None

    def handle_data(self, value):
        if self.script is not None:
            self.script[1] += value
        else:
            self.text.append(value)

def norm(s):
    return ' '.join(s.split())

def walk(obj):
    if isinstance(obj, dict):
        yield obj
        for value in obj.values():
            yield from walk(value)
    elif isinstance(obj, list):
        for value in obj:
            yield from walk(value)

errors = []
def check(ok, label):
    if not ok:
        errors.append(label)

changed = set(git('diff', '--name-only', BASE, CANDIDATE).splitlines())
check(not changed - ALLOWED, 'Outside marketing scope: ' + ', '.join(sorted(changed - ALLOWED)))
files = set(git('ls-tree', '-r', '--name-only', CANDIDATE).splitlines())
config = json.loads(read('vercel.json'))
routes = {r['source']: r['destination'].lstrip('/') for r in config['rewrites'] if '(' not in r['source']}
routes['/'] = 'index.html'
cache = {}
def page(file):
    if file not in cache:
        cache[file] = Page(read(file))
    return cache[file]

links, schemas = 0, 0
for file in sorted(PAGES):
    p = page(file)
    ids = [a['id'] for _, a in p.tags if 'id' in a]
    check(all(n == 1 for n in Counter(ids).values()), file + ': duplicate IDs')
    check(sum(t == 'h1' for t, _ in p.tags) == 1, file + ': H1 count')
    check(sum(t == 'title' for t, _ in p.tags) == 1, file + ': title count')
    check(any(t == 'meta' and a.get('name') == 'description' and a.get('content') for t, a in p.tags), file + ': description')
    check(sum(t == 'link' and a.get('rel') == 'canonical' and a.get('href', '').startswith('https://www.courtsideviewapp.com/') for t, a in p.tags) == 1, file + ': canonical')
    old = Page(read(file, BASE))
    executable = lambda x: [s for s in x.scripts if s[0].get('type') != 'application/ld+json']
    check(executable(p) == executable(old), file + ': executable scripts changed')
    check([(t,a) for t,a in p.tags if any(k.startswith('on') for k in a)] == [(t,a) for t,a in old.tags if any(k.startswith('on') for k in a)], file + ': event handlers changed')
    for attrs, body in p.scripts:
        if attrs.get('type') == 'application/ld+json':
            schemas += 1
            try:
                data = json.loads(body)
                for obj in walk(data):
                    if obj.get('@type') == 'Question':
                        for text in [obj['name'], obj['acceptedAnswer']['text']]:
                            check(norm(text) in norm(' '.join(p.text)), file + ': FAQ not visible: ' + text)
            except (ValueError, KeyError) as e:
                errors.append(file + ': invalid schema: ' + str(e))
    for tag, attrs in p.tags:
        if tag == 'img':
            check('alt' in attrs, file + ': missing image alt')
        if tag == 'meta' and attrs.get('name') == 'robots':
            check('noindex' not in attrs.get('content', '').lower(), file + ': noindex')
        for key in ('href', 'src'):
            ref = attrs.get(key)
            if not ref:
                continue
            url = urlsplit(ref)
            if url.scheme not in ('', 'http', 'https') or url.netloc not in ('', 'www.courtsideviewapp.com', 'courtsideviewapp.com'):
                continue
            target = routes.get(url.path, url.path.lstrip('/')) if url.path.startswith('/') else posixpath.normpath(posixpath.join(posixpath.dirname(file), url.path)) if url.path else file
            links += 1
            check(target in files, file + ': missing target ' + target)
            if url.fragment and target.endswith('.html') and target in files:
                check(any(a.get('id') == unquote(url.fragment) for _, a in page(target).tags), file + ': missing fragment ' + ref)

# The new CSS may only affect these static pages, never viewer/app surfaces.
for file in sorted(files):
    if file.endswith('.html') and file not in PAGES:
        check(not any(css in read(file) for css in ['marketing-accessibility.css', '/assets/website-20261023/brand-v3.css']), file + ': marketing CSS leaks outside scope')
check('Disallow: /\n' not in read('robots.txt'), 'robots blocks all crawling')
print(json.dumps({'status': 'FAIL' if errors else 'PASS', 'base': git('rev-parse', BASE).strip(), 'candidate': git('rev-parse', CANDIDATE).strip(), 'pages': len(PAGES), 'json_ld_blocks': schemas, 'local_references': links, 'changed_files': sorted(changed), 'errors': errors}, indent=2))
sys.exit(bool(errors))
