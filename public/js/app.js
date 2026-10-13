import { icon, rosette } from './icons.js';

const app = document.getElementById('app');
const POLL_MS = 8000;

// ——— Pytania formularza ———
const QUESTIONS = [
  { id: 'mood', title: 'Jak się dziś czujesz?', hint: 'Bez oceniania — każdy nastrój jest dobry.', options: [
    { v: 'Kocykowo i leniwie', e: '🧣' },
    { v: 'Radośnie i lekko', e: '🌻' },
    { v: 'Pełna energii', e: '⚡' },
    { v: 'Trochę zmęczona', e: '🍵' },
  ] },
  { id: 'activity', title: 'Na jaką dodatkową aktywność masz ochotę?', hint: 'Mam w zanadrzu coś na każdą okazję.', big: true, options: [
    { v: 'Coś spokojnego', e: '🕯️', d: 'w ciepłym, przytulnym klimacie' },
    { v: 'Coś aktywnego', e: '🍂', d: 'trochę ruchu i adrenaliny' },
    { v: 'Zaskocz mnie', e: '🎁', wide: true },
  ] },
  { id: 'place', title: 'Pod chmurką czy w ciepłym wnętrzu?', options: [
    { v: 'Pod chmurką', e: '🍁', d: 'liście, świeże powietrze' },
    { v: 'W ciepłym wnętrzu', e: '🏠', d: 'tam, gdzie nie wieje' },
    { v: 'Wszystko mi jedno', e: '🤷‍♀️' },
  ] },
  { id: 'dress', title: 'Jak bardzo chcesz się dziś wystroić?', options: [
    { v: 'Wygodnie', e: '👟', d: 'dres to też strój' },
    { v: 'Jesieniarsko', e: '🧥', d: 'sweter, płaszcz, szalik' },
    { v: 'Na bogato', e: '👑', d: 'to moje urodziny!' },
  ] },
  { id: 'evening', title: 'Jak wyobrażasz sobie wieczór?', hint: 'Możesz zaznaczyć kilka.', multi: true, options: [
    { v: 'Film pod kocem', e: '🎬' },
    { v: 'Gry planszowe', e: '🎲' },
    { v: 'Spacer', e: '🌙' },
    { v: 'Rozmowy przy winie', e: '🍷' },
    { v: 'Taniec', e: '💃' },
  ] },
  { id: 'notWant', title: 'Czego dziś na pewno NIE chcesz?', hint: 'Śmiało — to też mi pomoże.', text: true, placeholder: 'Na przykład…' },
  { id: 'wish', title: 'Twoje urodzinowe życzenie', hint: 'Albo wiadomość dla mnie. Cokolwiek zechcesz.', text: true, placeholder: 'Życzę sobie…' },
];

// ——— Narzędzia ———
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const paras = s => esc(s).split(/\n\s*\n/).map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
const store = {
  get(k, d = null) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  del(k) { try { localStorage.removeItem(k); } catch {} },
};

let pin = store.get('pin');
let pollTimer = null;

async function api(route, body) {
  const res = await fetch(`/api/${route}`, {
    method: body ? 'POST' : 'GET',
    headers: { 'content-type': 'application/json', 'x-pin': pin || '' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.error || 'Błąd'), { status: res.status });
  return data;
}

function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => t.classList.remove('show'), 3200);
}

function startPolling(fn) {
  stopPolling();
  pollTimer = setInterval(fn, POLL_MS);
}
function stopPolling() { clearInterval(pollTimer); }

function logout() {
  stopPolling();
  store.del('pin');
  pin = null;
  renderPin();
}

// ——— Liście ———
(function leaves() {
  const box = document.querySelector('.leaves');
  const colors = ['var(--rust)', 'var(--pumpkin)', 'var(--mustard)', 'var(--burgundy)', 'var(--olive)'];
  for (let i = 0; i < 14; i++) {
    const el = document.createElement('div');
    el.className = 'leaf-fall';
    el.style.cssText = `left:${Math.random() * 100}%;--size:${14 + Math.random() * 18}px;--c:${colors[i % colors.length]};` +
      `--dur:${12 + Math.random() * 14}s;--delay:${-Math.random() * 20}s;--drift:${(Math.random() - .5) * 160}px`;
    el.innerHTML = icon('leaf');
    box.appendChild(el);
  }
})();

