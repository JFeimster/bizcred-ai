import { cp, copyFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const outDir = path.join(root, 'dist');

const files = [
  'index.html',
  'dashboard.html',
  'vendors.html',
  'styles.css',
  'script.js'
];

const directories = [
  'assets',
  'data'
];

await mkdir(outDir, { recursive: true });

for (const file of files) {
  const source = path.join(root, file);
  if (existsSync(source)) {
    await copyFile(source, path.join(outDir, file));
  }
}

for (const directory of directories) {
  const source = path.join(root, directory);
  if (existsSync(source)) {
    await cp(source, path.join(outDir, directory), { recursive: true, force: true });
  }
}

console.log('Copied static site files into dist for Vercel output.');
