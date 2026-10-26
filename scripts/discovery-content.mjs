// Build-time static marketing content. Never imported by the browser.
import fs from 'node:fs';
const root = new URL('../', import.meta.url);
const facts = JSON.parse(fs.readFileSync(new URL('./discovery-product-facts.json', import.meta.url), 'utf8'));
const esc = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const css = '/assets/website-20261026/discovery.css';
const imageBase = '/assets/website-20261023/';
const read = name => fs.readFileSync(new URL(name, root), 'utf8');
const write = (name, s) => fs.writeFileSync(new URL(name, root), s);
const markers = (key, body) => `<!-- DISCOVERY_${key}_START -->\n${body}\n<!-- DISCOVERY_${key}_END -->`;
function insert(html, key, body, anchor) {
 const re = new RegExp(`<!-- DISCOVERY_${key}_START -->[\\s\\S]*?<!-- DISCOVERY_${key}_END -->\\n?`, 'g');
 html = html.replace(re, '');
 if (!html.includes(anchor)) throw new Error(`Missing ${key} insertion point`);
 return html.replace(anchor, markers(key,body)+'\n'+anchor);
}
function requirements() {
 return `<aside class="discovery-requirements" aria-label="Accounts and live sharing"><p><strong>Before you start:</strong> ${esc(facts.accounts)}</p><p>${esc(facts.sharing)} ${esc(facts.expiry)}</p><a href="/courtsideview-app#product-facts">Check product and access details</a></aside>`;
}
function figure(name, alt, caption, landscape=false) {
 return `<figure class="discovery-figure${landscape ? ' discovery-landscape' : ''}"><img src="${imageBase+name}" alt="${esc(alt)}" width="${landscape?2778:1284}" height="${landscape?1284:2778}" loading="lazy" decoding="async"><figcaption>${esc(caption)}</figcaption></figure>`;
}
function walkthrough(id,title,intro,steps,image,extra='') {
 return `<section class="section discovery-content" id="${id}" aria-labelledby="${id}-title"><div class="container-wide"><div class="section-copy"><p class="kicker">A practical walkthrough</p><h2 id="${id}-title">${title}</h2><p>${intro}</p></div><div class="discovery-walkthrough"><ol class="discovery-steps">${steps.map(([h,p])=>`<li><h3>${h}</h3><p>${p}</p></li>`).join('')}</ol>${image}</div>${extra}<p class="discovery-note">Written by CourtsideView · Updated October 26, 2026. Existing app imagery illustrates the controls and roles described; screen appearance can vary by version.</p></div></section>`;
}
function scorer() {
 return walkthrough('scorekeeper-walkthrough','Keep a family score, then correct a wrong tap','Use Scorekeeper for points, sets and timeouts when you do not need player-by-player statistics. No roster is required for a score-only match.',[
 ['Choose the score-only job','Open Scorekeeper. Check the two team names and the match format before starting. If you need player actions and lineup context, use <a href="/volleyball-player-stats#player-tracking-walkthrough">Courtside player tracking</a> instead.'],
 ['Add the confirmed point','After the rally is awarded, use the scoring team’s point control. The example screen labels these “+ Falcons” and “+ Eagles.” Check the score against the court scoreboard at a natural pause.'],
 ['Correct an immediately misplaced point','If you just gave a point to the wrong team, tap <strong>Undo</strong>, then add the point to the correct team. Check both scores before the next rally. This example covers the most recent point; do not assume Undo reverses every kind of event.'],
 ['Check the pause or finish','Use the correct team’s <strong>Timeout</strong> control when a timeout is called. Confirm the set’s final score before <strong>End Set</strong>. Use <strong>FANVIEW</strong> only when you want to share; registration and internet are required.']
 ],figure('scorekeeper.png','Scorekeeper example showing team point buttons, team timeouts, Undo, End Set and FANVIEW','Read the screen from top to bottom: match and team scores; point buttons; team timeouts; Undo and End Set. FANVIEW is the separate sharing action.'),`<div class="discovery-example"><h3>Fictional correction example</h3><p>The score should be Falcons 10, Eagles 9. You accidentally give Eagles the next point, making it 10–10. Immediately use Undo to return to 10–9, then give Falcons the point: 11–9. Confirm the result before continuing.</p><p>${esc(facts.official)}</p><a href="#first-tournament">Read the complete first-tournament guide</a></div>`);
}
function stats() {
 const glossary=[['Kill','An attack that directly wins the rally.'],['Dig','A defensive pass that keeps an opponent’s attack in play; receiving a serve is a different action.'],['Assist','The pass to a teammate whose attack produces a kill.'],['Ace','A serve that directly earns a point, including one the receivers touch but cannot keep in play.'],['Block','For a credited block statistic, the block must directly win the rally. A block touch alone is different.']];
 const extra=`<div class="discovery-example"><h3>Understand the actions you record</h3><p>CourtsideView’s public app listing describes kills, digs, blocks, aces, assists, errors and serving rotations. These short sport definitions help explain five of those actions; they do not establish a particular report formula or official scoring certification.</p><dl class="discovery-dictionary">${glossary.map(([t,d])=>`<div><dt>${t}</dt><dd>${d}</dd></div>`).join('')}</dl><p>Definitions summarized from <a href="https://sdhsaa.com/volleyball-stats/">SDHSAA volleyball statistical guidelines</a>. Follow your team’s statistical conventions and the full guidance for edge cases. Product categories: <a href="https://apps.apple.com/us/app/courtsideview/id6766532771">CourtsideView’s App Store description</a>.</p></div><div class="discovery-example"><h3>Fictional example: one rally, several contributions</h3><p>Player 7 keeps an opponent’s attack in play, Player 3 passes to Player 12, and Player 12 attacks for the winning point. That sequence can be described as a dig, an assist and a kill under the definitions above. It is still one team point, not three.</p><p>This illustrates stat interpretation, not an exported app report or a measured athlete result. Record only what you observed, check the assigned athlete, and review the match’s player entries. Do not infer hitting percentage, automatic video recognition or a specific report calculation from these action counts.</p></div>`;
 return walkthrough('player-tracking-walkthrough','Choose player tracking when the athlete’s actions matter','Courtside mode is the player-tracking workflow. It requires a registered account. Choose Scorekeeper instead when you only need the team score.',[
 ['Start with the right role','Choose <strong>Courtside</strong> from Home. The pictured Home screen separates Courtside, Scorekeeper and Roster Hub so you can choose the job before the match.'],
 ['Check who you are tracking','Prepare the player or roster information needed for your match. Confirm names and numbers, and check the on-court context before assigning an action.'],
 ['Record the action you observed','Use the player-tracking workflow to attribute the action to the athlete. Confirm what happened before recording it; do not turn an uncertain rally into a guessed statistic.'],
 ['Review the player entries','Compare the recorded player and action with your observation. Use the game’s score and lineup as context. A player action is not necessarily an extra point; a dig and an assist can be part of the same rally.']
 ],figure('home.png','Home role selection with Courtside for player tracking and separate Scorekeeper and Roster Hub cards','The Courtside card is the entry for athlete match stats. Scorekeeper is a separate score-only choice; Roster Hub manages player and team information. This image shows role selection, not a statistics result.'),extra);
}
function family() {
 return walkthrough('follow-a-match','Help family open the right match','A FanView link lets family follow in a browser without installing CourtsideView. Viewers need a registered account and internet. Live scores and optional live video are different parts of the experience.',[
 ['Check the game before sharing','The scorer opens <strong>FANVIEW</strong> from the active game and shares that game’s link. Confirm both team names and the current set before sending it to supporters.'],
 ['Open the link and sign in','The family viewer opens the shared link in a modern browser and completes the account step if prompted. Return to the shared match and check the team names so everyone follows the intended game.'],
 ['Confirm an update together','Ask the scorer to confirm the latest score at a pause. The viewer should see the corresponding score and match activity. Video appears only when someone broadcasts; a score link does not guarantee a live camera.'],
 ['Know when to ask for a fresh match link','The link stays the same for that game and expires 15 minutes after it concludes. For the next game, ask its scorer for its link. If a current game does not load, check your connection and the link with the scorer, or <a href="/support">contact support</a>.']
 ],figure('fanview-landscape.png','Illustrated landscape FanView with team names, score, set history and video controls','Example viewer layout: team names and set score identify the match. The video is optional. Muted, Float, Display and Full screen are viewer controls; this still image does not demonstrate a live connection.',true),`<div class="discovery-example"><h3>A quick check before first serve</h3><p>Have one adult open the link on another device. Confirm the account step, team names and score. Tell family whether you plan to share scores only or also broadcast video.</p><a href="/volleyball-score-keeper#scorekeeper-walkthrough">See the scorer’s side of the workflow</a></div>`);
}
export function writeDiscoveryContent() {
 const pages=['volleyball-scorekeeper.html','volleyball-player-stats.html','courtsideview-app.html','vs-gamechanger.html','best-apps-for-volleyball-parents.html','best-volleyball-scorekeeping-apps-2026.html'];
 for (const name of pages) {
  let html=read(name);
  if (!html.includes(css)) html=html.replace('</head>',`<link rel="stylesheet" href="${css}">\n</head>`);
  if(name!=='courtsideview-app.html') {
   const hero=html.match(/<section class="container-wide hero"[\s\S]*?<\/section>/)?.[0];
   if(!hero)throw new Error(`Hero missing: ${name}`);
   const stripped=html.replace(/<!-- DISCOVERY_REQUIREMENTS_START -->[\s\S]*?<!-- DISCOVERY_REQUIREMENTS_END -->\n?/g,'');
   html=stripped.replace(hero,hero+'\n'+markers('REQUIREMENTS',`<div class="container-wide discovery-content">${requirements()}</div>`));
  }
  if(name==='volleyball-scorekeeper.html')html=insert(html,'WALKTHROUGH',scorer(),'<!-- MATCHDAY_RESOURCE_START -->');
  if(name==='volleyball-player-stats.html')html=insert(html,'WALKTHROUGH',stats(),'            <section class="section" id="faq">');
  if(name==='best-apps-for-volleyball-parents.html')html=insert(html,'WALKTHROUGH',family(),'            <section class="section" id="faq">');
  if(name==='courtsideview-app.html'){
   const block=`<div class="answer-card" id="product-facts"><h2>CourtsideView facts at a glance</h2><p>Maintained by ${esc(facts.owner)}. Access guidance reviewed October 26, 2026; check stores for current compatibility and purchase terms.</p><dl class="discovery-dictionary">${[['Devices',facts.devices],['Download and access',facts.price],['Accounts',facts.accounts],['Live sharing',facts.sharing],['Link lifetime',facts.expiry],['Official scoring',facts.official]].map(([a,b])=>`<div><dt>${esc(a)}</dt><dd>${esc(b)}</dd></div>`).join('')}</dl><p>Product sources: <a href="https://apps.apple.com/us/app/courtsideview/id6766532771">App Store</a> and <a href="https://play.google.com/store/apps/details?id=app.courtsideview.android">Google Play</a>. For a feature or access question, <a href="/support">contact support</a>.</p></div>`;
   html=html.replace(/<div class="answer-card(?: discovery-content)?" id="product-facts">[\s\S]*?<\/div>(?=\n                <\/div>\n            <\/section>)/,block);
   html=html.replace('class="answer-card" id="product-facts"','class="answer-card discovery-content" id="product-facts"');
  }
  write(name,html);
 }
}
