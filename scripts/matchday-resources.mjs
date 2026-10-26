// Build-time content only. No client script, tracking, or product runtime changes.
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
const content = JSON.parse(fs.readFileSync(new URL('./matchday-resource-content.json', import.meta.url), 'utf8'));
const facts = JSON.parse(fs.readFileSync(new URL('./matchday-comparison-facts.json', import.meta.url), 'utf8'));
const site = 'https://www.courtsideviewapp.com';
const downloadSize = name => `${Math.max(1, Math.ceil(fs.statSync(new URL('../resources/' + name, import.meta.url)).size / 1024))} KB`;
export const reportPath = '/resources/volleyball-match-day-workflows.html';
export const resourceCss = '/assets/website-20261026/resources.css';
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const rich = value => esc(value).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
function checklistHtml(markdown) {
  let html = '', inList = false;
  const closeList = () => { if (inList) { html += '</ul>'; inList = false; } };
  for (const line of markdown.split('\n')) {
    if (line.startsWith('### ')) { closeList(); html += `<h3>${esc(line.slice(4))}</h3>`; }
    else if (line.startsWith('- ')) { if (!inList) { html += '<ul>'; inList = true; } html += `<li>${rich(line.slice(2))}</li>`; }
    else if (line.trim()) { closeList(); html += `<p>${rich(line)}</p>`; }
  }
  closeList(); return html;
}

export function parentSeasonSection() {
 return `<section class="section matchday-resource" id="2027-season-checklist" aria-labelledby="season-checklist-title">
 <div class="container-wide resource-reading">
 <div class="section-copy"><p class="kicker">2027 season prep</p><h2 id="season-checklist-title">Your volleyball match-day checklist</h2>
 <p>Know where to go, who is keeping score, and how everyone else will follow. Use this checklist before your first tournament, then repeat the match-day checks each weekend.</p>
 <p class="resource-meta">Prepared for the 2027 season on October 26, 2026. Check your team’s and event’s current requirements before play. The app comparisons below retain their separate source-review dates.</p></div>
 <h3>Before the season starts</h3>${checklistHtml(content.parentChecklist)}
 <div class="resource-note"><h3>Where CourtsideView fits</h3><p>You can begin local Scorekeeper scoring without an account. Other features, including FanView viewing and broadcasting, require a registered account. Supporters can use a browser without installing the app. Live sharing needs internet; video needs someone broadcasting.</p><p>This checklist helps plan a family workflow. Your event determines its official scoring system and required scorer training.</p></div>
 <div class="resource-actions"><a class="primary-button" href="/resources/2027-volleyball-match-day-checklist.txt" download>Download the checklist <span class="resource-format">TXT · ${downloadSize('2027-volleyball-match-day-checklist.txt')}</span></a><a class="secondary-button" href="/volleyball-score-keeper#first-tournament">Read the scoring mini-guide</a></div>
 <p><a href="${reportPath}">Read the source-based match-day workflow report</a></p>
 </div></section>`;
}

export function worksheetSection() {
 const products = [...new Set(facts.facts.map(f => f.product))].sort();
 const cards = products.map(product => {
   const rows = facts.facts.filter(f => f.product === product && ['Intended use','Access and devices','Cost boundary'].includes(f.topic));
   return `<article class="resource-product"><h3>${esc(product)}</h3><dl>${rows.map(f => `<dt>${esc(f.topic)}</dt><dd>${esc(f.summary)} <span class="resource-limit">${esc(f.limit)}</span><a href="${esc(f.url)}" rel="noopener">${esc(product)} source: ${esc(f.topic.toLowerCase())}</a></dd>`).join('')}</dl></article>`;
 }).join('');
 return `<section class="section matchday-resource" id="worksheet" aria-labelledby="worksheet-title"><div class="container-wide">
 <div class="section-copy"><p class="kicker">Your priorities. Your shortlist.</p><h2 id="worksheet-title">Build your own volleyball app comparison</h2><p>The editable workbook starts with blank ratings. Choose what matters to your team, try your shortlisted tools, then record your own scores. No product has a preset advantage.</p><p class="resource-meta">Worksheet and selected fact notes reviewed October 26, 2026. Published by CourtsideView, one of the products included. Documentation review, without a hands-on performance benchmark.</p></div>
 <ol class="resource-inline-steps"><li><strong>Set importance.</strong> Rate each requirement from 0 to 5.</li><li><strong>Try each workflow.</strong> Check your device, role, venue connection and actual costs.</li><li><strong>Enter your ratings.</strong> The XLSX calculates a weighted fit score only after you fill the required ratings.</li></ol>
 <div class="resource-actions"><a class="primary-button" href="/resources/volleyball-app-comparison-worksheet.xlsx" download>Download editable workbook <span class="resource-format">XLSX · ${downloadSize('volleyball-app-comparison-worksheet.xlsx')}</span></a><a class="secondary-button" href="/resources/volleyball-app-comparison-worksheet.csv" download>Download blank ratings table <span class="resource-format">CSV · 1 KB</span></a></div>
 <p class="resource-meta">The XLSX includes formulas, dated product facts and source links. The CSV contains the blank input table only. Your edits stay in your downloaded file; this page does not receive them.</p>
 <h3 class="resource-subtitle">Check the requirements before you rate</h3><div class="resource-products">${cards}</div>
 <p><a href="${reportPath}">See how scorekeeping, player tracking and remote following differ</a></p>
 </div></section>`;
}

