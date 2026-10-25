import checklistRaw from '../../checklist.md?raw';
import masterSkillRaw from '../../google-search-central-skill/SKILL.md?raw';
import mod01Raw from '../../google-search-central-skill/references/01-search-essentials.md?raw';
import mod02Raw from '../../google-search-central-skill/references/02-seo-fundamentals.md?raw';
import mod03Raw from '../../google-search-central-skill/references/03-crawling-and-indexing.md?raw';
import mod04Raw from '../../google-search-central-skill/references/04-ranking-and-appearance.md?raw';
import mod05Raw from '../../google-search-central-skill/references/05-structured-data-catalog.md?raw';
import mod06Raw from '../../google-search-central-skill/references/06-monitoring-and-debugging.md?raw';

export type PillarId =
  | 'essentials'
  | 'fundamentals'
  | 'crawling'
  | 'appearance'
  | 'monitoring';

export interface SkillFileEntry {
  id: string;
  filename: string;
  zipPath: string;
  shortTitle: string;
  pillar: PillarId | 'core';
  description: string;
  rawContent: string;
  lineCount: number;
  wordCount: number;
}

export interface ChecklistItem {
  id: string;
  number: string;
  pillar: PillarId;
  pillarLabel: string;
  breadcrumb: string;
  parentAccordion: string;
  leafPage: string;
  summary: string;
  targetFileId: string;
  targetAnchor?: string;
  skillBuiltIn: boolean;
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function makeEntry(
  id: string,
  filename: string,
  zipPath: string,
  shortTitle: string,
  pillar: PillarId | 'core',
  description: string,
  rawContent: string
): SkillFileEntry {
  return {
    id,
    filename,
    zipPath,
    shortTitle,
    pillar,
    description,
    rawContent,
    lineCount: rawContent.split('\n').length,
    wordCount: countWords(rawContent),
  };
}

export const SKILL_FILES: SkillFileEntry[] = [
  makeEntry(
    'skill-master',
    'SKILL.md',
    'google-search-central/SKILL.md',
    'Master SKILL.md Constitution',
    'core',
    'Entry-point routing table, 10 universal non-negotiable SEO invariants, framework matrix (Next.js, React SPA, HTML5), and 12-point pre-flight gate.',
    masterSkillRaw
  ),
  makeEntry(
    '01-search-essentials',
    'references/01-search-essentials.md',
    'google-search-central/references/01-search-essentials.md',
    '01. Search Essentials',
    'essentials',
    'Baseline Technical Requirements (Googlebot access, HTTP 200, DOM renderability) and engineering guardrails for all 16 official Spam Policies.',
    mod01Raw
  ),
  makeEntry(
    '02-seo-fundamentals',
    'references/02-seo-fundamentals.md',
    'google-search-central/references/02-seo-fundamentals.md',
    '02. SEO Fundamentals',
    'fundamentals',
    'How Search works, SEO Starter Guide, People-First E-E-A-T architecture, Generative AI content & AI Overviews/AI Mode, and Developer Guide.',
    mod02Raw
  ),
  makeEntry(
    '03-crawling-and-indexing',
    'references/03-crawling-and-indexing.md',
    'google-search-central/references/03-crawling-and-indexing.md',
    '03. Crawling & Indexing',
    'crawling',
    'URL slugs, crawlable links, XML/Image/Video/News sitemaps, crawl budget, faceted nav, robots.txt RFC 9309, canonicals, JS SEO, metadata, removals, and site moves.',
    mod03Raw
  ),
  makeEntry(
    '04-ranking-and-appearance',
    'references/04-ranking-and-appearance.md',
    'google-search-central/references/04-ranking-and-appearance.md',
    '04. Ranking & Appearance',
    'appearance',
    'Title links, snippets, Site Names, >=48px favicons, Core Web Vitals (LCP/INP/CLS), interstitials, Discover, Images, Video Key Moments, Flexible Sampling, and hreflang.',
    mod04Raw
  ),
  makeEntry(
    '05-structured-data-catalog',
    'references/05-structured-data-catalog.md',
    'google-search-central/references/05-structured-data-catalog.md',
    '05. Structured Data (JSON-LD)',
    'appearance',
    'XSS-safe JSON-LD patterns, visible content parity rules, retired schema awareness, and complete templates across 20+ active Google Rich Result types.',
    mod05Raw
  ),
  makeEntry(
    '06-monitoring-and-debugging',
    'references/06-monitoring-and-debugging.md',
    'google-search-central/references/06-monitoring-and-debugging.md',
    '06. Monitoring & Debugging',
    'monitoring',
    'Search Console verification, Live URL Inspection, 5-pattern traffic drop diagnostics, site:/src: search operators, HSTS security, and UGC/search anti-spam.',
    mod06Raw
  ),
];

export const RAW_CHECKLIST_MD = checklistRaw;

function mapSectionToPillar(sectionHeader: string): { pillar: PillarId; label: string } {
  const lower = sectionHeader.toLowerCase();
  if (lower.includes('search essentials')) {
    return { pillar: 'essentials', label: 'Search Essentials' };
  }
  if (lower.includes('seo fundamentals')) {
    return { pillar: 'fundamentals', label: 'SEO Fundamentals' };
  }
  if (lower.includes('crawling and indexing')) {
    return { pillar: 'crawling', label: 'Crawling & Indexing' };
  }
  if (lower.includes('ranking and search appearance')) {
    return { pillar: 'appearance', label: 'Ranking & Appearance' };
  }
  return { pillar: 'monitoring', label: 'Monitoring & Debugging' };
}

function resolveFileId(refToken: string): { fileId: string; anchor?: string } {
  const cleaned = refToken.replace(/`/g, '').split('&')[0].trim();
  const [filePart, anchorPart] = cleaned.split('#');
  const baseName = filePart.replace('.md', '').trim();
  const matched = SKILL_FILES.find((f) => f.id === baseName);
  return {
    fileId: matched ? matched.id : 'skill-master',
    anchor: anchorPart?.trim(),
  };
}

export function parseChecklistMarkdown(markdown: string): ChecklistItem[] {
  const lines = markdown.split('\n');
  let currentPillar: { pillar: PillarId; label: string } = {
    pillar: 'essentials',
    label: 'Search Essentials',
  };

  const items: ChecklistItem[] = [];

  for (const line of lines) {
    if (line.startsWith('## Section')) {
      currentPillar = mapSectionToPillar(line);
      continue;
    }

    const match = line.match(
      /^- \[(x| )\] \*\*(\d+)\.\s+([^*]+)\*\*\s+-\s+(.+?)\s+->\s+(.+)$/i
    );
    if (match) {
      const checked = match[1].toLowerCase() === 'x';
      const num = match[2];
      const fullBreadcrumb = match[3].trim();
      const summary = match[4].trim();
      const targetStr = match[5].trim();

      const parts = fullBreadcrumb.split('>').map((s) => s.trim());
      const leafPage = parts[parts.length - 1] || fullBreadcrumb;
      const parentAccordion =
        parts.length >= 3 ? parts[1] : parts[0] || currentPillar.label;

      const { fileId, anchor } = resolveFileId(targetStr);

      items.push({
        id: `rule-${num}`,
        number: num,
        pillar: currentPillar.pillar,
        pillarLabel: currentPillar.label,
        breadcrumb: fullBreadcrumb,
        parentAccordion,
        leafPage,
        summary,
        targetFileId: fileId,
        targetAnchor: anchor,
        skillBuiltIn: checked,
      });
    }
  }

  return items;
}

export const CHECKLIST_ITEMS: ChecklistItem[] = parseChecklistMarkdown(checklistRaw);

export const PILLAR_METADATA: Record<
  PillarId,
  { label: string; docsPath: string; description: string }
> = {
  essentials: {
    label: 'Search Essentials',
    docsPath: '/search/docs/essentials',
    description: 'Technical eligibility baseline and all 16 anti-spam guardrails',
  },
  fundamentals: {
    label: 'SEO Fundamentals',
    docsPath: '/search/docs/fundamentals',
    description: 'Starter guide, E-E-A-T, Generative AI content, AI Overviews & Developer guide',
  },
  crawling: {
    label: 'Crawling & Indexing',
    docsPath: '/search/docs/crawling-indexing',
    description: 'URLs, links, XML/media sitemaps, crawl budget, robots.txt, canonicals & JS SEO',
  },
  appearance: {
    label: 'Ranking & Appearance',
    docsPath: '/search/docs/appearance',
    description: 'Titles, snippets, Core Web Vitals, JSON-LD rich results, media, Discover & hreflang',
  },
  monitoring: {
    label: 'Monitoring & Debugging',
    docsPath: '/search/docs/monitor-debug',
    description: 'Search Console verification, traffic drop triage, search operators & security',
  },
};
