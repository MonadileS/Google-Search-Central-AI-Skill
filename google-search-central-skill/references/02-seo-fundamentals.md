# 02. SEO Fundamentals

Official Source: `https://developers.google.com/search/docs/fundamentals`

This module covers every page in Google Search Central's **SEO Fundamentals** section, including the SEO Starter Guide, How Google Search Works, Creating Helpful Reliable People-First Content, Generative AI Fundamentals (both using GenAI content and appearing in AI Overviews / AI Mode), Maintaining Your Site's SEO, Developer's Guide to Search, Do You Need an SEO?, and Guidance on Third-Party SEO Tools.

---

## 2.1 How Google Search Works

Google Search operates in **three distinct, asynchronous stages** - not in real time when a user types a query. Every architectural decision must support all three stages:

1. **Crawling (Discovery & Fetching)**:
   - Googlebot discovers URLs by following `<a href>` links from known pages and reading submitted XML sitemaps.
   - Googlebot fetches HTML and referenced resources (JS, CSS, images), dynamically adjusting crawl rate so it doesn't overwhelm your origin server (`5xx` responses cause Googlebot to throttle down immediately).
2. **Indexing (Parsing, Rendering & Canonical Selection)**:
   - Google parses HTML `<head>` and `<body>` content.
   - Pages requiring JavaScript enter the **Web Rendering Service (WRS)** queue (evergreen headless Chromium), executing client-side JS and inspecting the rendered DOM.
   - Google clusters duplicate or near-duplicate URLs and selects **one Canonical URL** per cluster to index, extracting text, headings, structured data, language, images, and videos.
3. **Serving Search Results (Ranking & Appearance)**:
   - When a user searches, automated ranking systems evaluate query intent, meaning, relevance, content quality (E-E-A-T), usability (Page Experience), and context (location, language) to return the best results, enhanced with eligible Rich Snippets or AI Overviews.

---

## 2.2 SEO Starter Guide - Core Engineering Rules

Distilled from Google's official *SEO Starter Guide*:

1. **Help Google Find Your Content**:
   - Ensure every important page is reachable via at least one static/rendered `<a href>` link from another indexable page on your site (zero orphan pages).
   - Provide an XML sitemap for large sites, new sites with few external links, or media-rich archives.
2. **Organize Your Site Logically (Directory & URL Hierarchy)**:
   - Group topically related pages into logical directories (`/docs/crawling/`, `/products/footwear/`). Not only does this help users understand context from breadcrumbs, it also lets Google infer how often different sections change (e.g., `/daily-deals/` vs `/about/`).
3. **Reduce Duplicate Content**:
   - Ensure each piece of content lives at **one** canonical URL. Redirect `http://` -> `https://` and non-preferred hostnames (`www` vs apex) via permanent `301`/`308` redirects; use `<link rel="canonical">` when URL parameters (`?utm_source=...`, `?color=blue`) render the same core item.
4. **Make Your Site Interesting and Useful**:
   - Readable typography, clear visual hierarchy, zero distracting ad clutter above the fold, up-to-date facts, and natural language matching how real users phrase concepts (avoid inventing obscure brand jargon for standard product categories without also using plain-English terms).
5. **Control Title Links and Snippets**:
   - Craft concise, unique `<title>` tags and informative `<meta name="description">` summaries per page (detailed in Module 04).
6. **Promote Your Website Naturally**:
   - Build shareable tools, original research, documentation, and local profiles rather than artificial link schemes.
7. **Things NOT to Obsess Over (Debunked SEO Myths)**:
   - **`<meta name="keywords">`**: Completely ignored by Google Search. Never waste tokens generating `meta keywords`.
   - **Keyword Density Formulas**: There is no magic keyword count or percentage; natural topical completeness wins.
   - **Minimum/Maximum Word Count**: Google has no preferred word count - a concise 250-word calculator page with accurate guidance can outrank a bloated 3,000-word fluff article.
   - **Domain TLD Myths**: `.ai`, `.io`, `.app`, `.dev` are treated as generic top-level domains (gTLDs) just like `.com` (whereas country-code TLDs like `.de` or `.jp` signal country targeting).
   - **Heading Order Strictness (`h2` vs `h3` for Ranking)**: Semantic headings (`<h1>` -> `<h2>` -> `<h3>`) are vital for screen-reader accessibility and content structure scannability, though minor out-of-order subheadings don't break Google indexing. Still, enforce clean `<h1>` -> `<h2>` -> `<h3>` discipline for WCAG + Featured Snippet clarity.

