import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');

async function copyFile(source, destination) {
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.copyFile(source, destination);
}

async function copyDir(source, destination) {
  try {
    await fs.cp(source, destination, { recursive: true });
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }
}

await copyFile(path.join(root, 'blog.php'), path.join(dist, 'blog.php'));
await copyFile(path.join(root, 'blog-detail.php'), path.join(dist, 'blog-detail.php'));
await copyFile(path.join(root, 'microcms-config.sample.php'), path.join(dist, 'microcms-config.sample.php'));
await copyDir(path.join(root, 'includes'), path.join(dist, 'includes'));
await copyDir(path.join(root, 'api'), path.join(dist, 'api'));
await copyDir(path.join(root, 'css'), path.join(dist, 'css'));
await copyDir(path.join(root, 'images'), path.join(dist, 'images'));
await copyFile(path.join(root, 'js', 'main.js'), path.join(dist, 'js', 'main.js'));

console.log('Copied PHP blog files and required static assets to dist.');
