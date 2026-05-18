import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const htmlFiles = [
  'index.html',
  'services.html',
  'price.html',
  'about.html',
  'contact.html',
  'blog.html',
  'blog-detail.html',
  'faq.html',
  'privacy.html',
  'thanks.html',
];

const imageSrcPattern = /<img\b[^>]*\bsrc="(images\/[^"?]+\.(?:png|jpe?g|webp))(?:\?[^"]*)?"[^>]*>/gi;

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function replaceOrAddAttribute(tag, name, value) {
  const attr = `${name}="${value}"`;
  const pattern = new RegExp(`\\s${name}="[^"]*"`);
  if (pattern.test(tag)) return tag.replace(pattern, ` ${attr}`);
  return tag.replace(/\s*\/?>$/, ` ${attr}>`);
}

async function optimizeImage(src) {
  const absoluteSrc = path.join(root, src);
  const parsed = path.parse(absoluteSrc);
  const target = path.join(parsed.dir, `${parsed.name}.webp`);
  const targetSrc = path.relative(root, target).replaceAll(path.sep, '/');
  const sourceExt = parsed.ext.toLowerCase();
  const pngSource = path.join(parsed.dir, `${parsed.name}.png`);
  const jpgSource = path.join(parsed.dir, `${parsed.name}.jpg`);
  const jpegSource = path.join(parsed.dir, `${parsed.name}.jpeg`);
  let sourcePath = absoluteSrc;

  if (sourceExt === '.webp') {
    if (await fileExists(pngSource)) sourcePath = pngSource;
    else if (await fileExists(jpgSource)) sourcePath = jpgSource;
    else if (await fileExists(jpegSource)) sourcePath = jpegSource;
  }

  if (sourcePath !== absoluteSrc || sourceExt !== '.webp' || !(await fileExists(target))) {
    await sharp(sourcePath)
      .webp({ quality: 96, smartSubsample: false, effort: 6 })
      .toFile(target);
  }

  const outputMetadata = await sharp(target).metadata();
  return {
    src: targetSrc,
    width: outputMetadata.width,
    height: outputMetadata.height,
  };
}

const imageMap = new Map();

for (const htmlFile of htmlFiles) {
  const htmlPath = path.join(root, htmlFile);
  const html = await fs.readFile(htmlPath, 'utf8');
  for (const match of html.matchAll(imageSrcPattern)) {
    if (!imageMap.has(match[1]) && await fileExists(path.join(root, match[1]))) {
      imageMap.set(match[1], await optimizeImage(match[1]));
    }
  }
}

for (const htmlFile of htmlFiles) {
  const htmlPath = path.join(root, htmlFile);
  let html = await fs.readFile(htmlPath, 'utf8');
  html = html.replace(imageSrcPattern, (tag, src) => {
    const optimized = imageMap.get(src);
    if (!optimized) return tag;
    let next = tag.replace(/\bsrc="images\/[^"?]+\.(?:png|jpe?g|webp)(?:\?[^"]*)?"/i, `src="${optimized.src}"`);
    next = replaceOrAddAttribute(next, 'width', optimized.width);
    next = replaceOrAddAttribute(next, 'height', optimized.height);
    next = replaceOrAddAttribute(next, 'decoding', 'async');
    return next;
  });
  await fs.writeFile(htmlPath, html);
}

console.log(`Optimized ${imageMap.size} local image references for SEO.`);
