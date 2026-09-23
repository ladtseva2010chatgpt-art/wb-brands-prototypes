/* ============================================================
   KIT · роутер, рабочее место, статичные виды
   ============================================================ */

import { GROUPS, SCREENS, FLOWS, STATES, COMPONENT_GROUPS } from './data.js?v=72caca98';
import { MOBILE, ph, pin, hot, bars, chip, badge, btn, pcard, header, bottomnav,
         edPh, edP, ico } from './wire.js?v=72caca98';
import { DESKTOP } from './wire-desktop.js?v=72caca98';
import { initInteractions, signPage } from './interact.js?v=72caca98';

const byId = (id) => SCREENS.find((s) => s.id === id);

const state = {
  view: 'overview',
  screen: 'home',
  screenState: 'default',
  platform: 'both',
  pins: true,
  hot: false,
};

/* ---------- вспомогательное ---------- */

const q = (sel) => document.querySelector(sel);
const qa = (sel) => Array.from(document.querySelectorAll(sel));

function setView(view) {
  state.view = view;
  qa('.view').forEach((v) => v.setAttribute('data-active', String(v.dataset.view === view)));
  qa('.nav__item').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.view === view)));
  window.scrollTo({ top: 0, behavior: 'instant' });
  syncHash();
}

/** deep link: #screens/pdp/nosize — прототип открывается по единой ссылке на любом шаге */
function syncHash() {
  const h = state.view === 'screens' ? `#screens/${state.screen}/${state.screenState}` : `#${state.view}`;
  if (location.hash !== h) history.replaceState(null, '', h);
}

