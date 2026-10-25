# Google Search Central Complete AI Skill & Audit Studio

A complete, modular AI coding skill distilled from the entire Google Search Central documentation (`developers.google.com/search/docs`), paired with a granular `checklist.md` verification ledger and an interactive Skill Explorer, Coverage Tracker, and `.zip` Export Studio.

## User Review & Critical Decisions

> [!IMPORTANT]
> Review the confirmed architectural and scope choices from your clarifications below before we generate the full modular skill repository, exhaustive `checklist.md`, and interactive explorer app.

- **Skill Architecture (Confirmed)**: Modular `SKILL.md` entry point backed by deep, domain-organized reference markdown files (`references/`) so AI coding models load a crisp constitution first and route directly to exhaustive technical specifications without context truncation.
- **Documentation Coverage Scope (Confirmed)**: Full coverage of **Search Essentials**, **SEO Fundamentals**, **Crawling & Indexing**, **Ranking & Search Appearance**, and **Monitoring & Debugging**—including every single top-level page and nested accordion subpage from the Google Search Central sidebar (exceeding the 47-item baseline to ensure zero omitted subpages).
- **Technical Translation Format (Confirmed)**: Every Search Central guideline is translated into actionable, copy-ready engineering rules and code patterns across **Next.js (App Router / SSR)**, **React (Vite / SPA)**, and **Semantic HTML5 / HTTP Headers / JSON-LD**.
- **Workspace Companion Experience (Confirmed)**: Interactive **Skill Explorer, Live Checklist Tracker, and One-Click `.zip` Skill Package Exporter** allowing you to inspect every markdown file, filter rules by framework or documentation pillar, verify 100% completion against `checklist.md`, copy individual prompts, or download the ready-to-drop skill folder.

---

## 1. Overview & Core Concept

- **What It Does**:
  1. Generates a production-ready AI Skill package (`google-search-central`) structured with a master `SKILL.md` and 6 deep domain reference modules covering 100% of Google Search Central's sidebar hierarchy and nested accordions.
  2. Maintains a complete, auditable `checklist.md` mapping every Google Search Central documentation topic and nested subpage to its corresponding rule section, framework pattern, and verification status.
  3. Provides an interactive **Skill Explorer & Export Studio** web application that reads and renders the actual generated skill markdown files and `checklist.md`, featuring full-text rule search, framework code tabs (Next.js SSR, React SPA, HTML5/HTTP), interactive audit simulation, and instant `.zip` bundle download.
- **Target Audience / Persona**: AI engineers, technical SEO architects, and full-stack developers who want any AI coding agent (Claude Code, Cursor, AI Studio, Windsurf, custom agents) to build websites that strictly satisfy every Google Search Central requirement out of the box.
- **Key Value**: Eliminates blind spots in AI-generated websites (such as broken SPA hydration crawlability, invalid canonical signals, missing JSON-LD rich result schemas, soft-404 traps, Core Web Vitals layout shifts, or unverified crawl budgets) by turning 75+ official documentation pages and nested sub-guides into deterministic engineering rules.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Checklist & Coverage Matrix Flow**: Users land on a crisp workspace showing overall coverage across the 5 Search Central pillars (Search Essentials, SEO Fundamentals, Crawling & Indexing, Ranking & Search Appearance, Monitoring & Debugging), expandable accordion groups mirroring Google's exact sidebar, and direct deep-links from any checklist row to the exact rule in the skill files.
  2. **Modular Skill Reader & Code Pattern Flow**: Users browse `SKILL.md` and each `references/*.md` module in a clean split-pane documentation reader with table-of-contents navigation, syntax-highlighted Next.js / React SPA / HTML5 snippets, and one-click "Copy File" or "Copy System Prompt" actions.
  3. **Pre-Flight Site Audit & Export Flow**: Users can toggle project parameters (e.g., E-Commerce vs. SaaS vs. Editorial, Next.js SSR vs. React SPA, Multilingual) to generate a tailored pre-flight verification checklist, or click **Download Complete Skill (.zip)** to export the entire `google-search-central/` skill directory + `checklist.md` for immediate use in any AI coding environment.

- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Editorial Developer Console — crisp, authoritative technical documentation aesthetics inspired by modern engineering specifications, prioritizing scannability, zero visual clutter, and high information density.
  - *Color Palette & Mood*: Light-first neutral canvas (`#FFFFFF` primary surface, `#F8FAFC` structural sidebar surface, `#E2E8F0` 1px hairline dividers) with deep slate ink (`#0F172A` primary text, `#475569` secondary prose) and focused Search Blue (`#1A73E8` primary action accent) paired with semantic verification states (`#16A34A` Verified, `#D97706` Conditional/Framework-Specific, `#DC2626` Critical Ban).
  - *Typography & Hierarchy*: `Plus Jakarta Sans` for crisp structural headings and sidebar navigation, `Public Sans` for comfortable long-form technical specification reading (`15px`, `1.6` line-height, `70ch` measure), and `JetBrains Mono` (`tabular-nums`) for coverage counters, HTTP headers, and code blocks.
  - *Component Styling & Layout*: Full-viewport 1440px desktop SaaS/Documentation workspace (`260px` collapsible pillar & file sidebar + compliant 3-zone Top Bar + main viewport). Strict single-elevation depth with 1px borders, unboxed typographic metadata (`·` separators, zero decorative pills), and compact `40px` checklist rows.

- **Interactive Feedback & Motion**:
  - Instant `<150ms` client-side search across all 5 pillars, nested accordion subpages, and code snippets.
  - Smooth `opacity`/`transform` tab transitions, copy-to-clipboard confirmation states (`Copied!` feedback), and instant client-side `.zip` archive generation with download progress confirmation.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Modular Skill Architecture with Explicit Domain Routing**
  - *Chosen Approach*: A concise, high-authority `SKILL.md` (~300 lines) containing universal non-negotiable SEO invariants, a project-type routing matrix, and mandatory pre-flight checks, linked to 6 exhaustive domain reference files (`01-search-essentials.md`, `02-seo-fundamentals.md`, `03-crawling-and-indexing.md`, `04-ranking-and-appearance.md`, `05-structured-data-catalog.md`, `06-monitoring-and-debugging.md`).
  - *Why*: Monolithic 4,000-line skill files overwhelm LLM attention windows and cause agents to skip subtle rules in the middle of the prompt. Modular routing ensures 100% rule retention while keeping every single nested subpage documented in full technical detail.
  - *Alternatives Considered*: Single monolithic markdown file (rejected per user preference and LLM context efficiency).

- **Decision 2: Expanding the 47-Item Baseline to Include Every Nested Accordion Subpage**
  - *Chosen Approach*: Map all top-level sidebar items *plus* all nested sub-items inside every expandable accordion (`Search Essentials` -> Technical requirements, Spam policies; `Generative AI` -> AI content guidance, AI features; `Sitemaps`, `Crawler management`, `robots.txt`, `Canonicalization`, `AMP`, `JavaScript`, `Page & content metadata`, `Removals`, `Site moves`; `Local features`, `Page experience`, `Ranking systems`, `Ranking updates`, `Regional differences`, `Structured data`, `Translated features`, `Web Stories`; `Monitoring & debugging` -> Search Console, Traffic drops, Search operators, Security/Abuse) into an explicit, numbered ~75-item master ledger in `checklist.md`.
  - *Why*: Guarantees zero missed sub-rules under collapsed sidebar triangles while directly satisfying your requirement not to miss a single page or rule.

- **Decision 3: Single Source of Truth Between Disk Markdown Files and Explorer UI**
  - *Chosen Approach*: Import the actual raw markdown skill files and `checklist.md` directly into the Vite application (`?raw` imports) rather than duplicating content in JSON mocks.
  - *Why*: Ensures the web explorer, search engine, interactive checklist, and `.zip` downloader always serve the exact, verbatim skill files stored in the workspace.

---

## 4. Technical Architecture & Data Strategy

### Architecture & Component Diagram

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                     WORKSPACE SKILL & CHECKLIST ARTIFACTS                    │
│  /checklist.md (Master 75+ Subpage Verification Ledger)                      │
│  /google-search-central-skill/                                               │
│    ├── SKILL.md (Master AI Instructions, Routing Matrix & Pre-Flight Gate)   │
│    └── references/                                                           │
│         ├── 01-search-essentials.md      (Tech Reqs, Spam Policies)          │
│         ├── 02-seo-fundamentals.md       (Starter Guide, E-E-A-T, GenAI)     │
│         ├── 03-crawling-and-indexing.md  (URLs, Sitemaps, Robots, JS, Moves) │
│         ├── 04-ranking-and-appearance.md (CWV, Titles, Snippets, i18n, Media)│
│         ├── 05-structured-data-catalog.md(JSON-LD Schemas & Rich Results)    │
│         └── 06-monitoring-and-debugging.md(GSC, Operators, Security, Drops)  │
└──────────────────────────────────────┬───────────────────────────────────────┘
                                       │ Vite ?raw Imports (Single Source)
                                       ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                   SKILL EXPLORER & EXPORT STUDIO (React SPA)                 │
