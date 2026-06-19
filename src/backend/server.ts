import http from 'http';
import path from 'path';
import fs from 'fs';
import { URL } from 'url';
import * as issuesService from './issues.service';
import * as configService from './config.service';
import { prioritizeIssues } from './ai.service';
import * as planController from './plan.controller';

// ---- Auto-install /github-task skill ----
function installSkill(): void {
  try {
    const homeDir = process.env.HOME || process.env.USERPROFILE || '';
    if (!homeDir) return;
    const skillDir = path.join(homeDir, '.claude', 'skills', 'github-task');
    const skillFile = path.join(skillDir, 'SKILL.md');
    if (!fs.existsSync(skillFile)) {
      fs.mkdirSync(skillDir, { recursive: true });
      // __dirname in CJS points to dist/ directory
      const sourceSkill = path.join(__dirname, '..', 'skill', 'SKILL.md');
      if (fs.existsSync(sourceSkill)) {
        fs.copyFileSync(sourceSkill, skillFile);
        console.log('[claude-github-issue] Installed /github-task skill to', skillFile);
      } else {
        console.log('[claude-github-issue] Skill source not found at', sourceSkill, '— skipping auto-install');
      }
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.warn('[claude-github-issue] Could not install skill:', msg);
  }
}

installSkill();

// ---- Helpers ----
function parseQuery(rawUrl: string): Record<string, string> {
  try {
    const u = new URL(rawUrl, 'http://localhost');
    const result: Record<string, string> = {};
    u.searchParams.forEach((v, k) => { result[k] = v; });
    return result;
  } catch {
    return {};
  }
}

function readBody(req: http.IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function sendJson(res: http.ServerResponse, status: number, body: unknown): void {
  const json = JSON.stringify(body);
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(json),
    'Access-Control-Allow-Origin': '*',
  });
  res.end(json);
}

function matchRoute(method: string, pathname: string, pattern: RegExp): RegExpMatchArray | null {
  if (method !== pattern.source.split(' ')[0]) return null;
  return pathname.match(new RegExp(pattern.source.split(' ').slice(1).join(' ')));
}

// ---- Route handlers ----
async function handleGetIssues(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
  const query = parseQuery(req.url ?? '');
  const projectPath = query['path'] ?? '';
  if (!projectPath) {
    sendJson(res, 400, { error: 'path query parameter required' });
    return;
  }
  try {
    const result = await issuesService.fetchIssues(projectPath);
    sendJson(res, 200, result);
  } catch (e) {
    const err = e as Error & { notConfigured?: boolean };
    if (err.notConfigured) {
      sendJson(res, 200, { notConfigured: true, error: err.message });
    } else {
      sendJson(res, 500, { error: err.message ?? 'Internal error' });
    }
  }
}

async function handlePatchIssue(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  issueNumber: string
): Promise<void> {
  const query = parseQuery(req.url ?? '');
  const projectPath = query['path'] ?? '';
  if (!projectPath) {
    sendJson(res, 400, { error: 'path query parameter required' });
    return;
  }
  try {
    const raw = await readBody(req);
    const body = JSON.parse(raw) as {
      state?: string;
      addLabels?: string[];
      removeLabels?: string[];
      labels?: string[];
      title?: string;
    };
    const updated = await issuesService.updateIssue(projectPath, issueNumber, body);
    sendJson(res, 200, { ok: true, issue: updated });
  } catch (e) {
    const err = e as Error;
    sendJson(res, 500, { error: err.message ?? 'Internal error' });
  }
}

async function handleGetComments(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  issueNumber: string
): Promise<void> {
  const query = parseQuery(req.url ?? '');
  const projectPath = query['path'] ?? '';
  if (!projectPath) {
    sendJson(res, 400, { error: 'path query parameter required' });
    return;
  }
  try {
    const comments = await issuesService.fetchComments(projectPath, issueNumber);
    sendJson(res, 200, { comments });
  } catch (e) {
    const err = e as Error;
    sendJson(res, 500, { error: err.message ?? 'Internal error' });
  }
}

async function handlePostComment(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  issueNumber: string
): Promise<void> {
  const query = parseQuery(req.url ?? '');
  const projectPath = query['path'] ?? '';
  if (!projectPath) {
    sendJson(res, 400, { error: 'path query parameter required' });
    return;
  }
  try {
    const raw = await readBody(req);
    const body = JSON.parse(raw) as { body?: string };
    if (!body.body?.trim()) {
      sendJson(res, 400, { error: 'Comment body required' });
      return;
    }
    const comment = await issuesService.addComment(projectPath, issueNumber, body.body.trim());
    sendJson(res, 200, { ok: true, comment });
  } catch (e) {
    const err = e as Error;
    sendJson(res, 500, { error: err.message ?? 'Internal error' });
  }
}

