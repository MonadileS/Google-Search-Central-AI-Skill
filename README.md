# Google Search Central - Complete AI Skill & Audit Studio

An exhaustive, modular AI coding skill distilled from **100% of the official [Google Search Central documentation](https://developers.google.com/search/docs)** - paired with an 80-point master verification ledger (`checklist.md`) and an interactive web studio for exploring rules, generating stack-specific kickoff prompts, and exporting `.zip` skill bundles.

When dropped into any AI coding environment (Claude Code, Cursor, Windsurf, Cline, or custom LLM agents), this skill instructs the model to engineer routes, `<head>` metadata, crawlable links, sitemaps, `robots.txt`, Core Web Vitals, localization (`hreflang`), and XSS-safe JSON-LD schemas to exact Google Search specifications from day one.

---

## How It Works

Instead of feeding an LLM a bloated single file that suffers from middle-context loss, this project uses a **two-tier modular skill architecture**:

1. **Entry Constitution (`google-search-central-skill/SKILL.md`)**: Loaded first by the AI agent. Enforces **10 non-negotiable universal SEO invariants**, maps framework patterns (**Next.js App Router/SSR**, **React/Vite SPA**, and **Semantic HTML5**), routes the agent to domain modules based on the task, and runs a **12-point pre-flight verification gate** before completion.
2. **6 Deep Reference Modules (`google-search-central-skill/references/*.md`)**: Loaded on demand for specific architectural tasks - covering all 5 Google Search Central sidebar pillars and every nested accordion subpage (`80/80` rules verified in [`checklist.md`](./checklist.md)).
3. **Interactive Studio (`src/`)**: A React + Vite single-source-of-truth web interface that imports the raw markdown files directly (`?raw`) so you can search rules, track live site audits, customize kickoff prompts, and export a ready-to-drop `.zip` archive.

---

## Documentation Coverage (`80 / 80` Pages & Subpages)

| Module | Google Search Central Pillar | Key Topics Covered |
| :--- | :--- | :--- |
| **`SKILL.md`** | Master Constitution | Domain routing matrix, 10 universal invariants, Next.js / React SPA / HTML5 patterns, 12-point pre-flight check |
| **`01-search-essentials.md`** | Search Essentials | Googlebot access, HTTP `200 OK`, renderable DOM, and engineering guardrails for all **16 Spam Policies** |
| **`02-seo-fundamentals.md`** | SEO Fundamentals | How Search works (Crawl/Index/Serve), Starter Guide, E-E-A-T, GenAI content rules, AI Overviews & AI Mode |
| **`03-crawling-and-indexing.md`** | Crawling & Indexing | Clean URL slugs, crawlable `<a href>`, `rel` attributes, XML/Image/Video/News sitemaps, crawl budget, faceted nav, `robots.txt` (RFC 9309), canonicals, JS SEO, `<head>` validity, removals, site moves & `503` pauses |
| **`04-ranking-and-appearance.md`** | Ranking & Appearance | Title links, snippets, Site Names, `>=48px` favicons, Core Web Vitals (`LCP`, `INP`, `CLS`), interstitials, Discover (`max-image-preview:large`), Images, Video Key Moments, Flexible Sampling & `hreflang` |
| **`05-structured-data-catalog.md`** | Structured Data (JSON-LD) | XSS-safe JSON-LD helper, visible parity rules, retired schema awareness, and **20+ active Rich Result templates** |
| **`06-monitoring-and-debugging.md`** | Monitoring & Debugging | Search Console verification, Live URL Inspection, 5-pattern traffic drop diagnostics, `site:`/`src:` operators & security |

---

## Quick Start (Web Studio)

### Prerequisites
- **Node.js** `v18+` (recommended `v20+`)
- **npm** `v9+`

### Installation & Local Development

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>

# 2. Install dependencies
npm install

# 3. Start the interactive studio at http://localhost:3000
npm run dev
```

### Available Scripts

```bash
npm run dev      # Start local Vite dev server on port 3000
npm run build    # Build production static bundle into dist/
npm run preview  # Preview the production build locally
npm run lint     # Run TypeScript type-checking (tsc --noEmit)
```

---

## How to Use the AI Skill in Your Projects

You do **not** need to run the web app just to use the skill - you can either copy the `/google-search-central-skill` folder directly from this repository or click **Download Skill (.zip)** inside the web studio.

### Option 1: Claude Code / Agent Skills Directory
Copy the skill folder into your global or project-level skills directory:

```bash
# Project-level Claude Code skill
mkdir -p .claude/skills
cp -r google-search-central-skill .claude/skills/google-search-central
```

### Option 2: Cursor / Windsurf / Workspace Rules
Copy the folder into your project workspace and reference `SKILL.md` in `.cursorrules` or `.windsurf/rules`:

```bash
cp -r google-search-central-skill ./skills/google-search-central
```

### Option 3: Project Kickoff System Prompt
At the start of a new build or SEO audit, instruct your AI coding model:

> *"Read `skills/google-search-central/SKILL.md` and consult its `references/` modules before designing routes, metadata, links, sitemaps, `robots.txt`, structured data, or UI components. Pass all 12 checks in the Pre-Flight SEO Audit Gate before finishing."*

*(Tip: Open the **Prompt & Export** tab in the web studio to generate a customized kickoff prompt tailored to Next.js SSR, React SPA, or HTML5, plus E-Commerce, SaaS, Editorial, Multilingual, or Paywall rules.)*

---

## Repository Structure

```text
├── checklist.md                          # 80-point Google Search Central verification ledger
├── google-search-central-skill/          # Standalone portable AI Skill package
│   ├── SKILL.md                          # Master AI instructions, routing & pre-flight gate
│   └── references/                       # 6 deep technical SEO specification modules (01-06)
├── src/                                  # Interactive Skill Explorer, Audit Tracker & Exporter
│   ├── components/                       # ChecklistTracker, SkillExplorer, PromptBuilder, MarkdownViewer
│   ├── data/skillData.ts                 # Single-source-of-truth ?raw markdown loader & parser
│   └── utils/zipExport.ts                # Client-side JSZip bundle & single-file exporter
├── index.html
├── package.json
└── vite.config.ts
```

---

## License

Apache-2.0
