export interface GithubIssue {
  id: number;
  number: number;
  title: string;
  body: string | null;
  state: 'open' | 'closed';
  labels: Array<{ id: number; name: string; color: string }>;
  assignees: Array<{ login: string; avatar_url: string }>;
  created_at: string;
  updated_at: string;
  html_url: string;
  columnId?: string;
  user: { login: string; avatar_url: string };
  comments: number;
  milestone?: { number: number; title: string } | null;
}

export interface GithubColumn {
  id: string;
  name: string;
  labels: string[];
  color?: string;
}

export interface GithubComment {
  id: number;
  body: string;
  user: { login: string; avatar_url: string };
  created_at: string;
}

export interface IssuesData {
  issues: GithubIssue[];
  columns: GithubColumn[];
}

export interface PluginAPI {
  context: {
    theme: 'dark' | 'light';
    project: { name: string; path: string } | null;
    session: { id: string; title: string } | null;
  };
  rpc(method: string, path: string, body?: unknown): Promise<unknown>;
  onContextChange(cb: () => void): () => void;
}

// Column definitions with display metadata
export interface ColumnDef {
  id: string;
  title: string;
  state: 'open' | 'closed';
  labels: string[];
  accentColor: string;
  bgColor: string;
}

export const STATUS_LABELS = ['in-progress', 'review', 'blocked', 'deferred', 'cancelled'];

export const COLUMNS: ColumnDef[] = [
  { id: 'todo',        title: 'To Do',       state: 'open',   labels: [],              accentColor: '#64748b', bgColor: 'rgba(100,116,139,0.1)' },
  { id: 'in-progress', title: 'In Progress', state: 'open',   labels: ['in-progress'], accentColor: '#0ea5e9', bgColor: 'rgba(14,165,233,0.08)' },
  { id: 'review',      title: 'In Review',   state: 'open',   labels: ['review'],      accentColor: '#8b5cf6', bgColor: 'rgba(139,92,246,0.08)' },
  { id: 'blocked',     title: 'Blocked',     state: 'open',   labels: ['blocked'],     accentColor: '#ef4444', bgColor: 'rgba(239,68,68,0.08)' },
  { id: 'done',        title: 'Done',        state: 'closed', labels: [],              accentColor: '#10b981', bgColor: 'rgba(16,185,129,0.08)' },
];

export function issueToColumnId(issue: GithubIssue): string {
  if (issue.state === 'closed') return 'done';
  const labelNames = issue.labels.map(l => l.name);
  for (const col of COLUMNS) {
    if (col.labels.length > 0 && col.labels.some(l => labelNames.includes(l))) {
      return col.id;
    }
  }
  return 'todo';
}

/** A plan-only card: planned work that is NOT (yet) a GitHub issue. */
export interface PlanItem {
  id: string;
  phase: string | null;   // milestone title, or null for "No phase"
  title: string;
  note: string;
  order: number;
}

export interface PlanPhase {
  title: string;
  milestoneNumber: number | null;
  total: number;
  closed: number;
  issues: GithubIssue[];
  items: PlanItem[];
}

export interface PlanData {
  phases: PlanPhase[];
}

export function columnChangePatch(fromId: string, toId: string): {
  state?: string;
  addLabels?: string[];
  removeLabels?: string[];
} | null {
  const toCol = COLUMNS.find(c => c.id === toId);
  if (!toCol) return null;

  return {
    state: toCol.state,
    addLabels: toCol.labels,
    removeLabels: STATUS_LABELS.filter(l => !toCol.labels.includes(l)),
  };
}
