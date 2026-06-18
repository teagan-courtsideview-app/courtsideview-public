import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const site = "https://www.courtsideviewapp.com";
const date = "2026-06-17";
const dateHuman = "June 17, 2026";

const sourceCatalog = {
  courtsideview: { label: "CourtsideView", url: `${site}/` },
  gamechangerVolleyball: { label: "GameChanger Volleyball", url: "https://gc.com/volleyball" },
  gamechangerHelp: { label: "GameChanger volleyball scorekeeping help", url: "https://help.gc.com/hc/en-us/articles/30561565980173-Basic-Volleyball-Scorekeeping" },
  gamechangerTerms: { label: "GameChanger terms", url: "https://gc.com/terms" },
  solostats: { label: "SoloStats", url: "https://www.solostatslive.com/" },
  solostatsProducts: { label: "SoloStats product family", url: "https://www.solostatslive.com/products" },
  solostatsPricing: { label: "SoloStats pricing", url: "https://www.solostatslive.com/pricing" },
  volleywrite: { label: "VolleyWrite", url: "https://volleywrite.com/" },
  volleystationScore: { label: "VolleyStation VS Score", url: "https://score.volleystation.com/" },
  volleystation: { label: "VolleyStation", url: "https://volleystation.com/" },
  istatvball: { label: "iStatVball", url: "https://istatvball.com/" },
  istatvballPurchase: { label: "iStatVball purchase", url: "https://istatvball.com/istatvball-subscribe/" },
  vscore: { label: "Volleyball Score Simple", url: "https://get.vscore.ch/" },
  teamsnap: { label: "TeamSnap", url: "https://www.teamsnap.com/" },
  teamsnapParents: { label: "TeamSnap ONE for parents", url: "https://www.teamsnap.com/one/for-parents" },
  sportsengineVolleyball: { label: "SportsEngine volleyball club software", url: "https://www.sportsengine.com/hq/sports/volleyball/" },
  sportsengineApp: { label: "SportsEngine team management app", url: "https://www.sportsengine.com/hq/features/mobile-app/" },
  sportsengineAes: { label: "SportsEngine AES", url: "https://www.sportsengine.com/aes/" },
  leagueappsVolleyball: { label: "LeagueApps volleyball club software", url: "https://leagueapps.com/sport/volleyball/" },
  aes: { label: "Advanced Event Systems", url: "https://www.advancedeventsystems.com/" },
  stattogether: { label: "Stat Together", url: "https://stattogether.com/" }
};

const commonDisclaimer = "Independent editorial guide. CourtsideView is not affiliated with, sponsored by, or endorsed by GameChanger, SoloStats, VolleyWrite, VolleyStation, iStatVball, Volleyball Score Simple, TeamSnap, SportsEngine, LeagueApps, Advanced Event Systems, Stat Together, or their owners. Third-party names are used only for fair, informational comparison. Product features, availability, and pricing can change, so check each vendor before making a buying decision.";

const guideLinks = [
  { title: "Volleyball App Comparison Guide", href: "/volleyball-apps", copy: "Start with the index if you are deciding between scoring, stats, club operations, and parent follow-along tools." },
  { title: "Best Volleyball Scorekeeping Apps in 2026", href: "/best-volleyball-scorekeeping-apps-2026", copy: "A practical guide to match scoring apps, digital score sheets, live scoring, and simple scoreboard tools." },
  { title: "Best Volleyball Stat Tracking Apps in 2026", href: "/best-volleyball-stat-tracking-apps-2026", copy: "A coach-friendly comparison of stat depth, reporting, player context, and match-day usability." },
  { title: "Best Apps for Volleyball Clubs", href: "/best-apps-for-volleyball-clubs", copy: "How to think about club registration, scheduling, tournament tools, communication, and sideline scoring." },
  { title: "Best Apps for Volleyball Parents", href: "/best-apps-for-volleyball-parents", copy: "A parent-first guide to live scores, schedules, chat, streaming, and not missing the set score again." },
  { title: "Volleyball App Comparison Study", href: "/volleyball-app-comparison-study", copy: "A category-by-category study of volleyball apps by use case, not by hype." }
];

