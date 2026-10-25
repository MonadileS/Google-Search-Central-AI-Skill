# Google Search Central Complete AI Skill - Master Verification Checklist

> **Coverage Status**: `80 / 80` Official Documentation Pages & Nested Accordion Subpages Added & Verified (`100%`)
> **Source**: `https://developers.google.com/search/docs`
> **Skill Directory**: `/google-search-central-skill/` (`SKILL.md` + `references/01` through `06`)

This checklist tracks every top-level page and **every nested accordion subpage** across the 5 Google Search Central sidebar sections (`Search Essentials`, `SEO fundamentals`, `Crawling and indexing`, `Ranking and search appearance`, and `Monitoring and debugging`) to guarantee zero missed rules when an AI model builds or audits a web application.

---

## Section 1: Search Essentials (`references/01-search-essentials.md`)

- [x] **01. Search Essentials > Overview** - Baseline eligibility framework (Technical Requirements + Spam Policies + Key Best Practices) -> `01-search-essentials.md#1.1`
- [x] **02. Search Essentials > Technical requirements** - Unblocked Googlebot + JS/CSS resources, HTTP `200 OK` status, and DOM-renderable indexable content -> `01-search-essentials.md#1.2`
- [x] **03. Search Essentials > Spam policies (All 16 Policies)** - Guardrails against Cloaking, Doorways, Expired Domain Abuse, Hacked Content, Hidden Text/Links, Keyword Stuffing, Link Spam, Machine Traffic, Malware, Misleading Functionality, Scraped Content, Sneaky Redirects, Scaled Content Abuse, Site Reputation Abuse, User-Generated Spam, and Legal/PII Removals -> `01-search-essentials.md#1.3`

---

## Section 2: SEO Fundamentals (`references/02-seo-fundamentals.md`)

- [x] **04. SEO fundamentals > SEO Starter Guide** - Logical site directories, duplicate reduction, orphan prevention, natural copy, and debunked myths (`meta keywords`, word count, density) -> `02-seo-fundamentals.md#2.2`
- [x] **05. SEO fundamentals > How Google Search works** - Asynchronous 3-stage pipeline: Crawling, Indexing (WRS Chromium rendering + canonical selection), and Serving -> `02-seo-fundamentals.md#2.1`
- [x] **06. SEO fundamentals > Creating helpful, reliable, people-first content** - Content & quality self-assessment, E-E-A-T (Trust-first, YMYL rigor, author bylines, Who/How/Why transparency) -> `02-seo-fundamentals.md#2.3`
- [x] **07. SEO fundamentals > Generative AI fundamentals > Using generative AI content** - Value-add mandate, fact-checking anti-hallucination gates, automation disclosure, avoiding scaled content abuse -> `02-seo-fundamentals.md#2.4`
- [x] **08. SEO fundamentals > Generative AI fundamentals > AI features and your website** - Query fan-out readiness for AI Overviews & AI Mode, zero proprietary AI tags needed, snippet preview controls -> `02-seo-fundamentals.md#2.4`
- [x] **09. SEO fundamentals > Maintaining your site's SEO** - Ongoing Search Console audits, evergreen seasonal URL slugs, accurate `dateModified` hygiene, pre-migration planning -> `02-seo-fundamentals.md#2.5`
- [x] **10. SEO fundamentals > Developer's guide to Search** - Stateless Googlebot crawling (zero cookies/scroll/clicks), Rendered HTML verification, WAF/CDN Googlebot IP allowlisting -> `02-seo-fundamentals.md#2.6`
- [x] **11. SEO fundamentals > Do you need an SEO?** - Architectural SEO best practices vs. dark-pattern shadow domains and link-scheme red flags -> `02-seo-fundamentals.md#2.7`
- [x] **12. SEO fundamentals > Guidance on third-party SEO tools and advice** - Ignoring non-Google vanity scores (DA/DR/toxic link alarms) in favor of GSC, CrUX, and Rich Results Test -> `02-seo-fundamentals.md#2.7`

---

## Section 3: Crawling and Indexing (`references/03-crawling-and-indexing.md`)