---

## 2.3 Creating Helpful, Reliable, People-First Content (E-E-A-T)

Google's automated ranking systems are designed to reward content made primarily to benefit people, not to game search rankings.

### Content & Quality Self-Assessment Checklist
When generating copy, landing pages, documentation, or editorial layouts in an app, enforce these structural qualities:
- **Originality & Substance**: Provide original information, real calculations, concrete benchmarks, or comprehensive synthesis beyond copying obvious facts.
- **Headline Honesty**: Never generate clickbait, exaggerated shock titles, or misleading promises in `<h1>` or `<title>`.
- **Complete Satisfaction**: Leave the reader feeling they have learned enough to achieve their goal without pogo-sticking back to Search.

### Architecting for E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
**Trust** is the single most important member of the E-E-A-T family (especially for **YMYL - Your Money or Your Life** topics: health, finance, civic/legal, safety, e-commerce checkout). Build visible trust signals directly into the UI:
1. **Clear "Who" Attribution**:
   - Include an accessible `/about` and `/contact` section or footer transparency identifying who operates the site.
   - On articles, guides, and reviews, render clear **Author Bylines** linking to an author profile (`ProfilePage` / `Person` schema) detailing credentials and first-hand experience.
2. **Clear "How" Transparency**:
   - When displaying product comparisons, benchmarks, ratings, or AI-assisted summaries, explain *how* products were tested, how scores were calculated, or where data originated.
3. **Clear "Why" Purpose**:
   - Build every page around solving a human user's task first - never create pages purely because a keyword has high search volume when the site has zero domain relevance to offer.

```tsx
// ✅ Next.js / React E-E-A-T Author & Editorial Transparency Block
export function ArticleByline({
  authorName,
  authorRole,
  authorUrl,
  publishedIso,
  updatedIso,
  methodologyNote,
}: {
  authorName: string;
  authorRole: string;
  authorUrl: string;
  publishedIso: string;
  updatedIso?: string;
  methodologyNote?: string;
}) {
  return (
    <div className="border-y border-slate-200 py-3 my-6 text-sm text-slate-600 flex flex-wrap items-center gap-x-3 gap-y-1">
      <span>
        By <a href={authorUrl} rel="author" className="font-medium text-slate-900 underline">{authorName}</a> ({authorRole})
      </span>
      <span aria-hidden="true">·</span>
      <span>
        Published <time dateTime={publishedIso}>{new Date(publishedIso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
      </span>
      {updatedIso && (
        <>
          <span aria-hidden="true">·</span>
          <span>
            Updated <time dateTime={updatedIso}>{new Date(updatedIso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
          </span>
        </>
      )}
      {methodologyNote && (
        <p className="w-full text-xs text-slate-500 mt-1">{methodologyNote}</p>
      )}
    </div>
  );
}
```

---

## 2.4 Generative AI Fundamentals

Google Search Central divides Generative AI guidance into two distinct sub-topics:

### Subpage A: Google Search's Guidance on Using Generative AI Content
- **Policy Stance**: Google rewards high-quality content *however it is produced*. Using AI to assist with research, structuring, translation, or drafting is **not** inherently against guidelines.
- **What IS Prohibited**: Using generative AI to produce many pages without adding value for users (**Scaled Content Abuse**).
- **Mandatory Engineering Guardrails for AI-Generated Content**:
  1. **Fact-Checking & Hallucination Prevention**: LLMs predict tokens rather than verify truth. Never auto-publish unverified AI medical, financial, legal, or factual copy, or let unreviewed LLMs hallucinate inaccurate `<title>` / `<meta description>` claims.
  2. **Disclosure When Expected**: Disclose automation/AI usage clearly when readers would reasonably expect to know *how* content was created (e.g., synthetic journalism, automated data summaries). Do not fabricate fake human author personas with AI-generated stock headshots pretending to have personal lived experience.

