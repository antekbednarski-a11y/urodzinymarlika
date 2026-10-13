// Lokalny podgląd bez Netlify: serwuje public/ i /api/* (stan w .local-state.json).
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
process.env.LOCAL_STORE_FILE ||= path.join(root, '.local-state.json');
const { default: api } = await import('../netlify/functions/api.mjs');

const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.ico': 'image/x-icon' };
const port = Number(process.env.PORT) || 8888;

http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${port}`);
  if (url.pathname.startsWith('/api/')) {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const r = await api(new Request(url, { method: req.method, headers: req.headers,
      body: req.method === 'POST' ? Buffer.concat(chunks) : undefined }));
    res.writeHead(r.status, Object.fromEntries(r.headers));
    return res.end(Buffer.from(await r.arrayBuffer()));
  }
  // Netlify Image CDN nie działa lokalnie — podajemy oryginał.
  const p = url.pathname === '/.netlify/images' ? url.searchParams.get('url') : url.pathname;
  const file = path.join(root, 'public', p === '/' ? 'index.html' : p);
  try {
    const data = await fs.readFile(file);
    res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  } catch { res.writeHead(404); res.end('404'); }
}).listen(port, () => console.log(`http://localhost:${port}`));
