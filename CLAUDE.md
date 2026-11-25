# claude-github-issue — Agent Context

## What this project is

A **claudecodeui plugin** that adds a GitHub Issues Kanban board tab to the UI. Users install it from Settings → Plugins by pasting the GitHub repo URL.

Plugin contract (claudecodeui plugin system):
- `manifest.json` — declares `entry` (frontend JS) and `server` (backend Node.js)
- `dist/frontend.js` — Vite bundle, React 18, **classic JSX runtime** (must stay — conflicts with host React if changed)
- `dist/backend.js` — esbuild CommonJS bundle, Node.js HTTP server, prints `{"ready":true,"port":N}` to stdout on startup
- Backend must print the ready signal within 10 seconds or the plugin manager kills it
- Frontend receives `api` object with: `api.rpc(method, path, body?)`, `api.context` (theme/project/session), `api.onContextChange(cb)`

**CRITICAL: `dist/` must be committed.** claudecodeui clones the repo and uses the committed dist files directly. If dist is not committed, the plugin will fail with RPC 503 errors.

## Repository

`https://github.com/szmidtpiotr/claude-github-issue`

Remote: `origin` → `https://github.com/szmidtpiotr/claude-github-issue`

## Git rules (keep these — they prevent split history)

- **One working clone only.** Work in the clone that is the open project in the UI.
  Never create a second clone inside or next to it (a nested clone once got committed
  as a gitlink and two lines of work drifted apart for months).
- **`main` is the only long-lived branch.** Every change starts as a short branch cut from
  the current `origin/main` (`git fetch && git switch -c feat/x origin/main`), never from
  another feature branch.
- Finish a branch quickly: open a PR → merge into `main` → the branch is deleted
  automatically on merge (repo setting). Do not leave finished work on a side branch.
- Before starting, check: `git fetch && git log --oneline HEAD..origin/main` must be empty
  for the base you branch from. If it isn't, you are on a stale base — rebase or re-branch.
- The installed plugin (`~/.claude-code-ui/plugins/claude-github-issue/`) tracks `main`.
  Only switch it to a feature branch for a live test, and switch it back after merge.
- Old abandoned work is kept as a tag `archive/<branch-name>`, not as a branch.

## File layout

```
manifest.json          Plugin metadata (name, entry, server)
src/
  frontend/            React 18 + TypeScript — Vite bundle
    index.tsx          Entry: exports mount(container, api) / unmount(container)
    App.tsx            Main board UI, search/filter/sort/AI prioritize
    GithubBoard.tsx    Board layout with columns
    GithubKanbanColumn.tsx  Column with collapsible state
    GithubIssueCard.tsx     Card with priority dot, thumbnails
    GithubIssueModal.tsx    Issue detail modal, comments, move-to-column
    ImageLightbox.tsx       Full-screen image lightbox
    imageUtils.ts           Extract/strip images from markdown + HTML img tags
    priorityUtils.ts        Priority detection, sort logic
    SettingsModal.tsx       Per-project settings (token, owner, repo, anthropicKey)
    NewIssueModal.tsx       Create new issue form
    SubscriptionPriorityModal.tsx  Manual claude.ai priority mode
    PluginContext.tsx        React context wrapping api object
    styles.css              All CSS (BEM-ish with cgi- prefix)
    types.ts                GithubIssue, GithubComment, Column types
  backend/
    server.ts          HTTP server — routes: /config, /issues, /ai-prioritize
    config.service.ts  Read/write .GitHubBoard/github-sync.json in project root
    github.service.ts  GitHub API calls (list issues, patch issue, post comment)
    issues.service.ts  Create issue
    ai.service.ts      Heuristic + Anthropic API prioritization
    cache.ts           Simple in-memory cache for API responses
dist/
  frontend.js          Committed! Vite output
  backend.js           Committed! esbuild output
vite.config.ts         Vite config — react({ jsxRuntime: 'classic' }) is mandatory
tsconfig.json
src/shared/labels.ts   Label roles (status / priority / default / project) + project filter
src/backend/plan.*.ts  Plan tab (milestones = phases, order store .GitHubBoard/plan.json)
tests/                 node:test tests, run with `npm test` (esbuild bundle)
```

## Config file

Stored per-project at `<projectRoot>/.GitHubBoard/github-sync.json`:
```json
{
  "token": "ghp_...",
  "owner": "username",
  "repo": "repo-name",
  "enabled": true,
  "anthropicKey": "sk-ant-..."
}
```

This file is NOT part of this plugin repo. It lives in the user's project directory.

## How to develop

```bash
# Install deps (also runs build via postinstall)
npm install

# Build once
npm run build

# Watch mode (rebuilds on save)
npm run dev
```

Build outputs:
- `dist/backend.js` — esbuild, CJS, Node 18
- `dist/frontend.js` — Vite, ESM bundle (~320KB gzip ~72KB)

**Do not change `jsxRuntime` in vite.config.ts.** Must stay `'classic'` to avoid `jsxDEV is not a function` errors when the plugin loads into the host React context.

**Do not gitignore `dist/`.** The dist files must be committed or the plugin won't work.

## After any feature change — full workflow

```bash
# 1. Edit source files in src/
# 2. Build
npm run build

# 3. Test
npm test

# 4. Commit source + dist together on the feature branch, push, open + merge a PR
git add src/ dist/ manifest.json  # add other changed files as needed
git commit -m "feat/fix: describe the change"
git push -u origin HEAD
gh pr create --fill && gh pr merge --merge   # branch auto-deleted after merge

# 5. Update the GitHub release
#    - Patch fix → bump patch version (1.0.1 → 1.0.2)
#    - New feature → bump minor version (1.0.x → 1.1.0)
#    Always check the real latest first: gh release list --limit 1

gh release create vX.Y.Z \
  --title "vX.Y.Z — Short description" \
  --notes "## Changes

- What changed and why" \
  --latest
```

Users who already installed the plugin need to: Settings → Plugins → Reinstall (or manually `git pull` in `~/.claude-code-ui/plugins/claude-github-issue/`).

## Key technical constraints

| Constraint | Why |
|---|---|
| `jsxRuntime: 'classic'` in Vite | Avoids React JSX runtime conflict with host app |
| `define: { 'process.env': '{}' }` in Vite | Prevents `process is not defined` in browser bundle |
| `dist/` committed to git | claudecodeui uses committed files, not a build step |
| Backend prints `{"ready":true,"port":N}` | Plugin manager checks `msg.ready && typeof msg.port === 'number'` |
| All CSS prefixed `cgi-` | Avoids style collisions with host UI |
| React imported in every TSX file | Required for classic JSX transform |

## GitHub releases history

See `gh release list` — the source of truth. README.md has a short changelog.

## Anthropic API (AI Prioritize feature)

Model: `claude-haiku-4-5-20251001`  
Endpoint: `POST https://api.anthropic.com/v1/messages`  
Headers: `x-api-key`, `anthropic-version: 2023-06-01`  
Fallback: heuristic scoring if no API key (always works, no setup)

## Skill auto-install

On first mount, the plugin copies `skill/SKILL.md` to `~/.claude/skills/github-task/SKILL.md`.  
This makes `/github-task` available in every Claude Code session.
