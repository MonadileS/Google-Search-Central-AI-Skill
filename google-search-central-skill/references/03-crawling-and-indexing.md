# 03. Crawling and Indexing

Official Source: `https://developers.google.com/search/docs/crawling-indexing`

This module covers **every single page and nested accordion subpage** in Google Search Central's **Crawling and Indexing** pillar: File Types, URL Structure, Links, Sitemaps, Crawler Management, `robots.txt`, Canonicalization, Mobile-First Indexing, AMP, JavaScript SEO, Page & Content Metadata, Removals, and Site Moves & Changes.

---

## 3.1 Indexable File Types

Google can index text content inside HTML (`.html`, `.htm`), PDF (`.pdf` - provided it contains selectable text or clean OCR-readable pages and isn't password-protected), common office/document formats (`.doc/.docx`, `.xls/.xlsx`, `.ppt/.pptx`, `.odt`, `.rtf`), plain text/code (`.txt`, `.py`, `.js`, `.cs`, `.java`), SVG (`.svg`), and media formats via host pages (`<img>`, `<video>`).
- **Engineering Rule**: Always prefer semantic HTML pages for primary web content over standalone PDFs whenever mobile responsiveness, Core Web Vitals, navigation, and structured data matter. For downloadable PDFs that shouldn't compete with an HTML landing page, apply an HTTP `Link: <https://example.com/guide>; rel="canonical"` header on the PDF response.

---

## 3.2 URL Structure

Distilled from Google's *URL Structure Best Practices*:
1. **Valid RFC 3986 Standard**: Use UTF-8 percent-encoding for non-ASCII characters (e.g., Arabic, Japanese, accented characters - modern browsers display decoded characters cleanly, while percent-encoded transport ensures safe crawling).
2. **Readable Words Over Opaque IDs**:
   - ✅ `https://example.com/aviation/commercial-turboprops`
   - ❌ `https://example.com/index.php?cat_id=991&item=88372&sid=a98f7`
3. **Hyphens (`-`), NEVER Underscores (`_`) or Concatenated Blobs**:
   - Google treats hyphens `-` as word separators (`trail-running-shoes` -> `trail running shoes`), whereas underscores `_` join tokens (`trail_running_shoes` -> `trailrunningshoes`).
4. **Eliminate Infinite Calendar, Filter & Session Traps**:
   - Never append session IDs (`?phpsessid=...`) to URLs.
   - Use canonical tags, parameter normalization (alphabetical key order), or `robots.txt` disallow patterns for combinatorially explosive sort/filter combinations (`?sort=price_asc&view=grid&price_min=10`).
   - Use relative links carefully - ensure broken relative links (`href="category/shoes"` nested repeatedly into `/category/category/category/shoes`) never create infinite crawler loops!

---

## 3.3 Crawlable Links & Outbound Link Qualification

### Subpage A: Make Your Links Crawlable
Googlebot **only** reliably extracts and follows links formatted as standard HTML `<a>` elements with a resolvable `href` attribute:
```html
<!-- ✅ Crawlable Links -->
<a href="https://example.com/pricing">Pricing Plans</a>
<a href="/docs/getting-started">Getting Started Guide</a>
<a href="?page=2">Page 2</a>

<!-- ❌ UNCRAWLABLE Links (Googlebot WILL IGNORE THESE) -->
<a routerLink="pricing">Pricing</a> <!-- Unless compiled to real href="..." in DOM -->
<span onClick="goto('/pricing')">Pricing</span>
<button onClick={() => navigate('/pricing')}>Pricing</button>
<a href="javascript:goTo('pricing')">Pricing</a>
<a href="#">Pricing</a>
```
- **Anchor Text Rules**: Anchor text must concisely describe the target page (`"2026 Enterprise Security Whitepaper"`). Never use empty anchors (`<a href="/x"></a>` without `alt` on child `<img>` or meaningful text) and never cram unnatural keyword lists into anchor text.

### Subpage B: Qualify Your Outbound Links (`rel` Attributes)
| `rel` Value | Mandatory Use Case |
| :--- | :--- |
| *(None / Default)* | Trusted editorial citations, internal navigation, genuine unpaid endorsements. |
| `rel="sponsored"` | Paid advertisements, affiliate links, paid placements, or compensated sponsorships. |
| `rel="ugc"` | Links inside user-generated content (comments, forum posts, public user bios). |
| `rel="nofollow"` | Links where you do not want to imply endorsement and neither `sponsored` nor `ugc` specifically applies (e.g., untrusted scraped sources, crawl-prioritization hints on login/register links - note that `nofollow` on internal links is a *hint*, not a crawl block). |

Multiple values can be space- or comma-separated: `rel="ugc nofollow"`.

---

## 3.4 Sitemaps (Accordion: Overview, Build/Submit, Index, Image, Video, News)

### Core XML Sitemap Rules
- **Technical Limits**: Max **50,000 URLs** and **50 MB uncompressed** per sitemap file. Split larger sites using a `<sitemapindex>` file.
- **Strict Inclusion Policy**: List **ONLY canonical, indexable `200 OK` absolute URLs** using identical protocol (`https://`) and hostname (`www` vs non-`www`).
- **Ignored XML Fields**: Google **completely ignores** `<priority>` and `<changefreq>`. Do not waste bytes or logic tuning them!
- **Trusted `<lastmod>`**: Google *does* use `<lastmod>` (W3C Datetime `YYYY-MM-DD` or ISO-8601), **provided it accurately reflects the last significant modification of page content**. Never set `<lastmod>` to `new Date().toISOString()` on every build/request when the page didn't actually change - Google will stop trusting your `<lastmod>` timestamps!

### Code Pattern: Next.js App Router Dynamic `app/sitemap.ts`
```ts
// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.APP_URL || 'https://example.com';
  const posts = await getPublishedCanonicalPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date('2026-10-01T00:00:00Z'), // Real content edit timestamp!
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date('2026-09-15T00:00:00Z'),
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    images: post.heroImageUrl ? [post.heroImageUrl] : undefined,
  }));

  return [...staticRoutes, ...postRoutes];
}
```

### Specialized Sitemap Extensions
- **Image Sitemaps (`xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"`)**: Helps Google discover images hosted on CDNs or lazy-loaded galleries (`<image:image><image:loc>...</image:loc></image:image>`). Note: legacy `<image:caption>`, `<image:geo_location>`, `<image:title>`, and `<image:license>` tags were deprecated by Google - stick to `<image:loc>` and use IPTC/Schema.org `ImageObject` for licensing metadata.
- **Video Sitemaps (`xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"`)**: Supply `<video:thumbnail_loc>`, `<video:title>`, `<video:description>`, and `<video:content_loc>` or `<video:player_loc>` so Google Video indexing discovers self-hosted/embedded videos reliably.
- **Google News Sitemaps (`xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"`)**: Include only news articles published in the **last 48 hours** (max 1,000 URLs per News sitemap) with `<news:publication>`, `<news:publication_date>`, and `<news:title>`.
- **Submission**: Reference `Sitemap: https://example.com/sitemap.xml` inside `robots.txt` AND submit via Google Search Console (Note: the unauthenticated `/ping?sitemap=...` HTTP endpoint is deprecated and retired - rely on `robots.txt` + Search Console / Search Console API).

---

## 3.5 Crawler Management (Accordion: Crawl Budget, Faceted Nav, Crawlers, Verification, Status Codes)

### 1. Crawl Budget Management (Large Sites >10k-1M+ URLs)
Crawl budget = **Crawl Capacity Limit** (how fast your server responds without `5xx` errors) + **Crawl Demand** (popularity & staleness).
- Maximize Crawl Capacity: Fast TTFB, CDN caching, zero `5xx` timeouts.
- Eliminate Crawl Waste: Consolidate duplicate URLs, return `404`/`410` for permanently removed products (better than redirecting discontinued items to the homepage, which triggers Soft-404s!), avoid long redirect chains (`A -> B -> C`), and keep sitemaps fresh.

### 2. Managing Faceted Navigation URLs
E-commerce and directory filters (`?color=red&size=m&brand=acme&sort=newest`) create millions of duplicate URLs that starve crawl budget.
- **If facet combinations do NOT need organic search landing traffic**: Either update filter state via client-side state / History `replaceState` without generating `<a href>` links, OR use a standardized URL prefix/param pattern (e.g., `/products/filter?...` or `?sort=`) and disallow crawling in `robots.txt`.
- **If specific high-demand facets SHOULD rank** (e.g., `/running-shoes/gore-tex`): Give curated facets clean static paths, canonicalize non-standard parameter orders (`?b=1&a=2` -> `?a=2&b=1`), and never render `<a href>` links to facets producing `0` results!

### 3. Overview of Google Crawlers & User-Agents
- **Common Crawlers** (obey `robots.txt`):
  - `Googlebot` (`Googlebot Smartphone` & `Googlebot Desktop`) - core Search crawler.
  - `Googlebot-Image`, `Googlebot-Video`, `Googlebot-News`, `Storebot-Google` (shopping/cart checks).
  - `Google-InspectionTool` - powers Search Console Live URL Inspection & Rich Results Test.
  - `GoogleOther` - generic R&D/non-core fetchers.
  - `Google-Extended` - standalone `robots.txt` token letting publishers opt out of Gemini API grounding and future model training **without affecting Google Search indexing**.
- **Special-Case Crawlers** (`AdsBot-Google`, `Mediapartners-Google`) and **User-Triggered Fetchers** (`Google-Read-Aloud`, `FeedFetcher-Google`, `Google-Site-Verification`) have specific `robots.txt` rules (user-triggered fetchers generally ignore `robots.txt` because an explicit user initiated the fetch).

### 4. Verifying Googlebot
Never trust the `User-Agent` HTTP header alone (easily spoofed by scrapers!). Verify real Googlebot traffic via:
1. **Reverse DNS -> Forward DNS**: `host <IP>` resolves to `*.googlebot.com`, `*.google.com`, or `*.googleusercontent.com`, AND forward lookup resolves back to the same `<IP>`.
2. **Official IP JSON Lists**: Match against CIDR blocks published at `https://developers.google.com/search/apis/ipranges/googlebot.json`.

### 5. HTTP Status Codes & Network/DNS Errors
| Status Code | Googlebot Behavior |
| :--- | :--- |
| `200 OK` | Content passed to indexing pipeline (unless Soft-404 detected). |
| `301 Moved Permanently` / `308 Permanent Redirect` | Strong signal to pass ranking signals and index the redirect target URL as canonical. (`308` preserves HTTP method). |
| `302 Found` / `307 Temporary Redirect` | Weak signal; keeps source URL canonical short-term (if left in place long-term, Google may eventually treat it like permanent). |
| `304 Not Modified` | Tells Googlebot cached copy is unchanged; saves bandwidth without harming indexing. |
| `404 Not Found` / `410 Gone` | Drops URL from index (`410` drops slightly faster). Normal `404`s for deleted pages **do NOT hurt site-wide rankings**! Never blanket-redirect `404`s to `/`! |
| `401 Unauthorized` / `403 Forbidden` | Drops from index; never use for public content. |
| `429 Too Many Requests` / `500` / `502` / `503` | Signals server overload or temporary outage; Googlebot immediately slows crawling and preserves existing indexed URLs temporarily (days), dropping them if `5xx` persists long-term. |

---

## 3.6 `robots.txt` Specification (RFC 9309)

- **Location & Format**: Must reside strictly at `https://example.com/robots.txt` (root of each protocol + subdomain), UTF-8 encoded plain text, HTTP `200 OK`, max size **500 KiB (512 KB)**.
- **HTTP Status Handling on `/robots.txt`**:
  - `200 OK`: Rules parsed and enforced.
  - `404 Not Found` / `410 Gone`: Google assumes **zero crawl restrictions** (entire site crawlable).
  - `5xx Server Error` / Unreachable: Google **pauses crawling the entire site** temporarily (~12h-30 days fallback to cached rules) to avoid violating potentially strict rules! Ensure `/robots.txt` never crashes with a `500`!
- **Pattern Matching Syntax**:
  - `*` matches any sequence of 0+ characters.
  - `$` anchors the end of the URL (`Disallow: /*.pdf$`).
  - Most specific rule (longest path character match) wins when `Allow` and `Disallow` conflict; if equal length, `Allow` wins!

```txt
# ✅ Production-Grade /public/robots.txt (or app/robots.ts output)
User-agent: *
Allow: /
# Block internal search results and ephemeral API/auth endpoints from crawling
Disallow: /api/
Disallow: /search?
Disallow: /admin/
# NEVER disallow /_next/static/, /assets/, *.js, or *.css!

Sitemap: https://example.com/sitemap.xml
```

---

## 3.7 Canonicalization (Consolidating Duplicate URLs)

When duplicate or near-duplicate URLs exist (`https://example.com/product`, `https://example.com/product?utm_medium=social`, `/shoes/sneaker-1` vs `/deals/sneaker-1`), Google chooses one canonical URL using signals in descending strength:
1. **`301` / `308` Redirects** (Strongest - use whenever duplicates don't need to remain accessible).
2. **`<link rel="canonical" href="https://example.com/preferred-url" />`** in `<head>` (Must be an **absolute URL**, never a relative path like `href="/preferred-url"`!).
3. **HTTP Header `Link: <https://example.com/preferred-url.pdf>; rel="canonical"`** (Ideal for PDFs and non-HTML files).
4. **Sitemap Inclusion** (Weak hint, reinforces HTML canonical).

### Critical Canonical Pitfalls to Avoid
- **Paginated Series (`?page=2`, `/blog/page/2`)**: Page 2 MUST self-canonicalize to `https://example.com/blog/page/2` - **NEVER** canonicalize `/page/2` to `/page/1`! Page 2 does not contain the same items as Page 1; pointing its canonical to Page 1 hides Page 2's links and items from indexing!
- **No Fragment Canonicals**: Google ignores `#fragment` in canonical URLs.
- **Single Canonical Declaration**: Never emit two conflicting `<link rel="canonical">` tags (common bug when combining SSR template + client SPA plugins).

---

## 3.8 Mobile Site & Mobile-First Indexing

Google uses the smartphone version of a page's content (crawled with `Googlebot Smartphone`) for indexing and ranking.
1. **Recommended Pattern**: **Responsive Web Design** (same URL, same HTML, CSS media queries + `<meta name="viewport" content="width=device-width, initial-scale=1">`).
2. **Content, Metadata & Media Parity**:
   - Ensure mobile viewports render the exact same headings, body copy, structured data, `alt` text, and internal `<a href>` links as desktop.
   - Do not use low-quality tiny mobile thumbnails without `srcset` high-res sources or unstable dynamic image URLs that change on every request.
   - Ensure ad/banner placements on mobile adhere to the Better Ads Standard and never push primary content completely off-screen.

---

## 3.9 AMP (Accelerated Mobile Pages)

- **Current Google Search Status**: AMP is **no longer required** for Top Stories carousels or any Search feature - standard HTML pages meeting Page Experience guidelines have full parity.
- **If Maintaining Existing AMP**: Pair canonical HTML (`<link rel="amphtml" href="...">`) and AMP (`<link rel="canonical" href="...">`) bidirectionally with identical content and structured data.
- **If Removing AMP**: Redirect old AMP URLs (`301`) to their canonical responsive HTML counterparts and remove `<link rel="amphtml">`.

---

## 3.10 JavaScript SEO & Lazy-Loading

Google processes JavaScript web apps in three phases: **Crawl -> Render Queue (Headless Evergreen Chromium) -> Index**.

### Engineering Rules for Next.js SSR & React/Vite SPAs
1. **Prefer SSR / SSG / Prerendering for Public Content**: Server-rendered HTML delivers instant content in Phase 1, faster LCP, and reliable social-card unfurling (Slack/X/LinkedIn bots do *not* execute JavaScript!).
   - *Deprecation Note*: **Dynamic Rendering** (serving pre-rendered static snapshots to Googlebot while serving CSR to users) is officially labeled by Google as a legacy **workaround, not a recommended long-term solution** - always prefer SSR, SSG, ISR, or clean hydration.
2. **History API Only (Zero Hash `#` Routing)**:
   - Use `/docs/setup`, NEVER `/#/docs/setup` or `index.html#setup`.
3. **Update Metadata & Canonicals Per Route in SPAs**:
   ```tsx
   // ✅ Reusable React SPA <SEOHead /> Component (Zero-Dependency / React 19 Ready)
   import { useEffect } from 'react';

   interface SEOHeadProps {
     title: string;
     description: string;
     canonicalPath: string;
     noindex?: boolean;
     jsonLd?: Record<string, unknown>;
   }

   export function SEOHead({ title, description, canonicalPath, noindex = false, jsonLd }: SEOHeadProps) {
     useEffect(() => {
       document.title = title;

       const upsertMeta = (attr: 'name' | 'property', key: string, content: string) => {
         let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
         if (!el) {
           el = document.createElement('meta');
           el.setAttribute(attr, key);
           document.head.appendChild(el);
         }
         el.setAttribute('content', content);
       };

       upsertMeta('name', 'description', description);
       upsertMeta('property', 'og:title', title);
       upsertMeta('property', 'og:description', description);
       upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');

       const canonicalUrl = `${window.location.origin}${canonicalPath}`;
       let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
       if (!link) {
         link = document.createElement('link');
         link.setAttribute('rel', 'canonical');
         document.head.appendChild(link);
       }
       link.setAttribute('href', canonicalUrl);

       let script = document.head.querySelector('script[data-seo-jsonld="route"]') as HTMLScriptElement | null;
       if (jsonLd) {
         if (!script) {
           script = document.createElement('script');
           script.type = 'application/ld+json';
           script.setAttribute('data-seo-jsonld', 'route');
           document.head.appendChild(script);
         }
         script.textContent = JSON.stringify(jsonLd);
       } else if (script) {
         script.remove();
       }
     }, [title, description, canonicalPath, noindex, jsonLd]);

     return null;
   }
   ```
4. **Search-Friendly Lazy-Loading & Infinite Scroll**:
   - Googlebot's renderer resizes a tall virtual viewport rather than dispatching `window.onscroll` events!
   - **BANNED**: Loading below-the-fold text or images exclusively inside `window.addEventListener('scroll', ...)` without `IntersectionObserver`.
   - **REQUIRED**: Use native `<img loading="lazy" src="..." width="..." height="..." alt="...">` for below-the-fold images, `IntersectionObserver` for custom components, and always back infinite-scroll feeds with crawlable paginated URLs (`<a href="/products?page=2">Next Page</a>`) so items beyond page 1 are discoverable!

---

## 3.11 Page and Content Metadata

### 1. Valid HTML `<head>` Rules (CRITICAL!)
According to the HTML5 specification, `<head>` may ONLY contain `<title>`, `<meta>`, `<link>`, `<script>`, `<style>`, `<base>`, `<noscript>`, and `<template>`.
- **Catastrophic Bug**: If any script, tag manager `<noscript><iframe ...></iframe></noscript>` (note: `<iframe>` inside `<noscript>` inside `<head>` is invalid HTML5!), `<div>`, or `<img>` pixel is placed inside `<head>`, the HTML parser **implicitly closes `</head>` and opens `<body>` at that exact line** - causing Googlebot to ignore every `<meta name="robots" content="noindex">` or `<link rel="canonical">` placed below it! Always put `<noscript><iframe>` tags right after the opening `<body>` tag, never inside `<head>`.

### 2. Supported `<meta>` Tags & Robots Directives
| Tag / Directive | Purpose & Exact Syntax |
| :--- | :--- |
| `description` | `<meta name="description" content="..." />` - Snippet summary source. |
| `robots` / `googlebot` | `<meta name="robots" content="noindex, nofollow" />` or HTTP `X-Robots-Tag: noindex`. |
| `notranslate` | `<meta name="googlebot" content="notranslate" />` - Tells Google not to offer page translation in SERPs. |
| `nopagereadaloud` | `<meta name="google" content="nopagereadaloud" />` - Opts out of Google Read Aloud TTS. |
| `nositelinkssearchbox` | *(Legacy - Sitelinks Search Box retired late 2024; harmless if present, unnecessary on new builds).* |
| `viewport` | `<meta name="viewport" content="width=device-width, initial-scale=1" />` - Mobile-first readiness. |
| `rating` | `<meta name="rating" content="adult" />` - Explicit SafeSearch adult signal (see 3.12). |

### 3. Granular Robots Directives (`meta` & `X-Robots-Tag`)
- `all` (default), `noindex`, `nofollow`, `none` (`noindex, nofollow`), `noarchive`, `nosnippet`, `noimageindex`, `notranslate`.
- `max-snippet:[number]` (`-1` = unlimited, `0` = same as `nosnippet`, `160` = max 160 chars).
- `max-image-preview:[setting]` (`none`, `standard`, `large` - **always include `max-image-preview:large` on public content pages!**).
- `max-video-preview:[seconds]` (`-1` = unlimited preview length).
- `unavailable_after: [date/time]` (ISO-8601 expiration for time-boxed event/job pages).
- **Section-Level Exclusion (`data-nosnippet`)**: Wrap boilerplate, legal disclaimers, or dynamic UI widgets you NEVER want pulled into Search snippets or AI Overviews in `<div data-nosnippet>...</div>` (works on `<span>`, `<div>`, `<section>`).

---

## 3.12 Removals & SafeSearch Explicit Content

1. **Temporary Emergency Hiding (~6 months)**: Use the **Search Console Removals Tool** to hide a URL immediately from SERPs while deploying permanent fixes.
2. **Permanent Removal from Google Search**:
   - Return HTTP `404` / `410`, OR serve `<meta name="robots" content="noindex" />` (without blocking in `robots.txt`!), OR require HTTP authentication (`401`).
   - Do **not** rely on `robots.txt` alone to remove an already-indexed URL!
3. **SafeSearch & Explicit Content**:
   - If a site or directory hosts explicit adult content, group explicit pages into a dedicated directory (`/adult/...`) and include `<meta name="rating" content="adult" />` (or `RTA-5042-1996-1400-1577-RTA`) so Google SafeSearch filters accurately without misclassifying non-explicit pages.

---

## 3.13 Site Moves, Redirects, A/B Testing & Pausing Sites

### 1. Site Moves With URL Changes
- Map old URLs **1-to-1** to their exact new equivalents using server-side `301` or `308` permanent redirects (never redirect every old inner page to the new homepage!).
- Update internal links, canonical tags, `hreflang`, JSON-LD `@id`/URLs, and XML sitemaps simultaneously; keep old redirects active for **at least 1 year**; submit the Search Console **Change of Address** tool when changing domains.

### 2. Website A/B & Multivariate Testing Without Hurting SEO
1. **No Cloaking**: Never show Variant B only to humans and Variant A specifically to `Googlebot`.
2. **Use `rel="canonical"`**: If running split URL tests (`/pricing` vs `/pricing-v2`), put `<link rel="canonical" href="https://example.com/pricing" />` on `/pricing-v2` (do NOT put `noindex` on `/pricing-v2`, which risks dropping the canonical cluster if Google groups them!).
3. **Use `302` Temporary Redirects**: For URL-redirect experiments, use `302` (not `301`) so the original URL remains in the index.
4. **Minimize Flicker (CLS/LCP)**: Avoid client-side anti-flicker scripts that hide `<body>` for 2-4 seconds.

### 3. Pausing or Temporarily Disabling Your Website
- **Short Outage / Maintenance (Hours to a Few Days)**: Return HTTP **`503 Service Unavailable`** with a **`Retry-After`** HTTP header (e.g., `Retry-After: 86400` or HTTP date) - **even for `/robots.txt` returns `503`**. Never serve a `200 OK` "Under Construction" placeholder page (which overwrites all your indexed rankings with "Under Construction"!).
- **Long-Term Business Pause (Weeks/Months)** where you still want brand homepage presence: Serve a real informative `200 OK` informational notice on `/` while returning `503` or `404` as appropriate for unavailable catalog items.
