import { test, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';
import { fetchIssues, createIssue } from '../src/backend/issues.service';
import { buildPlan } from '../src/backend/plan.controller';
import { globalCache } from '../src/backend/cache';

// Fake GitHub: a repo shared by two projects. Dummy token, owner/repo placeholders.
const mk = (n: number, labels: string[], milestone: { number: number; title: string } | null = null) => ({
  id: n, number: n, title: `Issue ${n}`, body: '', state: 'open', html_url: '', comments: 0,
  labels: labels.map((name, i) => ({ id: i, name, color: 'cccccc' })), assignees: [],
  user: { login: 'u', avatar_url: '' }, created_at: '2026-01-01T00:00:00Z', updated_at: '2026-01-01T00:00:00Z',
  milestone,
});
const ISSUES = [
  mk(1, ['project-a'], { number: 1, title: 'Phase A' }),
  mk(2, ['project-b'], { number: 2, title: 'Phase B' }),
  mk(3, ['project-a', 'in-progress']),
  mk(4, []),
];
const MILESTONES = [
  { number: 1, title: 'Phase A', state: 'open', open_issues: 1, closed_issues: 0 },
  { number: 2, title: 'Phase B', state: 'open', open_issues: 1, closed_issues: 0 },
];

const realFetch = globalThis.fetch;
let posted: unknown = null;
globalThis.fetch = (async (url: string, opts?: { method?: string; body?: string }) => {
  const u = String(url);
  const json = (b: unknown) => new Response(JSON.stringify(b), { status: 200, headers: { 'content-type': 'application/json' } });
  if (opts?.method === 'POST' && u.endsWith('/issues')) {
    posted = JSON.parse(opts.body ?? '{}');
    return json(mk(99, (posted as { labels?: string[] }).labels ?? []));
  }
  if (u.includes('/milestones')) return json(MILESTONES);
  if (u.includes('/issues')) return json(ISSUES);
  return new Response('{}', { status: 404 });
}) as typeof fetch;
after(() => { globalThis.fetch = realFetch; });
beforeEach(() => { globalCache.clear(); posted = null; });

function project(cfg: Record<string, unknown>): string {
  const dir = mkdtempSync(path.join(tmpdir(), 'cgi-issues-'));
  mkdirSync(path.join(dir, '.GitHubBoard'));
  writeFileSync(path.join(dir, '.GitHubBoard', 'github-sync.json'),
    JSON.stringify({ token: 'test-token', owner: 'owner', repo: 'repo', ...cfg }));
  return dir;
}
const nums = (r: { issues: Array<{ number: number }> }) => r.issues.map(i => i.number);

test('board without filter shows the whole repo (old config)', async () => {
  const dir = project({});
  try {
    const r = await fetchIssues(dir);
    assert.deepEqual(nums(r), [1, 2, 3, 4]);
    assert.equal(r.scope, 'repo');
    assert.deepEqual(r.projectLabels, []);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('board with filter: project scope vs whole-repo scope', async () => {
  const dir = project({ labels: ['project-a'] });
  try {
    const p = await fetchIssues(dir, 'project');
    assert.deepEqual(nums(p), [1, 3]);
    assert.equal(p.scope, 'project');
    assert.equal(p.repoTotal, 4);
    // column logic untouched by the project label
    assert.equal(p.issues.find(i => i.number === 3)?.columnId, 'in-progress');

    const r = await fetchIssues(dir, 'repo');
    assert.deepEqual(nums(r), [1, 2, 3, 4]);
    assert.equal(r.scope, 'repo');
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('new issue gets the project label automatically', async () => {
  const dir = project({ labels: ['project-a'] });
  try {
    await createIssue(dir, 'Title', 'Body', ['bug']);
    assert.deepEqual((posted as { labels: string[] }).labels, ['bug', 'project-a']);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('new issue without filter gets no extra label', async () => {
  const dir = project({});
  try {
    await createIssue(dir, 'Title');
    assert.equal((posted as { labels?: string[] }).labels, undefined);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('Plan tab only lists project issues and hides other projects\' phases', async () => {
  const dir = project({ labels: ['project-a'] });
  try {
    const plan = await buildPlan(dir);
    assert.deepEqual(plan.phases.map(p => p.title), ['Phase A', 'No phase']);
    assert.deepEqual(plan.phases.flatMap(p => p.issues.map(i => i.number)), [1, 3]);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('Plan tab without filter is unchanged', async () => {
  const dir = project({});
  try {
    const plan = await buildPlan(dir);
    assert.deepEqual(plan.phases.map(p => p.title), ['Phase A', 'Phase B', 'No phase']);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