- [x] **13. Crawling and indexing > Overview** - End-to-end discovery, crawl scheduling, rendering, and index storage architecture -> `03-crawling-and-indexing.md`
- [x] **14. Crawling and indexing > File types Google can index** - HTML preference over standalone PDFs, HTTP `Link` canonical header for downloadable PDFs/docs -> `03-crawling-and-indexing.md#3.1`
- [x] **15. Crawling and indexing > URL structure** - RFC 3986 UTF-8 encoding, lowercase hyphenated `-` slugs (never underscores `_`), zero session IDs or infinite relative loops -> `03-crawling-and-indexing.md#3.2`
- [x] **16. Crawling and indexing > Links > Make your links crawlable** - Strict `<a href="...">` DOM requirement, descriptive anchor text, ban on `<div onClick>` / `javascript:void(0)` navigation -> `03-crawling-and-indexing.md#3.3`
- [x] **17. Crawling and indexing > Links > Qualify your outbound links** - Mandatory `rel="sponsored"`, `rel="ugc"`, and `rel="nofollow"` outbound link qualification -> `03-crawling-and-indexing.md#3.3`
- [x] **18. Crawling and indexing > Sitemaps > Learn about sitemaps** - When sitemaps are needed and how canonical `200 OK` inclusion works -> `03-crawling-and-indexing.md#3.4`
- [x] **19. Crawling and indexing > Sitemaps > Build and submit a sitemap** - 50,000 URL / 50MB limits, Next.js `app/sitemap.ts` pattern, honest `<lastmod>` timestamps, ignoring `<priority>`/`<changefreq>` -> `03-crawling-and-indexing.md#3.4`
- [x] **20. Crawling and indexing > Sitemaps > Manage large/multiple sitemaps (Sitemap index)** - `<sitemapindex>` partitioning and `robots.txt` + Search Console submission (noting retired `/ping` endpoint) -> `03-crawling-and-indexing.md#3.4`
- [x] **21. Crawling and indexing > Sitemaps > Image sitemaps** - `<image:image><image:loc>` discovery for CDN/gallery media -> `03-crawling-and-indexing.md#3.4`
- [x] **22. Crawling and indexing > Sitemaps > Video sitemaps** - `<video:video>` thumbnail, title, description, and player/content stream tags -> `03-crawling-and-indexing.md#3.4`
- [x] **23. Crawling and indexing > Sitemaps > Google News sitemaps** - 48-hour freshness window and `<news:news>` publication metadata -> `03-crawling-and-indexing.md#3.4`
- [x] **24. Crawling and indexing > Crawler management > Large site owner's guide to crawl budget** - Crawl capacity vs. crawl demand, eliminating duplicate/redirect waste, fast TTFB -> `03-crawling-and-indexing.md#3.5`
- [x] **25. Crawling and indexing > Crawler management > Managing crawling of faceted navigation URLs** - Preventing combinatorial filter URL explosions, static curated facet slugs, zero-result link prevention -> `03-crawling-and-indexing.md#3.5`
- [x] **26. Crawling and indexing > Crawler management > Overview of Google crawlers and fetchers** - `Googlebot` Smartphone/Desktop, `Google-InspectionTool`, `Storebot`, `Google-Extended` AI token, and user-triggered fetchers -> `03-crawling-and-indexing.md#3.5`
- [x] **27. Crawling and indexing > Crawler management > Verifying Googlebot and other Google crawlers** - Reverse/forward DNS verification + official `googlebot.json` CIDR ranges -> `03-crawling-and-indexing.md#3.5`
- [x] **28. Crawling and indexing > Crawler management > Reduce the Googlebot crawl rate** - Returning proper `503`/`429` signals vs. damaging permanent blocks -> `03-crawling-and-indexing.md#3.5`
- [x] **29. Crawling and indexing > Crawler management > HTTP status codes, network and DNS errors** - Exact indexing impact of `200`, `301`/`308`, `302`/`307`, `304`, `404`/`410` (never redirect all 404s to `/`), `429`, and `5xx` -> `03-crawling-and-indexing.md#3.5`
- [x] **30. Crawling and indexing > robots.txt > Introduction to robots.txt** - Crawling vs. indexing distinction (`robots.txt` does NOT prevent indexing of externally linked URLs!) -> `03-crawling-and-indexing.md#3.6`
- [x] **31. Crawling and indexing > robots.txt > Create and submit a robots.txt file** - Root placement, UTF-8 plain text, 500 KiB limit, preserving access to `/_next/static/` & `/assets/` JS/CSS -> `03-crawling-and-indexing.md#3.6`
- [x] **32. Crawling and indexing > robots.txt > Update your robots.txt file** - Safe deployment without `5xx` server errors (which pause all site crawling!) -> `03-crawling-and-indexing.md#3.6`
- [x] **33. Crawling and indexing > robots.txt > How Google interprets the robots.txt specification (RFC 9309)** - Wildcard `*`, end-anchor `$`, longest-match precedence, and `Allow` tie-breaking -> `03-crawling-and-indexing.md#3.6`
- [x] **34. Crawling and indexing > Canonicalization > What is URL canonicalization** - Duplicate clustering and how Google selects the canonical representative -> `03-crawling-and-indexing.md#3.7`
- [x] **35. Crawling and indexing > Canonicalization > How to specify a canonical (`rel="canonical"`)** - Absolute URLs in `<link rel="canonical">`, HTTP `Link` headers, 301 redirects, and self-canonicalizing paginated `/page/2` views -> `03-crawling-and-indexing.md#3.7`
- [x] **36. Crawling and indexing > Canonicalization > Troubleshooting canonicalization issues** - Preventing multiple conflicting canonical tags or canonicalizing to `noindex`/blocked pages -> `03-crawling-and-indexing.md#3.7`
- [x] **37. Crawling and indexing > Mobile site and mobile-first indexing** - Responsive viewport meta, 100% content/schema/image/link parity between mobile and desktop -> `03-crawling-and-indexing.md#3.8`
- [x] **38. Crawling and indexing > AMP > About AMP on Google Search & Guidelines** - AMP optional parity status, bidirectional `amphtml`/`canonical` linking, and safe `301` AMP retirement -> `03-crawling-and-indexing.md#3.9`
- [x] **39. Crawling and indexing > JavaScript > Understand the JavaScript SEO basics** - 3-phase Crawl -> Render -> Index pipeline, History API routing (ban on `#` hash URLs), React SPA `<SEOHead />` pattern -> `03-crawling-and-indexing.md#3.10`
- [x] **40. Crawling and indexing > JavaScript > Dynamic rendering as a workaround** - Deprecation awareness: prefer SSR, SSG, ISR, or hydration over legacy user-agent dynamic rendering -> `03-crawling-and-indexing.md#3.10`
- [x] **41. Crawling and indexing > JavaScript > Fix Search-related JavaScript problems** - Eliminating client-side Soft-404s (`noindex` on SPA 404 routes), avoiding blocked JS bundles and geolocation gates -> `03-crawling-and-indexing.md#3.10`
- [x] **42. Crawling and indexing > JavaScript > Fix lazy-loaded content** - Native `loading="lazy"` + `IntersectionObserver` (ban on `scroll`-only listeners) + paginated `<a href>` links for infinite scroll -> `03-crawling-and-indexing.md#3.10`
- [x] **43. Crawling and indexing > Page and content metadata > Valid page metadata (`<head>` rules)** - Strict HTML5 `<head>` element allowlist so invalid `<iframe>`/`<div>`/`<img>` tags never prematurely close `</head>` -> `03-crawling-and-indexing.md#3.11`
- [x] **44. Crawling and indexing > Page and content metadata > Meta tags and attributes Google supports** - Supported `description`, `robots`, `googlebot`, `notranslate`, `nopagereadaloud`, `viewport`, and `rating` tags -> `03-crawling-and-indexing.md#3.11`
- [x] **45. Crawling and indexing > Page and content metadata > Robots meta tag, `data-nosnippet`, and `X-Robots-Tag`** - Granular `max-image-preview:large`, `max-snippet`, `max-video-preview`, `unavailable_after`, and `data-nosnippet` containers -> `03-crawling-and-indexing.md#3.11`
- [x] **46. Crawling and indexing > Removals > Remove information on your website from Google** - Emergency GSC Removals tool vs. permanent `404`/`410`/`noindex`/auth deletion -> `03-crawling-and-indexing.md#3.12`
- [x] **47. Crawling and indexing > Removals > Filter explicit results using SafeSearch** - Explicit directory grouping and `<meta name="rating" content="adult" />` markup -> `03-crawling-and-indexing.md#3.12`
- [x] **48. Crawling and indexing > Site moves and changes > Site moves with and without URL changes** - 1-to-1 `301`/`308` redirect mapping, 1-year retention, sitemap/canonical sync, GSC Change of Address -> `03-crawling-and-indexing.md#3.13`
- [x] **49. Crawling and indexing > Site moves and changes > Redirects and Google Search** - Server-side permanent (`301`/`308`) vs. temporary (`302`/`307`) vs. last-resort meta-refresh/JS redirects -> `03-crawling-and-indexing.md#3.13`
- [x] **50. Crawling and indexing > Site moves and changes > Website testing (A/B & multivariate)** - Zero-cloaking rule, `rel="canonical"` to original URL, `302` redirects, anti-CLS flicker discipline -> `03-crawling-and-indexing.md#3.13`
- [x] **51. Crawling and indexing > Site moves and changes > Pause or disable your website** - HTTP `503` + `Retry-After` header for temporary maintenance (never `200 OK` placeholder pages!) -> `03-crawling-and-indexing.md#3.13`

