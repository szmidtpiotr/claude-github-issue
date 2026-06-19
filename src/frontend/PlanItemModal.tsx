import React, { useState, useEffect, useRef } from 'react';
import { usePluginAPI } from './PluginContext';
import type { PlanItem } from './types';

interface Props {
  projectPath: string;
  phaseTitle: string | null;   // null → "No phase"
  existing?: PlanItem | null;  // present → edit mode
  onClose: () => void;
  onSaved: () => void;
}

export const PlanItemModal: React.FC<Props> = ({ projectPath, phaseTitle, existing, onClose, onSaved }) => {
  const api = usePluginAPI();
  const [title, setTitle] = useState(existing?.title ?? '');
  const [note, setNote] = useState(existing?.note ?? '');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const editing = Boolean(existing);

  useEffect(() => {
    titleRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const q = `?path=${encodeURIComponent(projectPath)}`;
      if (editing && existing) {
        await api.rpc('PUT', `/plan/item/${encodeURIComponent(existing.id)}${q}`, {
          title: title.trim(), note: note.trim(),
        });
      } else {
        await api.rpc('POST', `/plan/item${q}`, {
          phase: phaseTitle, title: title.trim(), note: note.trim(),
        });
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save plan item');
      setSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '8px 10px', borderRadius: 6,
    border: '1px solid var(--cgi-border)', background: 'var(--cgi-input-bg)',
    color: 'var(--cgi-text)', fontSize: 13, outline: 'none',
    boxSizing: 'border-box', fontFamily: 'inherit', transition: 'border-color 0.15s',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: 11, fontWeight: 600, opacity: 0.65,
    marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em',
  };

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.55)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: 'var(--cgi-modal-bg)', border: '1px solid var(--cgi-border)', borderRadius: 12, padding: 24, width: 500, maxWidth: '92vw', boxShadow: '0 20px 60px rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, fontSize: 15 }}>
            {editing ? 'Edit plan task' : 'New plan task'}
            <span style={{ fontSize: 11, fontWeight: 500, opacity: 0.55 }}>
              {phaseTitle ?? 'No phase'}
            </span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--cgi-text)', opacity: 0.5, fontSize: 20, lineHeight: 1, padding: '2px 4px' }}>×</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={labelStyle}>Title <span style={{ color: '#ef4444' }}>*</span></label>
            <input
              ref={titleRef}
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Planned task (e.g. G16 — multiplayer lobby)…"
              style={inputStyle}
              autoComplete="off"
              required
            />
          </div>

          <div>
            <label style={labelStyle}>
              Note <span style={{ opacity: 0.5, fontWeight: 400, textTransform: 'none' }}>(optional — becomes the issue body on promote)</span>
            </label>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Context, scope, dependencies…"
              style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }}
            />
          </div>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 6, padding: '8px 12px', fontSize: 12, color: '#ef4444' }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', paddingTop: 2 }}>
            <button type="button" onClick={onClose} className="cgi-btn" style={{ opacity: 0.7 }}>Cancel</button>
            <button
              type="submit"
              disabled={!title.trim() || submitting}
              className="cgi-btn"
              style={{ background: 'var(--cgi-accent)', color: '#fff', border: 'none', fontWeight: 600 }}
            >
              {submitting ? 'Saving…' : (editing ? 'Save' : 'Add task')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
