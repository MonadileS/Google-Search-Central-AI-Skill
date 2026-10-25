import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface MarkdownViewerProps {
  markdown: string;
  onNavigateToFile?: (fileId: string) => void;
}

interface ParsedBlock {
  type: 'heading' | 'code' | 'table' | 'blockquote' | 'list' | 'hr' | 'paragraph';
  level?: number;
  id?: string;
  text?: string;
  lang?: string;
  rows?: string[][];
  items?: { checked?: boolean; content: string }[];
}

function slugifyHeading(text: string): string {
  const numMatch = text.match(/^(\d+\.\d+)/);
  if (numMatch) {
    return numMatch[1];
  }
  return text
    .toLowerCase()
    .replace(/[`*_~]/g, '')
    .replace(/[^a-z0-9.]+/g, '-')
    .replace(/^-|-$/g, '');
}

function parseMarkdownBlocks(raw: string): ParsedBlock[] {
  let content = raw;
  // Strip YAML frontmatter nicely or render as metadata block
  if (content.startsWith('---\n')) {
    const endIdx = content.indexOf('\n---\n', 4);
    if (endIdx !== -1) {
      const yamlBody = content.slice(4, endIdx).trim();
      content = content.slice(endIdx + 5);
      const blocks: ParsedBlock[] = [
        {
          type: 'code',
          lang: 'yaml (skill frontmatter)',
          text: yamlBody,
        },
      ];
      return [...blocks, ...parseBodyLines(content)];
    }
  }
  return parseBodyLines(content);
}

function parseBodyLines(content: string): ParsedBlock[] {
  const lines = content.split('\n');
  const blocks: ParsedBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === '') {
      i++;
      continue;
    }

    // Fenced code block
    if (line.trim().startsWith('```')) {
      const lang = line.trim().slice(3).trim() || 'text';
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // consume closing ```
      blocks.push({
        type: 'code',
        lang,
        text: codeLines.join('\n'),
      });
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,})$/.test(line.trim())) {
      blocks.push({ type: 'hr' });
      i++;
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      blocks.push({
        type: 'heading',
        level,
        id: slugifyHeading(text),
        text,
      });
      i++;
      continue;
    }

    // Table
    if (line.trim().startsWith('|') && i + 1 < lines.length && lines[i + 1].includes('---')) {
      const tableRows: string[][] = [];
      const parseRow = (r: string) =>
        r
          .trim()
          .replace(/^\|/, '')
          .replace(/\|$/, '')
          .split('|')
          .map((c) => c.trim());

      tableRows.push(parseRow(lines[i]));
      i += 2; // skip header & separator row
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableRows.push(parseRow(lines[i]));
        i++;
      }
      blocks.push({
        type: 'table',
        rows: tableRows,
      });
      continue;
    }

    // Blockquote
    if (line.trim().startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      blocks.push({
        type: 'blockquote',
        text: quoteLines.join(' '),
      });
      continue;
    }

    // Lists (bullet or numbered)
    if (/^(\s*[-*]|\s*\d+\.)\s+/.test(line)) {
      const items: { checked?: boolean; content: string }[] = [];
      while (
        i < lines.length &&
        (/^(\s*[-*]|\s*\d+\.)\s+/.test(lines[i]) || /^\s{2,}\S/.test(lines[i]))
      ) {
        if (/^(\s*[-*]|\s*\d+\.)\s+/.test(lines[i])) {
          const rawItem = lines[i].replace(/^(\s*[-*]|\s*\d+\.)\s+/, '');
          const checkMatch = rawItem.match(/^\[(x| )\]\s+(.+)$/i);
          if (checkMatch) {
            items.push({
              checked: checkMatch[1].toLowerCase() === 'x',
              content: checkMatch[2],
            });
          } else {
            items.push({ content: rawItem });
          }
        } else if (items.length > 0) {
          items[items.length - 1].content += ' ' + lines[i].trim();
        }
        i++;
      }
      blocks.push({
        type: 'list',
        items,
      });
      continue;
    }

    // Paragraph
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].trim().startsWith('```') &&
      !lines[i].trim().startsWith('#') &&
      !lines[i].trim().startsWith('|') &&
      !lines[i].trim().startsWith('>') &&
      !/^(-{3,}|\*{3,})$/.test(lines[i].trim()) &&
      !/^(\s*[-*]|\s*\d+\.)\s+/.test(lines[i])
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }
    blocks.push({
      type: 'paragraph',
      text: paraLines.join(' '),
    });
  }

  return blocks;
}

