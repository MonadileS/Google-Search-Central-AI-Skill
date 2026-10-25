import React, { useMemo, useState } from 'react';
import { Check, Copy, Download } from 'lucide-react';
import { SKILL_FILES } from '../data/skillData';
import { downloadSingleTextFile } from '../utils/zipExport';

type StackChoice = 'nextjs' | 'react-spa' | 'html5';
type DomainChoice =
  | 'saas'
  | 'ecommerce'
  | 'editorial'
  | 'local'
  | 'community';

interface PromptBuilderViewProps {
  onDownloadZip: () => void;
}

export function PromptBuilderView({ onDownloadZip }: PromptBuilderViewProps) {
  const [stack, setStack] = useState<StackChoice>('nextjs');
  const [domain, setDomain] = useState<DomainChoice>('saas');
  const [multilingual, setMultilingual] = useState(false);
  const [hasPaywall, setHasPaywall] = useState(false);
  const [hasVideo, setHasVideo] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const generatedKickoffPrompt = useMemo(() => {
    const stackInstructions: Record<StackChoice, string> = {
      nextjs:
        'Next.js (App Router / SSR & SSG): Export `generateMetadata()` per route with unique `<title>` (30-60 chars), `<meta name="description">` (120-160 chars), absolute self-referencing `alternates.canonical`, and `maxImagePreview: "large"`. Generate `app/sitemap.ts` (canonical 200 OK URLs only with accurate `lastModified`) and `app/robots.ts` (allowing all `/_next/static/*` JS/CSS). Invoke `notFound()` on missing slugs to return real HTTP 404s.',
      'react-spa':
        'React / Vite SPA (HTML5 History API): Use clean path URLs (strictly NO `#/` hash routing). Synchronize `document.title`, `<meta name="description">`, `<link rel="canonical">`, and route JSON-LD on every route change. Immediately inject `<meta name="robots" content="noindex, nofollow" />` on 404 catch-all and empty-data views to prevent client-side Soft-404 index pollution.',
      html5:
        'Semantic HTML5 & HTTP Headers: Keep `<head>` 100% valid per HTML5 spec (zero `<div>`, `<img>`, or `<noscript><iframe>` inside `<head>` so `</head>` never closes prematurely). Use semantic `<main>`, `<header>`, `<nav>`, `<article>`, `<footer>`, and a single primary `<h1>` aligned with `<title>`.',
    };

    const domainSchemas: Record<DomainChoice, string> = {
      saas: '`WebSite` (Site Name) + `Organization` on `/` and `SoftwareApplication` / `WebApplication` + `BreadcrumbList` on product/tool pages.',
      ecommerce:
        '`WebSite` + `Organization` on `/`, `BreadcrumbList` on categories (with faceted filter crawl guards & self-canonicalized pagination), and rich `Product` (`Offer`, `OfferShippingDetails`, `MerchantReturnPolicy`, `AggregateRating`, `ProductGroup` variants) matching visible DOM prices.',
      editorial:
        '`WebSite` + `Organization` on `/`, `Article` / `NewsArticle` / `BlogPosting` with ISO-8601 + timezone `datePublished`/`dateModified` matching visible bylines, `Person` author links (E-E-A-T), and `>=1200px` hero images for Google Discover.',
      local:
        '`LocalBusiness` (specific subtype) with exact visible Name, PostalAddress, telephone, `GeoCoordinates`, and `openingHoursSpecification`.',
      community:
        '`DiscussionForumPosting` or `QAPage` + `ProfilePage` schemas, automatic `rel="ugc nofollow"` on all user-submitted links, `noindex` on empty profiles and `/search?q=` internal search routes.',
    };

    const extras: string[] = [];
    if (multilingual) {
      extras.push(
        '- **Multi-Regional & `hreflang` (Module 04.10)**: Give every locale a dedicated crawlable URL (`/en/...`, `/de/...`). NEVER auto-redirect `Googlebot` by Geo-IP or `Accept-Language`. Emit reciprocal `<link rel="alternate" hreflang="...">` tags plus `hreflang="x-default"`.'
      );
    }
    if (hasPaywall) {
      extras.push(
        '- **Flexible Sampling Paywall (Module 04.8)**: Never cloak paywalled content by User-Agent. Declare `"isAccessibleForFree": false` and `hasPart.cssSelector` inside `Article` JSON-LD.'
      );
    }
    if (hasVideo) {
      extras.push(
        '- **Video SEO & Key Moments (Module 04.7)**: Provide crawlable video watch pages with `VideoObject` JSON-LD, high-res crawlable `thumbnailUrl`, and `SeekToAction` / `Clip` Key Moments.'
      );
    }

    return `You MUST follow the **Google Search Central Complete AI Skill** (\`google-search-central/SKILL.md\` and \`references/01\`-\`06\`) across every file you create or edit so this project achieves 100% technical SEO & Google Search compliance from day one:

1. **Architecture & Stack Mandate**:
   - ${stackInstructions[stack]}
2. **Crawlability, Links & URLs (Module 03)**:
   - Use lowercase, hyphen-separated (\`-\`, never \`_\`) descriptive slugs.
   - Render 100% of page navigation as real \`<a href="...">\` tags with descriptive anchor text (never \`<div onClick>\` or \`<button onClick>\` for page links). Qualify paid/UGC links with \`rel="sponsored"\` or \`rel="ugc"\`.
3. **Core Web Vitals & Page Experience (Module 04.6)**:
   - \`LCP <= 2.5s\`: Server-render/eager-load above-the-fold hero content; put \`fetchPriority="high"\` and \`loading="eager"\` (NEVER \`loading="lazy"\`) on the hero image.
   - \`CLS <= 0.1\`: Declare explicit \`width\` and \`height\` or \`aspect-ratio\` on every \`<img>\`, \`<video>\`, and embed; animate only \`transform\`/\`opacity\`.
   - \`INP <= 200ms\`: Keep interaction handlers non-blocking; zero arrival interstitial modals covering content.
   - Provide a crawlable square favicon (\`>=48x48px\` or SVG) and descriptive \`alt\` text on all content \`<img>\` elements.
4. **Structured Data & Visible E-E-A-T Parity (Module 02 & Module 05)**:
   - Inject XSS-escaped (\`\\u003c\`) JSON-LD matching visible page text: ${domainSchemas[domain]}
${extras.length > 0 ? extras.join('\n') + '\n' : ''}5. **Pre-Flight Verification Gate**:
   - Before completing the build, verify \`robots.txt\`, XML sitemap canonicals, \`<head>\` HTML5 validity, \`404\`/Soft-404 handling, and HTTPS/security headers (\`X-Robots-Tag: noindex\` on \`/api/*\` and internal \`/search\`).`;
  }, [domain, hasPaywall, hasVideo, multilingual, stack]);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(generatedKickoffPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 1800);
  };

  const handleDownloadMonolithicBundle = () => {
    const combined = SKILL_FILES.map(
      (f) => `<!-- ========================================== -->\n<!-- FILE: ${f.zipPath} -->\n<!-- ========================================== -->\n\n${f.rawContent}`
    ).join('\n\n\n');
    downloadSingleTextFile('google-search-central-complete-bundle.md', combined);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="pb-5 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <span>Agent Integration</span>
          <span aria-hidden="true">·</span>
          <span>Claude Code / Cursor / Windsurf / AI Studio</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Project Kickoff Prompt Builder &amp; Skill Exporter
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Download the modular <code className="px-1.5 py-0.5 bg-slate-100 rounded text-xs">google-search-central/</code> skill folder for your AI agent&apos;s skills directory, or customize a stack-specific kickoff prompt to paste at the start of any new project.
        </p>
      </div>

      {/* Export Options Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-lg border border-slate-200 bg-slate-50/60 flex flex-col justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              01. Modular Skill Package (.zip)
            </h2>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Recommended structure: <code className="font-mono">SKILL.md</code> + 6 domain reference files in <code className="font-mono">references/</code> + <code className="font-mono">checklist.md</code> + installation <code className="font-mono">README.md</code>. Prevents LLM middle-context loss while preserving all 80 Google Search Central rules.
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={onDownloadZip}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-[#1A73E8] rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download google-search-central-ai-skill.zip</span>
            </button>
          </div>
        </div>

        <div className="p-5 rounded-lg border border-slate-200 bg-slate-50/60 flex flex-col justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              02. Compiled Single-File Context (.md)
            </h2>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Need to upload a single markdown attachment into a web chat window that doesn&apos;t support multi-file skill folders? Export all 7 skill modules concatenated cleanly into one markdown specification.
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={handleDownloadMonolithicBundle}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-800 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Single-File Bundle (.md)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Kickoff Prompt Configurator */}
      <div className="border border-slate-200 rounded-lg p-6 space-y-6 bg-white">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            03. Configure Project Kickoff System Prompt
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Select your target stack and site characteristics to tailor the directive referencing your installed skill.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Framework Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-800">
              Target Framework Stack
            </label>
            <div className="flex flex-wrap gap-1.5">
              {(
                [
                  ['nextjs', 'Next.js (App Router / SSR)'],
                  ['react-spa', 'React / Vite SPA'],
                  ['html5', 'Semantic HTML5 / Static'],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setStack(id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    stack === id
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Primary Site Domain */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-800">
              Primary Site Architecture
            </label>
            <div className="flex flex-wrap gap-1.5">
              {(
                [
                  ['saas', 'SaaS / Web App'],
                  ['ecommerce', 'E-Commerce / Merchant'],
                  ['editorial', 'Editorial / Blog / News'],
                  ['local', 'Local Business'],
                  ['community', 'Forum / Q&A / UGC'],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setDomain(id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    domain === id
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Optional Feature Toggles */}
        <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-slate-100">
          <label className="inline-flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={multilingual}
              onChange={(e) => setMultilingual(e.target.checked)}
              className="rounded border-slate-300 text-[#1A73E8] focus:ring-[#1A73E8]"
            />
            <span>Multi-language / Multi-regional (`hreflang`)</span>
          </label>
          <label className="inline-flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={hasPaywall}
              onChange={(e) => setHasPaywall(e.target.checked)}
              className="rounded border-slate-300 text-[#1A73E8] focus:ring-[#1A73E8]"
            />
            <span>Subscription / Metered Paywall (Flexible Sampling)</span>
          </label>
          <label className="inline-flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={hasVideo}
              onChange={(e) => setHasVideo(e.target.checked)}
              className="rounded border-slate-300 text-[#1A73E8] focus:ring-[#1A73E8]"
            />
            <span>Embedded Video Watch Pages (`VideoObject`)</span>
          </label>
        </div>

        {/* Output Prompt Box */}
        <div className="rounded-lg border border-slate-200 bg-slate-950 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs text-slate-300">
            <span className="font-mono">Tailored AI Kickoff Prompt</span>
            <button
              type="button"
              onClick={handleCopyPrompt}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1A73E8] text-white rounded-md hover:bg-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {copiedPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPrompt ? 'Copied to Clipboard' : 'Copy Kickoff Prompt'}</span>
            </button>
          </div>
          <pre className="p-4 text-xs leading-relaxed text-slate-100 font-mono whitespace-pre-wrap">
            {generatedKickoffPrompt}
          </pre>
        </div>
      </div>
    </div>
  );
}
