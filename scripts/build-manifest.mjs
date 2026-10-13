// Spis zdjęć: public/img/<folder>/* → public/img/manifest.json
// Netlify uruchamia to przy każdym wdrożeniu, więc wystarczy wrzucić zdjęcia do folderu.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public/img');
const IMG = /\.(jpe?g|png|webp|gif|avif)$/i;
const manifest = {};
for (const folder of fs.readdirSync(dir, { withFileTypes: true })) {
  if (!folder.isDirectory()) continue;
  manifest[folder.name] = fs.readdirSync(path.join(dir, folder.name))
    .filter(f => IMG.test(f) && !f.startsWith('.'))
    .sort((a, b) => a.localeCompare(b, 'pl', { numeric: true }));
}
fs.writeFileSync(path.join(dir, 'manifest.json'), JSON.stringify(manifest, null, 2));
const n = Object.values(manifest).flat().length;
console.log(`manifest.json: ${n} zdjęć w ${Object.keys(manifest).length} folderach`);
