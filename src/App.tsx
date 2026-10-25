/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Check, Download, FileCode, FileText, FolderOpen } from 'lucide-react';
import { ChecklistTrackerView } from './components/ChecklistTrackerView';
import { PromptBuilderView } from './components/PromptBuilderView';
import { SkillExplorerView } from './components/SkillExplorerView';
import {
  CHECKLIST_ITEMS,
  PILLAR_METADATA,
  PillarId,
  SKILL_FILES,
} from './data/skillData';
import { downloadSkillZipBundle } from './utils/zipExport';

type WorkspaceTab = 'checklist' | 'explorer' | 'builder';

const STORAGE_KEY = 'gsc_skill_audit_checked_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('checklist');
  const [selectedFileId, setSelectedFileId] = useState<string>('skill-master');
  const [scrollToAnchor, setScrollToAnchor] = useState<string | undefined>(undefined);
  const [activePillarFilter, setActivePillarFilter] = useState<PillarId | 'all'>('all');
  const [isExportingZip, setIsExportingZip] = useState(false);
  const [zipExportedFeedback, setZipExportedFeedback] = useState(false);

  const [auditedIds, setAuditedIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(auditedIds));
    } catch {
      // Ignore storage quota errors in sandboxed iframes
    }
  }, [auditedIds]);

  const handleToggleAuditItem = (id: string) => {
    setAuditedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleMarkAllAudited = () => {
    const next: Record<string, boolean> = {};
    for (const item of CHECKLIST_ITEMS) {
      next[item.id] = true;
    }
    setAuditedIds(next);
  };

  const handleResetAuditProgress = () => {
    setAuditedIds({});
  };

  const handleInspectSkillRule = (fileId: string, anchor?: string) => {
    setSelectedFileId(fileId);
    setScrollToAnchor(anchor);
    setActiveTab('explorer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSidebarSelectFile = (fileId: string) => {
    setSelectedFileId(fileId);
    setScrollToAnchor(undefined);
    setActiveTab('explorer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSidebarSelectPillar = (pillar: PillarId) => {
    setActivePillarFilter(pillar);
    setActiveTab('checklist');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExportZip = async () => {
    if (isExportingZip) return;
    setIsExportingZip(true);
    try {
      await downloadSkillZipBundle();
      setZipExportedFeedback(true);
      setTimeout(() => setZipExportedFeedback(false), 2200);
    } finally {
      setIsExportingZip(false);
    }
  };

  const totalSkillWords = SKILL_FILES.reduce((acc, f) => acc + f.wordCount, 0);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 px-6 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#checklist"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('checklist');
          }}
          className="text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
        >
          Search Central Skill Studio
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a
            href="#checklist"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('checklist');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 py-0.5 border-b-2 ${
              activeTab === 'checklist'
                ? 'text-slate-900 border-[#1A73E8]'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Checklist Ledger
          </a>
          <a
            href="#skill-explorer"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('explorer');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 py-0.5 border-b-2 ${
              activeTab === 'explorer'
                ? 'text-slate-900 border-[#1A73E8]'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Skill Modules
          </a>
          <a
            href="#json-ld"
            onClick={(e) => {
              e.preventDefault();
              handleSidebarSelectFile('05-structured-data-catalog');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 py-0.5 border-b-2 ${
              activeTab === 'explorer' && selectedFileId === '05-structured-data-catalog'
                ? 'text-slate-900 border-[#1A73E8]'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            JSON-LD Catalog
          </a>
          <a
            href="#prompt-builder"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('builder');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 py-0.5 border-b-2 ${
              activeTab === 'builder'
                ? 'text-slate-900 border-[#1A73E8]'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Prompt &amp; Export
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={handleExportZip}
            disabled={isExportingZip}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-[#1A73E8] rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-60"
          >
            {zipExportedFeedback ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            <span>{zipExportedFeedback ? 'ZIP Downloaded' : 'Download Skill (.zip)'}</span>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Bar (Below Top Bar) */}
      <div className="flex md:hidden items-center gap-1 p-2 bg-slate-50 border-b border-slate-200 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('checklist')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 ${
            activeTab === 'checklist' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
          }`}
        >
          Checklist ({CHECKLIST_ITEMS.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('explorer')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 ${
            activeTab === 'explorer' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
          }`}
        >
          Skill Modules ({SKILL_FILES.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('builder')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 ${
            activeTab === 'builder' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
          }`}
        >
          Prompt &amp; Export
        </button>
      </div>

      {/* Main Workspace Canvas: 268px Left Sidebar + Content Viewport */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Navigation Sidebar */}
        <aside className="hidden lg:flex lg:w-[272px] shrink-0 flex-col justify-between border-r border-slate-200 bg-slate-50/60 p-5">
          <div className="space-y-7">
            {/* Skill Directory File Tree */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 px-2">
                <FolderOpen className="w-3.5 h-3.5 text-slate-500" />
                <span>google-search-central/</span>
              </div>
              <div className="space-y-0.5">
                {SKILL_FILES.map((file) => {
                  const isActive =
                    activeTab === 'explorer' && selectedFileId === file.id;
                  return (
                    <button
                      key={file.id}
                      type="button"
                      onClick={() => handleSidebarSelectFile(file.id)}
                      className={`w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-md text-xs transition-colors text-left cursor-pointer ${
                        isActive
                          ? 'bg-blue-50 text-[#1A73E8] font-semibold'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="inline-flex items-center gap-2 truncate">
                        {file.id === 'skill-master' ? (
                          <FileCode className="w-3.5 h-3.5 shrink-0" />
                        ) : (
                          <FileText className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                        )}
                        <span className="truncate">{file.shortTitle}</span>
                      </span>
                      <span className="font-mono tabular-nums text-[11px] text-slate-400 shrink-0">
                        {file.lineCount}L
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sidebar Documentation Pillars Filter */}
            <div className="space-y-2 pt-4 border-t border-slate-200">
              <div className="text-xs font-semibold text-slate-900 px-2">
                Search Central Pillars
              </div>
              <div className="space-y-0.5">
                {(
                  [
                    'essentials',
                    'fundamentals',
                    'crawling',
                    'appearance',
                    'monitoring',
                  ] as PillarId[]
                ).map((pId) => {
                  const count = CHECKLIST_ITEMS.filter((i) => i.pillar === pId).length;
                  const isActive =
                    activeTab === 'checklist' && activePillarFilter === pId;
                  return (
                    <button
                      key={pId}
                      type="button"
                      onClick={() => handleSidebarSelectPillar(pId)}
                      className={`w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-md text-xs transition-colors text-left cursor-pointer ${
                        isActive
                          ? 'bg-slate-200/80 text-slate-900 font-semibold'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <span className="truncate">{PILLAR_METADATA[pId].label}</span>
                      <span className="font-mono tabular-nums text-[11px] text-slate-500">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quiet Package Summary Footer */}
          <div className="pt-6 border-t border-slate-200 px-2 space-y-1 text-xs text-slate-500">
            <div className="flex justify-between">
              <span>Skill Modules</span>
              <span className="font-mono tabular-nums text-slate-700">
                {SKILL_FILES.length} files
              </span>
            </div>
            <div className="flex justify-between">
              <span>Checklist Rules</span>
              <span className="font-mono tabular-nums text-slate-700">
                {CHECKLIST_ITEMS.length} / {CHECKLIST_ITEMS.length}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Specification Size</span>
              <span className="font-mono tabular-nums text-slate-700">
                {totalSkillWords.toLocaleString()} words
              </span>
            </div>
          </div>
        </aside>

        {/* Main Viewport */}
        <main className="flex-1 min-w-0 px-6 sm:px-10 py-8 max-w-6xl">
          {activeTab === 'checklist' && (
            <ChecklistTrackerView
              activePillarFilter={activePillarFilter}
              onSelectPillarFilter={setActivePillarFilter}
              onInspectSkillRule={handleInspectSkillRule}
              auditedIds={auditedIds}
              onToggleAuditItem={handleToggleAuditItem}
              onResetAuditProgress={handleResetAuditProgress}
              onMarkAllAudited={handleMarkAllAudited}
            />
          )}

          {activeTab === 'explorer' && (
            <SkillExplorerView
              selectedFileId={selectedFileId}
              scrollToAnchor={scrollToAnchor}
              onSelectFile={(fileId, anchor) => {
                setSelectedFileId(fileId);
                setScrollToAnchor(anchor);
              }}
            />
          )}

          {activeTab === 'builder' && (
            <PromptBuilderView onDownloadZip={handleExportZip} />
          )}
        </main>
      </div>

      {/* Quiet Clean Footer */}
      <footer className="border-t border-slate-200 px-6 py-4 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-4 bg-white">
        <div className="flex flex-wrap items-center gap-2">
          <span>Google Search Central Complete AI Skill</span>
          <span aria-hidden="true">·</span>
          <span>Workspace Path: /google-search-central-skill/ &amp; /checklist.md</span>
        </div>
        <a
          href="https://developers.google.com/search/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-600 hover:text-[#1A73E8] transition-colors underline"
        >
          Official Google Search Central Documentation
        </a>
      </footer>
    </div>
  );
}