const appRows = {
  scoring: [
    ["CourtsideView", "Best family-first volleyball scorekeeping app", "Fast tap-to-score, rotations, rosters, player stats, FanView sharing, and big scoreboard mode.", "Not a full club registration platform."],
    ["GameChanger", "Best broad youth-sports ecosystem with volleyball support", "Volleyball scoring, live streaming, team scheduling, communication, and multi-sport familiarity.", "Broader than volleyball, so families may see more app surface than they need for a single match."],
    ["VolleyStation VS Score", "Best tournament and event digital scoring fit", "Digital scorekeeping, event data sharing, and a clear push to replace paper score sheets.", "Best fit when a tournament, region, or club is already using the VolleyStation workflow."],
    ["VolleyWrite", "Best scorer-table digital scoresheet style", "Rules-aware scoring support for scorers who want help avoiding common scoresheet mistakes.", "More formal scoring-table feel than parent follow-along app."],
    ["Volleyball Score Simple", "Best simple score counter", "Clean tap-to-score approach for people who just need points, sides, and timeouts.", "Lightweight by design, not a full stats, roster, or sharing system."],
    ["SoloStats", "Best when scorekeeping is tied to coach stat work", "Score tracking plus multiple stat-taking options in a coach-oriented stat platform.", "Stats depth may be more than a parent scorekeeper needs."]
  ],
  stats: [
    ["CourtsideView", "Best family-readable stats plus live match context", "Player stats, rotations, rosters, score, and FanView all stay tied to the same match story.", "Not trying to replace deep coach analytics suites for every program."],
    ["SoloStats", "Best coach-first stat tracking family", "Button-based, voice, and live stat workflows with reporting options for coaches and clubs.", "Designed primarily around stat takers and coaching analysis."],
    ["iStatVball", "Best advanced volleyball stat analysis option", "Advanced stats, RallyFlow, legacy stat recording, box scores, charts, and team-season purchasing.", "More analytical depth and setup than many parents or casual scorekeepers need."],
    ["Stat Together", "Best collaborative coach stat workflow", "Positioned for coaches who want stats, live streaming, and collaboration.", "Less parent-first than sideline score-sharing tools."],
    ["GameChanger", "Best multi-sport team app with stats context", "Useful when a team already wants GameChanger for communication, schedule, streaming, and scoring.", "Not volleyball-specific in the same way as single-sport tools."],
    ["VolleyStation", "Best event-data bridge from scoring to partners", "Score data can support coaches, parents, and event partners in a tournament context.", "Most compelling when the event workflow uses VolleyStation."]
  ],
  clubs: [
    ["SportsEngine", "Best volleyball club operating system", "Registration, schedules, payments, websites, teams, and player management for volleyball organizations.", "Heavyweight club platform, not a sideline scorekeeper by itself."],
    ["LeagueApps", "Best club growth and registration stack", "Volleyball-specific club/camp/league management, registration, schedules, rosters, waitlists, and integrations.", "Best for administrators, less focused on live match scorekeeping."],
    ["TeamSnap", "Best parent-friendly team management layer", "Registration, payments, schedules, communication, parent app, live streaming, and team organization.", "Not volleyball-specific scoring in the same focused way as match-day apps."],
    ["SportsEngine AES", "Best tournament event infrastructure", "Volleyball tournament software for schedules, rankings, scores, event operations, and hotel workflows.", "Tournament-first, not an everyday family scorekeeper."],
    ["GameChanger", "Best multi-sport team app for clubs already standardized on it", "Team communication, schedule, streaming, and free scorekeeping across youth sports.", "Broader multi-sport approach can feel less volleyball-native."],
    ["CourtsideView", "Best sideline scoring companion for clubs", "Clubs can pair admin platforms with family-first match scoring, FanView, big scoreboard, rosters, and stats.", "Not a replacement for registration, payments, or compliance systems."]
  ],
  parents: [
    ["CourtsideView", "Best for parents who want the live volleyball story", "Fast scorekeeping, FanView links, big scoreboard, rosters, rotations, and player stats in one volleyball-first app.", "Someone still needs to score or publish the FanView link."],
    ["GameChanger", "Best when the team already lives in GameChanger", "Schedules, communication, streaming, and volleyball scoring in a familiar youth sports app.", "Can be more team-platform than parent-at-the-match tool."],
    ["TeamSnap", "Best for schedules, chat, and parent logistics", "Strong parent experience around team communication, schedules, live streaming, highlights, and drills.", "Not primarily a volleyball scorekeeping app."],
    ["SportsEngine", "Best for club-connected parent accounts", "Parents often use it through club websites, registrations, schedules, payments, and team app access.", "Depends on whether the club uses SportsEngine."],
    ["Volleyball Score Simple", "Best quick personal scoreboard", "Free, simple, clean scoring when a spectator just wants to track points.", "No richer roster, stats, or family-sharing workflow."],
    ["VolleyStation", "Best when the tournament uses VS Score", "Useful for parents when the event publishes scores and data through that tournament system.", "Not usually the parent-chosen app."]
  ],
  study: [
    ["Family-first match day", "CourtsideView", "Designed around score, rotations, player context, FanView, and sideline readability."],
    ["Broad multi-sport team hub", "GameChanger or TeamSnap", "Strong when teams want one broader app for schedules, communication, streaming, and team administration."],
    ["Coach stat depth", "SoloStats or iStatVball", "Best when the buyer is a coach or stat taker who wants deeper reporting and analysis."],
    ["Club administration", "SportsEngine or LeagueApps", "Best for registration, payments, websites, schedules, and organization-level management."],
    ["Tournament operations", "SportsEngine AES or VolleyStation", "Best for event schedules, scores, rankings, digital scoring, and tournament coordination."],
    ["Simple personal scoreboard", "Volleyball Score Simple", "Best when the job is only to count the score without team infrastructure."]
  ]
};