### Subpage B: AI Features and Your Website (AI Overviews & AI Mode)
Google's generative search experiences (**AI Overviews** and **AI Mode**) use **query fan-out** (issuing multiple related sub-queries across subtopics and data sources) grounded in Google's core Search index and ranking systems.
- **No Special "AI Meta Tags" Required**: You do **not** need custom `ai.txt` files, `llms.txt` proprietary schemas, or special AI-only markup to appear as a cited link in AI Overviews or AI Mode. Standard Search Essentials, crawlability, E-E-A-T, structured data matching visible text, and fresh, multi-faceted content directly power visibility.
- **Technical Eligibility Checklist for AI Overviews & AI Mode**:
  1. Page is indexed (`200 OK`, no `noindex`, Googlebot allowed).
  2. Core content is present as clean text in the rendered HTML DOM (supported by high-resolution images/videos and Merchant Center / Business Profile feeds where applicable).
  3. Internal links allow crawlers to traverse deep supporting guides that answer nuanced follow-up questions (query fan-out targets).
- **Controlling Inclusion in AI Features**:
  - Standard preview controls (`nosnippet`, `data-nosnippet`, `max-snippet:[number]`, `noindex`) govern whether and how much of your page content can be excerpted in Search snippets *including* AI Overviews and AI Mode. (Note: `Google-Extended` in `robots.txt` controls Gemini API grounding / Vertex AI model training opt-outs, *not* core Google Search indexing or AI Overviews - use snippet controls if restricting Search display).

---

## 2.5 Maintaining Your Site's SEO

SEO is ongoing lifecycle engineering rather than a one-time setup:
1. **Routine Health Cadence**: Monitor Search Console coverage, Core Web Vitals regressions after dependency upgrades, broken internal links, and expiring TLS certificates.
2. **Refreshing Decaying Content**: Update outdated tutorials, year-sensitive guides, discontinued product inventory (keep seasonal URLs alive year-over-year at stable slugs like `/black-friday-deals` rather than `/black-friday-2025` -> `/black-friday-2026`), and verify `dateModified` only updates when meaningful content edits occur.
3. **Planning Redesigns & Migrations Early**: Map URL redirects 1-to-1 *before* shipping route refactors (see Module 03.12).

---

## 2.6 Developer's Guide to Search

Key takeaways tailored specifically for software engineers building web apps:
- **Understand the HTML Contract**: View *Rendered HTML* (not just `View Source` raw HTML or React DevTools component trees) to verify what Google's Chromium renderer actually sees without cookies, `localStorage`, geolocation permissions, or user clicks.
- **Stateless Crawling**: Googlebot crawls **statelessly** - it declines geolocation prompts, clears cookies/storage between page loads, and does **not** click buttons, submit search forms, or scroll infinitely. Every indexable state must have its own dedicated, addressable URL!
- **CDN, WAF & Rate-Limiting Awareness**: Whitelist verified Googlebot reverse-DNS / published IP ranges (`developers.google.com/search/apis/ipranges/googlebot.json`) so automated DDoS rules never serve `403 Forbidden` or `429 Too Many Requests` challenges to Googlebot.

---

## 2.7 Do You Need an SEO? & Third-Party SEO Tools Guidance

### Subpage A: Do You Need an SEO?
- Legitimate SEO engineering improves site architecture, crawl efficiency, accessibility, and UX.
- **Red Flags to Reject in Automated Systems**: Never implement dark-pattern advice such as buying "shadow domains" that funnel traffic, stuffing invisible keywords, promising guaranteed `#1` rankings, or auto-submitting to thousands of link directories.

### Subpage B: Guidance on Third-Party SEO Tools and Advice
- **Critical Distinction**: Google does **not** use proprietary third-party metrics such as `"Domain Authority (DA)"`, `"Domain Rating (DR)"`, `"Toxic Backlink Scores"`, or `"SEO Content Grade 95/100"` in its ranking systems.
- Do not build automated disavow lists based purely on third-party "toxic link" alarms (only use Google's Disavow Tool if you explicitly paid for link schemes AND received or anticipate a Manual Action for unnatural links).
- Always prioritize primary ground-truth signals from **Google Search Console**, **Rich Results Test**, and **CrUX / PageSpeed Insights** over arbitrary third-party SEO checklists.