async function handleGetConfig(
  req: http.IncomingMessage,
  res: http.ServerResponse
): Promise<void> {
  const query = parseQuery(req.url ?? '');
  const projectPath = query['path'] ?? '';
  if (!projectPath) {
    sendJson(res, 400, { error: 'path query parameter required' });
    return;
  }
  try {
    const config = await configService.readConfig(projectPath);
    if (!config) {
      sendJson(res, 200, { configured: false });
    } else {
      sendJson(res, 200, {
        configured: true,
        enabled: config.enabled,
        owner: config.owner,
        repo: config.repo,
        hasToken: Boolean(config.token),
        hasAnthropicKey: Boolean(config.anthropicKey),
      });
    }
  } catch (e) {
    const err = e as Error;
    sendJson(res, 500, { error: err.message ?? 'Internal error' });
  }
}

async function handleGetPlan(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
  const query = parseQuery(req.url ?? '');
  const projectPath = query['path'] ?? '';
  if (!projectPath) { sendJson(res, 400, { error: 'path query parameter required' }); return; }
  try {
    const plan = await planController.buildPlan(projectPath);
    sendJson(res, 200, plan);
  } catch (e) {
    const err = e as Error & { notConfigured?: boolean };
    if (err.notConfigured) sendJson(res, 200, { notConfigured: true, error: err.message });
    else sendJson(res, 500, { error: err.message ?? 'Internal error' });
  }
}

async function handlePutPlanOrder(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
  const query = parseQuery(req.url ?? '');
  const projectPath = query['path'] ?? '';
  if (!projectPath) { sendJson(res, 400, { error: 'path query parameter required' }); return; }
  try {
    const raw = await readBody(req);
    const body = JSON.parse(raw) as { phase?: string | null; order?: number[] };
    if (!Array.isArray(body.order)) { sendJson(res, 400, { error: 'order array required' }); return; }
    await planController.saveOrder(projectPath, body.phase ?? null, body.order);
    sendJson(res, 200, { ok: true });
  } catch (e) {
    sendJson(res, 500, { error: (e as Error).message ?? 'Internal error' });
  }
}

async function handlePutPlanPhase(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
  const query = parseQuery(req.url ?? '');
  const projectPath = query['path'] ?? '';
  if (!projectPath) { sendJson(res, 400, { error: 'path query parameter required' }); return; }
  try {
    const raw = await readBody(req);
    const body = JSON.parse(raw) as { issue?: number; milestone?: number | null };
    if (typeof body.issue !== 'number') { sendJson(res, 400, { error: 'issue number required' }); return; }
    await planController.assignPhase(projectPath, body.issue, body.milestone ?? null);
    sendJson(res, 200, { ok: true });
  } catch (e) {
    sendJson(res, 500, { error: (e as Error).message ?? 'Internal error' });
  }
}

async function handlePostPlanBootstrap(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
  const query = parseQuery(req.url ?? '');
  const projectPath = query['path'] ?? '';
  if (!projectPath) { sendJson(res, 400, { error: 'path query parameter required' }); return; }
  try {
    const raw = await readBody(req);
    const body = JSON.parse(raw) as { phases?: Array<{ title: string; issues: number[] }> };
    if (!Array.isArray(body.phases)) { sendJson(res, 400, { error: 'phases array required' }); return; }
    const result = await planController.bootstrap(projectPath, body.phases);
    sendJson(res, 200, { ok: true, ...result });
  } catch (e) {
    sendJson(res, 500, { error: (e as Error).message ?? 'Internal error' });
  }
}

async function handlePostPlanItem(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
  const query = parseQuery(req.url ?? '');
  const projectPath = query['path'] ?? '';
  if (!projectPath) { sendJson(res, 400, { error: 'path query parameter required' }); return; }
  try {
    const raw = await readBody(req);
    const body = JSON.parse(raw) as { phase?: string | null; title?: string; note?: string };
    if (!body.title?.trim()) { sendJson(res, 400, { error: 'title is required' }); return; }
    const item = await planController.createItem(projectPath, {
      phase: body.phase ?? null, title: body.title, note: body.note,
    });
    sendJson(res, 201, { ok: true, item });
  } catch (e) {
    sendJson(res, 500, { error: (e as Error).message ?? 'Internal error' });
  }
}

async function handlePutPlanItem(req: http.IncomingMessage, res: http.ServerResponse, id: string): Promise<void> {
  const query = parseQuery(req.url ?? '');
  const projectPath = query['path'] ?? '';
  if (!projectPath) { sendJson(res, 400, { error: 'path query parameter required' }); return; }
  try {
    const raw = await readBody(req);
    const body = JSON.parse(raw) as { title?: string; note?: string; phase?: string | null };
    const item = await planController.editItem(projectPath, id, body);
    sendJson(res, 200, { ok: true, item });
  } catch (e) {
    sendJson(res, 500, { error: (e as Error).message ?? 'Internal error' });
  }
}

