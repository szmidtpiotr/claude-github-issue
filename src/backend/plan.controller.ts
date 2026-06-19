import * as configService from './config.service';
import * as planService from './plan.service';
import {
  listIssues,
  listMilestones,
  setIssueMilestone,
  createMilestone,
} from './github.service';
import * as issuesService from './issues.service';
import type { GithubIssue } from '../../src/frontend/types';
import type { PlanData, PlanPhase, PlanItem } from '../../src/frontend/types';

const NO_PHASE = '__no_phase__';

async function requireConfig(projectPath: string) {
  const config = await configService.readConfig(projectPath);
  if (!config) {
    const err = new Error('GitHub not configured') as Error & { notConfigured?: boolean };
    err.notConfigured = true;
    throw err;
  }
  return config;
}

/** GET /plan — merge issues + milestones + order store + plan-only items into phase-grouped data. */
export async function buildPlan(projectPath: string): Promise<PlanData> {
  const config = await requireConfig(projectPath);
  const [issues, milestones, store] = await Promise.all([
    listIssues(config.token, config.owner, config.repo, 'all'),
    listMilestones(config.token, config.owner, config.repo, 'all'),
    planService.readPlan(projectPath),
  ]);

  // Group issues by milestone number (or NO_PHASE).
  const groups = new Map<string, GithubIssue[]>();
  for (const issue of issues) {
    const key = issue.milestone ? String(issue.milestone.number) : NO_PHASE;
    const arr = groups.get(key) ?? [];
    arr.push(issue);
    groups.set(key, arr);
  }

  // Group plan-only items by phase title (or NO_PHASE).
  const itemGroups = new Map<string, PlanItem[]>();
  for (const item of store.items) {
    const key = item.phase ?? NO_PHASE;
    const arr = itemGroups.get(key) ?? [];
    arr.push(item);
    itemGroups.set(key, arr);
  }
  const sortItems = (arr: PlanItem[]): PlanItem[] =>
    arr.sort((a, b) => (a.order !== b.order ? a.order - b.order : a.id.localeCompare(b.id)));

  const orderOf = (num: number): number => {
    const entry = store.order[String(num)];
    return entry ? entry.order : Number.MAX_SAFE_INTEGER;
  };
  const sortGroup = (arr: GithubIssue[]): GithubIssue[] =>
    arr.sort((a, b) => {
      const oa = orderOf(a.number);
      const ob = orderOf(b.number);
      if (oa !== ob) return oa - ob;          // explicit order first
      return a.number - b.number;             // fallback: by number
    });

  const phases: PlanPhase[] = [];
  const usedItemKeys = new Set<string>();

  // One section per milestone, in GitHub milestone order. Attach items by phase title.
  for (const m of milestones) {
    const arr = sortGroup(groups.get(String(m.number)) ?? []);
    const items = sortItems(itemGroups.get(m.title) ?? []);
    if (itemGroups.has(m.title)) usedItemKeys.add(m.title);
    phases.push({
      title: m.title,
      milestoneNumber: m.number,
      total: arr.length,
      closed: arr.filter(i => i.state === 'closed').length,
      issues: arr,
      items,
    });
  }

  // Phases that exist ONLY as item-phases (no milestone yet) — own section each.
  for (const [key, items] of itemGroups) {
    if (key === NO_PHASE || usedItemKeys.has(key)) continue;
    phases.push({
      title: key,
      milestoneNumber: null,
      total: 0,
      closed: 0,
      issues: [],
      items: sortItems(items),
    });
  }

  // "No phase" section at the bottom, only if it has issues or items.
  const noPhaseIssues = sortGroup(groups.get(NO_PHASE) ?? []);
  const noPhaseItems = sortItems(itemGroups.get(NO_PHASE) ?? []);
  if (noPhaseIssues.length > 0 || noPhaseItems.length > 0) {
    phases.push({
      title: 'No phase',
      milestoneNumber: null,
      total: noPhaseIssues.length,
      closed: noPhaseIssues.filter(i => i.state === 'closed').length,
      issues: noPhaseIssues,
      items: noPhaseItems,
    });
  }

  return { phases };
}

