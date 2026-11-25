# claude-github-issue

A [claudecodeui](https://github.com/siteboon/claudecodeui) plugin that adds a **GitHub Issues Kanban board** tab to your workspace. Manage issues visually, filter and sort them, create new ones, and prioritize with AI — all without leaving your editor.

Also auto-installs the `/github-task` skill so Claude can manage issues directly from chat.

<img width="2106" height="1004" alt="GitHub Issues Board" src="https://github.com/user-attachments/assets/020995b5-6292-4e70-9af1-9eb124e4686b" />

<img width="2076" height="197" alt="Toolbar with search, priority filters and sort" src="https://github.com/user-attachments/assets/9deb1117-a711-46f6-8ab1-bf55a357c79d" />

---

## Features

### Kanban Board
- 5 columns: **To Do**, **In Progress**, **In Review**, **Blocked**, **Done**
- Collapsible columns — state persisted per-project in localStorage
- Drag-free: move issues by clicking a card → selecting the target column
- Auto-refreshes every 30 seconds

### Search, Filter & Sort
- **Live search** — filter by title, issue number, or body text
- **Priority pills** — filter board by High / Medium / Low priority (detected from labels)
- **Sort dropdown** — sort by Number, Updated, Created, Comments, Title, or Priority
- **Direction toggle** — ascending / descending with a single click

### Issue Cards
- Shows title, issue number, assignee avatars, comment count, and labels
- **Image thumbnails** — images in issue body appear as inline previews
- Click any thumbnail to open a full-screen **lightbox**
- Color-coded **priority dot** (red / amber / gray) after AI prioritization

### Issue Detail Modal
- Full description with image thumbnails and lightbox
- Labels, assignees, timestamps
- **Move to column** — instantly reassigns labels (and closes/reopens as needed)
- **Comments** — full history with user avatars, images, and timestamps
- **Add comment** — post directly to GitHub from the modal
- Open on GitHub link

### New Issue
- **+ New Issue** button in the toolbar
- Quick form: title (required) + description (optional)
- Issue appears on the board immediately after creation

### AI Prioritize
- Single **★ AI Prioritize** button — always works, no setup required
- Without API key: uses smart heuristics (labels, age, engagement)
- With Anthropic API key: sends issues to **Claude Haiku** for semantic analysis
- Results: color-coded priority dots on cards + hover tooltips with reasoning
- Auto-switches sort to Priority after analysis
- **Claude.ai subscription mode** — available in ⚙ Settings → "Use claude.ai →": generates a ready-to-paste prompt, paste Claude's JSON response back to apply priorities

### Project label filter (one repo, many projects)
If several projects share one GitHub repository and you tell them apart with labels
(e.g. `project-a`, `project-b`), each project's board can show only its own issues:

- **⚙ Settings → Project labels** — tick the label(s) of this project. The list is loaded
  from the repository; status, priority and GitHub default labels are hidden behind
  *Show status/priority labels* because they normally aren't project labels.
- **Board** shows only issues carrying **at least one** of the selected labels.
  Above the board a toggle switches between **This project** and **Whole repo**
  (remembered per project). In *Whole repo* a row of chips — one per project label,
  with counts, plus *No project* — filters the board to one project at a time.
- **Plan tab** lists only the project's issues and hides milestones that hold none of them.
- **New Issue** automatically gets the project label(s).
- **`/github-task`** lists, moves, comments and orders the Plan only for the project's issues.
- Nothing selected = whole repository, exactly as before. Existing config files keep working.

Stored as an optional `labels` array in `github-sync.json`:
```json
{
  "owner": "owner",
  "repo": "repo",
  "labels": ["project-a"]
}
```
(the file also holds your token — keep it out of git).

### Settings (⚙ per project)
- GitHub Personal Access Token (leave blank to keep the saved one)
- Repository owner and name
- Project labels (optional filter, see above)
- Optional Anthropic API key (enables real AI prioritization)
- Link to `/github-task` skill documentation
- Config stored in `.GitHubBoard/github-sync.json` in the project root (not committed if added to `.gitignore`)

### /github-task CLI Skill
On first plugin load, installs `/github-task` skill to `~/.claude/skills/github-task/SKILL.md` — available in every Claude Code chat session:

```
/github-task list to do
/github-task move #42 to in-progress
/github-task what needs testing?
/github-task update #17 — implemented the new login flow
```

---

## Installation

1. Open **claudecodeui**
2. Go to **Settings → Plugins**
3. Paste the repository URL:
   ```
   https://github.com/szmidtpiotr/claude-github-issue
   ```
4. Click **Install**

The plugin appears as a new **GitHub Issues** tab. No global configuration needed — each project configures its own GitHub connection.

---

## Project Configuration

Click the **⚙** button in the board toolbar to open settings, or create `.GitHubBoard/github-sync.json` manually:

<img width="895" height="1192" alt="image" src="https://github.com/user-attachments/assets/655fd817-23c5-4b00-bc93-edfd896d0434" />


**Generate a token:** GitHub → Settings → Developer settings → Personal access tokens → Generate new (classic)
Required scope: `repo`

To enable real AI prioritization, also add:
```json
{
  "anthropicKey": "sk-ant-api03-..."
}
```

---

## Column → Label Mapping

| Column      | Condition                        |
|-------------|----------------------------------|
| To Do       | Open issue, no status labels     |
| In Progress | Has label `in-progress`          |
| In Review   | Has label `review`               |
| Blocked     | Has label `blocked`              |
| Done        | Issue is closed                  |

Moving an issue via the UI updates labels and state via the GitHub API immediately.

### Labels with a special meaning

The plugin gives labels three separate jobs. A project label never changes the column
or the priority, and a column move never touches project labels.

**1. Status labels — decide the column** (added/removed when you move a card):
`in-progress`, `review`, `blocked`; also `need-testing` (added together with `review`
by `/github-task`), `deferred`, `cancelled` (removed on moves). Closed issue = Done.

**2. Priority labels — matched by name** (exact or substring, case-insensitive):

| Priority | Board pills / Priority sort (`priorityUtils.ts`) | AI Prioritize heuristic (`ai.service.ts`) |
|----------|--------------------------------------------------|--------------------------------------------|
| High     | `p0`, `critical`, `blocker`, `urgent`, `security`, `vulnerability`, `crash`, `data-loss`, `high`, `high-priority`, `priority:high` | critical: `critical`, `blocker`, `security`, `vulnerability`, `crash`, `data-loss`; high: `bug`, `high`, `p0`, `p1`, `urgent`, `priority:high` |
| Medium   | `p1`, `important`, `medium`, `medium-priority`, `priority:medium` | — |
| Low      | `p2`, `p3`, `low`, `low-priority`, `priority:low`, `nice-to-have`, `minor` | `nice-to-have`, `enhancement`, `feature`, `improvement`, `low`, `p3`, `wontfix`, `documentation`, `docs` |

So e.g. `enhancement` lowers an issue's score in AI Prioritize (heuristic mode), and
`bug` raises it.

**3. Project labels — optional filter** from `labels` in `github-sync.json` (see
*Project label filter*). Any label can be one; GitHub's default labels (`accessibility`, `bug`,
`documentation`, `duplicate`, `enhancement`, `good first issue`, `help wanted`,
`invalid`, `question`, `wontfix`) and the status/priority labels above are not offered
as project chips. The full list lives in `src/shared/labels.ts`.

---

## Development

```bash
git clone https://github.com/szmidtpiotr/claude-github-issue
cd claude-github-issue
npm install
npm run build
```

Output:
- `dist/frontend.js` — browser bundle (React, classic JSX runtime)
- `dist/backend.js` — CommonJS Node.js server (listens on random port, reports `{"ready":true,"port":N}`)

### Tests
```bash
npm test
```
Bundles `tests/*.test.ts` with esbuild and runs them with Node's built-in test runner.

### Dev watch mode
```bash
npm run dev
```

### Stack
- **Frontend:** React 18, TypeScript, Vite
- **Backend:** Node.js HTTP server, TypeScript, esbuild
- **Plugin protocol:** `manifest.json` + `mount(container, api)` / `unmount(container)` exports

---

## Changelog

- **1.11.0** — Project label filter: optional `labels` in `github-sync.json`, label picker in
  Settings, *This project / Whole repo* toggle with project chips, auto-label for new issues,
  Plan tab and `/github-task` scoped to the project. Token can be left blank in Settings to
  keep the saved one.

## Contributing

PRs welcome. Please open an issue first for significant changes.

## License

MIT
