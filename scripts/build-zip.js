import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

const zip = new JSZip();
const rootDir = process.cwd();

const IGNORE_DIRS = new Set(['node_modules', '.git', 'dist', '.aistudio', '.cache']);
const IGNORE_FILES = new Set(['starbucks-pulse-source.zip', '.DS_Store']);

function addDirectoryToZip(currentDir, relativePath = '') {
  const items = fs.readdirSync(currentDir);

  for (const item of items) {
    if (IGNORE_DIRS.has(item) || IGNORE_FILES.has(item)) continue;

    const fullPath = path.join(currentDir, item);
    const relPath = relativePath ? `${relativePath}/${item}` : item;
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      addDirectoryToZip(fullPath, relPath);
    } else {
      // Don't include huge binary assets if they are too big, but include all code and configs
      if (stat.size > 25 * 1024 * 1024) continue;
      const fileData = fs.readFileSync(fullPath);
      zip.file(relPath, fileData);
    }
  }
}

console.log('Packaging project into ZIP...');
addDirectoryToZip(rootDir);

const publicDir = path.join(rootDir, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const outputPath = path.join(publicDir, 'starbucks-pulse-source.zip');

zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE', compressionOptions: { level: 9 } })
  .then((content) => {
    fs.writeFileSync(outputPath, content);
    console.log(`Successfully generated zip at: ${outputPath} (${(content.length / 1024).toFixed(1)} KB)`);
  })
  .catch((err) => {
    console.error('Error generating zip:', err);
    process.exit(1);
  });