/** PUT /plan/order — persist a new order for one phase. */
export async function saveOrder(
  projectPath: string,
  phase: string | null,
  issueNumbers: number[]
): Promise<void> {
  await requireConfig(projectPath);
  await planService.setOrder(projectPath, phase, issueNumbers);
}

/** PUT /plan/phase — assign an issue to a milestone (or clear it). */
export async function assignPhase(
  projectPath: string,
  issueNumber: number,
  milestoneNumber: number | null
): Promise<void> {
  const config = await requireConfig(projectPath);
  await setIssueMilestone(config.token, config.owner, config.repo, issueNumber, milestoneNumber);
}

/** POST /plan/bootstrap — create missing milestones and assign issues to them. */
export async function bootstrap(
  projectPath: string,
  phases: Array<{ title: string; issues: number[] }>
): Promise<{ created: string[]; assigned: number }> {
  const config = await requireConfig(projectPath);
  const existing = await listMilestones(config.token, config.owner, config.repo, 'all');
  const byTitle = new Map(existing.map(m => [m.title, m.number] as const));
  const created: string[] = [];
  let assigned = 0;

  for (const phase of phases) {
    let num = byTitle.get(phase.title);
    if (num === undefined) {
      const m = await createMilestone(config.token, config.owner, config.repo, phase.title);
      num = m.number;
      byTitle.set(phase.title, num);
      created.push(phase.title);
    }
    for (const issueNumber of phase.issues) {
      await setIssueMilestone(config.token, config.owner, config.repo, issueNumber, num);
      assigned++;
    }
  }
  return { created, assigned };
}

// ---- Plan-only items (CRUD + promote) ----

/** POST /plan/item — create a plan-only item (no GitHub call). */
export async function createItem(
  projectPath: string,
  input: { phase: string | null; title: string; note?: string }
): Promise<PlanItem> {
  if (!input.title?.trim()) throw new Error('title is required');
  return planService.addItem(projectPath, {
    phase: input.phase ?? null,
    title: input.title.trim(),
    note: input.note ?? '',
  });
}

/** PUT /plan/item/:id — edit a plan-only item. */
export async function editItem(
  projectPath: string,
  id: string,
  patch: { title?: string; note?: string; phase?: string | null }
): Promise<PlanItem> {
  return planService.updateItem(projectPath, id, patch);
}

/** DELETE /plan/item/:id — remove a plan-only item. */
export async function removeItem(projectPath: string, id: string): Promise<void> {
  await planService.deleteItem(projectPath, id);
}

/** PUT /plan/items/order — reorder plan-only items within one phase. */
export async function reorderItems(
  projectPath: string,
  phase: string | null,
  ids: string[]
): Promise<void> {
  await planService.setItemsOrder(projectPath, phase ?? null, ids);
}

/**
 * POST /plan/item/:id/promote — turn a plan-only item into a real GitHub issue.
 * Auto-creates the phase milestone if missing, copies the item's order, deletes the item.
 */
export async function promoteItem(projectPath: string, id: string): Promise<GithubIssue> {
  const config = await requireConfig(projectPath);
  const item = await planService.getItem(projectPath, id);
  if (!item) throw new Error(`Plan item not found: ${id}`);

  // Resolve / create the milestone for this item's phase.
  let milestoneNumber: number | null = null;
  if (item.phase) {
    const milestones = await listMilestones(config.token, config.owner, config.repo, 'all');
    const existing = milestones.find(m => m.title === item.phase);
    milestoneNumber = existing
      ? existing.number
      : (await createMilestone(config.token, config.owner, config.repo, item.phase)).number;
  }

  // Create the issue from the item's title + note.
  const issue = await issuesService.createIssue(projectPath, item.title, item.note);

  // Assign milestone and copy the item's order into the issue order store.
  if (milestoneNumber !== null) {
    await setIssueMilestone(config.token, config.owner, config.repo, issue.number, milestoneNumber);
  }
  await planService.setIssueOrder(projectPath, issue.number, item.order, item.phase);

  // Remove the now-promoted item.
  await planService.deleteItem(projectPath, id);
  return issue;
}
