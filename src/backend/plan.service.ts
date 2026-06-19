import path from 'path';
import { promises as fs } from 'fs';
import type { PlanItem } from '../../src/frontend/types';

const PLAN_FILE = '.GitHubBoard/plan.json';

export interface PlanEntry {
  order: number;
  phase?: string;
}

export interface OrderStore {
  [issueNumber: string]: PlanEntry;
}

export interface PlanStore {
  version: 2;
  order: OrderStore;
  items: PlanItem[];
}

function emptyStore(): PlanStore {
  return { version: 2, order: {}, items: [] };
}

/**
 * Read the plan store. Returns an empty v2 store if missing or corrupt.
 * Migrates the v1 flat shape ({ "<issue#>": { order, phase } }) in-memory to v2.
 */
export async function readPlan(projectPath: string): Promise<PlanStore> {
  if (!projectPath) return emptyStore();
  const filePath = path.join(projectPath, PLAN_FILE);
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const parsed = JSON.parse(content) as unknown;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return emptyStore();
    const obj = parsed as Record<string, unknown>;
    // v2 store
    if (obj.version === 2) {
      const order = (obj.order && typeof obj.order === 'object' && !Array.isArray(obj.order))
        ? (obj.order as OrderStore) : {};
      const items = Array.isArray(obj.items) ? (obj.items as PlanItem[]) : [];
      return { version: 2, order, items };
    }
    // v1 flat shape → migrate: top-level keys are issue numbers mapping to { order }.
    return { version: 2, order: obj as OrderStore, items: [] };
  } catch {
    return emptyStore();
  }
}

async function writePlan(projectPath: string, store: PlanStore): Promise<void> {
  if (!projectPath) throw new Error('projectPath required');
  const dir = path.join(projectPath, '.GitHubBoard');
  await fs.mkdir(dir, { recursive: true });
  const filePath = path.join(projectPath, PLAN_FILE);
  await fs.writeFile(filePath, JSON.stringify(store, null, 2), 'utf8');
}

/**
 * Persist a new order for one phase's ISSUES: the given issue numbers get order 0..n-1
 * and (optionally) their phase tag updated. Other issues are left untouched.
 */
export async function setOrder(
  projectPath: string,
  phase: string | null,
  issueNumbers: number[]
): Promise<PlanStore> {
  const store = await readPlan(projectPath);
  issueNumbers.forEach((num, idx) => {
    const key = String(num);
    const existing = store.order[key] ?? { order: idx };
    store.order[key] = { order: idx, phase: phase ?? existing.phase };
  });
  await writePlan(projectPath, store);
  return store;
}

/** Set one issue's order explicitly (used by promote to copy an item's order). */
export async function setIssueOrder(
  projectPath: string,
  issueNumber: number,
  order: number,
  phase: string | null
): Promise<void> {
  const store = await readPlan(projectPath);
  const key = String(issueNumber);
  const existing = store.order[key];
  store.order[key] = { order, phase: phase ?? existing?.phase };
  await writePlan(projectPath, store);
}

// ---- Plan-only items ----

let idCounter = 0;
function newItemId(): string {
  idCounter = (idCounter + 1) % 100000;
  return `pi_${Date.now().toString(36)}_${idCounter.toString(36)}`;
}

function nextItemOrder(items: PlanItem[], phase: string | null): number {
  const inPhase = items.filter(i => (i.phase ?? null) === (phase ?? null));
  return inPhase.reduce((max, i) => Math.max(max, i.order + 1), 0);
}

export async function addItem(
  projectPath: string,
  input: { phase: string | null; title: string; note?: string }
): Promise<PlanItem> {
  const store = await readPlan(projectPath);
  const item: PlanItem = {
    id: newItemId(),
    phase: input.phase ?? null,
    title: input.title,
    note: input.note ?? '',
    order: nextItemOrder(store.items, input.phase ?? null),
  };
  store.items.push(item);
  await writePlan(projectPath, store);
  return item;
}

export async function updateItem(
  projectPath: string,
  id: string,
  patch: { title?: string; note?: string; phase?: string | null }
): Promise<PlanItem> {
  const store = await readPlan(projectPath);
  const item = store.items.find(i => i.id === id);
  if (!item) throw new Error(`Plan item not found: ${id}`);
  if (patch.title !== undefined) item.title = patch.title;
  if (patch.note !== undefined) item.note = patch.note;
  if (patch.phase !== undefined && (patch.phase ?? null) !== (item.phase ?? null)) {
    item.phase = patch.phase ?? null;
    item.order = nextItemOrder(store.items.filter(i => i.id !== id), item.phase);
  }
  await writePlan(projectPath, store);
  return item;
}

export async function deleteItem(projectPath: string, id: string): Promise<void> {
  const store = await readPlan(projectPath);
  store.items = store.items.filter(i => i.id !== id);
  await writePlan(projectPath, store);
}

export async function getItem(projectPath: string, id: string): Promise<PlanItem | null> {
  const store = await readPlan(projectPath);
  return store.items.find(i => i.id === id) ?? null;
}

/** Reorder items within one phase: the given ids get order 0..n-1. */
export async function setItemsOrder(
  projectPath: string,
  phase: string | null,
  ids: string[]
): Promise<void> {
  const store = await readPlan(projectPath);
  const orderById = new Map(ids.map((id, idx) => [id, idx] as const));
  for (const item of store.items) {
    if ((item.phase ?? null) === (phase ?? null) && orderById.has(item.id)) {
      item.order = orderById.get(item.id)!;
    }
  }
  await writePlan(projectPath, store);
}
