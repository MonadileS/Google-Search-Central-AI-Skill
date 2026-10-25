import React, { useEffect, useMemo, useState } from 'react';
import { Check, Code2, Copy, Download, Eye } from 'lucide-react';
import { SKILL_FILES, SkillFileEntry } from '../data/skillData';
import { downloadSingleTextFile } from '../utils/zipExport';
import { MarkdownViewer } from './MarkdownViewer';

interface SkillExplorerViewProps {
  selectedFileId: string;
  scrollToAnchor?: string;
  onSelectFile: (fileId: string, anchor?: string) => void;
}

export function SkillExplorerView({
  selectedFileId,
  scrollToAnchor,
  onSelectFile,
}: SkillExplorerViewProps) {
  const [viewMode, setViewMode] = useState<'rendered' | 'raw'>('rendered');
  const [copiedFile, setCopiedFile] = useState(false);

  const activeFile: SkillFileEntry = useMemo(
    () => SKILL_FILES.find((f) => f.id === selectedFileId) || SKILL_FILES[0],
    [selectedFileId]
  );

  const sectionHeadings = useMemo(() => {
    const lines = activeFile.rawContent.split('\n');
    const headings: { id: string; title: string }[] = [];
    for (const line of lines) {
      const m = line.match(/^##\s+(.+)$/);
      if (m) {
        const title = m[1].trim();
        const numMatch = title.match(/^(\d+\.\d+)/);
        const id = numMatch
          ? numMatch[1]
          : title
              .toLowerCase()
              .replace(/[`*_~]/g, '')
              .replace(/[^a-z0-9.]+/g, '-')
              .replace(/^-|-$/g, '');
        headings.push({ id, title });
      }
    }
    return headings;
  }, [activeFile]);

  useEffect(() => {
    if (scrollToAnchor && viewMode === 'rendered') {
      const timer = setTimeout(() => {
        const el = document.getElementById(scrollToAnchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [scrollToAnchor, selectedFileId, viewMode]);

  const handleCopyFile = () => {
    navigator.clipboard.writeText(activeFile.rawContent);
    setCopiedFile(true);
    setTimeout(() => setCopiedFile(false), 1800);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_240px] gap-8 items-start">
      <div className="min-w-0 space-y-6">
        {/* File Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-1.5">
              <span className="font-mono text-slate-700">{activeFile.zipPath}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{activeFile.lineCount} lines</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{activeFile.wordCount.toLocaleString()} words</span>
            </div>
            <p className="text-sm text-slate-600">{activeFile.description}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
              <button
                type="button"
                onClick={() => setViewMode('rendered')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  viewMode === 'rendered'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Spec View</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('raw')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  viewMode === 'raw'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Raw Markdown</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleCopyFile}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {copiedFile ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>{copiedFile ? 'Copied' : 'Copy File'}</span>
            </button>

            <button
              type="button"
              onClick={() =>
                downloadSingleTextFile(
                  activeFile.filename.split('/').pop() || 'SKILL.md',
                  activeFile.rawContent
                )
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>.md</span>
            </button>
          </div>
        </div>

        {/* File Tabs Switcher for rapid horizontal jumping on mobile/tablet */}
        <div className="flex lg:hidden items-center gap-1.5 overflow-x-auto pb-2">
          {SKILL_FILES.map((file) => (
            <button
              key={file.id}
              type="button"
              onClick={() => onSelectFile(file.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border whitespace-nowrap shrink-0 cursor-pointer ${
                file.id === activeFile.id
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {file.shortTitle}
            </button>
          ))}
        </div>

        {/* Main Content Surface */}
        {viewMode === 'rendered' ? (
          <div className="pb-12">
            <MarkdownViewer
              markdown={activeFile.rawContent}
              onNavigateToFile={(targetId) => onSelectFile(targetId)}
            />
          </div>
        ) : (
          <div className="rounded-lg border border-slate-200 bg-slate-950 overflow-hidden">
            <pre className="p-5 text-xs leading-relaxed text-slate-100 font-mono overflow-x-auto">
              <code>{activeFile.rawContent}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Right On-Page Section Outline */}
      {sectionHeadings.length > 0 && viewMode === 'rendered' && (
        <aside className="hidden xl:block sticky top-20 space-y-2.5 border-l border-slate-200 pl-4">
          <div className="text-xs font-semibold text-slate-900">On This Module</div>
          <nav className="space-y-1.5">
            {sectionHeadings.map((h) => (
              <a
                key={h.id}
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="block text-xs text-slate-600 hover:text-[#1A73E8] transition-colors leading-snug"
              >
                {h.title}
              </a>
            ))}
          </nav>
        </aside>
      )}
    </div>
  );
}