function confetti() {
  const box = document.createElement('div');
  box.className = 'confetti';
  const colors = ['#b5451b', '#d9772b', '#d9a62e', '#7a1f2b', '#2f4a33', '#6b6b2a'];
  for (let i = 0; i < 70; i++) {
    const c = document.createElement('i');
    c.style.cssText = `left:${Math.random() * 100}%;background:${colors[i % colors.length]};--d:${2 + Math.random() * 2}s;` +
      `--x:${(Math.random() - .5) * 200}px;--r:${Math.random() * 720}deg;animation-delay:${Math.random() * .6}s`;
    box.appendChild(c);
  }
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 5000);
}

// ——— PIN ———
function renderPin() {
  stopPolling();
  let entered = '';
  app.innerHTML = `
    <section class="pin-screen fade-in">
      ${rosette(150, '<span class="mono">M</span>')}
      <div>
        <div class="hand">13 października · złota jesień</div>
        <h1>Urodziny Marlenki</h1>
      </div>
      <p class="muted" style="margin:0">Wpisz swój PIN</p>
      <div class="pin-dots">${'<span></span>'.repeat(4)}</div>
      <div class="pin-error"></div>
      <div class="keypad">
        ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => `<button data-k="${n}">${n}</button>`).join('')}
        <span></span><button data-k="0">0</button><button class="bare" data-k="del" aria-label="Usuń">⌫</button>
      </div>
    </section>`;
  const dots = app.querySelectorAll('.pin-dots span');
  const err = app.querySelector('.pin-error');
  const paint = () => dots.forEach((d, i) => d.classList.toggle('on', i < entered.length));

  async function press(k) {
    if (k === 'del') entered = entered.slice(0, -1);
    else if (entered.length < 4) entered += k;
    err.textContent = '';
    paint();
    if (entered.length === 4) {
      try {
        pin = entered;
        await api('login', { pin });
        store.set('pin', pin);
        boot();
      } catch {
        pin = null;
        err.textContent = 'Hmm, to nie ten PIN…';
        app.querySelector('.pin-dots').classList.add('shake');
        setTimeout(() => { entered = ''; paint(); app.querySelector('.pin-dots')?.classList.remove('shake'); }, 450);
      }
    }
  }
  app.querySelectorAll('.keypad button').forEach(b => b.addEventListener('click', () => press(b.dataset.k)));
  document.onkeydown = e => { if (/^\d$/.test(e.key)) press(e.key); else if (e.key === 'Backspace') press('del'); };
}

// ——— Start ———
async function boot() {
  document.onkeydown = null;
  if (!pin) return renderPin();
  try {
    const data = await api('state');
    if (data.role === 'her') herView(data);
    else meView(data);
  } catch (e) {
    if (e.status === 401) logout();
    else app.innerHTML = `<div class="card center"><h2>Ups</h2><p>Nie mogę się połączyć. Spróbuj odświeżyć stronę.</p></div>`;
  }
}

// ═════════ Strona Marlenki ═════════
function herView(data) {
  if (!data.answered) {
    if (store.get('formStarted')) renderForm();
    else renderWelcome();
  } else renderHome(data);
}

function renderWelcome() {
  app.innerHTML = `
    <section class="hero fade-in">
      ${rosette(200, icon('heart'))}
      <div class="hand">Sto lat, Marlik!</div>
      <h1>Wszystkiego najlepszego, Marlenko!</h1>
      <p>Dziś jest Twój dzień, a ja przygotowałem dla Ciebie kilka niespodzianek.</p>
      <p>Zanim cokolwiek zdradzę, muszę Cię trochę lepiej poczuć. Odpowiedz mi na kilka pytań — szczerze, bez zastanawiania się.</p>
      <button class="btn" id="go">Zaczynamy ${icon('leaf')}</button>
    </section>`;
  app.querySelector('#go').onclick = () => { store.set('formStarted', true); renderForm(); };
}

