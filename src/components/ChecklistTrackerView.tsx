import React, { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  CheckSquare,
  ChevronDown,
  ChevronRight,
  Download,
  RotateCcw,
  Search,
  Square,
} from 'lucide-react';
import {
  CHECKLIST_ITEMS,
  ChecklistItem,
  PILLAR_METADATA,
  PillarId,
  RAW_CHECKLIST_MD,
} from '../data/skillData';
import { downloadSingleTextFile } from '../utils/zipExport';

interface ChecklistTrackerViewProps {
  activePillarFilter: PillarId | 'all';
  onSelectPillarFilter: (pillar: PillarId | 'all') => void;
  onInspectSkillRule: (fileId: string, anchor?: string) => void;
  auditedIds: Record<string, boolean>;
  onToggleAuditItem: (id: string) => void;
  onResetAuditProgress: () => void;
  onMarkAllAudited: () => void;
}

export function ChecklistTrackerView({
  activePillarFilter,
  onSelectPillarFilter,
  onInspectSkillRule,
  auditedIds,
  onToggleAuditItem,
  onResetAuditProgress,
  onMarkAllAudited,
}: ChecklistTrackerViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [auditFilter, setAuditFilter] = useState<'all' | 'remaining' | 'audited'>('all');
  const [collapsedAccordions, setCollapsedAccordions] = useState<Record<string, boolean>>({});

  const totalRules = CHECKLIST_ITEMS.length;
  const builtInCount = CHECKLIST_ITEMS.filter((i) => i.skillBuiltIn).length;
  const projectAuditedCount = CHECKLIST_ITEMS.filter((i) => auditedIds[i.id]).length;

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return CHECKLIST_ITEMS.filter((item) => {
      if (activePillarFilter !== 'all' && item.pillar !== activePillarFilter) {
        return false;
      }
      if (auditFilter === 'remaining' && auditedIds[item.id]) {
        return false;
      }
      if (auditFilter === 'audited' && !auditedIds[item.id]) {
        return false;
      }
      if (!q) return true;
      return (
        item.breadcrumb.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.number.includes(q) ||
        item.targetFileId.toLowerCase().includes(q)
      );
    });
  }, [activePillarFilter, auditFilter, auditedIds, searchQuery]);

  const groupedByPillar = useMemo(() => {
    const order: PillarId[] = [
      'essentials',
      'fundamentals',
      'crawling',
      'appearance',
      'monitoring',
    ];
    return order
      .map((pillar) => {
        const items = filteredItems.filter((i) => i.pillar === pillar);
        // Group nested accordions inside each pillar
        const accordionMap = new Map<string, ChecklistItem[]>();
        for (const item of items) {
          const groupKey = item.parentAccordion;
          const existing = accordionMap.get(groupKey) || [];
          existing.push(item);
          accordionMap.set(groupKey, existing);
        }
        return {
          pillar,
          meta: PILLAR_METADATA[pillar],
          items,
          accordions: Array.from(accordionMap.entries()),
        };
      })
      .filter((g) => g.items.length > 0);
  }, [filteredItems]);

  const toggleAccordion = (key: string) => {
    setCollapsedAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8">
      {/* Header & Summary Strip */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <span>/checklist.md</span>
            <span aria-hidden="true">·</span>
            <span>Synced with Google Search Central Sidebar</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums text-emerald-700 font-medium">
              {builtInCount}/{totalRules} Subpages Verified in Skill
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Search Central Sidebar &amp; Subpage Coverage Ledger
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-3xl">
            Every top-level guide and nested sidebar accordion item across Search Essentials, SEO Fundamentals, Crawling &amp; Indexing, Ranking &amp; Appearance, and Monitoring &amp; Debugging - mapped directly to executable AI rules. Use the interactive checkboxes on the left to audit a live website build.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => downloadSingleTextFile('checklist.md', RAW_CHECKLIST_MD)}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download checklist.md</span>
          </button>
          <button
            type="button"
            onClick={onMarkAllAudited}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Check All ({projectAuditedCount}/{totalRules})</span>
          </button>
          <button
            type="button"
            onClick={onResetAuditProgress}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            title="Reset project audit checkboxes"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* 5-Pillar Coverage Breakdown Grid (Single-Elevation, Hairline Dividers, Tabular Nums) */}
      <div className="grid grid-cols-2 md:grid-cols-5 border border-slate-200 rounded-lg divide-y md:divide-y-0 md:divide-x divide-slate-200 bg-slate-50/50">
        {(['essentials', 'fundamentals', 'crawling', 'appearance', 'monitoring'] as PillarId[]).map(
          (pId) => {
            const pillarTotal = CHECKLIST_ITEMS.filter((i) => i.pillar === pId).length;
            const pillarBuilt = CHECKLIST_ITEMS.filter(
              (i) => i.pillar === pId && i.skillBuiltIn
            ).length;
            const isSelected = activePillarFilter === pId;
            return (
              <button
                key={pId}
                type="button"
                onClick={() => onSelectPillarFilter(isSelected ? 'all' : pId)}
                className={`p-4 text-left transition-colors cursor-pointer ${
                  isSelected ? 'bg-blue-50/70' : 'hover:bg-slate-100/70'
                }`}
              >
                <div className="text-xs font-medium text-slate-500 truncate">
                  {PILLAR_METADATA[pId].label}
                </div>
                <div className="mt-1 flex items-baseline justify-between gap-2">
                  <span className="text-xl font-bold font-mono tabular-nums text-slate-900">
                    {pillarBuilt}/{pillarTotal}
                  </span>
                  <span className="text-xs font-mono tabular-nums text-emerald-700">100%</span>
                </div>
                <div className="mt-1 text-[11px] text-slate-500 truncate">
                  {PILLAR_METADATA[pId].docsPath}
                </div>
              </button>
            );
          }
        )}
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-lg">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter 80 pages & rules (e.g. robots.txt, hreflang, CLS, Soft 404, Discover)..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Pillar Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto">
            {(
              [
                ['all', 'All Pillars'],
                ['essentials', 'Essentials'],
                ['fundamentals', 'Fundamentals'],
                ['crawling', 'Crawling'],
                ['appearance', 'Appearance'],
                ['monitoring', 'Monitoring'],
              ] as const
            ).map(([val, label]) => (
              <button
                key={val}
                type="button"
                onClick={() => onSelectPillarFilter(val)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activePillarFilter === val
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Site Audit Filter */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            {(
              [
                ['all', 'All'],
                ['remaining', 'Unchecked'],
                ['audited', 'Checked'],
              ] as const
            ).map(([val, label]) => (
              <button
                key={val}
                type="button"
                onClick={() => setAuditFilter(val)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  auditFilter === val
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Empty Search State */}
      {groupedByPillar.length === 0 ? (
        <div className="p-12 text-center border border-slate-200 rounded-lg bg-slate-50/40">
          <p className="text-sm font-medium text-slate-900">
            No Google Search Central rules match your current filter.
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Clear your search query or switch the status filter back to All Pillars.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              onSelectPillarFilter('all');
              setAuditFilter('all');
            }}
            className="mt-4 px-4 py-2 text-xs font-medium text-white bg-[#1A73E8] rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {groupedByPillar.map(({ pillar, meta, items, accordions }) => (
            <section key={pillar} className="space-y-3">
              <div className="flex items-baseline justify-between gap-4 border-b border-slate-200 pb-2">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">{meta.label}</h2>
                  <p className="text-xs text-slate-500">{meta.description}</p>
                </div>
                <span className="text-xs font-mono tabular-nums text-slate-500 shrink-0">
                  {items.length} {items.length === 1 ? 'rule' : 'rules'} shown
                </span>
              </div>

              <div className="border border-slate-200 rounded-lg divide-y divide-slate-200 bg-white overflow-hidden">
                {accordions.map(([accordionTitle, subItems]) => {
                  const collapseKey = `${pillar}::${accordionTitle}`;
                  const isCollapsed = !!collapsedAccordions[collapseKey];
                  const isMultiAccordion = subItems.length > 1;

                  return (
                    <div key={collapseKey}>
                      {isMultiAccordion && (
                        <button
                          type="button"
                          onClick={() => toggleAccordion(collapseKey)}
                          className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50/80 hover:bg-slate-100/70 transition-colors text-left cursor-pointer"
                        >
                          <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                            {isCollapsed ? (
                              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                            )}
                            <span>Accordion: {accordionTitle}</span>
                          </div>
                          <span className="text-xs font-mono tabular-nums text-slate-500">
                            {subItems.length} subpages
                          </span>
                        </button>
                      )}

                      {!isCollapsed && (
                        <div className="divide-y divide-slate-100">
                          {subItems.map((item) => {
                            const isAudited = !!auditedIds[item.id];
                            return (
                              <div
                                key={item.id}
                                className="flex items-start justify-between gap-4 px-4 py-3 hover:bg-slate-50/70 transition-colors"
                              >
                                <div className="flex items-start gap-3 min-w-0">
                                  <button
                                    type="button"
                                    onClick={() => onToggleAuditItem(item.id)}
                                    aria-label={`Mark rule ${item.number} as audited`}
                                    className="mt-0.5 text-slate-400 hover:text-[#1A73E8] transition-colors shrink-0 cursor-pointer"
                                  >
                                    {isAudited ? (
                                      <CheckSquare className="w-4 h-4 text-[#1A73E8]" />
                                    ) : (
                                      <Square className="w-4 h-4" />
                                    )}
                                  </button>

                                  <div className="min-w-0">
                                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm">
                                      <span className="font-mono tabular-nums text-xs text-slate-400">
                                        {item.number}.
                                      </span>
                                      <span
                                        className={`font-semibold ${
                                          isAudited
                                            ? 'line-through text-slate-400'
                                            : 'text-slate-900'
                                        }`}
                                      >
                                        {item.leafPage}
                                      </span>
                                      <span aria-hidden="true" className="text-slate-300 text-xs">
                                        ·
                                      </span>
                                      <span className="text-xs text-emerald-700 font-medium">
                                        Added to Skill
                                      </span>
                                    </div>
                                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                                      {item.summary}
                                    </p>
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={() =>
                                    onInspectSkillRule(item.targetFileId, item.targetAnchor)
                                  }
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-[#1A73E8] hover:bg-blue-50 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                                >
                                  <span className="font-mono text-[11px]">
                                    {item.targetFileId}
                                    {item.targetAnchor ? `#${item.targetAnchor}` : ''}
                                  </span>
                                  <ArrowUpRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
