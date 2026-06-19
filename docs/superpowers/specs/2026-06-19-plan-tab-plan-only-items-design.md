# Plan tab — plan-only items + promote-to-issue (FAZA A) + cutover (FAZA B)

> Spec from brainstorming session 2026-06-19. Source brief: `docs/PLAN_TAB_BRIEF.md`
> (END-TO-END SCOPE v2). Foundation already on `feat/plan-tab`: order store,
> milestone-grouped PlanView, reorder (arrows + drag), hide-done, bootstrap.

## Decisions (locked)

1. **Ordering of plan-only items vs issues:** items render as a sub-list AFTER the
   issue list within each phase; reorderable within the items group only.
2. **Promote-to-issue + missing milestone:** auto-create the milestone from the item's
   phase title, then file the new issue under it.
3. **Sequencing:** build all of FAZA A → build + commit `dist/` → push `feat/plan-tab` →
   continue straight into FAZA B (no pause for manual verify; Piotr verifies live later).
4. **Delete item:** confirm only when the item's note is non-empty.

## Data model — `plan.json` v2

```json
{
  "version": 2,
  "order": { "<issue#>": { "order": 0, "phase": "FAZA L" } },
  "items": [
    { "id": "pi_<ts>_<rand>", "phase": "FAZA 5 Multiplayer", "title": "G16 lobby", "note": "free text", "order": 0 }
  ]
}
```

- `order` — unchanged semantics from v1 (issue# → order/phase).
- `items` — plan-only cards. `phase` = milestone **title** (or `null`). `order` = position
  within that phase's items sub-list. `id` = `pi_<timestamp>_<rand>` (backend Node runtime).
- **Backward compat:** if the parsed file has NO `version` key and its top-level keys look
  like the old flat order map, migrate in-memory to `{ version: 2, order: <old>, items: [] }`.
  The next write persists v2. v1 order data is preserved.

## Backend

### `plan.service.ts`
- `readPlan(projectPath) → { order: OrderStore, items: PlanItem[] }` (with v1 migration).
- `writePlan` persists the v2 object.
- `setOrder(projectPath, phase, issueNumbers)` — unchanged behavior, now writes into `.order`.
- `addItem(projectPath, { phase, title, note }) → PlanItem` — assigns next order in that phase.
- `updateItem(projectPath, id, { title?, note?, phase? }) → PlanItem`.
- `deleteItem(projectPath, id) → void`.
- `setItemsOrder(projectPath, phase, ids: string[])` — assign order 0..n-1 to those items.
- `removeItem` reused by promote.

### `plan.controller.ts`
- `buildPlan`: each `PlanPhase` gains `items: PlanItem[]`. Grouping:
  - Issues grouped by milestone number (existing).
  - Items grouped by phase **title**.
  - For each milestone section, attach items whose `phase === milestone.title`.
  - A phase title present ONLY in items (no milestone) → its own section
    (`milestoneNumber: null`, but a distinct title), sorted after milestone sections.
  - `phase: null` items → the "No phase" section.
  - Items sorted by `order`, then by `id`.
  - Progress (`total`/`closed`) stays issue-based.
- `createItem / editItem / removeItemById / reorderItems` — thin wrappers over the service.
- `promoteItem(projectPath, id)`:
  1. Read the item.
  2. Build issue body from `note` (empty note → empty body).
  3. If `item.phase`: find milestone by title; create it if missing (reuse `createMilestone`).
  4. `createIssue(title, body)` → assign milestone → write the new issue's order from
     `item.order` into the order store.
  5. `deleteItem`.
  6. Return the created issue.

### Routes (`server.ts`)
- `POST   /plan/item`            → `{ phase, title, note }`  → `{ ok, item }`
- `PUT    /plan/item/:id`        → `{ title?, note?, phase? }` → `{ ok, item }`
- `DELETE /plan/item/:id`        → `{ ok }`
- `PUT    /plan/items/order`     → `{ phase, order: string[] }` → `{ ok }`
- `POST   /plan/item/:id/promote`→ `{ ok, issue }`

`:id` matched by regex `/^\/plan\/item\/([^/]+)$/` (item ids are non-numeric, no clash with
`/issues/:n`). All routes require `?path=` (existing pattern) and `requireConfig` where they
touch GitHub (promote). CRUD on items does NOT require GitHub config (local store only).

## Frontend

### `types.ts`
- `export interface PlanItem { id: string; phase: string | null; title: string; note: string; order: number; }`
- `PlanPhase.items: PlanItem[]`.

### `PlanView.tsx`
- After the issue list in each phase, render the items sub-list.
- `+ Add task` button in each phase header (opens `PlanItemModal` pre-set to that phase).
- Items reorder via service call `PUT /plan/items/order` (same optimistic pattern as issues).
- Refetch after any item mutation.

### `PlanItemCard.tsx`
- Layout mirrors `PlanCard`: drag handle, title, note preview (1 line, muted).
- Actions: ▲▼ reorder (within items), ✎ edit, ⤴ promote, 🗑 delete.
- Delete: `window.confirm` only if `note.trim()` non-empty.

### `PlanItemModal.tsx`
- Small modal styled like `NewIssueModal`: title (required), note (textarea), phase (read-only
  label when opened from a phase; the modal is per-phase). Add + edit share the component.

### `styles.css`
- `cgi-plan-item*` classes, reusing existing `cgi-plan-*` tokens.

## Skill (`skill/SKILL.md`)

Extend the "Plan tab" section:
- Document `plan.json` v2 shape (`version`, `order`, `items`).
- How an agent READS items, ADDS/EDITS them (direct file edit OR plugin API), and PROMOTES
  one (plugin `POST /plan/item/:id/promote`, or manual: create issue via `gh`, set milestone,
  delete the item from `plan.json`).
- Convention reminder: milestone = phase, labels = priority/bug, items = planned-not-yet-issue.

## FAZA B — cutover (after FAZA A pushed; ai-gm repo, SEPARATE commits)

Runs against `szmidtpiotr/ai-gm` content; never mixed with this plugin repo's commits.
1. Bootstrap milestones for every live/planned phase (use Plan tab bootstrap).
2. Assign open issues to their phase milestone.
3. Transcribe planned-not-issue work (Multiplayer G16–G20, other unstarted tasks) → plan-only
   items under their phase, in order.
4. Completed phases stay as archived prose (no recreation).
5. `notes.md` → prose only (strip task checklist; keep ZAKRES, decisions, rationale, mechanics).
6. Reconcile `mass-implement`: deprecate FAZA-mode reliance on `notes.md`; LIST mode (GitHub
   issues) becomes the single autorunner source. Update `.claude/mass-implement.json` + SKILL +
   STATUS.md/KOMENDY.md to point at the Plan tab as task home.
7. Verify cutover live in the Plan tab.

## Plugin contract (must respect)

- `dist/` committed after every build (`npm run build` → commit `dist/frontend.js` +
  `dist/backend.js`). Skipping = RPC 503.
- Classic JSX runtime; React imported in every TSX. Backend prints ready signal < 10s.
- CSS prefixed `cgi-`. Branch `feat/plan-tab`; never commit to `main`.
</content>
</invoke>
