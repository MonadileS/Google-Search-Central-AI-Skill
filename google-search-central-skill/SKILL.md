---
name: "google-search-central"
description: >-
  Complete, authoritative technical SEO constitution distilled from 100% of
  Google Search Central documentation (Search Essentials, SEO Fundamentals,
  Crawling & Indexing, Ranking & Search Appearance, Structured Data, and
  Monitoring & Debugging). Use when architecting, building, refactoring, or
  auditing any web application (Next.js App Router/SSR, React/Vite SPA, or
  HTML5) so that every single page, route, asset, header, and schema conforms
  strictly to Google Search best practices with zero ranking blind spots.
---

# Google Search Central Complete AI Engineering Skill

You are building or modifying a web application that MUST achieve peak organic discoverability, rendering fidelity, rich-result eligibility, and ranking resilience on Google Search. Every rule in this skill translates official **Google Search Central** (`developers.google.com/search/docs`) documentation into deterministic code requirements. Never treat SEO as an afterthought or post-launch patch - architectural compliance starts at route design, HTML semantics, server headers, and hydration strategy.

---

## 1. Mandatory Reference Routing Protocol

Before writing route layouts, `<head>` metadata, sitemaps, `robots.txt`, data-fetching logic, or UI components, consult the domain reference modules in `references/` corresponding to the task scope:

| Module File | Official Search Central Pillars & Subpages Covered | When You MUST Load This Module |
| :--- | :--- | :--- |
| [`references/01-search-essentials.md`](references/01-search-essentials.md) | **Search Essentials**: Overview, Technical Requirements (Googlebot access, HTTP 200, indexable content), and all 16 Spam Policies (Cloaking, Doorways, Scaled Content Abuse, Site Reputation Abuse, Expired Domain Abuse, Hidden Text, Link Spam, Sneaky Redirects, Scraped Content, UGC Spam, Malware, Legal Removals). | **Every new project kickoff**, auth/paywall gates, programmatic page generation, UGC/comments, affiliate/sponsored links, or redirect handlers. |
| [`references/02-seo-fundamentals.md`](references/02-seo-fundamentals.md) | **SEO Fundamentals**: SEO Starter Guide, How Google Search Works, Creating Helpful Reliable People-First Content (E-E-A-T), Generative AI Fundamentals (GenAI content rules + AI Overviews / AI Mode), Maintaining Site SEO, Developer's Guide to Search, Do You Need an SEO?, Third-Party SEO Tools Guidance. | **Information architecture**, copywriting, author attribution, AI-assisted content features, heading hierarchy, and site structure planning. |
| [`references/03-crawling-and-indexing.md`](references/03-crawling-and-indexing.md) | **Crawling & Indexing**: Indexable File Types, URL Structure, Crawlable Links, Sitemaps (XML, Index, Image, Video, News), Crawler Management (Crawl Budget, Faceted Nav, User-Agents, HTTP Status Codes, Network/DNS), `robots.txt` (RFC 9309), Canonicalization, Mobile-First Indexing, AMP, JavaScript SEO (SSR/ISR/SPA Hydration, Lazy-Loading), Page & Content Metadata (`meta`, `X-Robots-Tag`, `data-nosnippet`), Removals & SafeSearch, Site Moves & A/B Testing. | **Routing, URL design, sitemaps, `robots.txt`, SSR vs. SPA rendering**, pagination, filter/search parameters, canonical tags, migrations, and status codes. |
| [`references/04-ranking-and-appearance.md`](references/04-ranking-and-appearance.md) | **Ranking & Search Appearance**: AI Features, Byline Dates, Favicons, Featured Snippets, Flexible Sampling, Google Discover, Images, Local Features, Page Experience (Core Web Vitals: LCP, INP, CLS, HTTPS, Intrusive Interstitials), Preferred Sources, Ranking Systems & Updates, Regional Differences (EEA), Search Profiles, Site Names, Sitelinks, Snippets, Title Links, Translated Features (`hreflang`), Videos, Visual Elements Gallery, Web Stories, Early Adopters. | **Frontend UI components, `<title>` & `<meta description>` generation, Core Web Vitals optimization**, images/videos, favicons, localization (`hreflang`), and paywalls. |
| [`references/05-structured-data-catalog.md`](references/05-structured-data-catalog.md) | **Structured Data (JSON-LD)**: General Technical & Quality Guidelines, Rich Result Eligibility, and production-ready JSON-LD schemas across all active Google Rich Result types (`WebSite`, `Organization`, `BreadcrumbList`, `Article`, `Product` + Merchant/Variants, `LocalBusiness`, `FAQPage`, `QAPage`, `DiscussionForumPosting`, `SoftwareApplication`, `VideoObject`, `Event`, `JobPosting`, `Recipe`, `Course`, `Dataset`, `ProfilePage`, `Review`, `Subscription`, `VacationRental`, `Speakable`, Math/Practice). | **Implementing `<script type="application/ld+json">`** on homepages, articles, e-commerce products, SaaS apps, forums, local businesses, jobs, events, or media pages. |
| [`references/06-monitoring-and-debugging.md`](references/06-monitoring-and-debugging.md) | **Monitoring & Debugging**: Search Console Setup & Verification, URL Inspection Workflow, Performance & Bubble Charts, Debugging Search Traffic Drops (Technical vs. Algorithmic vs. Manual Action), Search Operators (`site:`, `filetype:`, `src:`), Security Issues, Malware Prevention, Safe Software Downloads, Preventing User-Generated Spam. | **Post-build verification, Search Console ownership tags**, security hardening, CSP/HTTPS headers, debugging indexing drops, and UGC anti-spam defenses. |

