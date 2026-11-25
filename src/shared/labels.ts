// Label roles shared by backend and frontend.
//
// The plugin gives labels three different jobs. Keep them apart:
//   1. STATUS labels   — decide the board column (in-progress, review, blocked, …).
//   2. PRIORITY labels — detected by name pattern for priority dots/sort/AI heuristics.
//   3. PROJECT labels  — optional per-project filter (`labels` in github-sync.json):
//                        "this board only shows issues of my project".
// Status and priority handling is unchanged by the project filter; a project label is
// just an ordinary label that the board uses to decide which issues belong here.

/** Labels that move an issue between board columns (or are written by column moves). */
export const STATUS_LABEL_NAMES = [
  'in-progress',
  'review',
  'blocked',
  'need-testing',
  'deferred',
  'cancelled',
] as const;

/**
 * Label names (or substrings) the plugin reads as a priority signal.
 * Mirrors priorityUtils.ts (board pills / sort) and ai.service.ts (heuristic score),
 * e.g. `enhancement` and `documentation` push an issue DOWN in the AI heuristic.
 */
export const PRIORITY_LABEL_PATTERNS = [
  // high
  'p0', 'critical', 'blocker', 'urgent', 'security', 'vulnerability', 'crash', 'data-loss',
  'high', 'priority:high', 'high-priority', 'bug',
  // medium
  'p1', 'important', 'medium', 'priority:medium', 'medium-priority',
  // low
  'p2', 'p3', 'low', 'priority:low', 'low-priority', 'nice-to-have', 'minor',
  'enhancement', 'feature', 'improvement', 'wontfix', 'documentation', 'docs',
] as const;

/** Labels GitHub creates in every new repository. Not project labels. */
export const GITHUB_DEFAULT_LABELS = [
  'bug', 'documentation', 'duplicate', 'enhancement', 'good first issue',
  'help wanted', 'invalid', 'question', 'wontfix',
] as const;

export type LabelRole = 'status' | 'priority' | 'default' | 'other';

const STATUS_SET = new Set<string>(STATUS_LABEL_NAMES);
const DEFAULT_SET = new Set<string>(GITHUB_DEFAULT_LABELS);

/** Classify a label so the UI can tell "project label candidates" from special ones. */
export function labelRole(name: string): LabelRole {
  const n = name.trim().toLowerCase();
  if (STATUS_SET.has(n)) return 'status';
  if (PRIORITY_LABEL_PATTERNS.some(p => n === p || n.startsWith('priority') || /^p[0-9]$/.test(n))) {
    return 'priority';
  }
  if (DEFAULT_SET.has(n)) return 'default';
  return 'other';
}

/**
 * Normalize the optional `labels` field of github-sync.json.
 * Accepts an array of strings (preferred) or a single comma-separated string.
 * Anything else (missing, null, number, …) means "no project filter" → [].
 */
export function normalizeLabels(raw: unknown): string[] {
  let list: unknown[] = [];
  if (Array.isArray(raw)) list = raw;
  else if (typeof raw === 'string') list = raw.split(',');
  else return [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const v of list) {
    if (typeof v !== 'string') continue;
    const name = v.trim();
    if (!name) continue;
    const key = name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(name);
  }
  return out;
}

/**
 * Does the issue belong to the project? True when it carries AT LEAST ONE of the
 * project labels (case-insensitive). An empty filter matches every issue, so
 * configs without `labels` behave exactly as before.
 */
export function issueMatchesLabels(
  issue: { labels?: Array<{ name: string } | string> | null },
  projectLabels: string[]
): boolean {
  if (projectLabels.length === 0) return true;
  const wanted = new Set(projectLabels.map(l => l.toLowerCase()));
  return (issue.labels ?? []).some(l => {
    const name = typeof l === 'string' ? l : l?.name;
    return typeof name === 'string' && wanted.has(name.toLowerCase());
  });
}

export function filterIssuesByLabels<T extends { labels?: Array<{ name: string } | string> | null }>(
  issues: T[],
  projectLabels: string[]
): T[] {
  if (projectLabels.length === 0) return issues;
  return issues.filter(i => issueMatchesLabels(i, projectLabels));
}

/** Labels for a new issue: whatever the user picked + the project labels (no dupes). */
export function withProjectLabels(labels: string[] | undefined, projectLabels: string[]): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const l of [...(labels ?? []), ...projectLabels]) {
    const key = l.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(l);
  }
  return out;
}
