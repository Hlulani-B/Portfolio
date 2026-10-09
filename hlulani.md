# Hlulani — Full Work Chronicle (Digital Logbook)

> Everything I did across the whole repository history, reconstructed from my **648 non-merge
> commits** (`git log --all --no-merges --author="Hlulani|hlulani|2715751|baloyi"`), matched
> against the docs-site (`docs-site/docs/…`) and `issues.md`. Personal-use detail: what I built,
> **how I tested it**, every UI decision (including the ones I flip-flopped on), and every fire
> I had to put out.
>
> My commit identities: `Hlulani-B <baloyihlulani15@gmail.com>`, `Hlulani-B <baloyihlulani91@gmail.com>`,
> `Hlulani baloyi <2715751@students.wits.ac.za>` — all the same me.
> **Date range:** 2026-08-07 → 2026-09-23 (~7 weeks, Sprints 1–3).
> **By type:** 281 `fix` · 134 `feat` · 129 un-prefixed · 44 `docs` · 20 `refactor` · 17 `style`
> · 7 `ci` · 6 `test` · 5 `chore` · 2 `perf` · 1 `revert` (+ 1 `debug`).

---

## Phase 1 — Aug 7–8 · Repo scaffolding, monorepo gymnastics, first deployments

**What I did.** Day one: `initial backend services setup`, README with setup instructions, then a
series of painful repo reorganisations — `clear main branch`, `Move files to root`,
`Organize frontend into frontend/ folder`, `Organize backend into project-service/ folder`.
I flip-flopped the layout three times (root → subfolders → flatten → re-organise) until the
monorepo structure stuck. Set up **Gitea Pages** deployment (`To set up Gitea pages`,
`Updated it in order to use gitea pages`) because GitHub Pages wasn't the primary host.

Aug 8: the real infra day —
- `ci: add Gitea Actions workflow for frontend and microservices` (first CI pipeline)
- `ci: add Render Blueprint configuration` → `render.yaml`
- Free-tier wrangling: `fix: update render.yaml services to free tier plan`,
  `fix: specify rootDir for each microservice in render.yaml`
- `refactor: rename project-service parent folder to services` — the current layout was born here
- First Express servers: `feat(services): add Express server setup and health routes to index.js`

**Troubles & fixes.** Render kept failing to boot the services: missing `start` script in each
microservice `package.json` (fixed 3× because I kept re-touching the files), then wrong entry
point path — `fix(services): update package.json entry point path to src/index.js` (also ×3).
Vite build served 404 assets on Render → `fix: update Vite base path to root for Render deployment`.

**How I tested.** Hit the live `/health` endpoints of each deployed microservice by hand
(curl + browser) after every Render config change; verified Gitea Actions ran the pipeline green.

**Docs cross-ref.** `docs-site/docs/Architecture/cicd-deployment.md`, `getting-started.md`.

---

## Phase 2 — Aug 13–14 · Database schema, four services come alive, archive support

**What I did.** Schema week. Built the Supabase tables bottom-up: `Added users and projects table`,
`Added fields and entries table`, `Added due date column on entries table`,
`schema: add priority enum to entries`. Two big schema decisions:
- **`users.email` as the PK** and `projects.user_id → user_email` FK (`docs: update schema
  users.email as PK…`) — I migrated identity from UUIDs to email so Google-auth sign-in maps
  directly to rows; synced every service to match.
- Documented *why* each table exists (`Added the reason to why i added the tables`).

Then the service layer: `fix: correct Supabase imports and add tests for project, entries,
priority; add profile-service`, `fix: cascade project delete/rename to fields table` (deleting a
project used to orphan its fields). On the frontend: `config: allow JS/JSX files alongside TS in
tsconfig` (so I could mix `.jsx` components into the TS app), `wip: route setup and field support`,
`feat: archive support end-to-end (backend, route, frontend, tests, schema)`,
`feat: complete profile-service with routes, tests, and frontend functions`, and
`Add dashboard-service search tests and frontend integration`.

Also added **oxlint architectural rules** (`Added architectural rules`, `Added more rules` in
`frontend/.oxlintrc.json`) so the linter enforces our structure.

**Troubles & fixes.** `fix: load dotenv before imports` — Supabase client was constructed before
env vars loaded, so services crashed with undefined keys; fixed by ordering the import and adding
a `SUPABASE_KEY` fallback. Schema drift between my local `setup.sql` and live Supabase →
`docs+fix: sync schema with Supabase, use is_archived for projects`.

**How I tested.** Jest suites per service for project/entries/priority/search paths, plus manual
route testing against a local Supabase. `docs: add AI transcript of session work` — I started
keeping AI session transcripts as evidence of how work was done (`docs/AI transcript/transcript.md`).

**Docs cross-ref.** `Architecture/database.md` (table rationale), `User_Stories/sprint-one.md`.

---

## Phase 3 — Aug 16–17 · The Great Theme Saga and onboarding flow (UI-decision central)

This is where most of my 17 `style` + a mountain of `feat(ui)`/`fix` commits went. Full
flip-flop history, in order:

1. **Started clean-corporate:** `feat(ui): switch to clean white professional theme`.
2. **Added toggle:** `feat: add dark/light theme toggle`.
3. **More colours:** `feat: add pink, blue, purple, green themes alongside light and dark`.
4. **Modern redesign:** `feat: modern UI redesign - Plus Jakarta Sans font, book icon logo,
   polished styling` — book icon became the brand.
5. **Avatars:** `feat: replace emoji avatars with React Icons (Feather icons) in AvatarPicker`
   (emojis looked unprofessional; React Icons = consistent rendering across OSes). Later
   `fix: sync all 30 avatars in Settings panel with Avatar page` when the two lists drifted.
6. **Pivot to vintage:** `feat: add video background to SignIn + font picker in Settings
   (Playfair, Lora, Crimson Text, EB Garamond)` → `feat: split-screen SignIn layout — video
   left panel, form right panel` → `feat: add brown vintage theme + corner style picker
   (rounded/soft/sharp)` → `feat: make Lora the default font across the entire app`.
7. **Full pastel-vintage overhaul:** `feat: replace all themes with softer pastel-vintage
   palettes (ivory, blush, powder blue, pale lilac, sage mist, soft tan)` then
   `feat: pair all themes with dark vintage button tones (espresso, navy ink, deep plum,
   forest, terracotta, walnut)` → `style: apply vintage notebook aesthetic to dashboard`.
8. **Dark theme argument:** `fix: resolve OAuth redirect loop + update dark theme to warm
   charcoal palette` → `fix: dark theme to pure black/white/grey, auto-create profile if
   missing` → `fix: dark theme buttons use black text on light backgrounds for visibility`
   → `fix: dark theme text contrast, button text color, larger entry cards`. I changed my mind
   on warm-charcoal vs monochrome twice; landed on pure black/white/grey because contrast wins
   over vibes. (Weeks later: `feat: add 6 new dark themes (Navy, Dark Plum, Coffee, True Black
   OLED, Dark Teal, Solarized)` and `feat: set timeline default to 150 days, add dark pink theme`.)
