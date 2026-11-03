export const projectKeys = [
  "name",
  "overview",
  "tech_stack",
  "video_link",
  "site_link",
  "source_code",
  "documentation_site",
  "problems",
  "additional",
];

export const projectNames = [
  "Digital Logbook",
  "Data Cleaner & Visualiser",
  "Nova",
  "SOS App",
  "Derma",
  "Rihanyo",
  "Safe (SOS)",
  "Cortex",
  "E-Draft",
  "Dira",
];

export const projects = [
  {
    name: "Digital Logbook",
    overview:
      "A microservices-based digital logbook application with a React frontend and four independent Node.js/Express backend services, each running on its own port with Supabase for auth and PostgreSQL for data persistence. It is a monorepo following strict architecture rules: project entries and their statistics stay scoped to the project service, while the dashboard only shows cross-project summaries and never reads individual entry tables directly. The Auth Service handles login and signup via Supabase Auth, the Dashboard Service provides cross-project summaries and search, the Project Service manages entries, timelines, search, statistics and AI-powered features, and the Profile Service handles user profiles, avatars and preferences. All four services are deployed live on Render with auto-generated test coverage badges updated by CI on every push.",
    tech_stack: [
      "React",
      "Vite",
      "Node.js",
      "Express",
      "Supabase",
      "PostgreSQL",
      "Vitest",
      "Docker",
      "Render",
      "Gitea CI",
      "OpenRouter",
      "Gemini",
      "Groq",
    ],
    video_link: null,
    site_link: "https://digital-logbook-hlulani.onrender.com",
    source_code: "https://github.com/Hlulani-B/Digital-Logbook",
    documentation_site: "https://digital-logbook-documentation-site.onrender.com",
    problems: [
      {
        title: "Mocks Must Match Real Behaviour",
        description:
          "A Supabase mock that rejected where the real client resolves with null data caused 105 test failures in a single day, all tracing to one root cause. Fixed the mocks to mirror reality and every suite went green.",
      },
      {
        title: "IndexedDB Versions Only Move Forward",
        description:
          "A database version bump left browsers stuck on a never-resolving open request and froze the app. You cannot downgrade a user's browser, so the fix was a forward bump plus a 5-second open timeout so an IndexedDB hang can never freeze the UI again.",
      },
      {
        title: "Never Let a CDN Be Load-Bearing",
        description:
          "The sql.js WASM file 404'd from its CDN, killing the offline mode it powered. The fix was to bundle the WASM locally. If a feature is your offline story, it cannot depend on the network.",
      },
      {
        title: "Refetch-After-Write Loses to Concurrency",
        description:
          "Re-fetching after a mutation raced with SSE events and overwrote fresh rows with stale server data. The rule became: use the mutation response body (or a sequence-ref guard), never a blind re-fetch.",
      },
      {
        title: "Windows Hides Linux-Fatal Bugs",
        description:
          "A case-insensitive filesystem masked bad import paths (field.js vs fields.js) that crash-looped Render's Linux builds, and a Windows editor silently saved a file as UTF-16, killing Node on boot. 'Works locally' is not proof.",
      },
      {
        title: "Cache-Control Is a Response Header",
        description:
          "Setting Cache-Control as a request header tripped CORS preflight on every service and broke all syncs, a one-line mistake with an app-wide blast radius.",
      },
    ],
    additional: {
      role:
        "Team project. Full-stack across the entire repository. Over roughly seven weeks (Sprints 1-3): 648 non-merge commits, 281 fixes to 134 features.",
      contributions: [
        {
          title: "Monorepo & Deployment Infrastructure",
          description:
            "Set up the monorepo structure, the first Gitea Actions CI pipeline, the Render Blueprint (render.yaml) for all four microservices, Gitea Pages, and keep-alive cron workflows that ping Render and Supabase to prevent free-tier cold starts.",
        },
        {
          title: "Database Schema & Soft Deletes",
          description:
            "Designed the Supabase schema bottom-up (users, projects, fields, entries), migrated identity from UUIDs to email as the primary key so Google sign-in maps directly to rows, added cascade deletes, and implemented soft deletes with a grace-period account restore flow.",
        },
        {
          title: "Theme System & Onboarding",
          description:
            "Built the entire theming engine (light, dark, pastel-vintage and OLED palettes, font and corner-style pickers, avatar picker) plus the five-step onboarding flow (Profile, Avatar, Tone, Theme, Frequency) with live theme previews.",
        },
        {
          title: "Natural-Language Quick Add & Voice",
          description:
            "Type or say 'math due friday high priority' and the AI files it. Built the multi-provider AI fallback chain (OpenRouter, HuggingFace, Gemini, Cerebras, Groq), server-side date extraction, multi-project splitting, and voice input via the Web Speech API feeding the same pipeline.",
        },
        {
          title: "Local-First Caching Architecture",
          description:
            "Evolved caching from per-page stale-while-revalidate to IndexedDB-first with event subscriptions, then to sql.js (SQLite in WebAssembly) with a central sync service, optimistic writes, and an offline mutation queue that replays with toasts.",
        },
        {
          title: "Dashboard Architecture",
          description:
            "Rebuilt the dashboard from a feed into a sectioned workspace: drawer navigation, Due Soon sections, EntryBox cards, card/checklist/board view toggles, time tracking with live durations, streaks, and AI-powered stats reflections.",
        },
        {
          title: "Notes System",
          description:
            "Per-entry personal notes with client-side image compression, Supabase Storage uploads, a context-based slide-over panel that keeps the page behind it visible, soft-delete support, and full offline-first caching.",
        },
        {
          title: "Testing, CI & Documentation Site",
          description:
            "Grew service test suites to 135+ passing tests, added integration workflows with visible results and auto-generated coverage badges, split CI four ways (unit/integration x frontend/backend), and built the MkDocs documentation site with architecture docs and stakeholder evidence.",
        },
      ],
      key_features: [
        {
          title: "Four Independent Microservices",
          description:
            "Auth, Dashboard, Project and Profile services each run on their own port (5001-5004) with independent deployments and scaling.",
        },
        {
          title: "Supabase Authentication",
          description:
            "JWT-based auth with Supabase, including JWKS URL verification and RPC functions for user management (delete, restore, purge).",
        },
        {
          title: "AI-Powered Project Entries",
          description:
            "The project service integrates multiple AI providers (OpenRouter, HuggingFace, Gemini, Cerebras, Groq) for natural-language features.",
        },
        {
          title: "Cross-Project Dashboard",
          description:
            "Aggregated summaries and search across all projects, following strict architecture boundaries that prevent direct entry table access.",
        },
        {
          title: "CI/CD Pipeline",
          description:
            "Gitea workflows run lint, build and tests on every push and pull request. Coverage badges are auto-generated and committed to main.",
        },
        {
          title: "Docker Compose Support",
          description:
            "Full docker-compose.yml for local development of all services and the frontend together, with a render.yaml deployment manifest.",
        },
      ],
      deployed_services: [
        {
          name: "Auth Service",
          port: 5001,
          description: "Handles login and signup via Supabase Auth.",
          url: "https://auth-service-hl52.onrender.com",
        },
        {
          name: "Dashboard Service",
          port: 5002,
          description: "Cross-project summaries and search.",
          url: "https://dashboard-service-bpc5.onrender.com",
        },
        {
          name: "Project Service",
          port: 5003,
          description: "Entries, timeline, search, stats and AI features.",
          url: "https://project-service-96ml.onrender.com",
        },
        {
          name: "Profile Service",
          port: 5004,
          description: "User profiles, avatars and preferences.",
          url: "https://profile-service-0zk7.onrender.com",
        },
      ],
      architecture_decisions: [
        {
          title: "Service Boundary Enforcement",
          description:
            "Project entries and their statistics stay scoped to the project service. The dashboard service only shows cross-project summaries and never reads individual entry tables directly. This prevents tight coupling and keeps services independently deployable.",
        },
        {
          title: "Protected Branch Strategy",
          description:
            "Main and services branches are protected with no direct pushes allowed. All changes go through pull requests with required approvals.",
        },
        {
          title: "Multi-Provider AI Integration",
          description:
            "The project service supports five AI providers as fallbacks. If OpenRouter is down, the system tries HuggingFace, then Gemini, Cerebras and Groq in sequence.",
        },
      ],
    },
  },

  {
    name: "Data Cleaner & Visualiser",
    overview:
      "A fast, browser-based data-cleansing and visualisation workspace that bridges the gap between fragile spreadsheets and tedious custom scripts, with over 40 transformation utilities, 11 chart types and AI-powered insights. Data preparation is inefficient: analysts face spreadsheets that buckle under large datasets, custom scripts with setup overhead, or enterprise ETL platforms with steep licensing costs. Data Cleaner offers a responsive workspace that combines the speed of programmatic cleaning with a code-free interface. Users sign in with Google, upload a CSV or XLSX file, run an automatic initial clean, then apply individual cleaning functions. Every operation supports undo, draft history is maintained, and all data persists to Neon Postgres so work is never lost. Each generated chart receives an AI-generated title, axis labels and plain-English insights about what stands out in the data.",
    tech_stack: [
      "React 19",
      "React Router 7",
      "Vite 8",
      "Firebase Auth",
      "Vercel Serverless",
      "Neon Postgres",
      "Express",
      "Recharts",
      "xlsx",
      "Jest",
      "Oxlint",
      "OpenAI",
      "Hugging Face",
      "Google Gemini",
      "Cerebras",
      "Groq",
    ],
    video_link: null,
    site_link: "https://data-cleaner-wine.vercel.app",
    source_code: "https://github.com/Hlulani-B/Data-Cleaner",
    documentation_site: null,
    problems: [
      {
        title: "The Imperative of Automated Testing",
        description:
          "Managing dozens of state-mutating functions made manual testing a massive bottleneck. Writing unit tests for pure data functions (243 tests across 22 suites) proved essential for refactoring with confidence, catching boundary edge cases and preventing regressions.",
      },
      {
        title: "Serverless Function Consolidation",
        description:
          "Vercel's free tier allows 12 functions max, and 18 individual cleaning operations exceeded this. Consolidating all data transforms into a single unified handler with operation dispatch solved it while keeping the API clean through vercel.json rewrites.",
      },
      {
        title: "Designing for High-Friction Workflows",
        description:
          "Real-world data is dirty and unpredictable. Giving users deterministic, instant feedback via live previews and search-by-intent search bars creates a far more reliable experience than relying solely on AI auto-cleaning.",
      },
    ],
    additional: {
      walkthrough_pdf: "Data_Cleaner_Walkthrough_and_Demo.pdf",
      architecture:
        "The backend runs on 6 Vercel serverless functions, consolidated to stay within the free tier's 12-function limit. Early on, each cleaning operation was its own function (18 total). The solution was a unified handler that dispatches on the operation field, with legacy routes rewritten via vercel.json. The database schema spans 15 tables: Users, Files, File_Versions, Graphs, plus one dedicated table per chart type. Tables auto-create on first request. The frontend uses React Router with auth guards, and the dev server runs Express with Vite middleware for hot module replacement.",
      key_features: [
        {
          title: "Automatic Initial Clean",
          description:
            "One-click bundled action: trim whitespace, remove empty rows, eliminate duplicates and coerce datatypes. Runs once per file and persists the result.",
        },
        {
          title: "40+ Transformation Functions",
          description:
            "Row operations, column manipulation, text case conversion, find and replace, regex extract, date operations, math operations, type conversion and more.",
        },
        {
          title: "AI-Powered Visualisation",
          description:
            "11 chart types including bar, histogram, pie, scatter, line, area, box plot, violin, heatmap, stacked bar and bubble charts with AI-generated insights.",
        },
        {
          title: "Natural Language Search",
          description:
            "Describe what you want in plain English (e.g. 'remove repetition') and the AI interprets your intent, highlighting the matching function cards.",
        },
        {
          title: "Undo & Draft History",
          description:
            "Revert the last applied operation one step at a time, or jump back to any previous state from saved drafts, most recent first.",
        },
        {
          title: "Database Persistence",
          description:
            "Files are saved to Neon Postgres on upload, synced on every operation, and loaded from the database when revisiting. 15 tables track everything.",
        },
        {
          title: "Empty Values Inspector",
          description:
            "Interactive view with a colour-coded table (red for empty cells, yellow for rows with empties), stats dashboard and batch removal actions.",
        },
        {
          title: "Real-Time Data Search",
          description:
            "Case-insensitive search across all columns simultaneously with highlighted matching cells and a live row count that resets when switching sheets.",
        },
        {
          title: "Google Authentication",
          description:
            "Firebase Google Sign-In protects all routes behind a login screen. New users are automatically registered in Neon Postgres on sign-in.",
        },
      ],
    },
  },

  {
    name: "Nova",
    overview:
      "An intelligent CSV cleaning pipeline that uses AI to write and execute pandas code, streaming progress live via Server-Sent Events. Nova is an API that takes a messy CSV, scans it, has an AI write pandas cleaning code, runs that code in a subprocess, re-scans the result, and repeats until the data is clean. Progress, reports and generated code stream live over SSE. A second mode lets a person type a plain English instruction (for example 'remove rows where age is under 18') and the AI writes and runs code that applies only that change. The AI decides what to fix, but deterministic pandas checks decide when to stop, so the loop cannot be trapped by an opinionated model.",
    tech_stack: [
      "FastAPI",
      "Python",
      "React",
      "Vite",
      "Pandas",
      "Gemini AI",
      "Groq",
      "Server-Sent Events",
      "Subprocess Execution",
      "Render",
    ],
    video_link: null,
    site_link: "https://nova-frontend-bhrl.onrender.com",
    source_code: "https://github.com/Hlulani-B/Nova",
    documentation_site: null,
    problems: [
      {
        title: "CORS in GitHub Codespaces",
        description:
          "The browser blocked cross-origin API calls from Codespaces. Fixed by adding exact frontend URLs to allow_origins, setting port 8000 to Public, and killing stale uvicorn processes that held the port.",
      },
      {
        title: "AI Assertion Failures",
        description:
          "Generated scripts failed their own assertions when they only filled some columns. Solution: add_safety_net() injects code before assertions to fill every remaining gap with appropriate defaults (median for numbers, Unknown for text, False for booleans).",
      },
      {
        title: "Pandas Version Conflicts",
        description:
          "AI models often write pandas 1/2 code (inplace=True, chained assignment) that silently does nothing in pandas 3. Fixed by pinning pandas 3 rules in every prompt and comparing output to input to detect no-op changes.",
      },
      {
        title: "Streaming Buffer Issues",
        description:
          "Proxies buffered streamed responses until the end, making the frontend appear frozen. Solution: the stream starts with a comment line padded with 2048 spaces to force immediate proxy transmission, and the frontend normalizes line endings.",
      },
    ],
    additional: {
      key_features: [
        {
          title: "Auto-Clean Loop",
          description:
            "Scans data, generates AI cleaning code, executes it in a subprocess, and re-scans until the data meets quality standards. Maximum rounds are configurable to prevent infinite loops.",
        },
        {
          title: "Instruction Mode",
          description:
            "Type plain English instructions and the AI writes and executes code to apply only that specific change, leaving everything else untouched.",
        },
        {
          title: "Live SSE Streaming",
          description:
            "Real-time progress updates streamed via Server-Sent Events. Overviews, scan reports and generated cleaning code appear live as the AI works.",
        },
        {
          title: "Multi-Provider AI",
          description:
            "Supports Gemini and Groq with automatic fallback. If one provider fails or returns bad JSON, the system switches to the other.",
        },
        {
          title: "Subprocess Execution",
          description:
            "AI-generated code runs in isolated subprocesses with timeout protection. Scripts read from data.csv and write to cleaned.csv, avoiding command-line length limits.",
        },
        {
          title: "Safety Nets",
          description:
            "Automatic safety code injection fills missing values the AI forgot before assertions run. Hard pandas checks validate results, preventing silent failures from pandas version differences.",
        },
      ],
      how_it_works: [
        {
          step: 1,
          title: "Overview Generation",
          description:
            "Generates a text summary of the CSV: column types, missing value rows, duplicate counts. This gives the AI context on what needs cleaning.",
        },
        {
          step: 2,
          title: "AI Scan & Analysis",
          description:
            "Pandas profiles the data (shape, dtypes, missing values, duplicates, describe, sample) and sends it to the LLM. The AI returns JSON with ok (boolean) and report (markdown explanation of issues found).",
        },
        {
          step: 3,
          title: "Code Generation & Execution",
          description:
            "If the scan finds problems, the AI writes pandas code to fix them. A safety net is injected, then the code runs in a subprocess reading data.csv and writing cleaned.csv. Hard checks validate the output before the next round.",
        },
        {
          step: 4,
          title: "Instruction Mode (Alternative)",
          description:
            "For manual edits, the user types a plain English instruction. The AI writes code to apply only that change, reading with dtype=str to preserve untouched columns exactly. The output is validated against the input to ensure the change did something.",
        },
      ],
    },
  },

  {
    name: "SOS App",
    overview:
      "The cloud-backed evolution of Safe: a covert safety tool disguised as a weather app. One-tap hidden triggers record audio/video or alert trusted contacts with live location, while a map shows pals sharing their positions with real addresses and local weather. A panic button only works if the person who needs it can reach it without the attacker noticing, and existing safety apps betray themselves with a red SOS icon or a 'Send help' button. SOS App keeps the original offline Safe prototype's disguise philosophy but adds cross-device trusted contacts and live location sharing powered by a real backend. The weather screen lists ordinary cities, and three carry a small coloured dot: Johannesburg (olive) starts video, Durban (yellow) starts audio, Cape Town (pink) sends an alert with live location. A single tap loads that city's forecast and fires the hidden action, and a red chip is the only visible state. A second Location screen shows trusted contacts ('pals') on a map, each resolved to a real street address with the current weather there.",
    tech_stack: [
      "React 19",
      "Vite 8",
      "Express 5",
      "Neon Postgres",
      "Firebase Auth",
      "React-Leaflet",
      "Open-Meteo",
      "Nominatim",
      "BigDataCloud",
      "Render Blueprint",
    ],
    video_link: null,
    site_link: "https://sos-web-gdf3.onrender.com",
    source_code: "https://github.com/Hlulani-B/SOS_APP",
    documentation_site: null,
    problems: [
      {
        title: "Allowlisted Function Dispatcher API",
        description:
          "Instead of one endpoint per operation, the Express API exposes modules at POST /api/module-name taking a function name and positional params. Every route holds an explicit allowlist of callable names, rejects cross-module names, and blocks prototype keys, with a trailing error handler keeping every response JSON.",
      },
      {
        title: "The Share Loop Died on Navigation",
        description:
          "With no router, switching screens unmounted the Location page and tore down the setInterval inside its useEffect, so sharing silently stopped. Moving the timer into a module-level singleton, then persisting it across refreshes, fixed it.",
      },
      {
        title: "Free Geocoding APIs Each Have a Catch",
        description:
          "BigDataCloud's free tier never returns street names, and Nominatim does but throttles to 1 request/second and blocks generic user-agents. The address is a three-source chain with a serialised Nominatim queue (~1100ms spacing) and graceful degradation when a field is missing.",
      },
      {
        title: "Windows Hides Bugs That Break Linux",
        description:
          "A folder committed as api/Routes/ but imported as ./routes/ ran fine on Windows and crash-looped on Render's Linux with ERR_MODULE_NOT_FOUND. Fixed with a two-step git mv case rename.",
      },
      {
        title: "The Render Blueprint Is Stricter Than It Looks",
        description:
          "A static site is type: web with runtime: static and a staticPublishPath, since type: static is not valid at all. And sync: false env vars don't fail; the blueprint just sits 'Running' while it waits for secrets to be typed into the dashboard.",
      },
      {
        title: "Postgres Types Are Not What They Look Like",
        description:
          "NUMERIC coordinates come back from the driver as strings ('-33.920000'), needing an explicit Number() before plotting. And because the dispatcher passes params positionally, array arguments must be nested or Postgres throws a malformed array literal.",
      },
    ],
    additional: {
      predecessor: "Safe (SOS), the original offline prototype",
      key_features: [
        {
          title: "Weather-App Disguise Triggers",
          description:
            "Three city chips hide the triggers. The dot colour is the only label, nothing is written on the buttons, and tapping the same chip again stops the recording and sends what was captured.",
        },
        {
          title: "Live Location Sharing",
          description:
            "The share loop lives in a module-level singleton, not a component, so it keeps running when the Location page unmounts. The sharing state is mirrored to localStorage and resumed on boot, so a refresh never drops the share.",
        },
        {
          title: "Pals & Invites System",
          description:
            "Trusted contacts are chosen by the user: send, accept and remove invites, with pal profiles (names and avatars) merged with their live coordinates. Pals without coordinates render as offline.",
        },
        {
          title: "Map with Real Addresses & Weather",
          description:
            "A react-leaflet map constrained to South Africa shows each online pal as an avatar marker. Address and weather come from three free sources: Open-Meteo for weather, BigDataCloud for town/province, and a rate-limited Nominatim queue for the street.",
        },
        {
          title: "Router-less by Design",
          description:
            "No router on purpose: a localStorage view state machine means a refresh lands back on the same screen and the address bar never hints at what the app is. Tab title, branding and every string stay innocuous.",
        },
        {
          title: "Split Auth & Data Backends",
          description:
            "Firebase handles only Google sign-in and the session (popup with redirect fallback). Neon Postgres is the sole store of app data, with the email address as the bridge between them.",
        },
      ],
    },
  },

  {
    name: "Derma",
    overview:
      "An AI-powered skin analysis and product recommender that looks at your skin in real time through your webcam and recommends skincare formulations tailored specifically to you. Take a photo straight from your browser, no need to upload anything. The photo is analysed by Google Gemini 2.5 Flash Lite, which works out your skin type, your main concerns, and which ingredients would actually help. From there it generates personalised formulation recommendations, searches for real products that match, and pulls in product images using Cheerio HTML parsing so you are not just looking at a list of text. The result is a complete, visual skincare recommendation engine that runs in the browser with a Node.js backend.",
    tech_stack: [
      "Node.js",
      "Google Gemini 2.5 Flash Lite",
      "WebRTC API",
      "Cheerio",
      "HTML",
      "CSS",
      "JavaScript",
    ],
    video_link: "https://youtu.be/nNA5UwIJfLU",
    site_link: null,
    source_code: "https://github.com/Hlulani-B/Derma",
    documentation_site: null,
    problems: [
      {
        title: "Web Scraping Behind Cloudflare",
        description:
          "The product search scrapes Care to Beauty for real product images. The site uses Cloudflare CDN, which blocks requests from datacenter IPs, so the scraper works locally but may fail when deployed to cloud services. The fix involves routing through a scraping proxy for production deployments.",
      },
      {
        title: "Deeply Nested JSON Extraction",
        description:
          "The original regex used a non-greedy pattern to extract product JSON from the page, but because the JSON is deeply nested, the regex stopped at the first closing brace inside the object. Fixed by replacing the regex with a brace-depth counter that walks the string and finds the actual closing brace of the JSON object.",
      },
    ],
    additional: {
      key_features: [
        {
          title: "Webcam Capture",
          description:
            "Take a photo straight from your browser using the WebRTC API. No file uploads needed, just allow camera access and snap a picture.",
        },
        {
          title: "AI Skin Analysis",
          description:
            "Google Gemini 2.5 Flash Lite analyses your skin photo to determine skin type, main concerns, and which ingredients would actually help.",
        },
        {
          title: "Personalised Recommendations",
          description:
            "Generates personalised skincare formulation recommendations based on the AI analysis of your specific skin type and concerns.",
        },
        {
          title: "Real Product Search",
          description:
            "Searches for real products matching the recommendations and pulls in product images using Cheerio HTML parsing for visual results.",
        },
        {
          title: "Ingredient Matching",
          description:
            "Identifies which specific ingredients would help with your skin concerns and matches them against actual product formulations.",
        },
        {
          title: "Browser-Based",
          description:
            "The entire experience runs in the browser with a Node.js backend. No native app install required, works on any modern browser with camera access.",
        },
      ],
      how_it_works: [
        {
          step: 1,
          title: "Capture",
          description:
            "Allow webcam access and take a photo of your face straight from the browser. The image is captured using the browser's WebRTC API and sent to the backend.",
        },
        {
          step: 2,
          title: "Analyse",
          description:
            "The image is sent to Gemini 2.5 Flash Lite, which identifies your skin type and concerns and returns a list of recommended formulations and ingredients.",
        },
        {
          step: 3,
          title: "Match Products",
          description:
            "Cheerio parses the HTML of a skincare product website to find matching products based on the recommended ingredients and pull their images for visual display.",
        },
        {
          step: 4,
          title: "Display Results",
          description:
            "Matched products with images are displayed alongside your personalised recommendations, giving you a complete visual guide to products that suit your skin.",
        },
      ],
    },
  },

  {
    name: "Rihanyo",
    overview:
      "A multi-agent, AI-powered appointment booking assistant that connects patients with medical practices through natural conversation. It is built around two sides of the same problem: making it easy for a practice to register and receive appointment requests, and making sure the admin is not stuck manually reading through spam or irrelevant submissions. New requests are automatically screened by an AI filter before they reach the admin dashboard. A chatbot receptionist greets visitors, answers common questions, and routes or books appointment requests, and location-based search lets users find the closest registered practice. A WhatsApp AI receptionist is in development to allow patients to book via the WhatsApp Business API. Built entirely on free-tier services as a solo student project, Rihanyo uses a fallback chain across five AI providers (Cerebras, OpenRouter, Hugging Face, Groq, Gemini) so if one runs dry the system quietly moves to the next without the patient noticing a gap in service.",
    tech_stack: [
      "Node.js",
      "Express",
      "Firebase Functions",
      "Firebase Auth",
      "Supabase",
      "Firestore",
      "Gmail API",
      "Cerebras",
      "OpenRouter",
      "Hugging Face",
      "Groq",
      "Gemini",
    ],
    video_link: "https://youtu.be/AynBR9I_Myk",
    site_link: null,
    source_code: "https://github.com/Hlulani-B/Rihanyo",
    documentation_site: null,
    problems: [
      {
        title: "The Agent Would Go Silent",
        description:
          "The assistant would sometimes stop responding with no error or crash. This came from broken async/await chains, JSON.parse blowing up on messy LLM output, and code paths that ended without calling reply(). Fixed by wrapping every parser in try/catch with proper logging and adding a fallback response.",
      },
      {
        title: "Treating Questions Like Form Fields",
        description:
          "If someone asked 'can you give me options?' the agent replied with canned form-filling text instead of answering, because every message was funnelled into the structured data extraction agent. Fixed by adding proper intent handling so queries get routed to the right place before falling back to form filling.",
      },
      {
        title: "Running Out of Tokens Mid-Conversation",
        description:
          "Multiple agents per message with full conversation history sent each time burned through the daily free-tier quota in a single afternoon. Fixed by capping history to recent entries, scoping the clash checker to one doctor, adding minimum gaps between AI calls, and making retry logic recognise daily caps versus normal rate limits.",
      },
      {
        title: "Hallucinated Practice Details",
        description:
          "The assistant answered questions about doctors with plausible but invented details. The practice information essay was falling outside the trimmed context window, so the AI filled the gap with fiction. Fixed by always fetching the practice essay fresh and explicitly instructing the AI to only answer from verified data.",
      },
      {
        title: "Dates Like '9am Tomorrow'",
        description:
          "People do not speak in ISO format, and the database only accepts proper timestamp strings, so natural dates were failing on insert. Fixed by injecting the current date and time into the agent's context so the model always has a reference point for converting to clean ISO 8601 UTC strings.",
      },
    ],
    additional: {
      status: "WhatsApp AI receptionist (WhatsApp Business API) is in development.",
      key_features: [
        {
          title: "Practice Registration",
          description:
            "Practices can sign up and register their details including location, specialties and contact information through a streamlined onboarding flow.",
        },
        {
          title: "AI Request Filtering",
          description:
            "New requests are checked for relevance by an LLM-based filter that rejects unrelated or nonsensical submissions before they reach the admin queue.",
        },
        {
          title: "Admin Dashboard",
          description:
            "View and manage incoming appointment requests with AI-flagged relevance indicators. Filter, approve or reject submissions from a single interface.",
        },
        {
          title: "Chatbot Receptionist",
          description:
            "AI-powered chat widget on the website that greets visitors, answers common questions about the practice, and routes or books appointment requests.",
        },
        {
          title: "Nearest Location Search",
          description:
            "Location-based search so patients can find the closest registered practice using geolocation and radius filtering.",
        },
        {
          title: "Multi-Provider AI Fallback",
          description:
            "Five AI providers chained as fallbacks with a Supabase cooldown table so failed providers are skipped for minutes, surviving cold starts.",
        },
      ],
    },
  },

  {
    name: "Safe (SOS)",
    overview:
      "A covert emergency alert system for survivors of gender-based violence. It hides inside three everyday apps (a calculator, a weather app and a clothing boutique) where hidden triggers quietly record audio or video, or send an SOS with live GPS location straight to emergency contacts. Almost every safety product on the market assumes the victim can openly reach for her phone and use a visible emergency app, but in a coercive, controlling environment a panic-button app is a neon sign an abuser finds in seconds. Safe is built around the real problem: victims need a way to alert trusted contacts and document abuse in real time, using a device the abuser can inspect at any moment, without any visible sign the phone is anything other than ordinary. Each disguise is a real, working app with the triggers woven into its normal interface. An olive green element captures video, a yellow one captures audio, and a pink one sends an SOS alert with live GPS location. Tap once to start, tap again to stop. When a trigger is active the button turns red and nothing else changes: no labels, no popups, no sounds.",
    tech_stack: [
      "React 19",
      "Vite",
      "MediaRecorder API",
      "Geolocation API",
      "Resend Email API",
      "Vercel Serverless",
      "localStorage",
      "Google Maps Links",
      "oxlint",
    ],
    video_link: null,
    site_link: "https://sos-g4eh.vercel.app/",
    source_code: "https://github.com/Hlulani-B/SOS",
    documentation_site: null,
    problems: [
      {
        title: "The Email API Cannot Be Called from a Browser",
        description:
          "Resend blocks browser calls with CORS, so the browser posts to same-origin /api/emails and a server-side proxy forwards to Resend while injecting the API key. One fix solved two problems: CORS disappeared, and the key stopped existing in client code entirely.",
      },
      {
        title: "Attachments That Actually Open",
        description:
          "Browsers record webm, which Gmail, iPhone Mail and Outlook cannot play, and a base64 helper that sliced at the first comma corrupted every video because the MIME type contains a comma in its codec list. Recordings now negotiate MP4/M4A first, and the encoder works on raw bytes in 32KB chunks with no URL parsing.",
      },
      {
        title: "It Must Always Send",
        description:
          "A panic tool cannot lose the alert because a recording ran long. Three guarantees: record-time compression (24kbps mono audio, 320x240 video at 15fps), a size guard that drops an oversized attachment with a note in the email body, and a send path where one failing recipient never blocks the others.",
      },
      {
        title: "Three Triggers, One Microphone",
        description:
          "Audio, video and SOS share device hardware and must never run in parallel. A promise-chain ownership lock serialises them: a new trigger stops the active one and awaits its full stop-save-send pipeline before starting.",
      },
      {
        title: "Keeping the Disguise Airtight",
        description:
          "Halfway through, the browser tab read 'sos', a total cover failure. Fixes: the static title became 'Safe', a document.title effect maps every view to its disguise name, the favicon was audited, and trigger labels were frozen so colour is the only state signal.",
      },
      {
        title: "SMS Died Behind a Paywall, Not Deleted",
        description:
          "Twilio trial accounts refused the South African destination number, so the alert channel was rebuilt on Resend email by rewriting the three send modules as thin wrappers with identical signatures. The Twilio path remains in the codebase, so restoring SMS is a rewire of three functions, not a rewrite.",
      },
    ],
    additional: {
      key_features: [
        {
          title: "Three Working Disguises",
          description:
            "A working calculator, a real weather app, and a chic clothing boutique ('Maison'). There is no emergency mode screen, no special gesture, and nothing to hide when someone looks over her shoulder.",
        },
        {
          title: "Colour-Coded Trigger System",
          description:
            "Olive captures video, yellow captures audio, pink sends an SOS with live GPS. Triggers are styled as ordinary interface elements (calculator keys, weather UI, shopping buttons) with frozen labels so colour is the only signal.",
        },
        {
          title: "Red-Only Activation State",
          description:
            "When a trigger is active the button turns red and nothing else changes. No 'Recording' or 'Sent' text, no alerts, no sounds. The rule: if a piece of UI state would survive a screenshot in the wrong hands, it must be invisible.",
        },
        {
          title: "Email Alerts with Attachments",
          description:
            "The SOS email carries her name, her pre-written message, and a Google Maps pin of her live location. Audio/video alerts attach the recording as a playable MP4/M4A file, and the file is also saved on the device.",
        },
        {
          title: "No-Server Privacy Architecture",
          description:
            "No accounts, no server, no database. Profile and contacts live in the device's localStorage only: nothing to hack, nothing to subpoena, and nothing linking her to the service. Alerts fire silently while the disguise stays on screen.",
        },
        {
          title: "Server-Side Key Handling",
          description:
            "The Resend email API key never exists in the browser bundle. Locally a Vite dev-server proxy attaches it; in production a Vercel serverless function does, so client code is identical in both environments.",
        },
      ],
    },
  },

  {
    name: "Cortex",
    overview:
      "A serverless full-stack app that transforms hours of video and audio lectures, meetings, voice memos or YouTube videos into clean, structured notes rendered as downloadable PDFs. Drop in an audio or video file, or paste a YouTube link directly, and Cortex uses Gemini 2.5 Flash to generate organized notes from the content. The notes come out as structured HTML, not just a raw transcript dump, so headings, bullet points and logical sections are preserved and the output is immediately useful for study or reference. The styled PDF can be previewed right in the browser or saved to your computer. The entire pipeline is serverless: media pointers go to cloud storage, Gemini processes them, and the resulting HTML is converted to PDF client-side.",
    tech_stack: [
      "React",
      "Vite",
      "Gemini 2.5 Flash",
      "Gemini File API",
      "YouTube Data API v3",
      "Firebase",
      "Cloud Firestore",
      "HTML-to-PDF",
      "Archivo Black",
      "Inter",
    ],
    video_link: "https://youtu.be/OrD9pvzhj40",
    site_link: null,
    source_code: "https://github.com/Hlulani-B/Cortex",
    documentation_site: null,
    problems: [],
    additional: {
      key_features: [
        {
          title: "Multi-Format Upload",
          description:
            "Supports MP3, WAV, MP4 and MOV file uploads. Drop in any audio or video file and Cortex handles the processing pipeline automatically.",
        },
        {
          title: "YouTube Integration",
          description:
            "Paste a YouTube link directly with no need to download anything first. Uses the YouTube Data API v3 to fetch video duration for validation.",
        },
        {
          title: "Structured HTML Notes",
          description:
            "Notes come out as structured HTML with headings, bullet points and logical sections, not just a raw transcript dump from the AI.",
        },
        {
          title: "In-Browser PDF Preview",
          description:
            "Instant PDF preview right in the browser using client-side HTML-to-PDF rendering. Download the PDF or view it without leaving the page.",
        },
        {
          title: "Gemini File API",
          description:
            "Larger media files go through the Gemini File API using resumable upload, handling big lectures without hitting size limits or timeouts.",
        },
        {
          title: "Responsive Layout",
          description:
            "Fully responsive design using Archivo Black and Inter fonts. Works on desktop, tablet and mobile with custom CSS styling throughout.",
        },
      ],
      how_it_works: [
        {
          step: 1,
          title: "Upload or Paste",
          description:
            "Users upload an audio/video file (MP3, WAV, MP4, MOV) or paste a YouTube URL. The client validates the duration is under the 55-minute Gemini token limit before processing begins.",
        },
        {
          step: 2,
          title: "Cloud Storage Pipeline",
          description:
            "Media files are uploaded to cloud storage via the Gemini File API using resumable upload. A secure backend pipeline passes cloud storage pointers to Gemini 2.5 Flash, delivering summaries without exposing API credentials to the client.",
        },
        {
          step: 3,
          title: "AI Note Generation",
          description:
            "Gemini 2.5 Flash processes the audio/video content and generates structured HTML notes with headings, sections and bullet points. The output is organized study material, not a raw transcript.",
        },
        {
          step: 4,
          title: "PDF Rendering",
          description:
            "The structured HTML is rendered into a styled PDF client-side using HTML-to-PDF conversion. Users get an instant in-browser preview and can download the PDF for offline reference.",
        },
      ],
    },
  },

  {
    name: "E-Draft",
    overview:
      "Type a prompt, get a fully drafted email, hit send. E-Draft is a sleek AI-powered email assistant with a premium, Canva-inspired interface. It combines an open-source LLM (gpt-oss-20b via Groq), Firebase Google Sign-In for frictionless authentication, and the Gmail API, letting users draft, polish and send emails directly from their authenticated account. Users can instantly rephrase, formalize or write emails from scratch. Login is one-click Google Sign-In through Firebase Auth, and emails send directly through the Gmail API using OAuth 2.0 access tokens captured at login. The workspace uses a Plus Jakarta Sans and Inter font pairing inspired by Canva's design language.",
    tech_stack: [
      "React",
      "Vite",
      "Groq SDK",
      "gpt-oss-20b",
      "Firebase Auth",
      "Gmail API",
      "OAuth 2.0",
      "Google APIs Client",
      "Vercel",
      "Custom CSS",
    ],
    video_link: "https://youtu.be/YzfwQujoPLM",
    site_link: "https://e-draft-rho.vercel.app",
    source_code: "https://github.com/Hlulani-B/e-draft",
    documentation_site: null,
    problems: [
      {
        title: "SPA Routing on Vercel",
        description:
          "Deploying the React/Vite frontend on Vercel caused 404s whenever someone refreshed a page, a classic single-page app routing gap. Fixed with a custom rewrite rule in vercel.json so all routes fall back to index.html.",
      },
      {
        title: "LLM JSON Parsing",
        description:
          "The LLM occasionally wrapped its JSON responses in markdown code fences, which broke JSON.parse(). Fixed by stripping the markdown fences before parsing, so EmailComposer now handles inconsistent model formatting without falling over.",
      },
      {
        title: "Base64url Encoding",
        description:
          "The Gmail API expects raw email content in base64url encoding, not standard base64. Getting this right in GmailService ensures sent messages are not rejected or come out malformed on the receiving end.",
      },
      {
        title: "OAuth Scope Minimisation",
        description:
          "Chose gmail.send instead of gmail.compose since the app only needs to send messages rather than manage drafts. A narrower scope means less friction during Google's sensitive scope review and better trust from users.",
      },
      {
        title: "Institutional Account Handling",
        description:
          "Institutional Google accounts kept triggering 'unverified app' warnings and login failures. Sorted by manually adding test users in the Cloud Console's OAuth consent screen, and documenting the Advanced/Unverified App warning flow for end users.",
      },
    ],
    additional: {
      key_features: [
        {
          title: "AI Email Drafting",
          description:
            "Type a prompt and get a fully drafted email using gpt-oss-20b via Groq. Supports writing from scratch, rephrasing and formalizing existing text.",
        },
        {
          title: "One-Click Google Sign-In",
          description:
            "Firebase Auth with Google OAuth 2.0 provider. No passwords to remember, no registration forms. Access tokens are captured at login for Gmail API use.",
        },
        {
          title: "Direct Gmail Sending",
          description:
            "Emails send directly through the Gmail API using OAuth 2.0 access tokens with proper base64url encoding. No intermediary servers handle your messages.",
        },
        {
          title: "Premium UI Design",
          description:
            "Canva-inspired workspace with Plus Jakarta Sans and Inter font pairing, responsive input fields, and active focus states throughout.",
        },
        {
          title: "Narrow OAuth Scope",
          description:
            "Uses gmail.send instead of gmail.compose for a narrower scope, meaning less friction during Google's sensitive scope review and better user trust.",
        },
        {
          title: "SPA Routing Fix",
          description:
            "Custom rewrite rule in vercel.json ensures all routes fall back to index.html, preventing the classic single-page app 404 on page refresh.",
        },
      ],
    },
  },

  {
    name: "Dira",
    overview:
      "A quiet place to keep track of what needs doing. Add a task, tick it off, move on with your day. Dira is a single-user, local-first task manager built as part of the COMS3011A Software Design course at the University of the Witwatersrand. There are no accounts, no cloud sync, and nothing deployed anywhere: you clone the repo, run it, and your tasks are stored in a SQLite file on your own machine. The name 'Dira' comes from the Setswana word for a quiet, focused place. It uses Next.js 16 with file-based routing, React 19 for the UI, better-sqlite3 for synchronous embedded database access, and Tailwind CSS for styling. TypeScript enforces type safety across the codebase, and Jest runs the test suite against a throwaway database so tests never touch real data.",
    tech_stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "better-sqlite3",
      "Tailwind CSS",
      "Jest",
      "ts-jest",
    ],
    video_link: null,
    site_link: null,
    source_code: "https://github.com/Hlulani-B/Dira",
    documentation_site: null,
    problems: [
      {
        title: "Local-First Simplicity",
        description:
          "Building without authentication, cloud sync or deployment constraints forces you to focus on the core product: clean data modelling, a thoughtful UI, and correct behaviour. Sometimes less infrastructure means better software.",
      },
      {
        title: "Embedded Database Patterns",
        description:
          "better-sqlite3 runs synchronously in the same process, which is ideal for a local-first app. Understanding the trade-offs between embedded and client-server databases deepened the understanding of when each approach fits.",
      },
      {
        title: "Test Isolation",
        description:
          "Running tests against a throwaway database rather than the dev database is a pattern that prevents accidental data loss and makes tests reproducible. Each test suite gets a clean slate.",
      },
    ],
    additional: {
      course: "COMS3011A Software Design, University of the Witwatersrand",
      key_features: [
        {
          title: "Local-First SQLite",
          description:
            "Built on better-sqlite3, the database runs embedded in the same process. No separate database server to install or manage. The SQLite file is created and seeded automatically on first run.",
        },
        {
          title: "Topic Tagging",
          description:
            "Tasks can be tagged with colour-coded topics like Grocery, Assignments, Work, Health and Projects. Each topic has its own colour for quick visual identification in the UI.",
        },
        {
          title: "Three-Status Workflow",
          description:
            "Tasks move through three states: Todo, In Progress and Complete. The status is enforced through a TypeScript type union, preventing invalid state transitions at compile time.",
        },
        {
          title: "Archive Without Delete",
          description:
            "Completed tasks are archived rather than deleted. An archive flag (0 or 1) filters tasks out of the active list while preserving the full history in the database.",
        },
        {
          title: "Computed Overdue Status",
          description:
            "Overdue is never stored in the database. A task counts as overdue if its due date has passed and its status is not Complete, calculated at read time rather than persisted.",
        },
        {
          title: "Isolated Test Suite",
          description:
            "Jest tests run against a separate throwaway database, so running tests never touches your real tasks. Covers CRUD operations, archiving behaviour and overdue computation.",
        },
      ],
      database_design: [
        {
          title: "Task Table",
          description:
            "Stores todo items with fields for title, description, due_date, topic, status (defaulting to 'Todo'), and archive (defaulting to 0 for active). The topic column stores the topic name directly rather than a foreign key, keeping queries simple at the cost of not cascading renames.",
        },
        {
          title: "Topics Table",
          description:
            "Holds a unique name and colour for each category. It is seeded with five defaults (Grocery, Assignments, Work, Health, Projects) on first creation. Each topic colour drives the visual styling in the UI.",
        },
        {
          title: "Design Trade-offs",
          description:
            "Storing topic name instead of a foreign key ID is a deliberate simplicity trade-off. Archiving uses a flag rather than deletion, matching the requirement that tasks can be archived but never deleted. Overdue status is computed, not stored, keeping the schema clean.",
        },
      ],
    },
  },
];


export const projectSummaries = projects.map(
  (p) => `${p.name}: ${p.overview}`
);

export const projectSummariesJson = JSON.stringify(projectSummaries);

export default projects;