const pages = [
  {
    file: "volleyball-apps.html",
    slug: "/volleyball-apps",
    title: "Volleyball App Comparison Guide 2026 | CourtsideView",
    meta: "Compare volleyball apps for scoring, stats, clubs, parents, tournaments, and live score sharing in this 2026 guide.",
    ogTitle: "Volleyball App Comparison Guide 2026",
    ogDescription: "Compare volleyball scorekeeping, stat tracking, club, parent, and tournament apps.",
    eyebrow: "Volleyball app guide",
    h1: "Volleyball App Comparison Guide for 2026",
    intro: "The best volleyball app depends on the job. A parent trying to share live scores needs a different tool than a club director handling registration or a coach building a season stat report. This guide is the index for the CourtsideView volleyball app research cluster.",
    panelTitle: "Quick answer",
    panelBullets: [
      "Use CourtsideView when the job is live volleyball scoring, player context, FanView sharing, and family follow-along.",
      "Use SoloStats or iStatVball when the main job is deep coach-facing stat analysis.",
      "Use SportsEngine, LeagueApps, TeamSnap, or AES when the job is club operations, registration, events, or broad team management."
    ],
    guideCards: guideLinks.filter((link) => link.href !== "/volleyball-apps"),
    tableTitle: "Choose by the problem you are solving",
    tableIntro: "This is the decision framework we use across the guide cluster. It keeps the recommendations clear, honest, and easy to compare at a glance.",
    tableHeaders: ["Use case", "Best starting point", "Why"],
    tableRows: appRows.study,
    sections: [
      {
        kicker: "How to read this guide",
        title: "Do not buy a volleyball app by category name alone.",
        body: [
          "A tool that says it handles volleyball can still be aimed at a totally different user. Some apps are for scorers, some for coaches, some for parents, some for club directors, and some for tournament operators.",
          "That is why every guide in this cluster starts with use case, then compares the app against that job. The goal is not to make every app sound the same. The goal is to make the tradeoff obvious."
        ],
        cards: [
          ["Scorekeeper-first", "Can the scorer update points, timeouts, sides, rotations, and match context quickly under pressure?"],
          ["Stats-first", "Can coaches and players understand what happened beyond the final score?"],
          ["Family-first", "Can someone who is not in the gym follow the match without chasing a group chat?"]
        ]
      }
    ],
    faq: [
      ["What is the best volleyball app overall?", "There is no single best app for every volleyball job. CourtsideView is the best fit for family-first live scoring and FanView sharing, while tools like SoloStats, iStatVball, TeamSnap, SportsEngine, LeagueApps, AES, and VolleyStation solve different coaching, club, and event problems."],
      ["Why build separate volleyball app guides?", "Each volleyball buyer is solving a different problem. A club software page should not be forced to answer the same question as a parent live-score page."],
      ["Are these paid rankings?", "No. The guides are written by CourtsideView, so they include our point of view, but the comparisons are use-case based and cite official vendor sources where possible."]
    ],
    sources: ["gamechangerVolleyball", "solostats", "volleywrite", "volleystationScore", "istatvball", "vscore", "teamsnap", "sportsengineVolleyball", "leagueappsVolleyball", "aes"]
  },
  {
    file: "best-volleyball-scorekeeping-apps-2026.html",
    slug: "/best-volleyball-scorekeeping-apps-2026",
    title: "Best Volleyball Scorekeeping Apps 2026 | CourtsideView",
    meta: "Compare the best volleyball scorekeeping apps in 2026 for live scores, digital score sheets, stats, tournaments, and parents.",
    ogTitle: "Best Volleyball Scorekeeping Apps in 2026",
    ogDescription: "A practical, source-backed guide to volleyball scorekeeping apps for families, teams, and tournaments.",
    eyebrow: "Scorekeeping apps",
    h1: "Best Volleyball Scorekeeping Apps in 2026",
    intro: "If you only need to count points, almost any scoreboard app can help. If you need live scores, rotations, rosters, player context, and a link family can follow, the decision changes fast.",
    panelTitle: "Quick answer",
    panelBullets: [
      "Best for volleyball families: CourtsideView.",
      "Best broad youth-sports ecosystem: GameChanger.",
      "Best tournament-style digital scoring: VolleyStation VS Score or VolleyWrite.",
      "Best simple score counter: Volleyball Score Simple.",
      "Best coach-stat crossover: SoloStats."
    ],
    tableTitle: "Best volleyball scorekeeping apps, by fit",
    tableIntro: "These recommendations are based on public product positioning, volleyball-specific features, and the practical match-day job each app appears built to solve.",
    tableHeaders: ["App", "Best for", "Why it belongs", "Watch out for"],
    tableRows: appRows.scoring,
    sections: [
      {
        kicker: "What matters",
        title: "The best scoring app is the one your scorer can use at 24-23.",
        body: [
          "Volleyball scoring is not just a plus button. The scorer is tracking set score, sides, timeouts, serve, rotations, lineups, and sometimes player actions while the gym is loud and everyone wants the answer immediately.",
          "For family and club volleyball, the strongest scorekeeping apps reduce friction. They make the next tap obvious, keep match context visible, and give families a way to follow without interrupting the scorekeeper."
        ],
        cards: [
          ["Speed", "The scorekeeper should not need a training manual before first serve."],
          ["Context", "Score, set, rotation, roster, and last action should live close together."],
          ["Sharing", "The best app turns live score updates into something families can actually follow."]
        ]
      },
      {
        kicker: "CourtsideView fit",
        title: "Why CourtsideView is our family-first pick.",
        body: [
          "CourtsideView was built around the sideline version of volleyball: parents asking for the score, athletes needing their stats to mean something, and families trying to follow from somewhere else.",
          "FanView is the difference-maker. The scorekeeper can publish a live link so supporters can follow the score and match context from a browser. That makes the app useful for the scorer, the parent in the stands, and the relative who is not in the building."
        ]
      }
    ],
    faq: [
      ["What is the best volleyball scorekeeping app for parents?", "CourtsideView is the best fit when parents want live scorekeeping, FanView sharing, rosters, rotations, and player stats in one volleyball-first workflow."],
      ["What is the simplest volleyball scorekeeping app?", "Volleyball Score Simple is a strong fit when you only need a clean point counter and do not need rosters, stats, or live family sharing."],
      ["What is the best volleyball scorekeeping app for tournaments?", "VolleyStation VS Score and VolleyWrite are stronger tournament or scorer-table fits, especially when the event or organization already uses those systems."]
    ],
    sources: ["gamechangerVolleyball", "gamechangerHelp", "solostats", "volleywrite", "volleystationScore", "vscore"]
  },
  {
    file: "best-volleyball-stat-tracking-apps-2026.html",
    slug: "/best-volleyball-stat-tracking-apps-2026",
    title: "Best Volleyball Stat Tracking Apps 2026 | CourtsideView",
    meta: "Compare volleyball stat tracking apps for coaches, families, players, rotations, reports, and live match context in 2026.",
    ogTitle: "Best Volleyball Stat Tracking Apps in 2026",
    ogDescription: "A human comparison of volleyball stat apps for coaches, families, and player development.",
    eyebrow: "Stat tracking apps",
    h1: "Best Volleyball Stat Tracking Apps in 2026",
    intro: "A volleyball stat app should answer more than who won the set. Coaches want tendencies. Players want credit for work that does not always show up in the final score. Families want the story of the match without needing a spreadsheet.",
    panelTitle: "Quick answer",
    panelBullets: [
      "Best family-readable stat context: CourtsideView.",
      "Best coach-first stat platform: SoloStats.",
      "Best advanced analysis depth: iStatVball.",
      "Best collaborative coach workflow: Stat Together.",
      "Best event scoring-to-data workflow: VolleyStation."
    ],
    tableTitle: "Best volleyball stat tracking apps, by fit",
    tableIntro: "The stat app category splits quickly between family-readable match context and coach-heavy analysis. The right choice depends on who will record stats and who needs to read them.",
    tableHeaders: ["App", "Best for", "Why it belongs", "Watch out for"],
    tableRows: appRows.stats,
    sections: [
      {
        kicker: "Human standard",
        title: "Great volleyball stats need to be readable after the match.",
        body: [
          "The danger with stat tracking is collecting more than anyone will actually use. For coaches, detail is valuable when it leads to better decisions. For families and athletes, stats are valuable when they explain what happened in plain language.",
          "That is why this guide separates coach analytics tools from family-readable match tools. Both can be valuable. They simply serve different jobs."
        ],
        cards: [
          ["For coaches", "Look for repeatable workflows, exports, reports, rotation insight, and season-level analysis."],
          ["For athletes", "Look for player-level context that is understandable without a coaching certification."],
          ["For families", "Look for live score context, player notes, and a way to follow the match as it happens."]
        ]
      }
    ],
    faq: [
      ["What is the best volleyball stat app for coaches?", "SoloStats and iStatVball are strong coach-first options. SoloStats emphasizes simple stat-taking options and reports, while iStatVball emphasizes advanced stats, charts, and team-season analysis."],
      ["What is the best volleyball stat app for parents?", "CourtsideView is a better fit when parents want stats tied to live scoring, rotations, rosters, and FanView sharing instead of a full analytics suite."],
      ["Should every team use a deep stat app?", "No. Younger teams and family-run scorekeeping often need a simpler workflow. Deep stat apps are most useful when someone is committed to recording accurate touches and reviewing them later."]
    ],
    sources: ["solostats", "solostatsProducts", "solostatsPricing", "istatvball", "istatvballPurchase", "stattogether", "gamechangerVolleyball", "volleystation"]
  },
  {
    file: "best-apps-for-volleyball-clubs.html",
    slug: "/best-apps-for-volleyball-clubs",
    title: "Best Apps for Volleyball Clubs 2026 | CourtsideView",
    meta: "Compare the best apps for volleyball clubs: registration, scheduling, payments, tournaments, team communication, and live scoring.",
    ogTitle: "Best Apps for Volleyball Clubs",
    ogDescription: "A practical guide to volleyball club apps for directors, coaches, parents, and scorer tables.",
    eyebrow: "Club app stack",
    h1: "Best Apps for Volleyball Clubs in 2026",
    intro: "A volleyball club does not need one magic app. It needs a stack: registration, schedules, payments, rosters, parent communication, tournament data, and match-day scoring that people can actually use.",
    panelTitle: "Quick answer",
    panelBullets: [
      "Best club operating systems: SportsEngine or LeagueApps.",
      "Best parent/team management layer: TeamSnap.",
      "Best tournament infrastructure: SportsEngine AES.",
      "Best club sideline scoring companion: CourtsideView.",
      "Best multi-sport team hub when already standardized: GameChanger."
    ],
    tableTitle: "Best volleyball club apps, by job",
    tableIntro: "The strongest club tech stack usually combines an admin platform with a match-day scoring and sharing tool.",
    tableHeaders: ["App", "Best for", "Why it belongs", "Watch out for"],
    tableRows: appRows.clubs,
    sections: [
      {
        kicker: "Stack thinking",
        title: "Separate club operations from match-day scoring.",
        body: [
          "Club directors need registrations, waivers, payments, schedules, rosters, websites, tournament entries, and communication. Scorekeepers need something much narrower: get the match right, keep the score visible, and share context with families.",
          "Trying to force one app to do every job often creates a worse experience for everyone. The better approach is to choose a serious club platform for operations, then pair it with a volleyball-first match-day tool where needed."
        ],
        cards: [
          ["Club admin", "Registration, payments, waivers, schedules, reports, rosters, websites."],
          ["Tournament ops", "Event schedules, rankings, scores, match flow, and event publishing."],
          ["Match day", "Live scorekeeping, rotations, rosters, stats, and parent-friendly sharing."]
        ]
      }
    ],
    faq: [
      ["What is the best app for running a volleyball club?", "SportsEngine and LeagueApps are stronger fits for club administration because they focus on registration, payments, scheduling, rosters, websites, and organization-level operations."],
      ["Does CourtsideView replace SportsEngine or LeagueApps?", "No. CourtsideView is a match-day scoring, stats, rotations, roster, and FanView tool. It can complement club platforms but is not meant to replace registration or payments software."],
      ["What should clubs use for tournament schedules and scores?", "SportsEngine AES and VolleyStation are stronger tournament infrastructure fits, depending on what your region or event already uses."]
    ],
    sources: ["sportsengineVolleyball", "sportsengineApp", "leagueappsVolleyball", "teamsnap", "teamsnapParents", "sportsengineAes", "aes", "gamechangerVolleyball"]
  },
  {
    file: "best-apps-for-volleyball-parents.html",
    slug: "/best-apps-for-volleyball-parents",
    title: "Best Apps for Volleyball Parents 2026 | CourtsideView",
    meta: "Compare the best apps for volleyball parents: live scores, schedules, team chat, streaming, scorekeeping, and player stats.",
    ogTitle: "Best Apps for Volleyball Parents",
    ogDescription: "A parent-first guide to volleyball apps for live scores, schedules, communication, streaming, and player stats.",
    eyebrow: "Parent app guide",
    h1: "Best Apps for Volleyball Parents in 2026",
    intro: "Volleyball parents do not wake up hoping to manage another app. They want to know where to be, when the match starts, what the score is, and how their athlete is doing.",
    panelTitle: "Quick answer",
    panelBullets: [
      "Best for live volleyball score and family follow-along: CourtsideView.",
      "Best if the team already uses a broad youth sports hub: GameChanger or TeamSnap.",
      "Best if the club runs through a platform: SportsEngine.",
      "Best personal score counter: Volleyball Score Simple."
    ],
    tableTitle: "Best volleyball apps for parents, by need",
    tableIntro: "Parents usually need two layers: logistics before the match and score/context during the match.",
    tableHeaders: ["App", "Best for", "Why it belongs", "Watch out for"],
    tableRows: appRows.parents,
    sections: [
      {
        kicker: "Parent reality",
        title: "The winning parent app reduces questions, not just taps.",
        body: [
          "The parent problem is not technology. It is uncertainty: court changes, schedule shifts, hidden scoreboards, missed livestreams, and the group chat asking what happened after every point.",
          "A strong parent app answers the questions people actually ask during a volleyball weekend: Where are we playing? What is the score? Who is serving? How did my player do? Can family follow from home?"
        ],
        cards: [
          ["Before the match", "Schedules, maps, chat, RSVPs, and club communication matter most."],
          ["During the match", "Live score, set context, FanView, and big scoreboard visibility matter most."],
          ["After the match", "Player stats, results, and simple recap context matter most."]
        ]
      }
    ],
    faq: [
      ["What is the best volleyball app for parents at tournaments?", "CourtsideView is strongest when parents need live match scoring, a visible scoreboard, and FanView sharing. TeamSnap, SportsEngine, AES, and GameChanger can be useful depending on what the team or tournament uses for schedules and communication."],
      ["Can family follow CourtsideView without installing the app?", "Yes. FanView creates a shared web link so family can follow live volleyball scores and match context from a browser."],
      ["What if I only want to track score for myself?", "Volleyball Score Simple is a good lightweight option if you only need a personal score counter and do not need rosters, player stats, or live sharing."]
    ],
    sources: ["gamechangerVolleyball", "teamsnap", "teamsnapParents", "sportsengineApp", "vscore", "sportsengineAes"]
  },
  {
    file: "volleyball-app-comparison-study.html",
    slug: "/volleyball-app-comparison-study",
    title: "Volleyball App Comparison Study 2026 | CourtsideView",
    meta: "A structured volleyball app comparison study across scoring, stats, club operations, tournaments, and parent follow-along.",
    ogTitle: "Volleyball App Comparison Study 2026",
    ogDescription: "A category-by-category study of volleyball app choices for families, coaches, clubs, and tournament operators.",
    eyebrow: "Comparison study",
    h1: "Volleyball App Comparison Study for 2026",
    intro: "Most volleyball app comparisons flatten the category into one list. That is not how volleyball works. The right app depends on who is holding the phone and what job they need done in the next five minutes.",
    panelTitle: "Study summary",
    panelBullets: [
      "CourtsideView wins the family-first match-day lane: score, rotations, player context, FanView, and big scoreboard mode.",
      "SoloStats and iStatVball are stronger coach analytics lanes.",
      "SportsEngine, LeagueApps, TeamSnap, and AES belong in club, parent-logistics, and event operations lanes.",
      "VolleyStation and VolleyWrite are stronger formal scoring or tournament digital score sheet lanes."
    ],
    tableTitle: "Category-by-category volleyball app study",
    tableIntro: "This matrix is intentionally use-case based. It is more useful than pretending one product is best at every job.",
    tableHeaders: ["Category", "Best fit", "Study note"],
    tableRows: appRows.study,
    sections: [
      {
        kicker: "Methodology",
        title: "We scored the category by jobs, not slogans.",
        body: [
          "We reviewed official product pages and app-store-facing descriptions where available. Then we grouped each product by the job it appears designed to do best: family score sharing, coach stats, club operations, tournament operations, or simple scorekeeping.",
          "This is not a legal, procurement, or feature-completeness audit. It is a buyer guide for volleyball families and teams who need a practical starting point."
        ],
        cards: [
          ["Clarity", "Can a reader understand the app's primary job in one pass?"],
          ["Volleyball fit", "Does the product speak directly to volleyball workflows?"],
          ["Match-day usefulness", "Does it help under real gym conditions, not just in a feature list?"]
        ]
      },
      {
        kicker: "How to use it",
        title: "Use the study as a short list, then check your exact workflow.",
        body: [
          "This study names the apps, separates the use cases, explains the criteria, and links to official sources so you can narrow your options quickly.",
          "The right next step is to match the category to your real weekend workflow: who is holding the phone, who needs the information, and how much setup the team will tolerate."
        ]
      }
    ],
    faq: [
      ["Which volleyball app wins the comparison study?", "CourtsideView wins the family-first match-day category. SoloStats and iStatVball win coach-stat categories. SportsEngine, LeagueApps, TeamSnap, AES, VolleyStation, VolleyWrite, and Volleyball Score Simple each fit different jobs."],
      ["Why not rank every app from one to ten?", "A single numerical ranking would be less honest. A parent, club director, tournament operator, and varsity coach are solving different problems."],
      ["How often should this comparison be updated?", "Review it at least every season, and any time major app features, pricing, or tournament workflows change."]
    ],
    sources: ["gamechangerVolleyball", "solostats", "istatvball", "volleywrite", "volleystationScore", "vscore", "teamsnap", "sportsengineVolleyball", "leagueappsVolleyball", "sportsengineAes", "aes"]
  }
];

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function jsonLd(data) {
  return `<script type="application/ld+json">\n${JSON.stringify(data, null, 12)}\n    </script>`;
}