├──────────────────────┬───────────────────────────────────────────────────────┤
│ Top Bar (3-Zone)     │ Brand Wordmark  │  View Nav Links  │ Export .zip CTA  │
├──────────────────────┼───────────────────────────────────────────────────────┤
│ Left Sidebar (260px) │ Main Workspace Viewport                               │
│                      │                                                       │
│ • Skill Files Tree   │ ┌─ View 1: Interactive Checklist & Sidebar Mapper ──┐ │
│   - SKILL.md         │ │ • Pillar Progress Metrics (Tabular Counters)      │ │
│   - 01 Essentials    │ │ • Search & Pillar/Accordion Filter Controls       │ │
│   - 02 Fundamentals  │ │ • Expandable 75+ Subpage Audit Table -> Deep Link │ │
│   - 03 Crawling      │ └───────────────────────────────────────────────────┘ │
│   - 04 Appearance    │ ┌─ View 2: Modular Skill Reader & Code Explorer ────┐ │
│   - 05 JSON-LD       │ │ • Rendered Markdown Spec + Raw Source Toggle      │ │
│   - 06 Monitoring    │ │ • Framework Tabs: Next.js SSR | React SPA | HTML5 │ │
│                      │ │ • Copy File / Copy Section Prompt Handlers        │ │
│ • Pillar Quick Jump  │ └───────────────────────────────────────────────────┘ │
│ • Coverage Summary   │ ┌─ View 3: Project Stack Customizer & Prompt Builder┐ │
│                      │ │ • Select Stack (Next.js / SPA / HTML) & Site Type │ │
│                      │ │ • Generates Tailored Kickoff Prompt + .zip Bundle │ │
│                      │ └───────────────────────────────────────────────────┘ │
└──────────────────────┴───────────────────────────────────────────────────────┘
```

### Complete Coverage Map Across the 5 Core Areas

1. **Search Essentials (`01-search-essentials.md`)**:
   - Overview, Technical Requirements (Googlebot access, HTTP 200, indexable renderable content), and all Spam Policies (cloaking, doorways, hacked content, hidden text/links, keyword stuffing, link spam, machine-generated traffic, malware, misleading functionality, scraped content, sneaky redirects, scaled content abuse, site reputation abuse, expired domain abuse, user-generated spam, legal/policy removals).
2. **SEO Fundamentals (`02-seo-fundamentals.md`)**:
   - SEO Starter Guide, How Google Search Works (crawling, indexing, serving), Creating Helpful Reliable People-First Content (self-assessment, E-E-A-T, avoiding search-engine-first traps), Generative AI Fundamentals (using GenAI content responsibly, optimizing for AI Overviews & AI Mode), Maintaining Your Site's SEO, Developer's Guide to Search, Do You Need an SEO?, Guidance on Third-Party SEO Tools & Advice.
3. **Crawling and Indexing (`03-crawling-and-indexing.md`)**:
   - Overview, Indexable File Types, URL Structure (descriptive slugs, hyphens, parameter control, encoding), Links (crawlable `<a href>`, anchor text, `rel` attributes: `nofollow`/`ugc`/`sponsored`), Sitemaps (overview, build/submit XML, sitemap index, image/video/news extensions), Crawler Management (crawl budget for large sites, faceted navigation, Googlebot & extended user-agents, verifying Googlebot, HTTP status codes, network/DNS errors), `robots.txt` (intro, create, submit, update, RFC 9309 syntax interpretation), Canonicalization (what is URL canonicalization, `rel="canonical"` HTML/HTTP/sitemap methods, troubleshooting), Mobile Site & Mobile-First Indexing (responsive parity, viewport, lazy-load rules), AMP (guidelines, non-AMP migration/parity), JavaScript SEO (basics, dynamic rendering deprecation/SSR/ISR/hydration, fixing JS search issues, lazy-loading intersection observer/native `loading="lazy"`), Page & Content Metadata (valid `<head>` HTML, supported `<meta>` tags, `robots` meta & `X-Robots-Tag`, `data-nosnippet`), Removals (temporary Search Console removals, permanent `404`/`410`/`noindex`, SafeSearch explicit content filtering), Site Moves & Changes (site move with/without URL changes, 301/308 redirects, A/B website testing without cloaking, pausing/disabling a site with 503 `Retry-After`).
4. **Ranking and Search Appearance (`04-ranking-and-appearance.md` & `05-structured-data-catalog.md`)**:
   - Overview, AI Features & Your Website, Byline Dates (`datePublished`/`dateModified` visible parity), Favicons (`>=48x48px`, crawlable stable URL), Featured Snippets, Flexible Sampling (paywalls/metering JSON-LD to avoid cloaking), Google Discover (`max-image-preview:large` `>=1200px`), Images (responsive `<picture>`/`srcset`, alt text, landing pages), Local Features (`LocalBusiness`, NAP consistency), Page Experience (understanding page experience, Core Web Vitals: LCP `<=2.5s`, INP `<=200ms`, CLS `<=0.1`, HTTPS, avoiding intrusive interstitials/dialogs), Preferred Sources, Ranking Systems Guide (BERT, Crisis info, Deduplication, Exact match domain, Freshness, Helpful content, Link analysis/PageRank, Local news, MUM, Neural matching, Original content, Removal-based demotions, Page experience, Passage ranking, Product/Reviews system, RankBrain, Reliable info, Site diversity, SpamBrain), Ranking Updates, Regional Differences in Search Experience (EEA rich result & aggregator units), Search Profiles, Site Names (`WebSite` JSON-LD on homepage), Sitelinks & Sitelinks Search Box status, Snippets (`meta description`, `max-snippet`), Structured Data (Intro, General Guidelines, Enriched Search Results, Structured Data Gallery schemas in `05-structured-data-catalog.md`: Article, BreadcrumbList, Carousel, Course, Dataset, DiscussionForumPosting, Education Q&A, EmployerAggregateRating, Event, FactCheck, FAQPage, ImageMetadata, JobPosting, LocalBusiness, MathSolvers, Movie, Organization, PracticeProblems, Product/Merchant/Variants, ProfilePage, QAPage, Recipe, ReviewSnippet, SoftwareApplication, Speakable, Subscription/Paywalled, VacationRental, VideoObject), Title Links (`<title>` hygiene, avoiding truncation/boilerplate), Translated Features (managing `hreflang` localized versions, multi-regional sites, translated results, Google Translate opt-outs, ad networks & translation), Videos (VideoObject, key moments `Clip`/`SeekToAction`, crawlable thumbnails), Visual Elements Gallery, Web Stories, Early Adopters Program / Search Labs.
5. **Monitoring and Debugging (`06-monitoring-and-debugging.md`)**:
   - Getting Started with Search Console (domain verification, sitemap submission, URL Inspection workflow), Debugging Drops in Search Traffic (algorithmic vs. technical vs. seasonal vs. manual action decision tree), Monitoring Search Performance & Bubble Charts, Debugging with Search Operators (`site:`, `filetype:`, image search operators), Preventing & Monitoring Abuse / Security Issues (malware, unwanted software, hacked sites, preventing user-generated comment/profile spam, safe downloadable software).

### Interactive Component & State Mapping

- **Global Workspace State**: Tracks active navigation view (`checklist` | `explorer` | `builder`), selected skill file ID, search filter string, active pillar filter (`all` | `essentials` | `fundamentals` | `crawling` | `appearance` | `monitoring`), and active framework code filter (`nextjs` | `react-spa` | `html5`).
- **Checklist Verification Tracker**: Parses `/checklist.md` directly into structured pillar groups and accordion sub-items, allowing live search, status filtering, local audit check-off persistence (`localStorage`) for developer project audits, and one-click "Jump to Rule in Skill" navigation that switches to the Explorer view and scrolls to the exact heading.
- **ZIP Archive Generator**: Uses `jszip` client-side to bundle `SKILL.md`, all `references/*.md` files, and `checklist.md` into a clean `google-search-central-skill.zip` download via Blob URL without requiring external servers.