---

## 2. Ten Non-Negotiable Universal Invariants

Regardless of framework (Next.js App Router, Remix, Astro, React/Vite SPA, or static HTML5), **NEVER violate** any of these 10 core Google Search Central invariants:

### Invariant 1: Crawlable `<a href>` Navigation Only
Googlebot discovers URLs primarily by parsing standard `<a href="/valid-url">` elements with resolved `href` attributes.
- **BANNED**: `<div onClick={() => router.push('/pricing')}>`, `<button onClick={navigate}>`, `<a onClick={...}>` without `href`, or `<a href="javascript:void(0)">` for page navigation.
- **REQUIRED**: Every internal and external page link MUST render a real `<a href="...">` in the DOM with descriptive, specific anchor text (never `"click here"` or `"read more"`).

### Invariant 2: Zero Cloaking & Full Mobile-First Parity
Google indexes the web almost exclusively with **Googlebot Smartphone**.
- Serve identical primary content, structured data, `<title>`, `<meta>` tags, headings, and crawlable links on mobile and desktop viewports.
- Never hide primary content from mobile users while exposing it on desktop, and never serve one payload to user-agents matching `Googlebot` and a different payload to human browsers.

### Invariant 3: Explicit Self-Referencing Canonicalization & Clean URLs
Every indexable page MUST declare a single unambiguous canonical URL (`<link rel="canonical" href="https://example.com/clean-slug" />`).
- Use lowercase, hyphen-separated (`-`, never underscores `_`) human-readable path slugs (`/mens-trail-running-shoes`, not `/prod?id=883&cat=4`).
- Never block a canonicalized target in `robots.txt` and never combine `<meta name="robots" content="noindex">` with a canonical pointing elsewhere.

### Invariant 4: `robots.txt` Controls Crawling, NOT Indexing
- Never use `Disallow:` in `robots.txt` expecting to remove or hide a sensitive or duplicate URL from Google Search results; if other sites link to a disallowed URL, Google can still index the URL without crawling it.
- To prevent indexing, serve `<meta name="robots" content="noindex" />` or HTTP `X-Robots-Tag: noindex` **and allow Googlebot to crawl the URL** so it can read the `noindex` directive (or protect private routes with real HTTP `401`/`403` authentication).
- Never disallow `/_next/static/`, `/assets/`, `.js`, or `.css` bundles required by Google's Web Rendering Service (WRS) to render page layout and mobile usability.

### Invariant 5: Eliminate Soft-404s & Return True HTTP Status Codes
- Missing records, deleted products, or empty dynamic slugs MUST return HTTP `404` or `410` on SSR/static servers.
- In client-side React SPAs where the static host serves `index.html` with `200 OK` for unknown routes, you MUST inject `<meta name="robots" content="noindex" />` dynamically into `<head>` immediately when a "Not Found" route or empty fatal error state renders, preventing Soft-404 index pollution.

### Invariant 6: Unique, Un-Truncated `<title>` & `<meta name="description">` Per URL
- Every distinct indexable URL requires a unique `<title>` (30-60 characters, specific page topic first, brand name separated cleanly: `Primary Page Subject - Brand Name`) and a unique `<meta name="description">` (120-160 characters summarizing true page content).
- Never leave framework boilerplate (`Vite + React`, `Create Next App`, `Home`) or duplicate identical titles across paginated or parameterized views.