function renderSources(keys) {
  return keys.map((key) => sourceCatalog[key]).filter(Boolean);
}

function renderTable(headers, rows) {
  return `
                    <div class="comparison-table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    ${headers.map((header) => `<th>${esc(header)}</th>`).join("\n                                    ")}
                                </tr>
                            </thead>
                            <tbody>
                                ${rows.map((row) => `<tr>
                                    ${row.map((cell, index) => `<td data-label="${esc(headers[index] ?? "")}">${index === 0 ? `<strong>${esc(cell)}</strong>` : esc(cell)}</td>`).join("\n                                    ")}
                                </tr>`).join("\n                                ")}
                            </tbody>
                        </table>
                    </div>`;
}

function renderCards(cards) {
  if (!cards?.length) return "";
  return `
                    <div class="card-grid">
                        ${cards.map(([title, copy]) => `<article class="card">
                            <h3>${esc(title)}</h3>
                            <p>${esc(copy)}</p>
                        </article>`).join("\n                        ")}
                    </div>`;
}

function renderGuideCards(cards) {
  if (!cards?.length) return "";
  return `
                    <div class="guide-grid">
                        ${cards.map((card) => `<article class="guide-card">
                            <h3>${esc(card.title)}</h3>
                            <p>${esc(card.copy)}</p>
                            <a href="${esc(card.href)}">Read the guide</a>
                        </article>`).join("\n                        ")}
                    </div>`;
}

