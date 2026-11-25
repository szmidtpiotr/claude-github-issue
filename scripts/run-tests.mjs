// Bundle tests/*.test.ts with esbuild (already a dev dependency) and run them with
// Node's built-in test runner. No extra test framework needed.
import { build } from 'esbuild';
import { readdirSync, rmSync, mkdirSync } from 'fs';
import { spawnSync } from 'child_process';
import path from 'path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const outDir = path.join(root, '.test-build');
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const entries = readdirSync(path.join(root, 'tests'))
  .filter(f => f.endsWith('.test.ts'))
  .map(f => path.join(root, 'tests', f));

await build({
  entryPoints: entries,
  bundle: true,
  platform: 'node',
  target: 'node18',
  format: 'cjs',
  outdir: outDir,
  outExtension: { '.js': '.cjs' },
  logLevel: 'warning',
});

const files = readdirSync(outDir).filter(f => f.endsWith('.cjs')).map(f => path.join(outDir, f));
const r = spawnSync(process.execPath, ['--test', ...files], { stdio: 'inherit' });
rmSync(outDir, { recursive: true, force: true });
process.exit(r.status ?? 1);