9. **Reverted the vintage dashboard:** by Sep 3, `feat: switch to clean white/black light theme
   as default` — the pastel-vintage era ended; the app today is the monochrome look.

**Other UI decisions that stuck:**
- **Favicon/logo:** `fix: replace SVG favicon with notebook.jpeg` and same for all auth pages —
  the SVG didn't render crisply at 16px.
- **Corner-style picker** (rounded/soft/sharp) — user choice for card radius.
- **Typography accessibility:** `feat: increase base font size for accessibility: 18px desktop,
  20px mobile` → immediately rolled back to `fix: reduce mobile font size: 17px instead of 20px`
  (20px broke layouts on small phones). Also `fix: ensure font applies to all elements including
  form controls on every page` — form controls don't inherit font-family by default.
- **Onboarding flow built:** `feat: add Theme Setup and Frequency Setup onboarding pages` with
  the final order **CreateProfile → Avatar → Tone → Theme → Frequency → Dashboard**, live theme
  preview in the picker, and a nudge-frequency preference (silent/gentle/daily/active).
- **Profile plumbing:** `feat: integrate profile service into settings, add AvatarPicker, fix
  SignIn useEffect`; `fix: convert CreateProfile to tsx, fix Avatar page, add routing for
  /create-profile and /avatar`; `fix: CreateProfile now inserts user row before updating
  name/username` (FK violation otherwise — the row didn't exist yet to update).

**Troubles & fixes.**
- **CSS collateral damage from the redesigns:** `fix: restore auth-container/auth-card/auth-logo
  CSS for onboarding pages` — the theme rewrite deleted classes the onboarding pages still used.
- **`verbatimModuleSyntax` build break:** `fix: split Theme type import for verbatimModuleSyntax
  compatibility` (type-only imports must use `import type`).
- **The CORS odyssey (Aug 16, 8 commits in one day)** — Express 5 broke the `cors` package:
  1. `fix: explicit CORS config on all 4 backend services (origin, methods, allowedHeaders + OPTIONS preflight)` — still failing.
  2. `fix: remove app.options('*', cors())` — **Express 5's path-to-regexp rejects bare `'*'`**.
  3. `fix: replace cors() package with manual CORS middleware` — went hand-rolled.
  4. `fix: remove unused cors imports` → then `fix: use cors() package with specific origin and
  credentials` — bounced back to the package with explicit origins.
  5. `fix: dynamic CORS origin checking + global error handler with CORS headers on all services`
  — errors were returning without CORS headers so the browser showed a CORS error hiding the real 500.
  6. `fix: add Express 5 safe preflight wildcard handler using regex /(.*)/ instead of '*'` — final answer.
- **Startup crashes:** `fix: remove throw in supabase.js that crashed services on startup - use
  null client + warnings instead` — a missing key should degrade, not kill the process.
- **Auth flow races:** `fix: correct navigation flow - checkUser response, remove PublicRoute
  race, fix AuthCallback routing`; then I inverted it twice: `fix: on checkUser error, default
  to dashboard instead of create-profile` → `fix: checkUser failure now navigates to
  create-profile instead of dashboard` (new users were landing on an empty dashboard).
- **Wrong URL:** `fix: correct profile-service URL in frontend (was pointing to non-existent domain)`.
- **Mobile SignIn:** `fix: fix sign-in page on mobile: reduce video height, compact form,
  scrollable right panel` — the split-screen video ate the whole viewport on phones.

**How I tested.** Manually, relentlessly: every theme × every page × dark-mode contrast checks;
navigated the full onboarding flow as a fresh user; signed in with real Google OAuth; DevTools
Network tab to read actual CORS preflight responses. `feat: add dev mode auth bypass for local
testing` (`b5a162c`) — an env-gated bypass so I could test UI without the OAuth round-trip.
Debugging aids I added then removed: `debug: show getProfile response in settings panel`,
`Add debug logging to AuthCallback for troubleshooting`, then
`Clean up debug code from AuthCallback and revert supabase.ts to production version`.

**Docs cross-ref.** `Architecture/ui-design.md` (with the UI screenshot walkthrough added in
`d6667e3`), `Project_Management/ai-attribution.md`.

---

## Phase 4 — Aug 17 · Dashboard re-architecture (drawer, sections, EntryBox)

**What I did.** Rebuilt the dashboard from feed-first to a sectioned workspace:
- `refactor: dashboard with entries feed, drawer, search, FAB` — the layout skeleton.
- `feat: add Archives section to drawer menu` + `feat: wire up archive functions across backend
  and frontend`.
- `refactor: split dashboard into Due Soon and Up Next sections` → `Due Soon top-left, Up Next
  top-right + full EntryBox styling` → later `feat: add view toggle, sort controls, remove Up
  Next section, fix due-soon to 3 days` (Up Next didn't earn its screen space; due-soon window
  standardised at 3 days).
- **EntryBox iterations** (classic me): `refactor: replace entry cards with newEntry-style
  blocks` → `Notion-style EntryBox: bold project title, colored priority/status tags, table
  fields` → `feat: themed section backgrounds, search-aware sections, remove entries feed` →
  `style: entry cards blend with color theme` → `refactor: entry cards as modern clean stream`
  → `revert: entry cards back to original entry-box layout` → `style: smaller compact entry
  cards that blend with theme`. The revert is the only one in my whole history — the "modern
  clean stream" was less readable, so I went back within hours.
- `Use provided functions: search, sort, archives + fix sections visibility` and
  `Replace custom new entry modal with user-provided AddEntry component` — switched to the
  components the teammate-provided layer exposed instead of my parallel implementations.
- `feat: wire dashboard.js and EntryBox into Dashboard`, `Add My Stats to drawer`.
- **Time tracking:** `full schema parity: add started_at, ended_at, duration across entire
  chain` (DB → service → route → frontend), `feat: add live time tracking to stats with
  in-progress duration calculation`, `refactor: extract stats into Stats.tsx component and
  stats.js function`.

**Troubles & fixes.** `fix: archive entry uses id instead of JSONB object` (was POSTing the
whole row where the route expected an id); `fix: entry update uses id, due soon/upnext NULL
fix`; `fix: skip null values for DB columns with DEFAULT constraints (duration, started_at,
ended_at)` — sending explicit `null` overrode column defaults; placeholder'd project creation
left dead code → two `remove unused variables/imports` commits to unbreak the build;
`fix: resolve all unused variable build errors` (My Stats).

**How I tested.** Manual flows (archive/unarchive, sort toggles, due-soon window) + the existing
service tests kept green through the schema-parity migration; `Add test-entries.js verification
script with curl and Supabase fallback` and `Add lazy entries script: 10 casual human-like test
entries via curl` — seeded realistic data (typos, casual phrasing) because pretty test data
hides parsing bugs.

---

## Phase 5 — Aug 18 · Natural-language Quick Add + the AI integration debugging marathon

**What I did.** The feature-defining day (~45 commits):
- `Add quick entry with natural language and separate nav pages` — type/say "math due friday
  high priority" and the AI files it.
- `Add Natural_language tests and fix entries.js imports`.
- `Fix AuthCallback to handle hash-based OAuth tokens (implicit flow)` — Supabase returns
  tokens in the URL **hash**, which server routes never see; had to parse `window.location.hash`.
- `fix: add robust error handling to all route handlers across all services (try/catch, safe
  instantiation, parameter validation, JSON error responses)` — after too many opaque 500s.
- Account deletion work: `Fix delete_user RPC: cascade delete entries, fields, projects before
  user deletion`, `Sign out user after successful account deletion`.
- `Wire up unused backend functions to frontend` — audit sweep so no route is dead code.
- Profile polish: avatar sync to navbar via Supabase metadata + profile-service fallback,
  `Profile-service avatar/username now take priority over Google profile data`,
  `Refresh profile data when settings close so avatar/username update in navbar`.
- `Fix CSS warnings: remove empty ruleset, add standard line-clamp property`,
  `Add tsconfig.json to silence casing warning on Windows` (Windows filesystem case-insensitivity
  vs tsc).
- Project settings: `feat: add project settings panel, three-dots menu, and overdue indicators`
  (×2 — one per platform branch), `Refactor ProjectSettingsPanel to use panel-sheet slide-in
  like SettingsPanel` (UI consistency with my own settings pattern), `Bigger three-dots button`.

**Troubles & fixes — the AI debugging saga (Aug 18–19), step by step:**
1. `Fix QuickEntryBar TypeScript types for Render build` — build broke on Render, not locally.
2. `Fix natural_language.js import path and use PROJECT_URL from api`.
3. `Make Supabase client fail gracefully with debug logging instead of crashing`.
4. `Add hlulani frontend URL to CORS allowed origins on all backend services` (×2) — the
   branch-deployed frontend URL wasn't whitelisted.
5. `Lazy-load AI SDK imports to prevent startup crash when packages not installed` (×2) →
   `Add AI SDK packages to project-service package.json` — Render's install didn't include them.
6. `Fix priority.js imports: AI named export and field.js filename` (×3) — the file was named
   `field.js` not `fields.js`, Windows didn't care, Linux/Render did.
7. `Restore Priority class that was replaced by Natural_language in priority.js` (×2) — I had
   clobbered the Priority class when editing; caught via failing priority tests.
8. `Fix natural_language.js: request() already returns parsed JSON, don't call .json() again` —
   classic double-parse `TypeError`.
9. `Fix natural language entry: proper error handling and AI key config`.
10. Prompt-engineering loop: `Fix natural language prompt: shorter, stricter JSON-only response
    with better cleaning` → `Update natural language prompt to clearly instruct AI on matched=0
    behavior and include action in comment` → `Add logging to natural language entry for
    debugging project creation`. The model kept wrapping JSON in prose; had to forbid it.
11. `Fix Dashboard.tsx: remove duplicated trailing code causing build failure` — a bad edit
    duplicated the file's tail.
12. `Fix supabase import in ai.js: use named import` → `Add comprehensive debug logging to
    ai.js` → `Fix supabase import path in ai.js: ../supabase.js not ./supabase.js` — one import
    path, three commits to fully fix because the first two fixes were wrong about the cause.

**How I tested.** `test-entries.js` (curl with service-role key, Supabase fallback) hit real
routes end-to-end; NL parsing had dedicated Jest tests per matched-code path; every AI change
verified by typing realistic casual sentences into the running app and reading the added entries;
debug logs added surgically, cleaned after (`1214b9e`).

**Docs cross-ref.** `Architecture/api-contracts.md`, `Project_Management/issues.md`.

---

## Phase 6 — Aug 19–24 · Voice, streaks, AI personality, soft deletes, docs-site build-out

**What I did.**
- **Voice:** `feat: add voice recording feature with transcript and quick-add integration` →
  `feat: browser-based voice transcription (Web Speech API) + streak tracking` (chose the Web
  Speech API over server-side transcription: zero cost, zero latency, no extra keys).
  `docs: add voice recording feature documentation` → `Architecture/voice-feature.md`.
  Simplified later: `fix: simplify voice feature (record→transcript→addNaturalLanguageEntry,
  same as quick add)` — voice became literally an alternate input to the NL pipeline, one code path.
- **Streaks:** `feat: standalone StreakView page at /streaks`; `chore: remove Recent and Drafts
  pages` (dead ideas pruned).
- **AI personality layer:** `feat: AI-generated messages throughout dashboard and voice feature`,
  `feat: AI activity summary above activity feed`, `feat: add tone preference system —
  onboarding page, settings, and AI prompt integration` (user picks how the AI talks to them),
  `feat(ui): longer AI messages with roasts + 15s toasts everywhere` →
  `fix(voice): shorten AI greeting and error prompts to 1 sentence — keep confirmation long` →
  `fix(ui): extend toast duration from 15s to 30s` — three rounds of finding the balance between
  "fun" and "in the way".
- **StatsReflection:** `feat: add StatsReflection component for AI-powered dashboard insights`;
  placement moved twice (`remove loading states from AI components, move StatsReflection below
  QuickStats` → `move AI reflection from dashboard top into Quick Stats panel`) — final home is
  inside Quick Stats; and `fix: add fallback reflection in Stats when AI fails` (AI outage must
  never blank a panel).
- **Soft deletes** (the big integrity change, Aug 22): `feat: implement soft deletes across all
  services (deleted column filter)`, `feat: add soft-delete migration (005) and update
  setup.sql schema`, `update delete_user/restore_user RPCs to soft-delete all data`,
  `checkUser returns deleted status + auto-restore on sign-in during grace period` —
  `{ exists, deleted }` return shape, SignIn/AuthCallback auto-call `restoreAccount()`;
  `feat(backend): add deleteEntryById… soft-deleting entries by ID` +
  `feat(frontend): add Delete Entry option to entry card three-dots menu with soft-delete`;
  re-introduced archives properly: `feat(frontend): wire up archive functions and add archived
  entries view` (after `Remove archive feature from frontend, leave placeholders` earlier —
  archives were cut for sprint scope, then restored when the backend was ready).
- **Activity log:** `Restructure ActivityFeed to show details object as structured key-value
  cards` with human-readable labels (`ba7c94a`).
- **NL date intelligence:** `feat(project-service): server-side date extraction with fuzzy
  matching`, `fix(backend): block day/date/when as custom fields, force into due_date with
  conversion rules`, later `feat: add 'X days from now' and 'X days from [day]' date parsing`.
- **ProjectDetailPage (Aug 24):** `feat: dedicated project detail page, FAB label, matched:2
  project creation` — project-scoped search, quick-add auto-assigns to the current project,
  routing `/project/:projectName`; FAB restyled from circle to pill with 'New' label (circle
  FABs are ambiguous — the label ended user confusion instantly).
- **matched:3 multi-project Quick Add:** one input → entries across many projects, AI splits
  into `old`/`new`, backend creates missing projects + fields first. Commit message itself
  records: *"Added 6 new test cases covering: old-only, new-only, mixed, non-existent project
  skip, all-fail, and empty arrays — All 135 project-service tests and 22 dashboard-service
  tests passing."*
- **Docs-site, my second product:** `Add architecture documentation and sprint 1 roadmap`,
  `Fill in tech-stack.md with comprehensive documentation and reasoning`,
  `Add UI screenshot walkthrough`, `ci: add GitHub Actions workflow to auto-deploy docs to
  GitHub Pages`, `Add AI attribution policy to docs site`,
  `docs: add methodology & git workflow page covering Scrum process, branching strategy,
  commit convention, and evidence map`, `Enhance docs site design - better colors, fonts, dark
  mode, custom CSS` → `Make docs site feminine pretty - pink/rose theme, Poppins font, soft
  gradients` (yes, really), `Fix search bar visibility - darker icon and text`,
  `feat: add docs-site to Render deployment manifest` + `pre-build MkDocs site for Render
  deployment` (Render's Python build was flaky; committing the built `site/` was the pragmatic
  fix), `docs: update team — Hlulani Baloyi as Fullstack`,
  `docs: add Stakeholder Interaction page with Sprint 1 client meeting proof`.
- **Coverage badges:** `Add test workflow with coverage badges + install coverage-badges-cli` →
  `feat: add test coverage workflow with badges` → `fix: resolve all test failures across
  services (105/105 passing)` → `test: add coverage tests for activityLog, archives, priority,
  entries; scope coverage to functions/ only` → `test(dashboard-service): rewrite search tests,
  achieve 100% coverage` → badge rendering fixes (`use absolute raw URLs` → `use shields.io`).

**Troubles & fixes.**
- **PL/pgSQL ambiguity bit twice:** `fix: rename PL/pgSQL variable to v_email to resolve
  ambiguous column reference in delete_user/restore_user RPCs` and
  `fix: qualify column names in profile deletion to avoid ambiguity`.
- **UTF-16 LE file crashed Node:** `project-service supabase.js: convert from UTF-16 LE to
  UTF-8 (was crashing Node.js)` — a Windows editor silently saved UTF-16; worked locally,
  killed Render. (This file also has a ΓÇö-style encoding artifact from that era.)
- **NULL `deleted` columns** (rows predating migration 005):
  `fix: handle NULL deleted column — use .or('deleted.eq.false,deleted.is.null')` across all
  services.
- **Login route double-wrap:** `login route: return result directly instead of wrapping in
  { exists: result }`.
- **Test-mock fidelity, the deep lesson (aa60b76):** `supabaseMock.js` **rejected** like a real
  error but real Supabase **resolves with null data** on missing rows — every test failure that
  day traced to mocks lying about behaviour. Fixed mocks (resolve, not reject), priority
  messages, `archives` field name, entries `data` prop, NL mock chainability, dashboard
  double-`.eq()` chain mock; then fixed profile-service's mock *proactively* before it bit me.
- **Temporal dead zone:** `fix: move parsedEntries before useState to resolve temporal dead
  zone error`.
- **Entry-card overflow war (Aug 24, 6 commits):** cards stretched by long content →
  `overflow:hidden on card, table-layout:fixed` → `card title truncation — project name on own
  line, no ellipsis, grid matches widest card` → `three-dot menu on its own line at top-right
  of card` → `anchor entry card dropdown to three-dot button with position:relative`.
- **AI voice-prompt spam:** `fix: parse all AI JSON keys (instruction, message, response,
  text, etc.)` — models return arbitrary wrapper keys; parser had to accept all of them.
- **Build-error whack-a-mole:** `fix: remove unused variables to fix Render build` appears
  multiple times — Render fails builds on TS6133 where local dev doesn't even warn.

**How I tested.** 105→135+ service tests passing with documented counts *in commit messages*;
coverage scoped to `functions/` (testing logic, not glue); screenshots of every UI state in
`ui-design.md`; the client meeting proof (`sprint1clientmeetingproof.jpg`) went into the docs
as stakeholder evidence.

**Docs cross-ref.** `Testing/testing.md`, `Project_Management/decisions.md`,
`Stakeholder_Interactions/sprint-one.md`, `Architecture/teck-stack.md` (yes, the filename has
that typo to this day).

---

## Phase 7 — Sep 2–3 · Caching v1, SSE, keep-alive daemons, AI summaries

**What I did.**
- `feat: add IndexedDB caching layer with stale-while-revalidate pattern` — caching attempt #1.
- `feat: add SSE real-time entry updates for natural language flow` — after NL quick-add, the
  server pushes `entry_parsed` so the dashboard updates without refetch.
  (`Architecture/sse.md`)
- `feat: add Supabase keep-alive daemon to prevent free-tier inactivity pauses` →
  `feat: add GitHub Actions keep-alive workflow for Render free tier` →
  `feat: unify keep-alive — health-ping endpoint wakes Render AND pings Supabase` — one cron
  workflow pings everything (`keep-alive.yml`); later `ci: rewrite keep-alive with retry logic,
  push trigger, and secret validation`.
- `test: add integration tests + GitHub Actions for visible test results` — integration suites
  under `src/__integration__` surfaced in CI, not just locally.
- `docs: add caching to issues, add cache clearing on sign-out` — logout must wipe local cache
  (privacy bug I caught myself).
- **AI entry summaries:** `feat: add AI-generated entry summaries` + backfill scripts —
  `fix: strip JSON wrapping from AI summaries, backfill 32 entries` →
  `fix: force JSON summary parsing, regenerate all 33 entries cleanly` (the AI wrapped output
  in `{"summary": …}` prose; second fix forced the response format AND I regenerated all 33
  rows rather than half-patching), `feat: regenerate AI summary when entry is updated`.
- **AI-off switch respected everywhere:** `feat: add AI messages disable toggle to settings and
  onboarding` → `fix: guard ALL AI calls with getAiMessagesEnabled toggle` (first guard pass
  missed call sites).
- **ProjectTaskTable era (Sep 3, ~35 commits):** new template with preview and dummy data, then
  a long styling series: `simplify to plain table layout` → `darker headers, fixed columns,
  single-line rows` → `bold colored status and priority pills` → `vintage earth-tone pills with
  borders` → `bolder vintage pills — thicker borders, deeper colors, heavier weight` — five pill
  redesigns in one afternoon. Then `feat: inline editable table — dropdowns for status/priority,
  click-to-edit for all cells, Supabase persistence`, and the hard part: real data —
  `remove all dummy data, use real Supabase data`, `derive entry columns from entries jsonb
  keys, not fields table`, `use project status/priority enums, friendly labels (In Motion,
  Done & Dusted)`. `feat: replace ProjectsPage with ProjectTaskTable`,
  `feat: add table/cards view toggle on project detail page, table is default`,
  `feat: responsive mobile card layout below 600px, cards default on phone`.
- `feat: add row selection checkboxes and bulk delete`, `feat: add checklist view with
  clickable edit/delete and checkbox completion`, `feat: add board view grouped by due date`,
  `feat: persist view mode (table/cards and entry/summary) in localStorage`.
- **Caching v2:** `feat: IndexedDB-first caching with event subscriptions - eliminates loading
  states`, `feat: IndexedDB-first loading for entries - eliminates loading spinner`,
  `refactor: remove direct Supabase calls from Project.tsx, use API functions`.
- Light theme reset: `feat: switch to clean white/black light theme as default` +
  `style: add bold black border to entry cards for light theme` → `style: reduce entry card
  border from bold to normal` (bold borders were shouting).

**Troubles & fixes.**
- **issues.md #1–#8 all born this week:** entry updates not persisting (#1), spinner instead
  of cached data (#2), IndexedDB keyPath mismatch (#3), direct Supabase calls → 403s (#4),
  editing handler broken (#5), white pills (#6), theme flip (#7), and **#8 the priority-value
  mismatch**: the DB stored friendly labels ('Urgent and important') but the dropdown sent raw
  enum indices ('0'–'3'), so text edits silently failed to save —
  `fix: normalize priority values so text edits persist`.
- **Race condition class:** `fix: eliminate race condition - use server response instead of
  re-fetching after mutations` — the refetch-after-write pattern lost to any concurrent SSE
  event; use the POST response body directly.
- `fix: updateEntry now rolls back on server failure and re-reads cache instead of using stale
  reference`; `fix: deleteEntryById now clears per-project IndexedDB cache so deletions persist
  after refresh`; `fix: handleSetPriority now updates IndexedDB so changes persist across
  reloads`; `fix: map priority from raw value to friendly label before sending to database`.
- **Cold-start storm:** hardcoded-email data fetch hack (`a5e3be1`… followed by proper
  authenticated email usage `bcdc73b`), CORS additions for localhost:3001 and the render.com
  domain in the whitelist.
- `fix: type fetch mock in api.test.ts to resolve TS2339 errors` — untyped `vi.fn()` mocks
  made `.mock.calls` accesses fail typecheck.
- `fix: remove archive feature from frontend` → TS cleanup → rewire properly: archives had a
  remove/restore arc across the sprint (scope management, not a bug).

**How I tested.** Integration tests in CI with visible results; all-in-one summary test script
(`6c2eced`); manual offline toggle in DevTools to verify spinner-free loads; badge numbers
actually verified against `coverage-summary.json` (`chore: update coverage badges with real test
results` — I'd published aspirational percentages before and fixed that).

**Docs cross-ref.** `Architecture/caching.md`, `Architecture/sse.md`,
`Architecture/entry-summaries.md`, root `issues.md` #1–#8, `docs-site` `Project_Management/log.md`.

---

## Phase 8 — Sep 4–5 · Local-first architecture (the big redesign) + AppShell unification

**What I did.**
- Sep 4 was cleanup + calendar: `fix: prevent loading spinner on cached data`,
  `refactor: separate dashboard and entries, add calendar to dashboard, cache calendar`,
  `fix: calendar overflow + mobile layout, board wraps columns`,
  `style: checklist view uses grid layout to fill space`. Then the important honesty commit:
  `fix: restore full dashboard - calendar is a addition, not replacement` — my refactor had
  *replaced* the dashboard with the calendar; users lost their sections; I restored everything
  with the calendar as an addition.
- **AppShell/unification:** `feat: add AppShell component, unify navbar/drawer across all
  pages`, `ui: standardize navigation bar across all pages`,
  `refactor: extract NavBar and Header components from Dashboard`,
  `refactor: migrate all remaining pages from AppShell to NavBar+Header` (AppShell lived one
  day — I preferred composition over a shell wrapper),
  `feat: add NavBar + Header to Timeline page` / `Import & Export page`.
- **The local-first switch (90f41a9)** — the architectural centrepiece of the project:
  - Created `CacheFunctions/syncService.js` — one central module that fetches ALL data from the
    server and populates the cache (projects, entries, profile, archives, due-soon).
  - `DataSyncInitializer` in `App.tsx` triggers `syncAllData` on login.
  - All pages (Dashboard, AllEntries, Today, StatsView, StreakView, Calendar, Project) read
    **only** from the cache via `cacheGet`.
  - `dueSoon()` computed from cached entries (zero server calls); `setPriority()` got optimistic
    cache writes + rollback.
  - Rule: **all mutations write the cache first (instant UI) → sync to server after.**
  - Documented immediately in `caching.md` + `docs: add 'Why the Previous Approach Failed'
    section to caching docs` — I wrote down *why* stale-while-revalidate-per-page was worse.
  - Follow-up correction (`a4ee705`): removed ALL background `syncAllData` calls from page
    loadData — post-optimistic-write refetches overwrote fresh rows with stale server data.
    Initial login sync + mutation-driven sync became the sole refresh path.
- `feat: implement local-first pattern with background refresh` for activity;
  `feat: load profile from IndexedDB in Header and NavBar` (instant avatar/username).
- **Preferences persistence:** `feat: persist view mode and sort preferences in localStorage`,
  `feat: persist Dashboard view preferences in localStorage`.
- **Dashboard naming saga:** `ui: change dashboard title to 'Due in 3 days' to reflect
  due-soon filter` → `fix: replace 'Due in 3 days' with 'Home' in Dashboard title` →
  `fix: Home in navbar navigates to Dashboard, not All Entries` — ended as "Home".
- `feat: add IndexedDB cache-first loading to all pages`.
- `fix: remove table view from manage projects page` — the table there duplicated the project
  detail pages.

**Troubles & fixes.**
- `fix: projects not showing in navbar due to IndexedDB data format mismatch` — syncService
  wrote `{data: […]}` where NavBar read a bare array.
- `fix: Header and NavBar now read correct profile field names` — same class of bug (cached
  shape vs component expectations).
- `fix: defensive Array.isArray guards in NavBar and Stats` — normalising the lesson from
  above: never trust cache shape at read time.
- Drawer scroll, four commits to kill one bug: `fix: navbar drawer is now scrollable` →
  `fix: whole navbar drawer is scrollable, settings opens from any page` →
  `fix: navbar drawer is now fully scrollable` → `fix: whole navbar drawer scrolls, not just
  projects section` — only the inner projects list had `overflow:auto`; the outer drawer still
  clipped on short screens.
- `fix: navbar highlights correct page based on pathname` — active-tab state was static.
- `fix: board view uses correct theme variables for dark mode`;
  `fix: loading spinner uses light track border so it is visible in all themes` — a spinner
  coloured `#eee` on white-on-white.
- `fix: resolve TypeScript build errors in AllEntries and Dashboard` + unused-import sweeps
  (`remove unused parseDueDate import`, `remove unused openSettings and settingsTab`,
  `remove unused WEEKDAY_ORDER constant`, `remove unused title prop from AppShell`) — Render
  TS6133 again, twice in a row on the same migration.
- `fix: checklist edit saves summary as-is to database` — the edit handler was re-wrapping the
  summary in JSON.

**How I tested.** DevTools → Application → IndexedDB, inspecting stored shapes row-by-row to
catch the format mismatches; hard-refresh and return-offline drills to verify pages render from
cache only; every page clicked through for navbar/drawer consistency; multi-theme checks on
every new component (spinner/board-view colour bugs); `npx tsc --noEmit` before every push.

**Docs cross-ref.** `Architecture/caching.md` (incl. "Why the Previous Approach Failed" and
"Why Pages No Longer Call syncAllData in the Background"), `Architecture/overview.md`,
`Architecture/ui-design.md`.

---

## Phase 9 — Sep 7–11 · sql.js migration, offline queue, notes system, tester feedback

**What I did.**
- **Sep 7 testing/CI day:** `test: add comprehensive tests for components, pages, and
  templates`, `test: add integration tests + separate CI job, fix TS/CSS lint errors`,
  `fix: exclude integration tests from production build and fix TS null safety`,
  `ci: split tests into 4 separate workflows for Gitea and GitHub` +
  `ci: restore ci.yml pipeline alongside separate test workflows` — unit/integration ×
  frontend/backend as separate workflow files so failures are attributable at a glance.
  `docs: rewrite testing page with rubric-aligned structure`,
  `docs: add IndexedDB schema documentation to database.md`,
  `docs: add Third-Party Dependencies page` (+expanded to every package),
  `docs: add architecture motivation, deployment info, missing tables to database.md`.
- **Sep 8:** `feat: add offline sync queue with toast notifications` — mutations made while
  offline queue up and replay with a toast on sync.
  `feat: add 6 new dark themes (Navy, Dark Plum, Coffee, True Black OLED, Dark Teal,
  Solarized)`, `feat: archive/unarchive project now also archives/unarchives all entries`,
  `fix: donut center text overflow on Stats page`,
  `feat: add 'X days from now' and 'X days from [day]' date parsing + stricter project
  matching prompt`, `fix: make QuickAdd AI prompt much stricter on project matching`.
- **Sep 9 tester-feedback day** (external users touched it):
  `Fix tester feedback: inline delete, sync bug, data disclaimer` — delete moved inline into
  the row (was buried), a sync bug died, and the **data disclaimer** appeared
  (`Lighter darkpink theme, disclaimer drawer button, DataDisclaimer2 page`,
  `Offline settings, lighter darkpink navbar, DataDisclaimer2 layout, syncService rewrite`,
  `Offline UX: disable quick entry bars and FAB, add global offline banner, fix disclaimer
  routing`); `Fix first-login data loading + add user feedback doc` (USER_FEEDBACK.md born);
  `Fix loading and empty state rendering simultaneously in ProjectDetailPage` (empty state
  flashed while loading — both conditions must check loading first);
  `Fix: allow FAB +New button to work offline - entries/projects write to IndexedDB first`
  (reversed the earlier offline-disable for creation specifically: local writes are safe).
- **Per-project colours:** `feat: per-project colours with database storage for cross-device
  consistency` (colours live in DB, not localStorage, so devices agree),
  `feat: add subtle project colour accent to every entry across all views`, then the refinement
  `feat: paint entry cards with subtle project colour tint instead of just accent line` —
  9% opacity overlay via CSS `--tint` + linear-gradient, hover states preserved, 'No colour'
  option added to the picker, `currentColor` threaded through panels.
- **Notes system (the biggest feature of the week, Sep 9–11):** `feat: add notes table for
  per-entry personalisation` → `feat: add file compressor and Supabase storage upload for
  notes` → `feat: notes CRUD with compress-then-store for files and soft-delete` →
  `feat: addEntry supports optional notes array, delete cascades to notes` →
  `feat: frontend notes functions + backend notes route + cache store` →
  `feat: notes UI - add notes to entry creation, slide-over panel for viewing/managing notes`.
  UI integration everywhere: `NotesPage shows as overlay with previous page in background`,
  View Notes/Add Note buttons on checklist context menu, EntryBox cards, table bulk bar
  (1-row selection), then `style: refine View Notes buttons - remove emojis, elegant monochrome
  styling`, then `refactor: use context-based notes overlay instead of routing` (NotesContext —
  keeps the page behind visible, back-button behaviour stops fighting the overlay).
  Later: `feat(notes): add download button for image notes`,
  `ui(notes): move download button to footer next to delete, remove red color`,
  `fix: proper-case Notes title and change + button to '+ Add Note' pill style`.
- **Sep 10 — sql.js migration (caching v3):** `feat: replace IndexedDB with sql.js (SQLite
  in WebAssembly)` — rewrote `cache.js` so tables mirror the Supabase schema (projects,
  entries, all_entries, profile, search, archives, fields, notes, cache_meta, offline_queue),
  **same API** (`cacheGet/cacheSet/cacheSubscribe`) so zero logic changes elsewhere; the whole
  DB persists to IndexedDB as a binary blob. Why: I kept re-implementing joins/filters that
  SQL gives free, and the format-mismatch bugs of Phase 8 were object-store shape bugs SQL
  can't have. `Works 100% offline after initial WASM load`.
- `feat: redirect to project page after creation` — creating an entry/project lands you where
  the thing lives (tester-driven; documented in testing docs as the fix for "disconnected views").
- **Due-soon midnight bug:** `fix: due-soon filter excluded entries due today (midnight < now
  timestamp)` — comparing a midnight date against `new Date()` dropped today's items.

**Troubles & fixes — the IndexedDB hang (Sep 9, 8-commit debug sequence, worst bug of the project):**
1. Symptom: app froze loading; `debug: add console.log to all loading paths`,
   `debug: add console.log to IndexedDB cache and frontend functions`.
2. Suspected parallelism: `debug: replace Promise.allSettled with individual promise wrappers
   to find hanging promise` → `fix: replace Promise.all with sequential awaits to prevent hanging`
   (worked around it, didn't fix it).
3. Narrowed to writes: `debug: add granular logging to cacheSet to find hang point` →
   `debug: add logging to getDB to find IndexedDB hang` — **`getDB`'s `open()` never resolved**.
4. Root cause: a DB version bump left the browser stuck; the open request pended forever.
5. `fix: add 5s timeout to IndexedDB open with retry` — never let an IDB open hang the app again.
6. `fix: revert DB to v4 to match main branch — resolves IndexedDB hang` → **failed** →
   `fix: bump IndexedDB to v6 — v4 was stuck because browser already upgraded to v5`.
   **Lesson: IndexedDB versions only move forward; you cannot downgrade a user's browser.**
7. Weeks later this class still bit: `fix(dashboard): guard loadData with a sequence ref so
   stale calls never clobber fresh state` + `apply seq-ref race guard to every page's loadData`.
- **WASM 404:** `fix: bundle sql.js WASM locally — CDN URL was 404` — copy
  `sql-wasm.wasm` into `public/`; never depend on a CDN for the thing your offline mode is made of.
- **Empty responses clobbering cache:** `fix: prevent empty server responses from clobbering
  cached data` — a cold Supabase/timeout can return `[]`; writing that over good cache wipes
  the user's UI. Guard: only overwrite when the response is non-empty unless verified delete.
- **Image notes pipeline (Sep 11):** `Fix image notes not loading: prioritize viewNote base64
  over direct URL` → `Add debug console.logs across full image note pipeline` →
  `Fix image upload: compress images client-side before sending to server` →
  `Increase Express JSON body limit to 5mb for image note uploads` →
  `Show loading spinner while image note is uploading`. Earlier I'd flipped the display
  strategy the other way (`display image/PDF notes directly from Supabase Storage URL`);
  final answer: base64 first, URL as fallback. PDF notes later removed
  (`Remove PDF note type from NotesPage and AddEntry` — scope cut).
  `Change default Storage bucket name to Hlulani`.
- **Offline banner UX:** `Fix: OfflineBanner pointer-events none so it doesnt block clicks on
  FAB` → `Fix: offline banner no longer overlaps header - uses static positioning… pushes
  content down instead of overlaying` → later `fix(offline-banner): make banner visible by
  setting position relative so z-index applies`.
- **Back-online toast spam:** `Fix Back online toast appearing on every page refresh` — the
  connectivity listener fires "online" on mount; only toast on actual transitions.
- **Server slowness:** `perf: parallelize syncAllData to eliminate sequential cold-start waits`,
  `perf: fix server slowness — timeout, cache-first notes, fire-and-forget summary` — the AI
  summary no longer blocks the entry POST response.
- **Offline full-local push (Sep 12):** `fix(functions): make all data functions cache-first
  for offline support`, `fix(api): disable HTTP caching to ensure SQLite is sole data source`
  → then `fix(api): remove Cache-Control request header that broke all CORS syncs` — setting
  `Cache-Control` as a *request* header tripped preflight on every service.
  `fix: make archives work offline with cache-first reads`,
  `fix(fields): make project columns work offline via SQLite cache-first reads and optimistic
  writes`, `fix: make offline archive/unarchive reflect immediately in UI`,
  `fix(archive): instant online archive + instant note display + offline image guard`,
  `fix(profile): load avatar and username from IndexedDB cache (instant UI)`,
  `fix(header,navbar): subscribe to PROFILE cache so avatar/username appear without refresh`,
  `fix(navbar): subscribe to PROJECTS and ALL_ENTRIES cache changes`,
  `fix(frontend): subscribe every data page to cache changes so post-login warm-up reaches
  mounted UI`.
- **NL/AI prompt war (Sep 7 & 11):** `fix: add strict task-splitting rules to matched:3 AI
  prompt to prevent merging distinct activities into one project`, `fix: AI prompt — require
  reasoning, forbid guessing, enforce splitting`, `strict paraphrasing instead of raw word
  extraction`, `no first-person pronouns (I, my, we, our) in field values`, `meaningful field
  names, never use generic 'field'`, `AI comment — talk TO user not ABOUT them, no 'The user
  wants to' meta-commentary`, `Remove AI from quick-add placeholders and enforce strict
  project-only rule in NL prompt`; parse-side: `parseAIResponse now handles arrays and nested
  objects`, `returns empty string for empty JSON objects instead of raw '{}'`,
  `escape stray backticks in NL prompt that broke Node startup` (a template-literal backtick
  in prompt text killed the whole service), `fix(ai): expand fallback model chains for every
  provider` + `tighten Cerebras and HuggingFace model lists to live catalogs` (models get
  retired; dead names = every fallback fails), `replace 'All AI providers failed' with
  user-friendly message`.
- **Terminology wars (user-facing copy):** `refactor: rename user-facing 'field(s)' terminology
  to 'column(s)'`; `Replace all user-visible 'Entry/Entries' with 'Task/Tasks' across the UI`
  (14 files listed in the commit) → four days later `refactor(ui): replace user-facing
  'task/tasks' with 'item/items' everywhere` + `docs(terminology): document task→item rename
  (US16, decision, follow-up note, features)` — the decision and its reversal are both written
  up in `Project_Management/decisions.md`. Also `fix: show AI-generated summary instead of
  'Untitled entry' across all views`, `Fix typo: 'task.s' -> 'tasks' in NL prompt STEP 4`,
  `refactor(ui): remove Start Task button from entry cards`,
  `refactor: move 'My Stats' and 'Activity Log' to the bottom of the drawer nav`,
  `feat: colour-code status badges (blue/amber/green) on entry-box selects and kanban headers`.
- **Merge collateral:** `Fix merge build errors: withoutUndefined closing and duplicate
  ProjectSettingsPanel`, `Fix TS build errors: widen EntryData.entries type and cast addEntry
  response in DataPortability`, `Fix TS2719: widen NotesPage EntryData.entries to match
  NotesContext EntryData` (two files declared the same shape; one import now),
  `fix: resolve TS build errors - remove unused navigate, fix null type, type-only ReactNode
  import`, `fix: resolve TS2322 projectColor type mismatch (null -> undefined)`.
- **Recently-viewed/created plumbing:** `Add Recently Viewed and Recently Created sections to
  Dashboard (last 3 items)`; follow-up chain: `Fix recently created tracking: return entry_id
  from backend NL handler, return optimisticEntry from addEntry, fix QuickEntryBar extraction,
  relax tracking conditions` → `surface every NL creation in Dashboard "Recently created"` →
  `drop archived/deleted projects & tasks from Recently viewed/created` →
  `recently created now shows immediately after project/task creation` →
  `Track project page visits in recently viewed; limit to last 3 items`.
- **AI-messages toggle, three attempts to make it truly live:** `fix(ai): make AI-messages
  toggle apply instantly` → Sep 22 `fix(ai-messages): make AI messages toggle genuinely live
  across all surfaces` — the toggle needed to be *subscribed*, not just read at mount.
- **Sep 13 oddity:** `untracked files on hlulani…` / `index on hlulani…` — my `git stash`
  entries leaked into history during a dirty-tree panic; harmless, left as a scar.

**How I tested.** The 4-way CI split made unit+integration visible per domain; tester feedback
from real users drove the Sep 9 batch (documented in `USER_FEEDBACK.md` + quick-survey tables in
`Testing/testing.md`: `break down quick-survey feedback and how each problem was solved`,
`add quick-survey feature requests table`, `add sprint 2 user-feedback evidence (Google Form +
screenshots + xlsx)`, `note that the survey was anonymous so a targeted re-survey is not
possible`); offline drills = DevTools offline → create/edit/archive/notes → back online →
watch the queue drain with toasts; the hang hunt used the incremental-logging technique above.

**Docs cross-ref.** `Architecture/caching.md`, `Architecture/database.md` (IndexedDB schema),
`Architecture/sse.md`, `Testing/testing.md`, `Project_Management/issues.md`,
`Stakeholder_Interactions/sprint-two.md`, `User_Stories/sprint-two.md`, `docs/features.md`.

---

## Phase 10 — Sep 13–14 · Dashboard view-polish run

A tight streak of small UI decisions, all on the dashboard:
- `fix(dashboard): make Projects view transient so it only shows when clicked` →
  `feat: make Projects button a toggle (click again to hide)` →
  `feat: move Projects view into a slide-over drawer` — three iterations to the right model:
  Projects isn't a "view mode" competing with Cards/Checklist/Board, it's an overlay.
- `feat: restyle Archives view and remove Sort control from display` (sorting archived items
  is meaningless), `feat: move View toggle under Due soon label, hide when nothing due`,
  `style: right-align Due soon view toggle on the label row` — the toolbar stopped being a
  permanent fixture and became contextual.
- `fix(dashboard): board & checklist views stack vertically instead of grid`.
- `ui(dashboard): add View: label between Projects and Cards/Checklist/Board` →
  `fix: make View: plain text and add real gap after Projects` →
  `fix: center View group with big gap, no box around View: label` (label styling took three
  tries because each screenshot I looked at disagreed with the last).
- `fix(offline): make optimistic entries and notes always display, and survive reconnect` —
  optimistic rows were being filtered out by status checks before they had a server status.
- `fix(ai): make AI-messages toggle apply instantly; add frontend coverage badge` +
  `docs(readme): clarify frontend coverage badge scope (src/lib logic layer)` — honest badges:
  the number only covers `src/lib`, and the README says so.
- `fix(docs): drop --strict from docs-site build command` (MkDocs strict mode failed the
  pipeline on unrelated warnings).
- `ui: improve checklist grid layout` / `fix board view grid layout in AllEntries page`,
  `feat: show project name on top of each checklist card`,
  `feat: sort board view and checklist by due date`,
  `fix: make drawer project icons consistent — always colored dot using hash fallback instead
  of folder icon`, `Add tooltips to UI elements and hide New Task when no projects exist;
  show hint message instead`, `Add project-name hover tooltip + click-through in NewEntry`.

Testing here was purely visual: run dev server, resize to mobile/tablet/desktop, every theme,
light+dark, offline+online for each view combination.

---

## Phase 11 — Sep 22–23 · Final fixes + the big merge (issues.md #9 & #10)

- **issues.md #9:** `fix(sse/cache): stop entries vanishing on entry_parsed + dashboard
  recent-created` — SSE `entry_parsed` fan-out raced the cache write queue and rows
  disappeared until refresh; fixed by serialising cache writes and making the SSE handler
  upsert rather than replace.
- **issues.md #10 (the hlulani→main PR #274 disaster):** two branches had written **two
  disjoint architectures for `entries.js`'s offline-cache write layer** —
  - `main`: `mutateEntry` / `syncEntryMutation` / `changeEntryCaches` / `rollbackEntryMutation`
    + US54 no-past-date validation + timer UX (functional superset).
  - `hlulani`: `buildAddEntryPayload` / `reconcileOptimisticEntry` / `_syncAddEntryToServer` +
    creation-time notes caching.
  - Auto-merge produced a **duplicate `addEntrySync` definition** (compile break); Gitea's
    merge API returned 405 because the PR genuinely wasn't mergeable.
  - Resolution: `git checkout origin/main -- entries.js` (adopt main's architecture) then
    **port hlulani's only unique feature** — persist notes under the optimistic id in
    `mutateEntry`'s add path, and move them to the real server id in `syncEntryMutation` on
    success. Verified hlulani's `CacheFunctions` dispatch by action name (independent of
    `_local`/`optimistic_id`), so the swap was self-consistent.
  - `actionDispatcher.js` had a comment-only conflict — kept HEAD's fuller explanation of why
    replay uses the server-only `addEntrySync` variants.
  - **How I tested:** `git merge-tree` locally *before* trusting the API; `tsc --noEmit` clean
    (90s+ in this env); merge-commit parents verified with `git rev-list --parents`.
    Honest caveat: **typecheck-only** — the offline add-with-notes flow wasn't runtime-exercised.
  - Merged hlulani ← main (`5baae30`), pushed, PR #274 merged (`5cd9bad`), then documented the
    whole thing as issues.md entry #10 (`7211b05`) and landed it on main via PR #275 (`dc95f8ca`).
- `Cap dashboard recently created section to 3 entries` (`7a4c6e3`) — `.slice(0, 10)` →
  `.slice(0, 3)` in Dashboard.tsx, following the "last 3 items" design already used for
  Recently Viewed.

---

## Cross-repo statistics (mine only)

| Metric | Value |
|---|---|
| Non-merge commits | **648** |
| Date range | 2026-08-07 → 2026-09-23 |
| Busiest days | Aug 16 (~40), Aug 18 (~45), Aug 24 (~35), Sep 3 (~35), Sep 5 (~40), Sep 9–11 (~90) |
| fix : feat ratio | 281 : 134 (≈2 : 1 — this project was mostly making features actually work) |
| Reverts | 1 (entry-card "modern clean stream", Aug 17) |
| issues.md entries | #1–#8 (Sep 3 cache week), #9 (SSE race), #10 (entries.js merge war) |

**Files I touched most:** `frontend/src/index.css` (137), `frontend/src/pages/Dashboard.tsx`
(136), `frontend/src/pages/ProjectDetailPage.tsx` (61), plus ProjectTaskTable, AddEntry,
NavBar, SettingsPanel, EntryBox, `entries.js`, and all four services' `supabase.js`/CORS config.

**Caching architecture arc (the project's spine):** per-page stale-while-revalidate (Sep 2)
→ IndexedDB-first with event subscriptions (Sep 3) → full local-first with central syncService
(Sep 5) → sql.js/SQLite-in-WASM with the same cache API (Sep 10) → everything cache-first +
offline queue + optimistic writes everywhere (Sep 12).

## What I actually learned (the short list)

1. **Mocks must match real behaviour, not desired behaviour** — the `supabaseMock` resolve-vs-reject
   day (105 failures, one root cause).
2. **You cannot downgrade IndexedDB versions** — browsers only move forward; version bugs are one-way doors.
3. **Never let a CDN be load-bearing for an offline feature** — bundle the WASM.
4. **Empty server responses must never clobber cache** — guard every write path.
5. **Windows filesystem case-insensitivity hides fatal Linux import paths** (`field.js` vs `fields.js`).
6. **UTF-16 from a Windows editor kills Node on the server** — watch file encodings.
7. **Refetch-after-write loses to concurrency** — use the mutation response body, or a seq-ref guard.
8. **Render fails builds on unused vars that local dev ignores** — lint in CI, not after.
9. **UI naming is a decision you'll revisit twice** (field→column, entry→task→item) — write it
   in `decisions.md` both times.
10. **A revert within hours is cheaper than defending a worse design** (entry cards, Aug 17).
11. **Ask before guessing at conflicts** — the PR #274 "resolve both" conversation produced a
    better merge than either branch alone.
12. **`Cache-Control` as a request header breaks CORS preflight** — it's a response header.