function renderForm() {
  const answers = store.get('draft', {});
  let step = Math.min(store.get('step', 0), QUESTIONS.length - 1);

  const draw = () => {
    const q = QUESTIONS[step];
    const val = answers[q.id];
    const progress = QUESTIONS.map((_, i) => icon('leaf', i < step ? 'done' : i === step ? 'now' : '')).join('');
    let body;
    if (q.text) {
      body = `<textarea id="ta" placeholder="${esc(q.placeholder)}">${esc(val || '')}</textarea>`;
    } else {
      const sel = o => q.multi ? (val || []).includes(o.v) : val === o.v;
      body = `<div class="choices ${q.big ? 'big' : ''}">${q.options.map(o => `
        <button class="choice ${sel(o) ? 'sel' : ''} ${o.wide ? 'wide' : ''}" data-v="${esc(o.v)}">
          <span class="emo">${o.e}</span><span><b>${esc(o.v)}</b>${o.d ? `<small>${esc(o.d)}</small>` : ''}</span>
        </button>`).join('')}</div>`;
    }
    const last = step === QUESTIONS.length - 1;
    const valid = q.text ? true : q.multi ? (val || []).length > 0 : !!val;
    app.innerHTML = `
      <div class="progress">${progress}</div>
      <section class="card fade-in">
        <div class="kicker">Pytanie ${step + 1} z ${QUESTIONS.length}</div>
        <h2 class="q-title">${esc(q.title)}</h2>
        ${q.hint ? `<p class="q-hint">${esc(q.hint)}</p>` : '<div style="height:10px"></div>'}
        ${body}
        <div class="form-nav">
          ${step > 0 ? '<button class="btn ghost" id="back">←</button>' : ''}
          <button class="btn ${last ? 'forest' : ''}" id="next" ${valid ? '' : 'disabled'}>${last ? 'Wyślij odpowiedzi' : 'Dalej →'}</button>
        </div>
      </section>`;

    app.querySelectorAll('.choice').forEach(b => b.onclick = () => {
      const v = b.dataset.v;
      if (q.multi) {
        const set = new Set(answers[q.id] || []);
        set.has(v) ? set.delete(v) : set.add(v);
        answers[q.id] = [...set];
      } else answers[q.id] = v;
      store.set('draft', answers);
      if (!q.multi) { step = Math.min(step + 1, QUESTIONS.length - 1); store.set('step', step); setTimeout(draw, 180); b.classList.add('sel'); }
      else draw();
    });
    const ta = app.querySelector('#ta');
    if (ta) ta.oninput = () => { answers[q.id] = ta.value; store.set('draft', answers); };
    app.querySelector('#back')?.addEventListener('click', () => { step--; store.set('step', step); draw(); });
    app.querySelector('#next').onclick = async () => {
      if (!last) { step++; store.set('step', step); return draw(); }
      const btn = app.querySelector('#next');
      btn.disabled = true; btn.textContent = 'Wysyłam…';
      try {
        const data = await api('answers', { answers });
        store.del('draft'); store.del('step');
        confetti();
        renderHome(data, true);
      } catch {
        btn.disabled = false; btn.textContent = 'Spróbuj jeszcze raz';
        toast('Nie udało się wysłać — sprawdź internet');
      }
    };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  draw();
}

function renderHome(data, justSent = false) {
  const seen = new Set(store.get('seenChapters', []));
  const draw = (d, announce) => {
    const fresh = d.chapters.filter(c => !seen.has(c.id));
    if (announce && fresh.length) {
      toast(`Nowy rozdział: ${fresh[fresh.length - 1].title} ✨`);
      navigator.vibrate?.([120, 60, 120]);
    }
    const cards = d.chapters.map(c => `
      <button class="chapter fade-in ${seen.has(c.id) ? '' : 'new'}" data-id="${c.id}">
        <span class="medal">${icon(c.icon)}</span>
        <span><span class="sub">${esc(c.subtitle)}</span><h3>${esc(c.title)}</h3></span>
        <span class="arrow">›</span>
      </button>`).join('');
    const locked = Array.from({ length: d.lockedCount }, () => `
      <div class="chapter locked">
        <span class="medal">${icon('lock')}</span>
        <span><span class="sub">zapieczętowane</span><h3>Czeka na znak…</h3></span>
      </div>`).join('');
    app.innerHTML = `
      <header class="home-head fade-in">
        ${rosette(120, icon('heart'))}
        <h1>${d.chapters.length ? 'Twoja księga dnia' : 'Dziękuję, Marlenko!'}</h1>
        <div class="hand">${d.chapters.length ? 'Otwieraj rozdziały, gdy się pojawią' : 'Odpowiedzi już do mnie lecą'}</div>
      </header>
      ${d.chapters.length ? '' : `
        <section class="card waiting fade-in">
          <p class="hand">Teraz moja kolej.</p>
          <p>Przeczytam Twoje odpowiedzi i przygotuję resztę. Zostaw tę stronę otwartą albo wróć tu, kiedy dam znać — nowe rozdziały pojawią się same.</p>
          <div class="pulse"><i></i><i></i><i></i></div>
        </section>`}
      <div class="chapters" style="margin-top:18px">${cards}${locked}</div>
      <button class="logout" id="out">Wyloguj</button>`;
    app.querySelectorAll('.chapter[data-id]').forEach(b => b.onclick = () => {
      const ch = d.chapters.find(c => c.id === b.dataset.id);
      seen.add(ch.id);
      store.set('seenChapters', [...seen]);
      b.classList.remove('new');
      openViewer(ch);
    });
    app.querySelector('#out').onclick = logout;
  };
  let last = JSON.stringify(data.chapters.map(c => c.id + c.revealedAt));
  draw(data, false);
  if (justSent) toast('Odpowiedzi wysłane 🍁');
  startPolling(async () => {
    try {
      const d = await api('state');
      const sig = JSON.stringify(d.chapters.map(c => c.id + c.revealedAt));
      if (sig !== last || d.lockedCount !== data.lockedCount) { last = sig; data = d; draw(d, true); }
    } catch {}
  });
}

// ——— Przeglądarka slajdów ———
// Spis zdjęć z public/img/<folder>/ (generowany przy wdrożeniu).
let PHOTOS = {};
fetch('/img/manifest.json').then(r => r.json()).then(m => { PHOTOS = m; }).catch(() => {});

function photoUrl(folder, file) {
  const src = `/img/${folder}/${encodeURIComponent(file)}`;
  return location.hostname === 'localhost' ? src : `/.netlify/images?url=${encodeURIComponent(src)}&w=900&q=80`;
}

function media(s) {
  const fallback = rosette(210, icon(s.icon || 'leaf'));
  const files = (s.photo && PHOTOS[s.photo]) || [];
  if (!files.length) return fallback;
  const tilt = [-2, 1.5, -1, 2, -1.5];
  return `<div class="gallery ${files.length === 1 ? 'single' : ''}">
      <div class="g-track">${files.map((f, k) => `
        <figure class="photo-frame" style="--tilt:${tilt[k % tilt.length]}deg">
          <img alt="" loading="${k < 2 ? 'eager' : 'lazy'}" src="${photoUrl(s.photo, f)}">
        </figure>`).join('')}
      </div>
      ${files.length > 1 ? `<div class="g-count"><span>1</span> / ${files.length} · przesuń ↔</div>` : ''}
    </div><template>${fallback}</template>`;
}

function wirePhotos(root) {
  root.querySelectorAll('.gallery').forEach(g => {
    const track = g.querySelector('.g-track');
    g.querySelectorAll('img').forEach(img => img.onerror = () => {
      img.closest('figure').remove();
      if (!track.children.length) g.replaceWith(g.nextElementSibling.content.cloneNode(true));
    });
    const count = g.querySelector('.g-count span');
    if (count) track.addEventListener('scroll', () => {
      count.textContent = Math.round(track.scrollLeft / track.firstElementChild.offsetWidth) + 1;
    }, { passive: true });
  });
}

const GIFT_NOTES = {
  larder: s => `
    ${rosette(170, icon('jar'))}
    <div class="kicker">${esc(s.kicker)}</div><h2>${esc(s.title)}</h2>
    <div class="gift-note larder">
      <div class="label">Gdzie szukać</div>
      <div class="where">${esc(s.text).replace(/\n/g, '<br>')}</div>
    </div>
    <p class="hand">Idź, rozpakuj i wróć do mnie 🎁</p>`,
  hogwarts: s => `
    <div class="kicker">${esc(s.kicker)}</div><h2 class="fell">${esc(s.title)}</h2>
    <div class="letter">
      <div class="crest">Hogwart · Szkoła Magii i Czarodziejstwa</div>
      <p class="fell">Szanowna Panno Marleno,</p>
      <p class="fell">z przyjemnością informujemy, że z okazji urodzin czeka na Panią magiczna przesyłka. Sowa zostawiła ją w miejscu wskazanym poniżej:</p>
      <div class="where">${esc(s.text).replace(/\n/g, '<br>')}</div>
      <p class="fell">Hasło otwierające: <i>Alohomora!</i></p>
      <p class="fell sign">Z wyrazami szacunku,<br>Sowia Poczta ${icon('owl')}</p>
      <div class="seal">M</div>
    </div>`,
  main: s => `
    ${rosette(200, icon('star'))}
    <div class="kicker">${esc(s.kicker)}</div><h2>${esc(s.title)}</h2>
    <div class="gift-note main">
      <div class="label">Gdzie szukać</div>
      <div class="where">${esc(s.text).replace(/\n/g, '<br>')}</div>
    </div>
    <p class="hand">Ten jest wyjątkowy ✨</p>`,
};

function slideHtml(s) {
  if (s.timeline) {
    return `
      <div class="kicker">${esc(s.kicker)}</div><h2>${esc(s.title)}</h2>
      <ul class="timeline">${s.timeline.map(t => `
        <li><span class="node">${icon(t.icon)}</span>
        <div><div class="time">${esc(t.time)}</div><b>${esc(t.title)}</b><p>${esc(t.text)}</p></div></li>`).join('')}
      </ul>`;
  }
  if (s.gift) return (GIFT_NOTES[s.gift] || GIFT_NOTES.larder)(s);
  return `
    ${media(s)}
    <div><div class="kicker">${esc(s.kicker)}</div><h2>${esc(s.title)}</h2></div>
    <div class="text">${paras(s.text)}</div>`;
}

function openViewer(ch) {
  let i = 0;
  const v = document.createElement('div');
  v.className = 'viewer';
  v.setAttribute('role', 'dialog');
  v.setAttribute('aria-label', ch.title);
  document.body.appendChild(v);
  document.body.style.overflow = 'hidden';

  const close = () => { v.remove(); document.body.style.overflow = ''; document.removeEventListener('keydown', onKey); };
  const go = n => { if (n >= 0 && n < ch.slides.length) { i = n; draw(); } else if (n >= ch.slides.length) close(); };
  const onKey = e => { if (e.key === 'ArrowRight') go(i + 1); if (e.key === 'ArrowLeft') go(i - 1); if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onKey);

  function draw() {
    const s = ch.slides[i];
    const last = i === ch.slides.length - 1;
    v.innerHTML = `
      <div class="pasiak"></div>
      <div class="v-top">
        <div class="v-bars">${ch.slides.map((_, k) => `<span class="${k <= i ? 'on' : ''}"></span>`).join('')}</div>
        <button class="v-close" aria-label="Zamknij">×</button>
      </div>
      <div class="v-stage"><div class="slide fade-in">${slideHtml(s)}</div></div>
      <div class="v-nav">
        ${i > 0 ? '<button class="btn ghost" data-go="-1">←</button>' : ''}
        <button class="btn ${last ? 'forest' : ''}" data-go="1">${last ? (s.final ? 'Sto lat! ❤️' : 'Zamknij') : 'Dalej →'}</button>
      </div>`;
    wirePhotos(v);
    v.querySelector('.v-close').onclick = close;
    v.querySelectorAll('[data-go]').forEach(b => b.onclick = () => {
      if (last && s.final) confetti();
      go(i + Number(b.dataset.go));
    });
    if (s.gift || s.final) setTimeout(confetti, 300);
  }

  // Przesuwanie palcem
  let x0 = null;
  v.addEventListener('touchstart', e => { x0 = e.target.closest('.gallery') ? null : e.touches[0].clientX; }, { passive: true });
  v.addEventListener('touchend', e => {
    if (x0 == null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 60) go(i + (dx < 0 ? 1 : -1));
    x0 = null;
  });
  draw();
}

// ═════════ Panel ═════════
function meView(data) {
  app.innerHTML = `
    <section class="admin fade-in">
      ${rosette(100, icon('star'))}
      <h1>Panel organizatora</h1>
      <div class="card"><h2>Odpowiedzi Marlenki</h2><div id="answers"></div></div>
      <div class="card"><h2>Rozdziały</h2><p class="muted" style="font-size:.92rem">Odsłaniaj po kolei — u Marlenki pojawią się w ciągu kilku sekund.</p><div id="chapters"></div></div>
      <div class="card"><h2>Szczegóły do wpisania</h2><p class="muted" style="font-size:.92rem">Te teksty trafią do rozdziałów. Możesz je zmieniać w każdej chwili.</p><form id="vars"></form></div>
      <div class="card"><h2>Testy</h2><p class="muted" style="font-size:.92rem">Przed wysłaniem linku Marlence wyczyść wszystko.</p>
        <div class="danger">
          <button class="btn small ghost" data-act="resetAnswers">Wyczyść odpowiedzi</button>
          <button class="btn small ghost" data-act="resetAll">Wyczyść wszystko</button>
        </div></div>
      <button class="logout" id="out">Wyloguj</button>
    </section>`;
  app.querySelector('#out').onclick = logout;
  app.querySelectorAll('[data-act]').forEach(b => b.onclick = async () => {
    if (!confirm('Na pewno?')) return;
    data = await api('admin', { action: b.dataset.act });
    drawLive(data);
    toast('Wyczyszczone');
  });

  const drawVars = d => {
    const f = app.querySelector('#vars');
    f.innerHTML = d.varsMeta.map(m => {
      const val = d.vars[m.key] ?? '';
      const input = m.type === 'select'
        ? `<select name="${m.key}">${m.options.map(o => `<option ${o === val ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select>`
        : m.type === 'textarea'
          ? `<textarea name="${m.key}">${esc(val)}</textarea>`
          : `<input type="text" name="${m.key}" value="${esc(val)}">`;
      return `<div class="field"><label>${esc(m.label)}</label>${input}</div>`;
    }).join('') + '<button class="btn block forest" type="submit">Zapisz</button>';
    f.onsubmit = async e => {
      e.preventDefault();
      data = await api('admin', { action: 'vars', vars: Object.fromEntries(new FormData(f)) });
      drawLive(data);
      toast('Zapisane ✔');
    };
  };

  const drawLive = d => {
    const a = d.answers;
    app.querySelector('#answers').innerHTML = a
      ? `<div class="answers">${QUESTIONS.map(q => {
          const v = Array.isArray(a[q.id]) ? a[q.id].join(', ') : a[q.id];
          return `<div class="answer"><div class="q">${esc(q.title)}</div><div class="a ${q.text ? 'hand' : ''}">${esc(v || '—')}</div></div>`;
        }).join('')}</div>
        <p class="muted" style="font-size:.85rem;margin-top:10px">Wysłane: ${new Date(a.submittedAt).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}</p>
        ${suggestion(a)}`
      : '<p class="muted">Jeszcze nie odpowiedziała. Strona sama się odświeży. <span class="pulse"><i></i><i></i><i></i></span></p>';

    app.querySelector('#chapters').innerHTML = d.chapters.map(c => {
      const on = !!d.revealed[c.id];
      return `<div class="row ${on ? 'on' : ''}">
        <span class="medal-s">${icon(c.icon)}</span>
        <div class="info"><b>${esc(c.title)}</b><small>${on ? `odsłonięte ${new Date(d.revealed[c.id]).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}` : esc(c.subtitle)}</small></div>
        <div class="acts">
          <button class="btn small ghost eye" data-preview="${c.id}" aria-label="Podgląd" title="Podgląd">👁</button>
          <button class="btn small ${on ? 'ghost' : ''}" data-toggle="${c.id}">${on ? 'Ukryj' : 'Odsłoń'}</button>
        </div></div>`;
    }).join('');
    app.querySelectorAll('[data-preview]').forEach(b => b.onclick = () => openViewer(d.chapters.find(c => c.id === b.dataset.preview)));
    app.querySelectorAll('[data-toggle]').forEach(b => b.onclick = async () => {
      const id = b.dataset.toggle;
      b.disabled = true;
      data = await api('admin', { action: d.revealed[id] ? 'hide' : 'reveal', id });
      drawLive(data);
      toast(data.revealed[id] ? 'Odsłonięte ✨' : 'Ukryte');
    });
  };

  drawVars(data);
  drawLive(data);
  let sig = JSON.stringify([data.answers, data.revealed]);
  startPolling(async () => {
    try {
      const d = await api('state');
      const s = JSON.stringify([d.answers, d.revealed]);
      if (s !== sig) {
        if (!data.answers && d.answers) { toast('Marlenka odpowiedziała! 🍁'); navigator.vibrate?.(200); }
        sig = s; data = d; drawLive(d);
      }
    } catch {}
  });
}

function suggestion(a) {
  const act = a.activity, place = a.place, mood = a.mood;
  let pick, why;
  if (act === 'Coś aktywnego' || mood === 'Pełna energii') { pick = 'Gokarty'; why = 'chce ruchu i adrenaliny'; }
  else if (act === 'Coś spokojnego' && (mood === 'Kocykowo i leniwie' || mood === 'Trochę zmęczona')) { pick = 'Kino'; why = 'nastawiona na spokój i odpoczynek'; }
  else if (act === 'Coś spokojnego') { pick = 'Bilard'; why = 'spokojnie, ale z odrobiną zabawy'; }
  else { pick = place === 'W ciepłym wnętrzu' ? 'Bilard' : 'Gokarty'; why = 'dała Ci wolną rękę'; }
  return `<div class="suggest">💡 Sugestia: <b>${pick}</b> — ${why}. Ustaw aktywność niżej, a potem odsłoń rozdział.</div>`;
}

boot();