export function scorerSection() {
 return `<section class="section matchday-resource" id="first-tournament" aria-labelledby="first-tournament-title"><div class="container-wide">
 <div class="section-copy"><p class="kicker">First-tournament field guide</p><h2 id="first-tournament-title">Your first tournament as a volleyball scorekeeper</h2><p>Start with one clear job: keep an accurate score that you and your supporters can follow. These eight steps cover a family scorekeeping workflow. Official scorer duties follow the event’s required system, instructions and training.</p><p class="resource-meta">Reviewed October 26, 2026.</p></div>
 <ol class="resource-steps">${content.scorerSteps.map((step,i) => `<li><span class="resource-step-number" aria-hidden="true">${String(i+1).padStart(2,'0')}</span><h3>${esc(step.title.replace(/^\d+\. /,''))}</h3><p>${esc(step.body)}</p></li>`).join('')}</ol>
 <div class="resource-actions"><a class="primary-button" href="/resources/first-tournament-scorekeeper.pdf" download>Download the six-slide companion <span class="resource-format">PDF · ${downloadSize('first-tournament-scorekeeper.pdf')}</span></a><a class="secondary-button" href="/best-apps-for-volleyball-parents#2027-season-checklist">Prepare the rest of match day</a></div>
 <p><a href="https://usavolleyball.org/resources-for-officials/indoor-scorers/" rel="noopener">USA Volleyball official scorer resources</a></p>
 </div></section>`;
}

export function renderWorkflowReport({ nav, footer }) {
 const title = 'Volleyball Match-Day Workflows: Source-Based Report';
 const description = 'Seven volleyball match-day questions mapped to documented CourtsideView capabilities, with sources, limitations and clearly labeled hypothetical examples.';
 const url = site + reportPath;
 const sources = [...new Set(content.reportQuestions.map(q => q.url))];
 const schema = {'@context':'https://schema.org','@type':'Article',headline:title,description,url,datePublished:content.date,dateModified:content.date,author:{'@type':'Organization',name:'CourtsideView',url:site},publisher:{'@type':'Organization',name:'CourtsideView',url:site},citation:sources,image:site+'/assets/website-20261023/social-preview.jpg'};
 const body = content.reportQuestions.map(q => `<article class="resource-question"><h2>${esc(q.title)}</h2><p>${esc(q.body)}</p><p class="resource-limit"><strong>Evidence limit:</strong> ${esc(q.limit)}</p><p><a href="${esc(q.url)}" rel="noopener">Source: ${esc(q.source)}</a></p></article>`).join('');
 return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title} | CourtsideView</title><meta name="description" content="${description}"><meta name="theme-color" content="#0a0e14"><link rel="canonical" href="${url}"><link rel="icon" href="/favicon.ico" sizes="any"><meta property="og:type" content="article"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:url" content="${url}"><meta property="og:image" content="${site}/assets/website-20261023/social-preview.jpg"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${title}"><meta name="twitter:description" content="${description}"><meta name="twitter:image" content="${site}/assets/website-20261023/social-preview.jpg"><link rel="stylesheet" href="/geo-guides.css"><link rel="stylesheet" href="/marketing-accessibility.css"><link rel="stylesheet" href="/assets/website-20261023/brand-v3.css"><link rel="stylesheet" href="${resourceCss}"><script type="application/ld+json">${JSON.stringify(schema,null,2)}</script></head>
