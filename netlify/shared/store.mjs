// Stan aplikacji: odpowiedzi Marlenki, odsłonięte rozdziały i wpisane szczegóły.
// Na Netlify: Netlify Blobs. Lokalnie (npm run dev): plik JSON.
import fs from 'node:fs/promises';

const KEY = 'state';
const EMPTY = { answers: null, revealed: {}, vars: {} };

async function blobStore() {
  const { getStore } = await import('@netlify/blobs');
  return getStore({ name: 'urodziny', consistency: 'strong' });
}

export async function loadState() {
  const file = process.env.LOCAL_STORE_FILE;
  if (file) {
    try { return { ...EMPTY, ...JSON.parse(await fs.readFile(file, 'utf8')) }; }
    catch { return structuredClone(EMPTY); }
  }
  const data = await (await blobStore()).get(KEY, { type: 'json' });
  return { ...EMPTY, ...(data || {}) };
}

export async function saveState(state) {
  const file = process.env.LOCAL_STORE_FILE;
  if (file) return fs.writeFile(file, JSON.stringify(state, null, 2));
  await (await blobStore()).setJSON(KEY, state);
}