function readHash() {
  const [view, screen, st] = location.hash.replace(/^#/, '').split('/');
  if (!view) return false;
  if (view === 'screens' && byId(screen)) {
    state.screen = screen;
    const sc = byId(screen);
    state.screenState = sc.states.some((x) => x.id === st) ? st : sc.states[0].id;
  }
  if (qa('.view').some((v) => v.dataset.view === view)) { state.view = view; return true; }
  return false;
}

function goScreen(id, st) {
  const sc = byId(id);
  if (!sc) return;
  state.screen = id;
  state.screenState = st && sc.states.some((x) => x.id === st) ? st : sc.states[0].id;
  setView('screens');
  renderSidebar();
  renderWorkbench();
}

/* ---------- боковой список экранов ---------- */

function renderSidebar() {
  const html = GROUPS.map((g) => {
    const items = SCREENS.filter((s) => s.group === g.id);
    if (!items.length) return '';
    return `
      <div class="sidebar__group">${g.num} · ${g.title}</div>
      ${items.map((s) => `
        <button class="screenlink" data-screen="${s.id}" aria-current="${s.id === state.screen}">
          <span class="screenlink__num">${s.num}</span>
          <span>
            <span class="screenlink__title">${s.title}</span>
            <span class="screenlink__tag">${s.platforms.map((p) => (p === 'mobile' ? 'MOB' : 'DESK')).join(' · ')} · ${s.prd.join(' ')}</span>
          </span>
        </button>`).join('')}`;
  }).join('');
  q('#sidebar').innerHTML = html;
}

/* ---------- рабочее место ---------- */

function renderWorkbench() {
  const sc = byId(state.screen);
  const hasMobile = sc.platforms.includes('mobile');
  const hasDesktop = sc.platforms.includes('desktop');
  const showMobile = hasMobile && state.platform !== 'desktop';
  const showDesktop = hasDesktop && state.platform !== 'mobile';

  q('#screenhead').innerHTML = `
    <div>
      <div class="screenhead__id">ЭКРАН ${sc.num} · ${GROUPS.find((g) => g.id === sc.group).title.toUpperCase()}</div>
      <h1 class="screenhead__title">${sc.title}</h1>
      <p class="screenhead__job">${sc.job}</p>
      <div class="refs">
        ${sc.prd.map((r) => `<span class="ref ref--prd">${r}</span>`).join('')}
        ${sc.tz.map((r) => `<span class="ref">${r}</span>`).join('')}
        ${!hasDesktop ? '<span class="ref">только mobile</span>' : ''}
      </div>
    </div>
    <div class="controls">
      <div class="segmented" role="group" aria-label="Платформа">
        <button data-platform="both" aria-pressed="${state.platform === 'both'}">Обе</button>
        <button data-platform="mobile" aria-pressed="${state.platform === 'mobile'}">390</button>
        <button data-platform="desktop" aria-pressed="${state.platform === 'desktop'}">1440</button>
      </div>
      <div class="segmented">
        <button data-toggle="pins" aria-pressed="${state.pins}">Аннотации</button>
        <button data-toggle="hot" aria-pressed="${state.hot}">Переходы</button>
      </div>
    </div>`;

  q('#staterow').innerHTML = sc.states.length > 1
    ? `<span class="staterow__label">Состояния</span>
       ${sc.states.map((st) => `<button class="statechip" data-state="${st.id}" aria-pressed="${st.id === state.screenState}">${st.label}</button>`).join('')}`
    : `<span class="staterow__label">Состояние</span><span class="statechip" aria-pressed="true">${sc.states[0].label}</span>`;

  const annotsHtml = `
    <div class="annots">
      <div class="annots__title">Что здесь спроектировано</div>
      ${sc.annots.map((a, i) => `
        <div class="annot"><span class="annot__n">${i + 1}</span><span><b>${a[0]}</b> ${a[1]}</span></div>`).join('')}
    </div>`;

  q('#boards').innerHTML = `
    <div class="board board--mobile" ${showMobile ? '' : 'hidden'}>
      <div class="board__label"><b>Mobile</b> 390 × 844 · приоритетная версия</div>
      <div class="frame frame--mobile" data-pins="${state.pins ? 'on' : 'off'}" data-hot="${state.hot ? 'on' : 'off'}">
        <div class="statusbar"><span>9:41</span><span>▮▮▮ ▮▮ ▰</span></div>
        <div class="frame__scroll">${hasMobile ? (MOBILE[sc.id]?.(state.screenState) ?? '') : ''}</div>
      </div>
    </div>

    <div class="board board--notes" ${showMobile && !showDesktop ? '' : 'hidden'}>
      <div class="board__label"><b>Аннотации</b> · привязка к PRD и ТЗ</div>
      ${annotsHtml}
    </div>

    <div class="board board--desktop" ${showDesktop ? '' : 'hidden'}>
      <div class="board__label"><b>Desktop</b> 1440 · самостоятельная адаптация<span id="scaleLabel"></span></div>
      <div class="frame__scaler" id="scaler">
        <div class="frame frame--desktop" id="deskFrame" data-pins="${state.pins ? 'on' : 'off'}" data-hot="${state.hot ? 'on' : 'off'}">
          <div class="frame__scroll">${hasDesktop ? (DESKTOP[sc.id]?.(state.screenState) ?? '') : ''}</div>
        </div>
      </div>
      ${showDesktop ? annotsHtml : ''}
    </div>`;

  signPage();

  // куратор поверх артборда, вне прокрутки
  qa('.frame').forEach((frame) => {
    const dock = [...frame.querySelectorAll('.ed-dock')];
    if (!dock.length) return;
    const layer = document.createElement('div');
    layer.className = 'screen-dock';
    dock.forEach((d) => { [...d.children].forEach((n) => layer.appendChild(n)); d.remove(); });
    frame.appendChild(layer);
  });

  scaleDesktop();
  if (state.view === 'screens') syncHash();
}

function scaleDesktop() {
  const scaler = q('#scaler');
  const frame = q('#deskFrame');
  if (!scaler || !frame) return;
  const board = scaler.closest('.board');
  if (board.hasAttribute('hidden')) return;

  const canvasW = q('#canvas').clientWidth - 96;
  const mobileVisible = !q('.board--mobile').hasAttribute('hidden');
  const avail = canvasW - (mobileVisible ? 390 + 64 : 0);
  const scale = Math.max(0.3, Math.min(0.78, avail / 1440));

  frame.style.transform = `scale(${scale})`;
  scaler.style.width = `${1440 * scale}px`;
  scaler.style.height = `${900 * scale}px`;
  const label = q('#scaleLabel');
  if (label) label.textContent = ` · масштаб ${Math.round(scale * 100)}%`;
}

/* ---------- обзор ---------- */

function renderOverview() {
  const nDesktop = SCREENS.filter((s) => s.platforms.includes('desktop')).length;
  const nStates = STATES.length;
  const nComp = COMPONENT_GROUPS.reduce((a, g) => a + g.items.length, 0);
  q('#overview').innerHTML = `
    <div class="page">
      <div class="cover__eyebrow">Кликабельный макет · mobile 390 и desktop 1440</div>
      <h1 class="cover__title">Витрина<br><em>WB Бренды</em> <b>2.0</b></h1>
      <p class="cover__lead">
        Здесь восемнадцать экранов для телефона и компьютера, десять сценариев, которые можно пройти
        от начала до конца, и двадцать состояний, без которых экраны не обходятся. Всё собрано по ТЗ и PRD 2.0.
      </p>

      <div class="metrics">
        <div class="metric"><div class="metric__v">${SCREENS.length}</div><div class="metric__k">экранов, из них ${nDesktop} в двух платформах</div></div>
        <div class="metric"><div class="metric__v">${FLOWS.length}</div><div class="metric__k">сквозных кликабельных сценариев</div></div>
        <div class="metric"><div class="metric__v">${nStates}</div><div class="metric__k">обязательных состояний</div></div>
        <div class="metric"><div class="metric__v">${nComp}</div><div class="metric__k">компонента библиотеки прототипа</div></div>
        <div class="metric"><div class="metric__v">390<span> / 1440</span></div><div class="metric__k">mobile — приоритет, desktop — самостоятельная адаптация</div></div>
      </div>

      <div class="split">
        <div>
          <div class="blockhead">Что каркас обязан доказать</div>
          <dl class="deflist">
            <div class="def"><dt>Разрыв 1</dt><dd><b>Вход.</b> 38% знают о разделе, но конверсия знание→заход 87%. Каждый процент узнаваемости почти полностью конвертируется — значит, чинить надо вход, а не воронку.</dd></div>
            <div class="def"><dt>Разрыв 2</dt><dd><b>Различимость.</b> Только половина побывавших помнит визит. Карточка товара обязана выглядеть как карточка раздела при любом источнике входа.</dd></div>
            <div class="def"><dt>Разрыв 3</dt><dd><b>Объяснённая подборка.</b> Aha Moment ядрового сегмента наступает не от красивой витрины, а от объяснения причины подбора — и должен наступать в первой сессии.</dd></div>
          </dl>
        </div>
        <div>
          <div class="blockhead">Проектные ограничения, которые видно в каркасе</div>
          <dl class="deflist">
            <div class="def"><dt>Односторонняя<br>видимость</dt><dd>Из аутлета премиум виден. Из премиума аутлет — нет. Спеццена не подмешивается в дефолтную выдачу, у Premium-бренда нет вкладки «Аутлет».</dd></div>
            <div class="def"><dt>Фоновая<br>подлинность</dt><dd>Сигнал присутствует постоянно и никогда не доминирует. Глубина раскрытия — по запросу пользователя, не по умолчанию.</dd></div>
            <div class="def"><dt>Отключаемая<br>лояльность</dt><dd>Блоки привилегий проектируются так, чтобы скрываться целиком — не показываться неактивными.</dd></div>
            <div class="def"><dt>Тир — метка,<br>не раздел</dt><dd>Популярные / премиум / люкс / российские работают как фильтр и основание для подборок. Своя точка входа есть только у аутлета — остальное живёт слоями внутри витрины.</dd></div>
          </dl>
        </div>
      </div>

      <div style="margin-top:64px">
        <div class="blockhead">Как читать этот документ</div>
        <div class="split">
          <div>
            <dl class="deflist">
              <div class="def"><dt>Карта экранов</dt><dd>Информационная архитектура: что из чего вырастает и куда ведёт.</dd></div>
              <div class="def"><dt>Сценарии</dt><dd>Десять сквозных путей. Каждый шаг кликабелен — открывает нужный экран в нужном состоянии.</dd></div>
            </dl>
          </div>
          <div>
            <dl class="deflist">
              <div class="def"><dt>Экраны</dt><dd>Макеты в двух платформах. Аннотации справа объясняют каждое решение и ссылаются на PRD.</dd></div>
              <div class="def"><dt>Состояния</dt><dd>Двадцать обязательных состояний со ссылкой на экран, где каждое показано.</dd></div>
            </dl>
          </div>
        </div>
      </div>

      <div style="margin-top:64px;padding:28px 32px;border:1px solid var(--hair-strong);border-radius:4px;background:var(--ink-850)">
        <div class="blockhead" style="border:0;padding:0;margin-bottom:12px">Что решаем на согласовании</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:28px;font-size:14px;color:var(--fg-mid)">
          <div><span class="pill">1</span><div style="margin-top:10px">Состав и порядок блоков главной: тот ли повод входа она формирует.</div></div>
          <div><span class="pill">2</span><div style="margin-top:10px">Место объяснённой подборки — первый экран или ниже.</div></div>
          <div><span class="pill">3</span><div style="margin-top:10px">Глубина кастомизации shop-in-shop: где граница между брендом и витриной.</div></div>
          <div><span class="pill">4</span><div style="margin-top:10px">Плотность рекламных мест в листинге, которую готовы держать.</div></div>
          <div><span class="pill pill--warn">?</span><div style="margin-top:10px">Правило отбора карточек под кросс-линк в аутлет — открытый вопрос к мерчандайзингу.</div></div>
        </div>
      </div>
    </div>`;
}

/* ---------- карта экранов ---------- */

function renderSitemap() {
  q('#sitemap').innerHTML = `
    <div class="page page--wide">
      <div class="cover__eyebrow">Информационная архитектура</div>
      <h1 class="cover__title" style="font-size:clamp(32px,4vw,52px);margin-bottom:24px">Карта экранов</h1>
      <p class="cover__lead" style="font-size:15px;margin-bottom:48px">
        Первая ось навигации — категорийная, как заходят покупать. Тир бренда — метка и фильтр, не раздел.
        Аутлет — единственный слой с собственным входом: там другая работа пользователя.
      </p>
      <div class="sitemap">
        ${GROUPS.map((g) => {
          const items = SCREENS.filter((s) => s.group === g.id);
          return `
          <section class="smgroup">
            <div class="smgroup__head">
              <span class="smgroup__num">${g.num}</span>
              <span class="smgroup__title">${g.title}</span>
              <span class="smgroup__note">${g.note}</span>
            </div>
            <div class="smgrid">
              ${items.map((s) => `
                <button class="smcard" data-screen="${s.id}">
                  <div class="smcard__num">${s.num}</div>
                  <div class="smcard__t">${s.title}</div>
                  <div class="smcard__m"><i>${s.prd.join(' · ')}</i> · ${s.states.length} сост. · ${s.platforms.length === 2 ? 'mob + desk' : 'mobile'}</div>
                </button>`).join('')}
            </div>
          </section>`;
        }).join('')}
      </div>
    </div>`;
}

/* ---------- сценарии ---------- */

function renderFlows() {
  q('#flows').innerHTML = `
    <div class="page page--wide">
      <div class="cover__eyebrow">Сквозные пути · ТЗ §9</div>
      <h1 class="cover__title" style="font-size:clamp(32px,4vw,52px);margin-bottom:24px">${FLOWS.length} сквозных сценариев</h1>
      <p class="cover__lead" style="font-size:15px;margin-bottom:40px">
        Прототип живёт путями, а не экранами. Каждый шаг ниже кликабелен — открывает экран
        в том состоянии, в котором его видит пользователь на этом шаге.
      </p>
      ${FLOWS.map((f) => `
        <div class="flow">
          <div class="flow__head">
            <span class="flow__n">${f.n}</span>
            <span class="flow__t">${f.title}</span>
            <span class="flow__goal">${f.goal}</span>
          </div>
          <div class="flow__steps">
            ${f.steps.map(([k, t, screen, st]) => `
              <button class="step" data-screen="${screen}" data-state="${st}">
                <span class="step__k">${k}</span>
                <span class="step__t">${t}</span>
              </button>`).join('')}
          </div>
        </div>`).join('')}
    </div>`;
}

/* ---------- состояния ---------- */

function renderStates() {
  q('#states').innerHTML = `
    <div class="page page--wide">
      <div class="cover__eyebrow">Обязательные состояния · ТЗ §10</div>
      <h1 class="cover__title" style="font-size:clamp(32px,4vw,52px);margin-bottom:24px">${STATES.length} обязательных состояний</h1>
      <p class="cover__lead" style="font-size:15px;margin-bottom:40px">
        Состояние — не исключение, а часть каркаса. Если товар из редакционного материала больше недоступен,
        пользователь не попадает на 404: он видит статус и кураторскую замену.
      </p>
      <table class="statetable">
        <thead><tr><th>Состояние</th><th>Где встречается</th><th>Проектное решение</th><th></th></tr></thead>
        <tbody>
          ${STATES.map(([name, where, rule, screen, st]) => `
            <tr>
              <td>${name}</td>
              <td>${where}</td>
              <td>${rule}</td>
              <td><button class="statechip" data-screen="${screen}" data-state="${st}">Смотреть →</button></td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

/* ---------- библиотека компонентов ---------- */

const COMP = {
  /* навигация */
  header: () => `<header class="ed-header" style="position:static"><div class="ed-header__bar"><div class="ed-logo"><i></i>WB Бренды</div><div class="w-row" style="gap:10px"><button class="ed-brandsbtn">Бренды A–Z</button></div></div><nav class="ed-cats">${['Женщины', 'Мужчины', 'Дом и вещи'].map((t, i) => `<button class="ed-cat"${i === 0 ? ' data-on' : ''}>${t} ⌄</button>`).join('')}</nav></header>`,
  bottomnav: () => bottomnav(0).replace('w-bottomnav', 'ed-bottom'),
  chips: () => `<div class="w-row" style="gap:8px;flex-wrap:wrap"><span class="ed-chip" data-on>Фильтры ⌄</span><span class="ed-chip">Новинки</span><span class="ed-chip">Премиум</span></div>`,
  searchfield: () => `<div class="ed-field"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="9" cy="9" r="5.4"/><path d="m13.2 13.2 3.4 3.4"/></svg><span>Бренд, вещь или материал</span></div>`,
  tabs: () => `<div class="ed-bar" style="position:static"><div class="ed-bar__row" style="padding:0">${['Всё', 'Новинки', 'Коллекции'].map((t, i) => `<span class="ed-chip"${i === 0 ? ' data-on' : ''}>${t}</span>`).join('')}</div></div>`,
  azindex: () => `<div style="background:var(--e-soft);padding:10px 12px"><div class="w-row" style="gap:12px;font-size:11px;color:var(--e-mute)">${'ABCDEFGH'.split('').map((l) => `<span>${l}</span>`).join('')}</div></div>`,
  filterdrawer: () => `<div style="border:1px solid var(--e-line)"><div style="width:36px;height:4px;background:var(--e-line);border-radius:2px;margin:10px auto"></div><div class="ed-rows" style="padding:0 14px 12px">${['Бренд', 'Размер', 'Цена'].map((t) => `<div class="ed-rows__i"><span>${t}</span><span>›</span></div>`).join('')}</div></div>`,
  breadcrumbs: () => `<div class="ed-sm">WB Бренды / Женщины / Пальто</div>`,

  /* контент */
  hero: () => `<div class="ed-hero">${edPh(320, 220, '')}<div class="ed-hero__copy ed-hero__copy--dark" style="left:14px;right:14px;bottom:14px"><div class="ed-label" style="margin-bottom:6px">Кампания недели</div><div class="ed-h3">Спокойный объём</div></div><div class="ed-hero__tab" style="padding:10px 14px;font-size:9px">Смотреть ›</div></div>`,
  edbanner: () => `<div class="ed-infeed" style="padding:18px"><div class="ed-infeed__k">Подборка стилиста</div><div class="ed-h3">Шесть пальто сезона</div></div>`,
  storyslide: () => `<div style="position:relative">${edPh(320, 240, '')}<div class="slide-bars" style="position:absolute;top:10px;left:10px;right:10px">${[1, 2, 3].map((i) => `<i${i === 1 ? ' data-on' : ''}></i>`).join('')}</div></div>`,
  edtext: () => `<div class="slide"><div class="slide-rule"></div><div class="slide-sub" style="font-size:19px">Как выбрать <i>пальто оверсайз</i></div><div class="slide-body" style="font-size:14px">Силуэт держится не тканью, а линией плеча.</div></div>`,
  quote: () => `<div class="slide"><div class="slide-lead" style="font-size:17px">«Посадка — это не сантиметры. Это то, как вещь ведёт себя, когда вы про неё забыли»</div></div>`,
  brandfocus: () => `<div>${edPh(320, 200, '')}<div class="chat-art__k" style="margin-top:10px">Brand Focus</div><div class="chat-art__t">Кто такие 12 STOREEZ</div></div>`,
  article: () => `<div class="w-row" style="gap:12px"><div style="width:88px;flex:0 0 auto">${edPh(160, 120, '')}</div><div><div class="chat-art__k">Гид · 6 минут</div><div class="chat-art__t" style="font-size:16px">Пальто на сезон</div></div></div>`,
  split: () => `<div class="w-row" style="gap:10px">${edPh(150, 190, '')}${edPh(150, 190, '')}</div>`,

  /* commerce */
  pcard: () => edP({ brand: 'MAX MARA', name: 'Пальто из шерсти', price: '39 000 ₽', w: 0 }),
  pcardc: () => `<div class="ed-p">${edPh(200, 220, '')}<div class="ed-p__brand">COS</div><div class="ed-p__price">21 300 ₽</div></div>`,
  pcarded: () => `<div class="slide-prod">${edPh(300, 200, '')}<div class="slide-cap" style="margin-top:8px">из истории «Спокойный объём»</div><div class="slide-prod__brand">MAX MARA</div><div class="slide-prod__price">39 000 ₽</div></div>`,
  shelf: () => `<div class="w-row" style="gap:10px">${[1, 2].map(() => `<div style="flex:1"><div class="ed-p">${edPh(140, 180, '')}<div class="ed-p__brand">BOSS</div><div class="ed-p__price">54 000 ₽</div></div></div>`).join('')}</div>`,
  look: () => `<div class="chat-look"><div class="chat-look__i"><div>${edPh(160, 200, '')}</div><div><div class="chat-look__role">Пальто</div><div class="chat-look__brand">MAX MARA</div><div class="chat-look__why">Камель, который вы искали</div></div></div></div>`,
  bcard: () => `<div class="ed-brand" style="width:auto"><div class="ed-brand__name">12 STOREEZ</div><div class="ed-brand__note">Русский минимализм, который не повышает голос.</div><div class="ed-brand__meta">российский · 168 вещей</div></div>`,
  ocard: () => `<div class="ed-p">${edPh(300, 380, '')}<div class="ed-p__brand">LEVI’S</div><div class="ed-p__name">Джинсы прямые</div><div class="ed-p__price">5 400 ₽<span class="ed-p__old">8 900 ₽</span></div><div class="ed-p__name" style="margin-top:5px">коллекция 2024</div></div>`,
  dcard: () => `<div style="border:1px solid var(--e-ink);padding:12px"><div class="w-row w-row--between" style="margin-bottom:10px"><span class="ed-label">Дроп</span><span class="ed-trust ed-trust--ghost" style="padding:4px 8px">через 2 дня</span></div>${edPh(280, 140, '')}<div class="ed-p__brand">USHATÁVA × WB</div></div>`,

  /* доверие и сервис */
  orig: () => `<div class="w-row" style="gap:10px;flex-wrap:wrap"><span class="ed-trust">✓ Оригинал</span><span class="ed-trust ed-trust--ghost">можно проверить самому</span></div>`,
  passport: () => `<div style="border:1px solid var(--e-ink);padding:14px"><div class="ed-label" style="margin-bottom:10px">Оригинал · проверка</div><div class="ed-rows"><div class="ed-rows__i"><span>Партия</span><span>AW-2026-118</span></div><div class="ed-rows__i" style="border-bottom:0"><span>Метка</span><span>NFC в подкладке</span></div></div></div>`,
  service: () => `<div class="ed-rows">${[['Доставка', 'послезавтра · бесплатно'], ['Возврат', '14 дней']].map(([k, v]) => `<div class="ed-rows__i"><span>${k}</span><span>${v}</span></div>`).join('')}</div>`,
  cb: () => `<div><span class="ed-trust ed-trust--ghost">Кросс-бордер</span><p class="ed-sm" style="margin-top:8px">12–18 дней · пошлина 1 950 ₽ до оплаты</p></div>`,
  club: () => `<div class="ed-value__i"><span class="ed-usp__ico">${ico('club')}</span><div><div class="ed-value__t">Лояльность</div><div class="ed-value__d">Ранний доступ к дропам</div></div></div>`,

  /* куратор */
  bubble: () => `<button class="ed-fab" style="position:static">${ico('chat')}<span>Куратор</span></button>`,
  explain: () => `<div class="chat"><div class="chat-row"><div class="chat-ava">К</div><div class="chat-msg">Собрала образ вокруг одного пальто — вы две недели листали эту посадку.</div></div></div>`,
  recset: () => `<div class="chat"><div class="chat-cards">${[['MAX MARA', '39 000 ₽', 'Камель, что вы искали'], ['COS', '21 300 ₽', 'Тот же силуэт дешевле']].map(([b, pr, why]) => `<div class="chat-card" style="width:132px">${edPh(220, 280, '')}<div class="chat-card__brand">${b}</div><div class="chat-card__price">${pr}</div><div class="chat-card__why">${why}</div></div>`).join('')}</div></div>`,
  quick: () => `<div class="chat"><div class="chat-chips">${['Дороже', 'Другой цвет', 'Не мой силуэт'].map((t) => `<span>${t}</span>`).join('')}</div></div>`,
  skip: () => `<div class="chat"><div class="chat-chips">${['Не то', 'Пересобрать', 'Не писать мне первой'].map((t) => `<span>${t}</span>`).join('')}</div></div>`,
  clarify: () => `<div class="chat"><div class="chat-row"><div class="chat-ava">К</div><div class="chat-msg">Поняла, это направление убираю. Скажите, что именно мимо — пересоберу.</div></div></div>`,

  /* монетизация */
  sphero: () => `<div style="position:relative">${edPh(320, 190, '')}<div style="position:absolute;right:10px;top:10px"><span class="ed-adtag" style="background:#fff">Реклама</span></div></div>`,
  infeed: () => `<div><div class="w-row w-row--between" style="margin-bottom:8px"><span class="ed-label">Новый бренд</span><span class="ed-adtag">Реклама</span></div>${edPh(320, 150, '')}</div>`,
  prbrand: () => `<div class="w-row w-row--between" style="border:1px solid var(--e-line);padding:12px"><div class="w-row" style="gap:12px"><div style="width:40px">${edPh(60, 60, '')}</div><div><div class="ed-p__brand" style="margin-top:0">LIME</div><div class="ed-p__name">популярные</div></div></div><span class="ed-adtag">Реклама</span></div>`,
  brarticle: () => `<div>${edPh(320, 170, '')}<div class="w-row" style="gap:10px;margin-top:10px"><span class="ed-label">Партнёрский материал</span><span class="ed-adtag">Реклама</span></div></div>`,
  spshelf: () => `<div><div class="w-row w-row--between" style="margin-bottom:10px"><span class="ed-label">Полка бренда</span><span class="ed-adtag">Реклама</span></div><div class="w-row" style="gap:10px">${[1, 2].map(() => `<div style="flex:1">${edPh(130, 160, '')}</div>`).join('')}</div></div>`,
  native: () => `<div class="ed-infeed" style="padding:16px"><div class="w-row w-row--between" style="margin-bottom:8px"><span class="ed-infeed__k" style="margin:0">История бренда</span><span class="ed-adtag">Реклама</span></div><p class="ed-sm">Читается как редакция, промаркирован как реклама</p></div>`,
};

function renderComponents() {
  const nComp = COMPONENT_GROUPS.reduce((a, g) => a + g.items.length, 0);
  q('#components').innerHTML = `
    <div class="page page--wide">
      <div class="cover__eyebrow">Компонентная библиотека · ТЗ §12</div>
      <h1 class="cover__title" style="font-size:clamp(32px,4vw,52px);margin-bottom:24px">Библиотека из ${nComp} компонентов</h1>
      <p class="cover__lead" style="font-size:15px;margin-bottom:48px">
        Единый набор, из которого собраны все семнадцать экранов. Каждый компонент показан
        в целевой подаче: типографика, отступы, границы и состояния — те же, что в макетах.
      </p>
      ${COMPONENT_GROUPS.map((g) => `
        <section style="margin-bottom:56px">
          <div class="blockhead">${g.title} · ${g.items.length}</div>
          <div class="compgrid">
            ${g.items.map(([name, note, key]) => `
              <div class="comp">
                <div class="comp__view ed">${COMP[key] ? COMP[key]() : ph(300, 120, name)}</div>
                <div class="comp__meta"><div class="comp__t">${name}</div><div class="comp__k">${note}</div></div>
              </div>`).join('')}
          </div>
        </section>`).join('')}
    </div>`;
}

/* ---------- события ---------- */

document.addEventListener('click', (e) => {
  const nav = e.target.closest('.nav__item');
  if (nav) { setView(nav.dataset.view); if (nav.dataset.view === 'screens') scaleDesktop(); return; }

  const link = e.target.closest('[data-screen]');
  if (link) { goScreen(link.dataset.screen, link.dataset.state); return; }

  const plat = e.target.closest('[data-platform]');
  if (plat) { state.platform = plat.dataset.platform; renderWorkbench(); return; }

  const tog = e.target.closest('[data-toggle]');
  if (tog) { state[tog.dataset.toggle] = !state[tog.dataset.toggle]; renderWorkbench(); return; }

  const st = e.target.closest('.statechip[data-state]');
  if (st && !st.dataset.screen) { state.screenState = st.dataset.state; renderWorkbench(); return; }

  const go = e.target.closest('.w-hot');
  if (go) { goScreen(go.dataset.go, go.dataset.state); }
});

window.addEventListener('resize', scaleDesktop);

/* ---------- старт ---------- */

renderOverview();
renderSitemap();
renderFlows();
renderStates();
renderComponents();
renderSidebar();

readHash();
setView(state.view);
renderSidebar();
renderWorkbench();
initInteractions();