function renderInlineFormatting(
  text: string,
  onNavigateToFile?: (fileId: string) => void
): React.ReactNode[] {
  const tokenRegex = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|\*[^*]+\*)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, idx) => {
    if (!part) return null;
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} className="font-semibold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={idx}
          className="px-1.5 py-0.5 text-[13px] bg-slate-100 text-slate-800 rounded font-mono"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const label = linkMatch[1];
      const href = linkMatch[2];
      if (href.startsWith('references/') && onNavigateToFile) {
        const targetId = href.replace('references/', '').replace('.md', '').split('#')[0];
        return (
          <button
            key={idx}
            type="button"
            onClick={() => onNavigateToFile(targetId)}
            className="text-[#1A73E8] hover:underline font-medium text-left inline cursor-pointer"
          >
            {renderInlineFormatting(label)}
          </button>
        );
      }
      return (
        <a
          key={idx}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1A73E8] hover:underline font-medium"
        >
          {renderInlineFormatting(label)}
        </a>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={idx} className="italic text-slate-700">
          {part.slice(1, -1)}
        </em>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

function CodeSnippetBlock({ lang, code }: { lang: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="my-5 rounded-lg border border-slate-200 bg-slate-950 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs text-slate-400">
        <span className="font-mono">{lang}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy snippet'}</span>
        </button>
      </div>
      <pre className="p-4 text-[13px] leading-relaxed text-slate-100 overflow-x-auto font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function MarkdownViewer({ markdown, onNavigateToFile }: MarkdownViewerProps) {
  const blocks = parseMarkdownBlocks(markdown);

  return (
    <div className="max-w-[78ch] text-[15px] leading-[1.65] text-slate-700 space-y-4">
      {blocks.map((block, index) => {
        if (block.type === 'hr') {
          return <hr key={index} className="my-8 border-slate-200" />;
        }

        if (block.type === 'heading') {
          if (block.level === 1) {
            return (
              <h1
                key={index}
                id={block.id}
                className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 pt-2 pb-1"
              >
                {renderInlineFormatting(block.text || '', onNavigateToFile)}
              </h1>
            );
          }
          if (block.level === 2) {
            return (
              <h2
                key={index}
                id={block.id}
                className="text-xl font-semibold tracking-tight text-slate-900 pt-6 pb-1 scroll-mt-20"
              >
                {renderInlineFormatting(block.text || '', onNavigateToFile)}
              </h2>
            );
          }
          return (
            <h3
              key={index}
              id={block.id}
              className="text-base font-semibold text-slate-900 pt-4 scroll-mt-20"
            >
              {renderInlineFormatting(block.text || '', onNavigateToFile)}
            </h3>
          );
        }

        if (block.type === 'code') {
          return (
            <CodeSnippetBlock
              key={index}
              lang={block.lang || 'code'}
              code={block.text || ''}
            />
          );
        }

        if (block.type === 'blockquote') {
          return (
            <div
              key={index}
              className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-700"
            >
              {renderInlineFormatting(block.text || '', onNavigateToFile)}
            </div>
          );
        }

        if (block.type === 'table' && block.rows && block.rows.length > 0) {
          const [header, ...body] = block.rows;
          return (
            <div key={index} className="my-5 overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    {header.map((cell, cIdx) => (
                      <th key={cIdx} className="px-4 py-2.5 font-semibold text-slate-900">
                        {renderInlineFormatting(cell, onNavigateToFile)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {body.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50/70">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="px-4 py-2.5 align-top text-slate-700">
                          {renderInlineFormatting(cell, onNavigateToFile)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        if (block.type === 'list' && block.items) {
          return (
            <ul key={index} className="space-y-2 pl-5 list-disc marker:text-slate-400">
              {block.items.map((item, iIdx) => (
                <li key={iIdx} className="pl-1">
                  {item.checked !== undefined && (
                    <span className="font-mono text-xs mr-2 text-emerald-700">
                      [{item.checked ? '✓' : ' '}]
                    </span>
                  )}
                  {renderInlineFormatting(item.content, onNavigateToFile)}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={index}>
            {renderInlineFormatting(block.text || '', onNavigateToFile)}
          </p>
        );
      })}
    </div>
  );
}