### Invariant 7: Visible Parity in JSON-LD Structured Data
- All Schema.org properties declared inside `<script type="application/ld+json">` MUST accurately reflect content visibly rendered to human readers on that exact page.
- Never inject `AggregateRating`, `FAQPage`, `Product` pricing, or `Event` dates in JSON-LD that are absent from the visible page DOM - doing so triggers Manual Actions for spammy structured data.

### Invariant 8: Core Web Vitals & Zero Intrusive Interstitials by Design
Engineer every page to pass Google's Page Experience thresholds at the 75th percentile of real field traffic:
- **LCP (Largest Contentful Paint) $\le 2.5\text{s}$**: Eager-load the hero image (`fetchPriority="high"`, `loading="eager"`, never `loading="lazy"` on above-the-fold LCP elements) and server-render primary hero text without client-fetch waterfalls.
- **INP (Interaction to Next Paint) $\le 200\text{ms}$**: Yield long main-thread tasks, avoid massive synchronous hydration payloads, and provide immediate visual state feedback.
- **CLS (Cumulative Layout Shift) $\le 0.1$**: Declare explicit `width` and `height` or CSS `aspect-ratio` on every `<img>`, `<video>`, iframe, and ad/embed slot; use `font-display: swap` or `optional` with metric-matched fallback fonts; never insert banners above existing content after paint.
- **No Intrusive Dialogs**: Never cover primary content on arrival or navigation with full-screen newsletter/promo modals; keep legal/age gates strictly compliant and cookie banners compact.

### Invariant 9: High-Resolution Media & Google Discover Readiness
- Include `<meta name="robots" content="max-image-preview:large" />` on indexable editorial/product pages and supply crisp, crawlable images at least `1200px` wide using standard `<img src="..." alt="...">` or `<picture>` elements (never rely solely on CSS `background-image` for content imagery).
- Provide a square favicon that is a multiple of `48px` (`48x48`, `96x96`, `144x144`, or vector SVG) on a stable, crawlable URL.

### Invariant 10: People-First Content & Zero Scaled Abuse
- Every generated page, guide, tool, or programmatic route must deliver genuine, original utility (E-E-A-T: Experience, Expertise, Authoritativeness, Trustworthiness) with clear authorship, transparent organization identity, and accurate byline dates (`<time datetime="ISO-8601">`).
- Never generate doorway networks, keyword-stuffed footer blocks, scraped/unreviewed AI filler pages, or unmoderated indexable user-generated spam paths.

---

## 3. Framework Implementation Matrix

Apply the right architectural pattern based on the target stack:

### Stack A: Next.js (App Router / SSR / SSG / ISR) - *Gold Standard for Public Search*
1. **Metadata API**: Export `metadata` or async `generateMetadata()` in every `app/**/page.tsx` defining `metadataBase`, `title`, `description`, `alternates.canonical`, `alternates.languages` (`hreflang`), `openGraph`, and `robots: { index: true, follow: true, maxImagePreview: 'large' }`.
2. **Programmatic Sitemap & Robots**: Implement `app/sitemap.ts` (including only `200 OK` canonical URLs with accurate `lastModified` dates) and `app/robots.ts` pointing `sitemap` to `${APP_URL}/sitemap.xml`.
3. **True HTTP Not Found**: Invoke `notFound()` from `next/navigation` inside Server Components when a slug lookup fails so the server emits a real `404` status code.
4. **Server-Rendered Content & JSON-LD**: Render primary `<main>`, `<h1>`, internal `<Link href="...">` tags, and `<script type="application/ld+json">` inside React Server Components so initial HTML contains 100% of indexable content prior to client JS execution.

