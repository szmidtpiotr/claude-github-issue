import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';
import { readConfig, writeConfig } from '../src/backend/config.service';

// Dummy values only — never a real token.
const BASE = { token: 'test-token', owner: 'owner', repo: 'repo' };

function project(content?: unknown, where = '.GitHubBoard'): string {
  const dir = mkdtempSync(path.join(tmpdir(), 'cgi-test-'));
  if (content !== undefined) {
    mkdirSync(path.join(dir, where), { recursive: true });
    writeFileSync(path.join(dir, where, 'github-sync.json'), JSON.stringify(content));
  }
  return dir;
}

test('old config file without "labels" still works → empty filter', async () => {
  const dir = project({ ...BASE, enabled: true });
  try {
    const cfg = await readConfig(dir);
    assert.ok(cfg);
    assert.equal(cfg.owner, 'owner');
    assert.equal(cfg.repo, 'repo');
    assert.deepEqual(cfg.labels, []);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('config with labels is read and normalized', async () => {
  const dir = project({ ...BASE, labels: ['project-a', ' project-b ', 'project-a'] });
  try {
    const cfg = await readConfig(dir);
    assert.deepEqual(cfg?.labels, ['project-a', 'project-b']);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('TaskMaster fallback config honours labels too', async () => {
  const dir = project({ ...BASE, labels: ['project-a'], lastSync: 'x' }, '.taskmaster');
  try {
    const cfg = await readConfig(dir);
    assert.deepEqual(cfg?.labels, ['project-a']);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('writeConfig keeps unknown fields, writes labels only when set', async () => {
  const dir = project({ ...BASE, someOtherTool: { a: 1 } });
  const file = path.join(dir, '.GitHubBoard', 'github-sync.json');
  try {
    await writeConfig(dir, { ...BASE, enabled: true, labels: ['project-a'] });
    let saved = JSON.parse(readFileSync(file, 'utf8'));
    assert.deepEqual(saved.labels, ['project-a']);
    assert.deepEqual(saved.someOtherTool, { a: 1 });

    await writeConfig(dir, { ...BASE, enabled: true, labels: [] });
    saved = JSON.parse(readFileSync(file, 'utf8'));
    assert.equal('labels' in saved, false);
    assert.equal('anthropicKey' in saved, false);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
