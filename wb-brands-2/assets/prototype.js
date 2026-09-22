/* ============================================================
   РЕЖИМ ПРОТОТИПА · ходим по макету как по сайту
   Адрес: prototype.html#pdp/nosize
   ============================================================ */

import { GROUPS, SCREENS } from './data.js?v=38b040ad';
import { MOBILE } from './wire.js?v=38b040ad';
import { DESKTOP } from './wire-desktop.js?v=38b040ad';
import { initInteractions, signPage } from './interact.js?v=38b040ad';

/* хранилище недоступно, когда файл открыт напрямую с диска */
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* локальный файл */ } },
};

const q = (sel) => document.querySelector(sel);
const byId = (id) => SCREENS.find((s) => s.id === id);

const state = {
  mode: ['mobile', 'desktop'].includes(new URLSearchParams(location.search).get('mode'))
    ? new URLSearchParams(location.search).get('mode')
    : (store.get('proto-mode') || 'mobile'),
  screen: 'home',
  screenState: 'default',
};

/* ---------- отрисовка ---------- */

function render() {
  const sc = byId(state.screen) || byId('home');
  const set = state.mode === 'mobile' ? MOBILE : DESKTOP;
  const fallback = state.mode === 'mobile' ? DESKTOP : MOBILE;

  // экран может существовать только на одной платформе — показываем что есть
  const draw = set[sc.id] || fallback[sc.id];
  q('#screen').innerHTML = draw ? draw(state.screenState) : '';
  q('#screen').scrollTop = 0;
  signPage();

  // куратор и его окно живут поверх экрана и не зависят от прокрутки
  const old = q('.screen-dock');
  if (old) old.remove();
  const dock = [...q('#screen').querySelectorAll('.ed-dock')];
  if (dock.length) {
    const layer = document.createElement('div');
    layer.className = 'screen-dock';
    dock.forEach((d) => { [...d.children].forEach((n) => layer.appendChild(n)); d.remove(); });
    q('#device').appendChild(layer);
  }

  document.body.dataset.mode = state.mode;
  document.title = `${sc.title} — WB Бренды 2.0`;

  q('.proto__seg').querySelectorAll('button').forEach((b) => {
    b.setAttribute('aria-pressed', String(b.dataset.mode === state.mode));
  });

  renderMenu();
}

function renderMenu() {
  q('#menuBody').innerHTML = GROUPS.map((g) => {
    const items = SCREENS.filter((s) => s.group === g.id);
    if (!items.length) return '';
    return `
      <div class="proto__group">${g.title}</div>
      ${items.map((s) => `
        <button class="proto__link" data-go="${s.id}" aria-current="${s.id === state.screen}">${s.title}</button>`).join('')}`;
  }).join('');
}

/* ---------- адресация ---------- */

function syncHash(push = true) {
  const h = `#${state.screen}/${state.screenState}`;
  if (location.hash === h) return;
  if (push) history.pushState(null, '', h);
  else history.replaceState(null, '', h);
}

function readHash() {
  const [screen, st] = location.hash.replace(/^#/, '').split('/');
  const sc = byId(screen);
  if (!sc) return false;
  state.screen = screen;
  state.screenState = sc.states.some((x) => x.id === st) ? st : sc.states[0].id;
  return true;
}

function go(id, st, push = true) {
  const sc = byId(id);
  if (!sc) return;
  state.screen = id;
  state.screenState = st && sc.states.some((x) => x.id === st) ? st : sc.states[0].id;
  syncHash(push);
  render();
}

/* ---------- события ---------- */

document.addEventListener('click', (e) => {
  const hot = e.target.closest('.w-hot[data-go]');
  if (hot) { go(hot.dataset.go, hot.dataset.state); return; }

  const link = e.target.closest('.proto__link');
  if (link) {
    go(link.dataset.go);
    q('#menu').hidden = true;
    q('#menuBtn').setAttribute('aria-expanded', 'false');
    return;
  }

  const seg = e.target.closest('.proto__seg button');
  if (seg) {
    state.mode = seg.dataset.mode;
    store.set('proto-mode', state.mode);
    render();
    return;
  }

  if (e.target.closest('#back')) { history.back(); return; }
  if (e.target.closest('#home')) { go('home', 'default'); return; }
  if (e.target.closest('#menuBtn')) {
    q('#menu').hidden = !q('#menu').hidden;
    q('#menuBtn').setAttribute('aria-expanded', String(!q('#menu').hidden));
    if (!q('#menu').hidden) q('#menuClose').focus();
    return;
  }
  if (e.target.closest('#menuClose')) {
    q('#menu').hidden = true;
    q('#menuBtn').setAttribute('aria-expanded', 'false');
    q('#menuBtn').focus();
  }
});

window.addEventListener('popstate', () => { readHash(); render(); });

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !q('#menu').hidden) {
    q('#menu').hidden = true;
    q('#menuBtn').setAttribute('aria-expanded', 'false');
    q('#menuBtn').focus();
  }
});

/* ---------- старт ---------- */

readHash();
syncHash(false);
render();
initInteractions();