### Stack B: React / Vite SPA (Client-Side Rendered or Hybrid Express + Vite)
1. **Initial `index.html` Baseline**: Populate `/index.html` `<head>` with accurate production `<title>`, `<meta name="description">`, `<link rel="canonical">`, favicon (`>=48x48`), OpenGraph tags, and root `WebSite` / `Organization` JSON-LD.
2. **Route-Level Head Synchronization**: Use a dedicated `<SEOHead />` hook/component (or `react-helmet-async` / React 19 native `<title>` & `<meta>` hoisting) that updates `document.title`, `<meta name="description">`, `<link rel="canonical">`, and route-specific JSON-LD synchronously upon route mount.
3. **Client-Side Soft-404 Guard**: In catch-all `*` 404 components and empty-result dynamic views, immediately render `<meta name="robots" content="noindex" />` into `document.head` so Google's Web Rendering Service drops invalid SPA URLs.
4. **History API Routing Only**: Always use standard path URLs (`/products/camera`) via HTML5 History API (`BrowserRouter`), **never hash routing** (`/#/products/camera`), because Googlebot ignores URL fragments (`#...`) for indexing distinct pages.
5. **Express Server Enhancement (Full-Stack Apps)**: When `server.ts` serves the production build, inject route-specific `<title>`, `<meta>`, canonical tags, and HTTP `404` status codes into the HTML template before sending the response whenever dynamic database slugs are requested.

### Stack C: Semantic HTML5 / Static Multi-Page Sites
1. **Strict `<head>` Hygiene**: Place ONLY valid metadata elements (`<title>`, `<meta>`, `<link>`, `<script>`, `<style>`, `<base>`, `<noscript>`) inside `<head>`. Never place `<div>`, `<img>`, or `<iframe>` inside `<head>` - invalid tags prematurely close `<head>` in HTML5 parsers, causing Googlebot to ignore subsequent `<meta name="robots">` or `<link rel="canonical">` tags!
2. **Landmark & Heading Architecture**: One clear `<main>` per document, semantic `<header>`, `<nav>`, `<article>`, `<aside>`, `<footer>`, and a logical heading hierarchy anchored by a primary `<h1>` aligned with the `<title>`.

---

## 4. Mandatory Pre-Flight SEO Audit Gate

Before concluding any web build or feature task, silently run this 12-point verification gate:

- [ ] **1. Crawlability**: `robots.txt` permits Googlebot access to all public pages and all JS/CSS/image assets; XML sitemap lists only canonical `200 OK` URLs.
- [ ] **2. URL & Link Hygiene**: Clean lowercase hyphenated paths; History API routing (zero `#/` hash routes); 100% of navigation uses `<a href="...">` with descriptive anchor text; outbound paid/UGC links carry `rel="sponsored"` or `rel="ugc"`.
- [ ] **3. Head Integrity**: Zero invalid HTML elements inside `<head>`; unique `<title>` (30-60 chars) and `<meta name="description">` (120-160 chars) per route; `max-image-preview:large` enabled.
- [ ] **4. Canonical & Localization**: Self-referencing `<link rel="canonical">` on every indexable page; bidirectional `hreflang` + `x-default` if multilingual.
- [ ] **5. Status Codes & Soft-404 Protection**: Missing routes return HTTP `404`/`410` (or inject `noindex` immediately in pure CSR SPAs); temporary maintenance uses `503` + `Retry-After`; permanent moves use `301`/`308`.
- [ ] **6. Mobile-First Parity**: Responsive `<meta name="viewport" content="width=device-width, initial-scale=1">`; full content/schema/link parity between mobile and desktop; lazy-loaded content uses native `loading="lazy"` or IntersectionObserver (never gated behind scroll/click events).
- [ ] **7. Core Web Vitals**: LCP hero image uses `fetchPriority="high"` without `loading="lazy"`; all media declares explicit `width`/`height` or `aspect-ratio` (`CLS <= 0.1`); event handlers stay non-blocking (`INP <= 200ms`); zero arrival interstitial popups.
- [ ] **8. Media & Favicon**: Square `>=48x48px` favicon at stable crawlable URL; descriptive `alt` text on all `<img>` tags; dedicated crawlable `VideoObject` metadata for embedded key videos.
- [ ] **9. JSON-LD Structured Data**: Valid Schema.org JSON-LD matching visible page content (`WebSite` Site Name on homepage + domain-appropriate `Article`, `Product`, `SoftwareApplication`, `LocalBusiness`, `BreadcrumbList`, etc.).
- [ ] **10. Dates & E-E-A-T**: Clear organization/author identity, visible publication/update dates matching ISO-8601 `datePublished` / `dateModified` in JSON-LD.
- [ ] **11. Spam Policy Compliance**: Zero cloaking, zero doorway pages, zero hidden keyword text, zero unreviewed scaled AI filler, and `noindex` applied to internal site-search result pages.
- [ ] **12. Security & Monitoring**: HTTPS enforced across all canonical URLs and assets (zero mixed content), safe download links, and Search Console verification readiness.