async function handleDeletePlanItem(req: http.IncomingMessage, res: http.ServerResponse, id: string): Promise<void> {
  const query = parseQuery(req.url ?? '');
  const projectPath = query['path'] ?? '';
  if (!projectPath) { sendJson(res, 400, { error: 'path query parameter required' }); return; }
  try {
    await planController.removeItem(projectPath, id);
    sendJson(res, 200, { ok: true });
  } catch (e) {
    sendJson(res, 500, { error: (e as Error).message ?? 'Internal error' });
  }
}

async function handlePutPlanItemsOrder(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
  const query = parseQuery(req.url ?? '');
  const projectPath = query['path'] ?? '';
  if (!projectPath) { sendJson(res, 400, { error: 'path query parameter required' }); return; }
  try {
    const raw = await readBody(req);
    const body = JSON.parse(raw) as { phase?: string | null; order?: string[] };
    if (!Array.isArray(body.order)) { sendJson(res, 400, { error: 'order array required' }); return; }
    await planController.reorderItems(projectPath, body.phase ?? null, body.order);
    sendJson(res, 200, { ok: true });
  } catch (e) {
    sendJson(res, 500, { error: (e as Error).message ?? 'Internal error' });
  }
}

async function handlePromotePlanItem(req: http.IncomingMessage, res: http.ServerResponse, id: string): Promise<void> {
  const query = parseQuery(req.url ?? '');
  const projectPath = query['path'] ?? '';
  if (!projectPath) { sendJson(res, 400, { error: 'path query parameter required' }); return; }
  try {
    const issue = await planController.promoteItem(projectPath, id);
    sendJson(res, 200, { ok: true, issue });
  } catch (e) {
    const err = e as Error & { notConfigured?: boolean };
    if (err.notConfigured) sendJson(res, 200, { notConfigured: true, error: err.message });
    else sendJson(res, 500, { error: err.message ?? 'Internal error' });
  }
}