---

## Section 4: Ranking and Search Appearance (`references/04-ranking-and-appearance.md` & `05-structured-data-catalog.md`)

- [x] **52. Ranking and search appearance > Overview** - Modular anatomy of modern Google Search result elements -> `04-ranking-and-appearance.md#4.1`
- [x] **53. Ranking and search appearance > AI features** - Appearances in AI Overviews & AI Mode via core indexing, high-res media, and snippet controls -> `02-seo-fundamentals.md#2.4` & `04-ranking-and-appearance.md#4.1`
- [x] **54. Ranking and search appearance > Byline dates** - Single clear visible date matching ISO-8601 + timezone `datePublished`/`dateModified` in JSON-LD -> `04-ranking-and-appearance.md#4.5`
- [x] **55. Ranking and search appearance > Favicons** - Square `1:1` multiple of `48px` (`48x48`, `96x96`, or SVG) at stable, crawlable URL -> `04-ranking-and-appearance.md#4.4`
- [x] **56. Ranking and search appearance > Featured snippets** - Crisp `<h2>` + 40-60 word direct answer/list/table formatting and `max-snippet` opt-out controls -> `04-ranking-and-appearance.md#4.3`
- [x] **57. Ranking and search appearance > Flexible Sampling** - Paywall & metered content JSON-LD (`isAccessibleForFree: false` + `hasPart.cssSelector`) to prevent cloaking -> `04-ranking-and-appearance.md#4.8` & `05-structured-data-catalog.md#5.3`
- [x] **58. Ranking and search appearance > Google Discover** - `>=1200px` wide imagery + mandatory `max-image-preview:large` + non-clickbait headlines -> `04-ranking-and-appearance.md#4.7`
- [x] **59. Ranking and search appearance > Images** - Semantic `<img>`/`<picture>`/`srcset` (never CSS `background-image` for content), descriptive filenames & `alt` text -> `04-ranking-and-appearance.md#4.7`
- [x] **60. Ranking and search appearance > Local features** - `LocalBusiness` subtypes, exact NAP + `geo` + `openingHoursSpecification` + Business Profile alignment -> `04-ranking-and-appearance.md#4.9` & `05-structured-data-catalog.md#5.3`
- [x] **61. Ranking and search appearance > Page experience > Understanding page experience** - Holistic UX signals: Core Web Vitals, mobile usability, HTTPS, safe browsing, non-intrusive UI -> `04-ranking-and-appearance.md#4.6`
- [x] **62. Ranking and search appearance > Page experience > Core Web Vitals** - Engineering `LCP <= 2.5s` (`fetchPriority="high"`), `INP <= 200ms`, and `CLS <= 0.1` (explicit dimensions) -> `04-ranking-and-appearance.md#4.6`
- [x] **63. Ranking and search appearance > Page experience > Avoid intrusive interstitials and dialogs** - Ban on arrival popups covering content; compliant `<15%` banners and legal/paywall exceptions -> `04-ranking-and-appearance.md#4.6`
- [x] **64. Ranking and search appearance > Preferred sources** - Consistent `Organization` / `WebSite` identity for Top Stories & source preference selection -> `04-ranking-and-appearance.md#4.7`
- [x] **65. Ranking and search appearance > Ranking systems (Guide to Google Search ranking systems)** - Architectural alignment with BERT, MUM, Neural Matching, RankBrain, Passage Ranking, Helpful Content, Reviews System, PageRank, Freshness, Site Diversity, Deduplication, and SpamBrain -> `04-ranking-and-appearance.md#4.11`
- [x] **66. Ranking and search appearance > Ranking updates** - Core, Spam, and Reviews update evaluation using Search Status Dashboard -> `04-ranking-and-appearance.md#4.11`
- [x] **67. Ranking and search appearance > Regional differences in Search experience** - EEA aggregator & supplier carousel eligibility via structured product/listing detail pages -> `04-ranking-and-appearance.md#4.9`
- [x] **68. Ranking and search appearance > Search profiles** - Creator & brand social/author profile linking via `ProfilePage`, `Person`, `Organization.sameAs` -> `04-ranking-and-appearance.md#4.7` & `05-structured-data-catalog.md#5.3`
- [x] **69. Ranking and search appearance > Site names** - Homepage-only `WebSite` JSON-LD (`name`, `alternateName`, `url`) aligned with `og:site_name` -> `04-ranking-and-appearance.md#4.4` & `05-structured-data-catalog.md#5.3`
- [x] **70. Ranking and search appearance > Sitelinks** - Logical `<nav>` hierarchy, concise anchor labels, unique subpage titles, and Sitelinks Search Box retirement note -> `04-ranking-and-appearance.md#4.4`
- [x] **71. Ranking and search appearance > Snippets** - 120-160 char factual `<meta name="description">`, `data-nosnippet` UI chrome exclusion, `max-snippet` directives -> `04-ranking-and-appearance.md#4.3`
- [x] **72. Ranking and search appearance > Structured data > Introduction, General guidelines & Gallery (All Active Schemas)** - XSS-safe JSON-LD, visible content parity, deprecated-schema awareness, and full templates for `WebSite`, `Organization`, `BreadcrumbList`, `Article`, `Product` (Merchant/Shipping/Returns/Variants), `WebApplication`, `LocalBusiness`, `VideoObject`, `DiscussionForumPosting`, `QAPage`, `ProfilePage`, `Event`, `JobPosting`, `Recipe`, `Course`, `Dataset`, `ItemList`, `ImageObject`, `VacationRental`, `Movie`, `Speakable` -> `05-structured-data-catalog.md`
- [x] **73. Ranking and search appearance > Title links** - Unique 30-60 char `<title>`, single dominant `<h1>` alignment, clean brand suffixing, language parity -> `04-ranking-and-appearance.md#4.2`
- [x] **74. Ranking and search appearance > Translated features (Localized `hreflang`, Multi-regional, Translated results)** - Dedicated per-locale URLs (ban on Geo-IP auto-redirects!), bidirectional ISO `hreflang` + `x-default`, `translate="no"` brand protection -> `04-ranking-and-appearance.md#4.10`
- [x] **75. Ranking and search appearance > Videos** - Dedicated watch pages, `VideoObject` schema, `SeekToAction`/`Clip` Key Moments, unblocked video streams/thumbnails -> `04-ranking-and-appearance.md#4.7`
- [x] **76. Ranking and search appearance > Visual Elements gallery & Web Stories & Early Adopters Program** - SERP visual component mapping, AMP Web Story HTML/poster rules, and Search Labs readiness -> `04-ranking-and-appearance.md#4.1` & `#4.7`

---

## Section 5: Monitoring and Debugging (`references/06-monitoring-and-debugging.md`)

- [x] **77. Monitoring and debugging > Get started with Search Console & Monitor performance** - DNS/HTML ownership verification readiness, Live URL Inspection (Rendered HTML + JS console check), Page Indexing status triage, and Performance Bubble Chart CTR/Position optimization -> `06-monitoring-and-debugging.md#6.1`
- [x] **78. Monitoring and debugging > Debugging drops in Google Search traffic** - 5-pattern diagnostic decision tree (Site-wide technical/Manual Action cliff, Template bug, Algorithmic update, SERP CTR shift, Seasonality) -> `06-monitoring-and-debugging.md#6.2`
- [x] **79. Monitoring and debugging > Debug with search operators** - Auditing indexed state via `site:`, `filetype:`, and Google Images `src:` operators (noting retired `cache:`/`link:`) -> `06-monitoring-and-debugging.md#6.3`
- [x] **80. Monitoring and debugging > Prevent & monitor abuse / Security issues** - XSS/SQLi prevention, HSTS & `X-Robots-Tag: noindex` on `/api/*` & staging, safe signed software downloads, and blocking `/search?q=` internal search spam -> `06-monitoring-and-debugging.md#6.4`