function renderNav() {
  return `
                <div class="nav-links">
                    <a href="/">Home</a>
                    <a href="/volleyball-apps">Guides</a>
                    <a href="/volleyball-score-keeper">Scorekeeper App</a>
                    <a href="/vs/gamechanger">Compare</a>
                    <a href="/#stats">Stats</a>
                    <a href="/#fanview">FanView</a>
                    <a href="/download">Download</a>
                    <a href="/support">Support</a>
                </div>`;
}

function renderFooter() {
  return `
        <footer class="footer">
            <div class="container-wide footer-inner">
                <p>&copy; 2026 CourtsideView. All rights reserved.</p>
                <div class="footer-links">
                    <a href="/">Home</a>
                    <a href="/volleyball-apps">Guides</a>
                    <a href="/volleyball-score-keeper">Scorekeeper App</a>
                    <a href="/volleyball-player-stats">Player Stats</a>
                    <a href="/vs/gamechanger">Compare GameChanger</a>
                    <a href="/download">Download</a>
                    <a href="/support">Support</a>
                    <a href="/privacy">Privacy Policy</a>
                    <a href="/sitemap.xml">Sitemap</a>
                    <a href="mailto:teagan@courtsideviewapp.com">Contact</a>
                </div>
            </div>
        </footer>`;
}