// ---- Server ----
const server = http.createServer(async (req, res) => {
  const method = req.method ?? 'GET';
  const rawUrl = req.url ?? '/';
  let pathname: string;
  try {
    pathname = new URL(rawUrl, 'http://localhost').pathname;
  } catch {
    pathname = rawUrl.split('?')[0] ?? '/';
  }

  // CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return;
  }

  try {
    // GET /issues
    if (method === 'GET' && pathname === '/issues') {
      await handleGetIssues(req, res);
      return;
    }

    // GET /config
    if (method === 'GET' && pathname === '/config') {
      await handleGetConfig(req, res);
      return;
    }

    // GET /plan
    if (method === 'GET' && pathname === '/plan') {
      await handleGetPlan(req, res);
      return;
    }

    // PUT /plan/order
    if (method === 'PUT' && pathname === '/plan/order') {
      await handlePutPlanOrder(req, res);
      return;
    }

    // PUT /plan/phase
    if (method === 'PUT' && pathname === '/plan/phase') {
      await handlePutPlanPhase(req, res);
      return;
    }

    // POST /plan/bootstrap
    if (method === 'POST' && pathname === '/plan/bootstrap') {
      await handlePostPlanBootstrap(req, res);
      return;
    }

    // POST /plan/item — create plan-only item
    if (method === 'POST' && pathname === '/plan/item') {
      await handlePostPlanItem(req, res);
      return;
    }

    // PUT /plan/items/order — reorder plan-only items within a phase
    if (method === 'PUT' && pathname === '/plan/items/order') {
      await handlePutPlanItemsOrder(req, res);
      return;
    }

    // POST /plan/item/:id/promote — promote item to a GitHub issue
    const promoteMatch = method === 'POST' && pathname.match(/^\/plan\/item\/([^/]+)\/promote$/);
    if (promoteMatch && promoteMatch[1]) {
      await handlePromotePlanItem(req, res, decodeURIComponent(promoteMatch[1]));
      return;
    }

    // PUT /plan/item/:id — edit plan-only item
    const putItemMatch = method === 'PUT' && pathname.match(/^\/plan\/item\/([^/]+)$/);
    if (putItemMatch && putItemMatch[1]) {
      await handlePutPlanItem(req, res, decodeURIComponent(putItemMatch[1]));
      return;
    }

    // DELETE /plan/item/:id — delete plan-only item
    const delItemMatch = method === 'DELETE' && pathname.match(/^\/plan\/item\/([^/]+)$/);
    if (delItemMatch && delItemMatch[1]) {
      await handleDeletePlanItem(req, res, decodeURIComponent(delItemMatch[1]));
      return;
    }

    // POST /issues — create new issue
    if (method === 'POST' && pathname === '/issues') {
      const query = parseQuery(req.url ?? '');
      const projectPath = query['path'] ?? '';
      if (!projectPath) { sendJson(res, 400, { error: 'path query parameter required' }); return; }
      try {
        const raw = await readBody(req);
        const body = JSON.parse(raw) as { title?: string; body?: string; labels?: string[] };
        if (!body.title?.trim()) { sendJson(res, 400, { error: 'title is required' }); return; }
        const issue = await issuesService.createIssue(projectPath, body.title.trim(), body.body, body.labels);
        sendJson(res, 201, { ok: true, issue });
      } catch (e) {
        sendJson(res, 500, { error: (e as Error).message ?? 'Internal error' });
      }
      return;
    }

    // PATCH /issues/:number
    const patchMatch = method === 'PATCH' && pathname.match(/^\/issues\/(\d+)$/);
    if (patchMatch && patchMatch[1]) {
      await handlePatchIssue(req, res, patchMatch[1]);
      return;
    }

    // GET /issues/:number/comments
    const getCommentsMatch = method === 'GET' && pathname.match(/^\/issues\/(\d+)\/comments$/);
    if (getCommentsMatch && getCommentsMatch[1]) {
      await handleGetComments(req, res, getCommentsMatch[1]);
      return;
    }

    // POST /issues/:number/comments
    const postCommentMatch = method === 'POST' && pathname.match(/^\/issues\/(\d+)\/comments$/);
    if (postCommentMatch && postCommentMatch[1]) {
      await handlePostComment(req, res, postCommentMatch[1]);
      return;
    }

    // PUT /config — save settings from UI
    if (method === 'PUT' && pathname === '/config') {
      const query = parseQuery(req.url ?? '');
      const projectPath = query['path'] ?? '';
      if (!projectPath) { sendJson(res, 400, { error: 'path query parameter required' }); return; }
      try {
        const raw = await readBody(req);
        const body = JSON.parse(raw) as { token?: string; owner?: string; repo?: string; enabled?: boolean; anthropicKey?: string };
        if (!body.token?.trim() || !body.owner?.trim() || !body.repo?.trim()) {
          sendJson(res, 400, { error: 'token, owner, and repo are required' });
          return;
        }
        const existing = await configService.readConfig(projectPath);
        const config: configService.GithubConfig = {
          token: body.token.trim(),
          owner: body.owner.trim(),
          repo: body.repo.trim(),
          enabled: body.enabled !== false,
          anthropicKey: body.anthropicKey?.trim() || existing?.anthropicKey || undefined,
        };
        await configService.writeConfig(projectPath, config);
        sendJson(res, 200, { ok: true });
      } catch (e) {
        sendJson(res, 500, { error: (e as Error).message ?? 'Internal error' });
      }
      return;
    }

    // POST /ai-prioritize — smart prioritization (heuristic + optional Anthropic AI)
    if (method === 'POST' && pathname === '/ai-prioritize') {
      const query = parseQuery(req.url ?? '');
      const projectPath = query['path'] ?? '';
      if (!projectPath) { sendJson(res, 400, { error: 'path query parameter required' }); return; }
      try {
        const raw = await readBody(req);
        const body = JSON.parse(raw) as { issues?: unknown[] };
        if (!Array.isArray(body.issues) || body.issues.length === 0) {
          sendJson(res, 400, { error: 'issues array required' });
          return;
        }
        const config = await configService.readConfig(projectPath);
        const result = await prioritizeIssues(body.issues as Parameters<typeof prioritizeIssues>[0], config?.anthropicKey);
        sendJson(res, 200, result);
      } catch (e) {
        sendJson(res, 500, { error: (e as Error).message ?? 'Internal error' });
      }
      return;
    }

    // Health check
    if (method === 'GET' && pathname === '/health') {
      sendJson(res, 200, { ok: true, plugin: 'claude-github-issue' });
      return;
    }

    sendJson(res, 404, { error: 'Not found' });
  } catch (e) {
    const err = e as Error;
    console.error('[claude-github-issue] Unhandled error:', err.message);
    sendJson(res, 500, { error: 'Internal server error' });
  }
});

server.listen(0, '127.0.0.1', () => {
  const addr = server.address();
  const port = typeof addr === 'object' && addr ? addr.port : 0;
  // Signal to plugin host that we're ready
  process.stdout.write(JSON.stringify({ ready: true, port }) + '\n');
});

server.on('error', (err) => {
  console.error('[claude-github-issue] Server error:', err.message);
  process.exit(1);
});