<body><div class="page-shell"><div class="top-banner"><div class="container-wide top-banner-inner"><span>CourtsideView field notes</span><a href="/volleyball-apps">Browse the guides</a></div></div><header class="container-wide"><nav class="nav" aria-label="Main navigation"><a href="/" class="wordmark" aria-label="CourtsideView home"><img class="brand-logo" src="/assets/courtsideview-app-icon-mark.png" alt="CourtsideView CV app logo" width="850" height="626"></a>${nav}</nav></header>
<main class="matchday-resource"><section class="container-wide hero" aria-labelledby="hero-title"><div><p class="kicker">Source-based workflow report</p><h1 id="hero-title">Seven volleyball match-day questions, answered from the product sources</h1><p class="hero-copy">Keeping score, tracking player actions and following from another location are different jobs. This report maps seven practical questions to capabilities described on CourtsideView’s website and public app listing.</p><p class="resource-meta">Published and reviewed October 26, 2026 · CourtsideView editorial team</p></div><aside class="hero-panel"><strong>What this report contains</strong><ul><li>Seven documented product workflows</li><li>Sources and limits for each answer</li><li>Clearly hypothetical example responses</li></ul><p class="resource-meta">Product-source analysis. No participant survey or interviews were conducted.</p></aside></section>
<section class="section"><div class="container-wide resource-reading">${body}
<section class="resource-note" aria-labelledby="examples-title"><h2 id="examples-title">Explore hypothetical workflow examples</h2><p>The example download illustrates a family scorer, a remote supporter and a player-stat tracker. The responses are synthetic examples generated from documented capabilities. They are not submissions from real people, testimonials, response counts or measured findings about customer preferences.</p><div class="resource-actions"><a class="primary-button" href="/resources/hypothetical-workflow-examples.md" download>Download synthetic examples <span class="resource-format">Markdown · ${downloadSize('hypothetical-workflow-examples.md')}</span></a><a class="secondary-button" href="/volleyball-app-comparison-study#worksheet">Use the comparison worksheet</a></div></section>
<section class="resource-note" id="planned-workflow-study" aria-labelledby="planned-study-title"><h2 id="planned-study-title">Planned study: how volunteers keep a match on track</h2><p>We are preparing a small study of adult volunteer scorekeepers and family viewers. Can a scorer set up the right teams, correct a point, record a timeout, move to the next set, and resume an unfinished match? Can a family viewer open the shared score and recognize an update?</p><p>The planned sessions use fictional teams and test accounts. We aim to include 8–12 adult volunteers with different levels of experience. Participation will be voluntary, with no audio, video, or screen recording. We will record task outcomes, requests for help, and confusing steps, then report combined results and the limitations of this small sample.</p><p><strong>No participants have been enrolled and no results have been collected.</strong> CourtsideView sponsors this exploratory study of its own workflow. It will not rank competing apps. The seven answers above remain an editorial review of product documentation.</p><div class="resource-actions"><a class="primary-button" href="/resources/volleyball-workflow-observation-template.csv" download>Download blank observation sheet <span class="resource-format">CSV · 1 KB</span></a></div><p>The download contains headings only. Make a private working copy for observations; do not publish individual participant records. Future findings will identify the tested versions, methods, sample, and collection dates.</p></section>
<section class="resource-method"><h2>How this report was prepared</h2><p>CourtsideView prepared this original editorial synthesis from its public app listing and website explanations. Seven questions were selected to explain documented jobs and their practical boundaries. CourtsideView publishes the report and is the product discussed.</p><p>No participant responses, product analytics, support-ticket dataset, timed trials or comparative performance measurements were analyzed. This report does not establish customer preferences, measured reliability or a universal product winner. Product capabilities and access requirements may change; check the current flow before match day.</p><p>Sources reviewed October 26, 2026. The app listing and website describe product capabilities; they are not independent usability evidence. Recording, long-term video storage and postgame archives were not evaluated.</p><h3>Source register</h3><ul class="source-list">${sources.map(source => `<li><a href="${esc(source)}" rel="noopener">${esc(source.replace('https://www.courtsideviewapp.com/','CourtsideView: ').replace('https://apps.apple.com/us/app/courtsideview/id6766532771','CourtsideView App Store listing'))}</a></li>`).join('')}</ul></section>
<div class="resource-actions"><a class="secondary-button" href="/best-apps-for-volleyball-parents#2027-season-checklist">2027 match-day checklist</a><a class="secondary-button" href="/volleyball-score-keeper#first-tournament">First-tournament scoring guide</a></div>
</div></section></main>${footer}</div></body></html>`;
}

export function writeScorerSection(root) {
 const file = new URL('../volleyball-scorekeeper.html', root);
 let html = fs.readFileSync(file, 'utf8');
 html = html.replace(/<!-- MATCHDAY_RESOURCE_START -->[\s\S]*?<!-- MATCHDAY_RESOURCE_END -->\n/g, '');
 const css = `<link rel="stylesheet" href="${resourceCss}">`;
 if (!html.includes(css)) html = html.replace('</head>', css+'\n</head>');
 const marker = '            <section class="section" id="faq">';
 if (!html.includes(marker)) throw new Error('Scorer FAQ insertion point changed');
 html = html.replace(marker, `<!-- MATCHDAY_RESOURCE_START -->\n${scorerSection()}\n<!-- MATCHDAY_RESOURCE_END -->\n${marker}`);
 fs.writeFileSync(file, html);
}