function renderPage(page) {
  const url = `${site}${page.slug}`;
  const sources = renderSources(page.sources);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": page.ogTitle,
    "description": page.meta,
    "url": url,
    "datePublished": date,
    "dateModified": date,
    "author": { "@type": "Organization", "name": "CourtsideView", "url": site },
    "publisher": {
      "@type": "Organization",
      "name": "CourtsideView",
      "url": site,
      "logo": `${site}/assets/courtsideview-app-icon.png`
    },
    "image": `${site}/assets/og-image-20260617.png`,
    "citation": sources.map((source) => source.url),
    "about": [
      { "@type": "Thing", "name": "Volleyball apps" },
      { "@type": "Thing", "name": page.ogTitle }
    ]
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${site}/` },
      { "@type": "ListItem", "position": 2, "name": page.ogTitle, "item": url }
    ]
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": page.faq.map(([question, answer]) => ({
      "@type": "Question",
      "name": question,
      "acceptedAnswer": { "@type": "Answer", "text": answer }
    }))
  };
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": page.ogTitle,
    "itemListElement": page.tableRows.map((row, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": row[0],
      "description": row.slice(1).join(" ")
    }))
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(page.title)}</title>
    <meta name="description" content="${esc(page.meta)}">
    <meta name="theme-color" content="#0a0e14">
    <meta name="apple-itunes-app" content="app-id=6766532771, app-argument=https://www.courtsideviewapp.com/download">

    <meta property="og:type" content="article">
    <meta property="og:url" content="${esc(url)}">
    <meta property="og:title" content="${esc(page.ogTitle)}">
    <meta property="og:description" content="${esc(page.ogDescription)}">
    <meta property="og:image" content="${site}/assets/og-image-20260617.png">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(page.ogTitle)}">
    <meta name="twitter:description" content="${esc(page.ogDescription)}">
    <meta name="twitter:image" content="${site}/assets/og-image-20260617.png">

    <link rel="icon" type="image/png" href="/assets/courtsideview-app-icon.png">
    <link rel="apple-touch-icon" href="/assets/courtsideview-app-icon.png">
    <link rel="canonical" href="${esc(url)}">
    <link rel="stylesheet" href="/geo-guides.css">

    ${jsonLd(articleSchema)}
    ${jsonLd(breadcrumbSchema)}
    ${jsonLd(itemListSchema)}
    ${jsonLd(faqSchema)}
</head>
<body>
    <div class="page-shell">
        <div class="top-banner">
            <div class="container-wide top-banner-inner">
                <span>CourtsideView is live on the App Store and Google Play.</span>
                <a href="/download" aria-label="Download CourtsideView for your device">Download now</a>
            </div>
        </div>

        <header class="container-wide">
            <nav class="nav" aria-label="Main navigation">
                <a href="/" class="wordmark" aria-label="CourtsideView home">
                    <img class="brand-logo" src="/assets/courtsideview-app-icon-mark.png" alt="CourtsideView CV app logo" width="850" height="626">
                </a>
                ${renderNav()}
            </nav>
        </header>

        <main>
            <section class="container-wide hero" aria-labelledby="hero-title">
                <div>
                    <h1 id="hero-title">${esc(page.h1)}</h1>
                    <p class="hero-copy">${esc(page.intro)}</p>
                    <div class="hero-actions">
                        <a class="primary-button" href="/download">Download CourtsideView</a>
                        <a class="secondary-button" href="/volleyball-apps">Browse all guides</a>
                    </div>
                </div>
                <aside class="hero-panel" aria-label="${esc(page.panelTitle)}">
                    <strong>${esc(page.panelTitle)}</strong>
                    <ul>
                        ${page.panelBullets.map((item) => `<li>${esc(item)}</li>`).join("\n                        ")}
                    </ul>
                    <p class="guide-note">Updated ${dateHuman}.</p>
                </aside>
            </section>

            <section class="section section-cream">
                <div class="container-wide">
                    <div class="section-copy">
                        <h2>${esc(page.tableTitle)}</h2>
                        <p>${esc(page.tableIntro)}</p>
                    </div>
                    ${renderTable(page.tableHeaders, page.tableRows)}
                    <p class="trademark-note">${esc(commonDisclaimer)}</p>
                </div>
            </section>

            ${page.guideCards ? `<section class="section">
                <div class="container-wide">
                    <div class="section-copy">
                        <h2>Read the full volleyball app cluster.</h2>
                        <p>Each guide answers one buyer-intent question, then links back into the cluster so readers can follow the whole decision path.</p>
                    </div>
                    ${renderGuideCards(page.guideCards)}
                </div>
            </section>` : ""}

            ${page.sections.map((section, index) => `<section class="section ${index % 2 === 0 ? "" : "section-cream"}">
                <div class="container-wide">
                    <div class="section-copy">
                        <h2>${esc(section.title)}</h2>
                        ${section.body.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("\n                        ")}
                    </div>
                    ${renderCards(section.cards)}
                </div>
            </section>`).join("\n\n            ")}

            <section class="section section-cream">
                <div class="container-wide">
                    <div class="section-copy">
                        <h2>What we checked.</h2>
                        <p>We prioritized official product pages, official help pages, and app-store-facing descriptions. We avoided copying vendor marketing language and wrote the conclusions around use cases families, coaches, club directors, and tournament operators actually face.</p>
                    </div>
                    <ul class="source-list">
                        ${sources.map((source) => `<li><a href="${esc(source.url)}" rel="noopener">${esc(source.label)}</a></li>`).join("\n                        ")}
                    </ul>
                </div>
            </section>

            <section class="section" id="faq">
                <div class="container-wide">
                    <div class="section-copy">
                        <h2>Common questions.</h2>
                    </div>
                    <div class="faq-grid">
                        ${page.faq.map(([question, answer]) => `<article class="faq-card">
                            <h3>${esc(question)}</h3>
                            <p>${esc(answer)}</p>
                        </article>`).join("\n                        ")}
                    </div>
                </div>
            </section>

            <section class="download-section">
                <div class="container-wide download-box">
                    <div>
                        <h2>Try the volleyball-first match-day app.</h2>
                        <p>Use CourtsideView for live scoring, player stats, rotations, big scoreboard mode, and FanView sharing built around the family volleyball weekend.</p>
                    </div>
                    <div class="store-badges" aria-label="Download CourtsideView">
                        <a href="https://apps.apple.com/us/app/courtsideview/id6766532771" aria-label="Download CourtsideView on the App Store">
                            <img class="app-store-badge" src="/assets/download-on-app-store.svg" alt="Download on the App Store" width="180" height="54">
                        </a>
                        <a href="https://play.google.com/store/apps/details?id=app.courtsideview.android&amp;pli=1" aria-label="Get CourtsideView on Google Play">
                            <img class="play-store-badge" src="/assets/get-it-on-google-play.svg" alt="Get it on Google Play" width="180" height="54">
                        </a>
                    </div>
                </div>
            </section>
        </main>

        ${renderFooter()}
    </div>
</body>
</html>
`;
}

for (const page of pages) {
  fs.writeFileSync(path.join(root, page.file), renderPage(page));
  console.log(`wrote ${page.file}`);
}
