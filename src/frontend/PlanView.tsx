import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { GithubIssue, PlanData, PlanPhase, PlanItem } from './types';
import { usePluginAPI } from './PluginContext';
import { PlanCard } from './PlanCard';
import { PlanItemCard } from './PlanItemCard';
import { PlanItemModal } from './PlanItemModal';
import { PlanBootstrapModal } from './PlanBootstrapModal';

const POLL_INTERVAL_MS = 30_000;

interface PlanViewProps {
  projectPath: string;
  onOpenIssue: (issue: GithubIssue) => void;
}

/** The phase value to send to the backend for a section (null for the "No phase" group). */
const sectionPhase = (p: PlanPhase): string | null =>
  (p.milestoneNumber === null && p.title === 'No phase') ? null : p.title;

export const PlanView: React.FC<PlanViewProps> = ({ projectPath, onOpenIssue }) => {
  const api = usePluginAPI();
  const [data, setData] = useState<PlanData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notConfigured, setNotConfigured] = useState(false);
  const dragFrom = useRef<{ phase: string; index: number } | null>(null);
  const dragItemFrom = useRef<{ phase: string; index: number } | null>(null);
  const pollRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dataRef = useRef<PlanData | null>(null);
  const [showBootstrap, setShowBootstrap] = useState(false);
  const [itemModal, setItemModal] = useState<{ phaseTitle: string | null; item: PlanItem | null } | null>(null);
  const [promotingId, setPromotingId] = useState<string | null>(null);
  const [hideDone, setHideDone] = useState<boolean>(() => {
    try { return localStorage.getItem('cgi-plan-hide-done') !== 'false'; } catch { return true; }
  });
  const hideDoneRef = useRef(hideDone);
  useEffect(() => {
    hideDoneRef.current = hideDone;
    try { localStorage.setItem('cgi-plan-hide-done', String(hideDone)); } catch {}
  }, [hideDone]);

  const fetchPlan = useCallback(async () => {
    if (!projectPath) return;
    setLoading(true);
    setError(null);
    try {
      const res = await api.rpc('GET', `/plan?path=${encodeURIComponent(projectPath)}`) as
        PlanData & { error?: string; notConfigured?: boolean };
      if (res.notConfigured) { setNotConfigured(true); setData(null); }
      else if (res.error) { setError(res.error); }
      else { setNotConfigured(false); setData({ phases: res.phases ?? [] }); }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load plan');
    } finally {
      setLoading(false);
    }
  }, [api, projectPath]);

  useEffect(() => { fetchPlan(); }, [fetchPlan]);
  useEffect(() => { dataRef.current = data; }, [data]);
  useEffect(() => {
    const schedule = () => { pollRef.current = setTimeout(() => { fetchPlan().then(schedule); }, POLL_INTERVAL_MS); };
    schedule();
    return () => { if (pollRef.current) clearTimeout(pollRef.current); };
  }, [fetchPlan]);

  const phaseKey = (p: PlanPhase) => p.milestoneNumber === null ? `np:${p.title}` : String(p.milestoneNumber);

  // ---- Issue reorder (existing behavior) ----
  const applyReorder = useCallback((phaseId: string, mutate: (issues: GithubIssue[]) => GithubIssue[]) => {
    const current = dataRef.current;
    if (!current) return;
    const target = current.phases.find(p => phaseKey(p) === phaseId);
    if (!target) return;
    const isHidden = (i: GithubIssue) => hideDoneRef.current && i.state === 'closed';
    const visible = mutate(target.issues.filter(i => !isHidden(i)));
    const hidden = target.issues.filter(isHidden);
    const issues = [...visible, ...hidden];
    const phaseTitle = target.milestoneNumber === null ? null : target.title;
    const order = issues.map(i => i.number);
    setData({ phases: current.phases.map(p => phaseKey(p) === phaseId ? { ...p, issues } : p) });
    void (async () => {
      try {
        await api.rpc('PUT', `/plan/order?path=${encodeURIComponent(projectPath)}`, { phase: phaseTitle, order });
      } catch { void fetchPlan(); }
    })();
  }, [api, projectPath, fetchPlan]);

  const reorder = (phaseId: string, from: number, to: number) => {
    applyReorder(phaseId, issues => {
      if (to < 0 || to >= issues.length) return issues;
      const next = issues.slice();
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  };

  const handleDrop = (phaseId: string, toIndex: number) => {
    const src = dragFrom.current;
    dragFrom.current = null;
    if (!src || src.phase !== phaseId) return;
    const to = src.index < toIndex ? toIndex - 1 : toIndex;
    if (src.index === to) return;
    reorder(phaseId, src.index, to);
  };

  // ---- Plan-only item reorder ----
  const applyItemsReorder = useCallback((phaseId: string, mutate: (items: PlanItem[]) => PlanItem[]) => {
    const current = dataRef.current;
    if (!current) return;
    const target = current.phases.find(p => phaseKey(p) === phaseId);
    if (!target) return;
    const items = mutate(target.items.slice());
    const phaseTitle = sectionPhase(target);
    const order = items.map(i => i.id);
    setData({ phases: current.phases.map(p => phaseKey(p) === phaseId ? { ...p, items } : p) });
    void (async () => {
      try {
        await api.rpc('PUT', `/plan/items/order?path=${encodeURIComponent(projectPath)}`, { phase: phaseTitle, order });
      } catch { void fetchPlan(); }
    })();
  }, [api, projectPath, fetchPlan]);

  const reorderItem = (phaseId: string, from: number, to: number) => {
    applyItemsReorder(phaseId, items => {
      if (to < 0 || to >= items.length) return items;
      const next = items.slice();
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  };

  const handleItemDrop = (phaseId: string, toIndex: number) => {
    const src = dragItemFrom.current;
    dragItemFrom.current = null;
    if (!src || src.phase !== phaseId) return;
    const to = src.index < toIndex ? toIndex - 1 : toIndex;
    if (src.index === to) return;
    reorderItem(phaseId, src.index, to);
  };

  const deleteItem = async (item: PlanItem) => {
    if (item.note.trim() && !window.confirm(`Delete plan task "${item.title}"?`)) return;
    try {
      await api.rpc('DELETE', `/plan/item/${encodeURIComponent(item.id)}?path=${encodeURIComponent(projectPath)}`);
      void fetchPlan();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to delete plan item');
    }
  };

  const promoteItem = async (item: PlanItem) => {
    setPromotingId(item.id);
    try {
      const res = await api.rpc('POST', `/plan/item/${encodeURIComponent(item.id)}/promote?path=${encodeURIComponent(projectPath)}`) as
        { ok?: boolean; error?: string; notConfigured?: boolean };
      if (res.error) setError(res.error);
      await fetchPlan();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to promote plan item');
    } finally {
      setPromotingId(null);
    }
  };

  if (notConfigured) return <div className="cgi-center"><div style={{ opacity: 0.5 }}>GitHub not configured. Open the ⚙ settings on the Issues Board tab.</div></div>;
  if (error) return <div className="cgi-center"><div className="cgi-error-text">{error}</div><button className="cgi-btn" onClick={fetchPlan}>Retry</button></div>;
  if (loading && !data) return <div className="cgi-center"><div className="cgi-spinner" /><div>Loading plan…</div></div>;
  if (!data) return null;

  return (
    <div className="cgi-plan">
      <div className="cgi-plan-toolbar">
        <button className="cgi-btn" onClick={() => setShowBootstrap(true)}>Bootstrap phases</button>
        <button className="cgi-btn" onClick={fetchPlan} disabled={loading}>{loading ? '↻ Refreshing…' : '↻ Refresh'}</button>
        <label className="cgi-plan-toggle">
          <input type="checkbox" checked={hideDone} onChange={e => setHideDone(e.target.checked)} />
          Hide done
        </label>
      </div>
      {data.phases.length === 0 ? (
        <div className="cgi-center"><div style={{ opacity: 0.5 }}>No issues yet.</div></div>
      ) : (
        data.phases.map(phase => {
          const pct = phase.total > 0 ? Math.round((phase.closed / phase.total) * 100) : 0;
          const visibleIssues = hideDone ? phase.issues.filter(i => i.state !== 'closed') : phase.issues;
          // Hide a phase only if it has no visible issues AND no plan-only items.
          if (hideDone && phase.total > 0 && visibleIssues.length === 0 && phase.items.length === 0) return null;
          const pid = phaseKey(phase);
          return (
            <section key={pid} className="cgi-plan-phase">
              <header className="cgi-plan-phase-head">
                <span className="cgi-plan-phase-title">{phase.title}</span>
                <span className="cgi-plan-phase-count">{phase.closed}/{phase.total}</span>
                <span className="cgi-plan-progress"><span className="cgi-plan-progress-bar" style={{ width: `${pct}%` }} /></span>
                <button
                  className="cgi-plan-add"
                  title="Add a planned task to this phase"
                  onClick={() => setItemModal({ phaseTitle: sectionPhase(phase), item: null })}
                >+ Add task</button>
              </header>
              <div className="cgi-plan-list">
                {visibleIssues.map((issue, idx) => (
                  <PlanCard
                    key={issue.number}
                    issue={issue}
                    index={idx}
                    count={visibleIssues.length}
                    onOpen={onOpenIssue}
                    onMoveUp={() => reorder(pid, idx, idx - 1)}
                    onMoveDown={() => reorder(pid, idx, idx + 1)}
                    onDragStart={() => { dragFrom.current = { phase: pid, index: idx }; }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(pid, idx)}
                  />
                ))}
                {phase.items.map((item, idx) => (
                  <PlanItemCard
                    key={item.id}
                    item={item}
                    index={idx}
                    count={phase.items.length}
                    promoting={promotingId === item.id}
                    onEdit={() => setItemModal({ phaseTitle: sectionPhase(phase), item })}
                    onDelete={() => void deleteItem(item)}
                    onPromote={() => void promoteItem(item)}
                    onMoveUp={() => reorderItem(pid, idx, idx - 1)}
                    onMoveDown={() => reorderItem(pid, idx, idx + 1)}
                    onDragStart={() => { dragItemFrom.current = { phase: pid, index: idx }; }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleItemDrop(pid, idx)}
                  />
                ))}
              </div>
            </section>
          );
        })
      )}
      {itemModal && (
        <PlanItemModal
          projectPath={projectPath}
          phaseTitle={itemModal.phaseTitle}
          existing={itemModal.item}
          onClose={() => setItemModal(null)}
          onSaved={() => { setItemModal(null); void fetchPlan(); }}
        />
      )}
      {showBootstrap && (
        <PlanBootstrapModal
          projectPath={projectPath}
          onClose={() => setShowBootstrap(false)}
          onDone={() => { setShowBootstrap(false); void fetchPlan(); }}
        />
      )}
    </div>
  );
};
