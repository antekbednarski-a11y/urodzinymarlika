import { CHAPTERS, VARS, defaultVars, renderChapter } from '../shared/content.mjs';
import { loadState, saveState } from '../shared/store.mjs';

const PIN_HER = process.env.PIN_HER || '1310';
const PIN_ME = process.env.PIN_ME || '4444';

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

function roleFor(pin) {
  if (pin === PIN_HER) return 'her';
  if (pin === PIN_ME) return 'me';
  return null;
}

function stateFor(role, state) {
  const vars = { ...defaultVars(), ...state.vars };
  const revealed = CHAPTERS.filter(c => state.revealed[c.id]);
  if (role === 'her') {
    return {
      role,
      answered: !!state.answers,
      chapters: revealed.map(c => ({ ...renderChapter(c, vars), revealedAt: state.revealed[c.id] })),
      lockedCount: CHAPTERS.length - revealed.length,
    };
  }
  return {
    role,
    answers: state.answers,
    revealed: state.revealed,
    vars,
    varsMeta: VARS,
    chapters: CHAPTERS.map(c => renderChapter(c, vars)),
  };
}

export default async (req) => {
  const route = new URL(req.url).pathname.replace(/^\/api\/?/, '');
  const body = req.method === 'POST' ? await req.json().catch(() => ({})) : {};
  const role = roleFor(String(req.headers.get('x-pin') || body.pin || ''));

  if (route === 'login') {
    return role ? json({ role }) : json({ error: 'Zły PIN' }, 401);
  }
  if (!role) return json({ error: 'Brak dostępu' }, 401);

  const state = await loadState();

  if (route === 'state') return json(stateFor(role, state));

  if (route === 'answers' && role === 'her' && req.method === 'POST') {
    state.answers = { ...body.answers, submittedAt: new Date().toISOString() };
    await saveState(state);
    return json(stateFor(role, state));
  }

  if (route === 'admin' && role === 'me' && req.method === 'POST') {
    const { action, id, vars } = body;
    if (action === 'reveal' && CHAPTERS.some(c => c.id === id)) state.revealed[id] = new Date().toISOString();
    else if (action === 'hide') delete state.revealed[id];
    else if (action === 'vars' && vars && typeof vars === 'object') {
      const allowed = new Set(VARS.map(v => v.key));
      for (const [k, v] of Object.entries(vars)) if (allowed.has(k)) state.vars[k] = String(v);
    } else if (action === 'resetAnswers') state.answers = null;
    else if (action === 'resetAll') { state.answers = null; state.revealed = {}; }
    else return json({ error: 'Nieznana akcja' }, 400);
    await saveState(state);
    return json(stateFor(role, state));
  }

  return json({ error: 'Nie znaleziono' }, 404);
};

export const config = { path: '/api/*' };
