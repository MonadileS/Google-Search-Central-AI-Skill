import JSZip from 'jszip';
import { RAW_CHECKLIST_MD, SKILL_FILES } from '../data/skillData';

export async function downloadSkillZipBundle(): Promise<void> {
  const zip = new JSZip();

  for (const file of SKILL_FILES) {
    zip.file(file.zipPath, file.rawContent);
  }

  zip.file('google-search-central/checklist.md', RAW_CHECKLIST_MD);

  const readmeContent = `# Google Search Central Complete AI Skill

Distilled from 100% of Google Search Central documentation (\`https://developers.google.com/search/docs\`).

## Installation

1. **Claude Code / Cursor / Windsurf / AI Studio Skills**:
   Drop the \`google-search-central/\` folder directly into your agent's \`skills/\` or \`.cursor/rules/\` directory.
2. **Project Kickoff Prompt**:
   Instruct your coding model:
   \`Read google-search-central/SKILL.md and apply all applicable domain reference modules before architecting routes, metadata, sitemaps, structured data, or UI components.\`

## Contents
- \`SKILL.md\` - Master constitution, reference routing table, 10 universal invariants, and 12-point pre-flight gate.
- \`references/01-search-essentials.md\` - Technical requirements & all 16 Spam Policies.
- \`references/02-seo-fundamentals.md\` - Starter Guide, How Search Works, E-E-A-T, Generative AI & AI Overviews.
- \`references/03-crawling-and-indexing.md\` - URLs, Crawlable Links, Sitemaps, Crawl Budget, robots.txt, Canonicals, JS SEO, Metadata, Removals & Site Moves.
- \`references/04-ranking-and-appearance.md\` - Titles, Snippets, Site Names, Favicons, Core Web Vitals, Discover, Media, Flexible Sampling & hreflang.
- \`references/05-structured-data-catalog.md\` - Complete XSS-safe JSON-LD catalog across 20+ Google Rich Result types.
- \`references/06-monitoring-and-debugging.md\` - Search Console, Traffic Drop Diagnostics, Search Operators & Security/Anti-Spam.
- \`checklist.md\` - 80-point master verification ledger covering every sidebar page and nested accordion subpage.
`;

  zip.file('google-search-central/README.md', readmeContent);

  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'google-search-central-ai-skill.zip';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export function downloadSingleTextFile(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
