/* ============================================================
   WIRE · строительные блоки каркаса + мобильные экраны (390×844)
   ============================================================ */

/* ---------- строительные блоки ---------- */

/* серый плейсхолдер placehold.co; подпись даём своим тегом,
   текст самой картинки гасим в цвет фона — иначе он забивает каркас */
export const ph = (w, h, label = '') => `
  <span class="w-img w-img--x" style="aspect-ratio:${w}/${h}">
    ${label ? `<span class="w-img__tag">${label}</span>` : ''}
    <img loading="lazy" alt="" src="https://placehold.co/${w}x${h}/ECECEA/ECECEA/png">
  </span>`;

export const pin = (n) => `<i class="pin">${n}</i>`;

/* ---------- editorial: визуальный слой главной ---------- */

/* Кадры: сгенерированный контент проекта (assets/img).
   banner — кампании и shop-in-shop · product — карточки товара · editorial — журнал. */
const SHOTS = {
  banner:   Array.from({ length: 22 }, (_, i) => `banner-${String(i + 1).padStart(2, '0')}`),
  product:  Array.from({ length: 8 },  (_, i) => `product-${String(i + 1).padStart(2, '0')}`),
  editorial: Array.from({ length: 19 }, (_, i) => `editorial-${String(i + 1).padStart(2, '0')}`),
};

/* Роль блока → курируемый пул. Кадры с запечёнными UI/надписями сюда не входят. */
const ROLE_POOL = {
  campaign: ['banner-22', 'banner-15', 'banner-16', 'banner-18', 'banner-20', 'banner-09', 'banner-02', 'banner-03', 'banner-05', 'banner-07'],
  sis: ['banner-15', 'banner-20', 'banner-18', 'banner-16', 'banner-22'],
  lifestyle: ['banner-lifestyle-user', 'banner-17', 'banner-21', 'banner-04', 'banner-08'],
  interior: ['banner-lifestyle-user', 'banner-17', 'banner-21', 'banner-04', 'banner-08'],
  model: ['product-01', 'product-02', 'product-03', 'editorial-08', 'editorial-09', 'editorial-11'],
  coat: ['product-01', 'product-02', 'product-03', 'editorial-08', 'editorial-09', 'editorial-11'],
  bag: ['product-06', 'product-07', 'editorial-13', 'editorial-17'],
  shoes: ['banner-19', 'editorial-15'],
  basic: ['product-04', 'product-05', 'product-08'],
  rack: SHOTS.editorial,
  journal: SHOTS.editorial,
};

const roleCursor = Object.create(null);

/** Каждая роль имеет свой курсор: товары больше не сдвигают баннеры. */
const shot = (role) => {
  const key = role || 'journal';
  const list = ROLE_POOL[key] || SHOTS.editorial;
  const cursor = roleCursor[key] || 0;
  const id = list[cursor % list.length];
  roleCursor[key] = cursor + 1;
  return id;
};

export const edPh = (w, h, tag = '', role = '', asset = '', position = 'center') => `
  <span class="ed-shot" style="display:block;aspect-ratio:${w}/${h};background:var(--e-soft);position:relative;overflow:hidden">
    <img alt="" src="assets/img/${asset || shot(role)}.jpg" style="width:100%;height:100%;object-fit:cover;object-position:${position};display:block">
    ${tag ? `<span class="ed-p__tag">${tag}</span>` : ''}
  </span>`;

export const edP = (o = {}) => {
  const { brand = 'MAX MARA', name = 'Пальто из шерсти', price = '39 000 ₽', old = '',
          w = 158, ratio = [300, 380], tag = '', go = 'pdp', state = 'default',
          badge = '', status = '' } = o;
  const inferredBadge = badge || ({
    'MAX MARA': 'ЛЮКС',
    BALENCIAGA: 'ЛЮКС',
    BOSS: 'ПРЕМИУМ',
    COS: 'ПРЕМИУМ',
    'MARC O’POLO': 'ПРЕМИУМ',
    '12 STOREEZ': 'РОССИЙСКИЙ БРЕНД',
    'USHATÁVA': 'РОССИЙСКИЙ БРЕНД',
    LIME: 'РОССИЙСКИЙ БРЕНД',
    'ARNY PRAHT': 'РОССИЙСКИЙ БРЕНД',
  }[brand] || '');
  const inferredStatus = status || (brand === 'BOSS' ? 'COMING SOON' : brand === 'ARNY PRAHT' ? 'LAST SIZE' : '');
  const productRole = /(сумк|клатч|шопер)/i.test(name) ? 'bag'
    : /(ботин|кроссов|кед|лофер)/i.test(name) ? 'shoes'
      : /(очк|кошел|ремен|аксессуар)/i.test(name) ? 'basic' : 'model';
  return hot(go, state, `
    <div class="ed-p"${w ? ` style="width:${w}px"` : ''}>
      <div class="ed-p__media">
        ${edPh(ratio[0], ratio[1], tag, productRole)}
        ${inferredStatus ? `<span class="ed-p__status">${inferredStatus}</span>` : ''}
      </div>
      <div class="ed-p__meta"><div class="ed-p__brand">${brand}</div>${inferredBadge ? `<span class="ed-p__badge${inferredBadge === 'РОССИЙСКИЙ БРЕНД' ? ' ed-p__badge--dark' : inferredBadge === 'ЛЮКС' ? ' ed-p__badge--lux' : ''}">${inferredBadge}</span>` : ''}</div>
      <div class="ed-p__name">${name}</div>
      <div class="ed-p__price">${price}${old ? `<span class="ed-p__old">${old}</span>` : ''}</div>
    </div>`);
};

export const edMarquee = () => {
  const items = ['ТОЛЬКО ОРИГИНАЛ', 'ВОЗВРАТ 14 ДНЕЙ', 'КУРЬЕР И ПВЗ ПО ВСЕЙ СТРАНЕ', 'РАННИЙ ДОСТУП К ДРОПАМ', 'ОТОБРАННЫЕ БРЕНДЫ'];
  const row = items.map((item) => `<span>${item}</span>`).join('');
  return `<div class="ed-marquee" role="region" aria-label="Только оригинал. Возврат 14 дней. Курьер и ПВЗ по всей стране. Ранний доступ к дропам. Отобранные бренды.">
    <div class="ed-marquee__track" aria-hidden="true"><div>${row}</div><div>${row}</div></div>
  </div>`;
};

export const edBrand = (o = {}) => hot('brand', o.state || 'concept', `
  <div class="ed-brand">
    <div class="ed-brand__name">${o.name}</div>
    <div class="ed-brand__note">${o.note}</div>
    <div class="ed-brand__meta">${o.meta}</div>
  </div>`);

export const BRANDS = [
  { n: '01', name: '12 STOREEZ', meta: 'российский · 168 вещей', note: 'Русский минимализм, который не повышает голос. Базовый гардероб с той посадкой, ради которой возвращаются за второй вещью.' },
  { n: '02', name: 'USHATÁVA', meta: 'российский · 74 вещи', note: 'Екатеринбург, сдержанная сила. Тяжёлые ткани и архитектурный крой — вещи, в которых чувствуешь себя собранным.' },
  { n: '03', name: 'COS', meta: 'премиум · 96 вещей', note: 'Скандинавская геометрия и объём. Тихая роскошь на ценнике, который не требует подвига.' },
  { n: '04', name: 'MAX MARA', meta: 'люкс · 214 вещей', note: 'Пальто, ради которого копят. Верблюжья шерсть и крой, не менявшийся сорок лет, — и не собирающийся.' },
  { n: '05', name: 'ARNY PRAHT', meta: 'российский · 52 вещи', note: 'Сумки, которые переживут три сезона и не выйдут из моды ни в один из них.' },
  { n: '06', name: 'MARC O’POLO', meta: 'премиум · 130 вещей', note: 'Северный кэжуал: лён, хлопок и ощущение, что вещь уже приняла вашу форму.' },
];

/* вещи из этой истории — образ, собранный редакцией */
export const LOOK = [
  ['MAX MARA', 'Пальто из шерсти и кашемира', '39 000 ₽', 'люкс'],
  ['COS', 'Водолазка мериносовая', '6 900 ₽', 'премиум'],
  ['12 STOREEZ', 'Брюки прямые', '14 200 ₽', 'российский'],
  ['ARNY PRAHT', 'Сумка Fold', '14 200 ₽', 'российский'],
];

export const slideProd = (o = {}) => {
  const { brand, name, price, tier = '', w = 0, ratio = [240, 320] } = o;
  return hot('pdp', 'default', `
    <div class="slide-prod"${w ? ` style="width:${w}px"` : ''}>
      ${edPh(ratio[0], ratio[1], '')}
      ${tier ? `<div class="slide-cap" style="margin-top:10px">${tier}</div>` : ''}
      <div class="slide-prod__brand">${brand}</div>
      <div class="slide-prod__name">${name}</div>
      <div class="slide-prod__price">${price}</div>
    </div>`);
};

/* Ось категорий. Бизнес укрупняет её сам, а не тянет из центрального каталога:
   в строке остаются четыре фокусные группы с широким и чистым ассортиментом,
   остальное уезжает под бургер — там ассортимент фрагментирован и строку рвёт. */
export const CATS = ['Женщины', 'Мужчины', 'Красота', 'Аксессуары'];
export const CATS_MORE = ['Электроника', 'Бытовая техника', 'Мебель', 'Текстиль', 'Посуда', 'Спорт'];

/* Остальные категории живут в двух видах сразу: на десктопе — продолжением
   строки за разделителем, на мобиле — под бургером. Разметка одна, режим
   переключает CSS: держать два набора данных дороже, чем два правила. */
export const catsRest = (tag = 'button') => `
  <span class="ed-cats__split" aria-hidden="true"></span>
  ${CATS_MORE.map((t) => `<${tag} class="ed-cat--sec w-hot" data-go="listing" data-state="default">${t}</${tag}>`).join('')}`;

export const catsMore = () => `
  <div class="ed-more__wrap">
    <button class="ed-more__btn" data-more aria-expanded="false" aria-label="Ещё категории">${ico('menu')}<b>Ещё</b></button>
    <div class="ed-more" data-more-panel hidden>
      ${CATS_MORE.map((t) => `<button class="ed-more__i w-hot" data-go="listing" data-state="default">${t}<i>›</i></button>`).join('')}
    </div>
  </div>`;

export const edHeader = (open = false, active = 0, desktop = false, showCats = true) => `
  <header class="ed-header">
    <div class="ed-header__bar">
      <div class="ed-logo w-hot" data-go="home" data-state="default" style="white-space:nowrap"><i></i>WB Бренды</div>
      ${desktop ? `<nav class="ed-topnav">${[
        ['Куратор', 'assistant', 'entry'],
        ['Лояльность', 'club', 'default'],
        ['Избранное', 'favorites', 'default'],
        ['Корзина · 2', 'cart', 'default'],
      ].map(([t, go, gs]) => `<button class="ed-topnav__i w-hot" data-go="${go}" data-state="${gs}">${t}</button>`).join('')}</nav>` : ''}
      <div class="w-row" style="gap:12px">
        <button class="ed-brandsbtn" data-go="brands-az" data-state="default">A–Z</button>
        ${desktop ? '' : `<div class="ed-icons">
          <button class="ed-ico w-hot w-hot--tight" data-go="search" data-state="suggest" aria-label="Поиск">${ico('search')}</button>
          <button class="ed-ico w-hot w-hot--tight" data-go="favorites" data-state="default" aria-label="Избранное">${ico('heart')}</button>
          <button class="ed-ico w-hot w-hot--tight" data-go="cart" data-state="default" aria-label="Корзина">${ico('bag')}</button>
        </div>`}
      </div>
    </div>
    ${showCats ? `<div class="ed-catbar">
      <nav class="ed-cats">
        ${CATS.map((t, i) => `
          <button class="ed-cat w-hot"${i === active ? ' data-on' : ''} data-go="home" data-state="${open ? 'default' : 'catalog'}">${t} <span style="opacity:.5">⌄</span></button>`).join('')}
        ${catsRest()}
      </nav>
      ${catsMore()}
    </div>` : ''}
  </header>`;

export const edCatalog = () => `
  <div class="ed-catalog">
    ${[['Одежда', ['Пальто и куртки', 'Платья', 'Трикотаж', 'Брюки', 'Костюмы']],
       ['Обувь и сумки', ['Ботинки', 'Кроссовки', 'Сумки', 'Аксессуары']],
       ['По подаче', ['Новинки', 'Дропы', 'Подборки стилиста', 'Аутлет']]].map(([t, items]) => `
      <div class="ed-catalog__col">
        <div class="ed-catalog__t">${t}</div>
        ${items.map((i) => `<span class="ed-catalog__i w-hot" data-go="listing" data-state="default">${i}</span>`).join('')}
      </div>`).join('')}
  </div>`;

export const edBottom = (active = 0) => `
  <nav class="ed-bottom">
    ${[['Главная', 'home', 'default', 'home'], ['Каталог', 'catalog', 'default', 'grid'],
       ['Бренды', 'brands-az', 'default', 'tag'], ['Журнал', 'journal', 'default', 'book'],
       ['Профиль', 'favorites', 'default', 'user']]
      .map(([t, go, gs, name], i) => `
        <div class="w-hot"${i === active ? ' data-on' : ''} data-go="${go}" data-state="${gs}">${ico(name)}${t}</div>`).join('')}
  </nav>`;

export const ico = (n) => {
  const d = {
    orig:     '<path d="M10 2.5 3.5 5v5c0 4 2.7 6.6 6.5 7.5 3.8-.9 6.5-3.5 6.5-7.5V5L10 2.5Z"/><path d="m7.2 9.8 2 2 3.6-3.8"/>',
    back:     '<path d="M3.4 8.2a7 7 0 1 1 .3 4.6"/><path d="M2.6 3.8v4.4h4.4"/>',
    delivery: '<path d="M2.5 6.6h8.2v7.2H2.5z"/><path d="M10.7 8.8h3.1l2.7 2.6v2.4h-5.8z"/><circle cx="5.6" cy="15.4" r="1.5"/><circle cx="13.4" cy="15.4" r="1.5"/>',
    drop:     '<circle cx="10" cy="11" r="6.4"/><path d="M10 7.8V11l2.2 1.4M7.6 2.6h4.8"/>',
    chat:     '<path d="M3 4.6h14v9.2h-7.4L5.4 17v-3.2H3z"/>',
    search:   '<circle cx="9" cy="9" r="5.4"/><path d="m13.2 13.2 3.4 3.4"/>',
    box:      '<path d="M2.8 6.4 10 3l7.2 3.4v7.2L10 17l-7.2-3.4z"/><path d="M2.8 6.4 10 9.9l7.2-3.5M10 9.9V17"/>',
    club:     '<path d="m10 2.6 2.3 4.7 5.1.7-3.7 3.6.9 5.1-4.6-2.4-4.6 2.4.9-5.1L2.6 8l5.1-.7z"/>',
    heart:    '<path d="M10 16.4c-.3 0-6.2-3.6-6.2-7.7A3.4 3.4 0 0 1 10 6.6a3.4 3.4 0 0 1 6.2 2.1c0 4.1-5.9 7.7-6.2 7.7Z"/>',
    bag:      '<path d="M4.6 6.4h10.8l.9 10.2H3.7z"/><path d="M7.4 8.4V5.9a2.6 2.6 0 0 1 5.2 0v2.5"/>',
    home:     '<path d="M3.4 8.6 10 3.2l6.6 5.4v8.2H3.4z"/><path d="M8 16.8v-4.6h4v4.6"/>',
    grid:     '<path d="M3.4 3.6h5.2v5.2H3.4zM11.4 3.6h5.2v5.2h-5.2zM3.4 11.4h5.2v5.2H3.4zM11.4 11.4h5.2v5.2h-5.2z"/>',
    menu:     '<path d="M3.6 6.2h12.8M3.6 10h12.8M3.6 13.8h12.8"/>',
    tag:      '<path d="M3.4 3.4h6l7.2 7.2-6 6L3.4 9.4z"/><circle cx="6.6" cy="6.6" r="1.1"/>',
    book:     '<path d="M3.6 4.2h5.2c.9 0 1.2.5 1.2 1.2v11c0-.7-.3-1.2-1.2-1.2H3.6z"/><path d="M16.4 4.2h-5.2c-.9 0-1.2.5-1.2 1.2v11c0-.7.3-1.2 1.2-1.2h5.2z"/>',
    user:     '<circle cx="10" cy="7" r="3"/><path d="M3.8 17c.6-3.1 3.1-5 6.2-5s5.6 1.9 6.2 5"/>',
  }[n] || '';
  return `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
};

/* УТП главной — по PRD: подлинность (К15), возврат без трений,
   курьер и ПВЗ по всей стране (К18), дропы и ранний доступ (К12).
   Премиум-ПВЗ сюда не выносится: он есть не везде (§11.6). */
/* входной билет: снимает барьер до того, как человек начал смотреть */
export const USP = [
  ['orig', 'Только оригинал', 'Документы и правообладатель проверены', 'Оригинал'],
  ['back', 'Возврат 14 дней', 'Без объяснения причин', 'Возврат 14 дней'],
  ['delivery', 'Курьер и ПВЗ', 'По всей стране, а не в двух столицах', 'Курьер и ПВЗ'],
];

/* причины вернуться: живут ниже, рядом с дропом и лояльностью */
export const USP_CLUB = [
  ['box', 'Сервис как в бутике', 'Премиальная упаковка везде. Доставка день в день — там, где доступна по адресу.'],
  ['club', 'Лояльность', 'Ранний доступ к дропам за сутки до общего старта и привилегии раздела.'],
  ['drop', 'Дропы', 'Капсулы и коллаборации по расписанию — с напоминанием, чтобы не пропустить.'],
];

/* свёрнутый ассистент: кнопка + окно по запросу */
export const edFab = () => `
  <div class="ed-dock">
    <button class="ed-fab w-hot" data-go="home" data-state="assistant">
      ${ico('chat')}<span>Куратор</span>
    </button>
  </div>`;

export const edChat = (desktop = false) => `
  <div class="ed-dock ed-dock--full">
  <div class="ed-chat${desktop ? ' ed-chat--d' : ''}">
    <div class="ed-chat__head">
      <div class="ed-logo" style="font-size:11px">${ico('chat')} Куратор</div>
      <span class="w-hot ed-chat__close" data-go="home" data-state="default">Свернуть ✕</span>
    </div>
    <div class="ed-chat__body">
      <div class="ed-chat__msg ed-chat__msg--me">Нужно тёплое пальто на осень, не чёрное</div>
      <div class="ed-chat__msg">
        Собрала четыре длинных пальто спокойных оттенков — камель, серый, оливковый.
        Взяла свободный силуэт: вы смотрели вещи этой посадки последние две недели.
      </div>
      <div class="ed-chat__rail">
        ${[['MAX MARA', '39 000 ₽'], ['COS', '21 300 ₽'], ['12 STOREEZ', '27 800 ₽']]
          .map(([b, pr]) => `<div class="w-hot" data-go="pdp" data-state="default" style="width:104px">
            ${edPh(200, 250, '')}<div class="ed-p__brand" style="margin-top:8px">${b}</div><div class="ed-p__price">${pr}</div></div>`).join('')}
      </div>
      <div class="ed-chat__quick">
        ${['Дороже', 'Другой цвет', 'Не мой силуэт'].map((t) => `<span>${t}</span>`).join('')}
      </div>
    </div>
    <div class="ed-chat__input">Написать куратору…</div>
  </div>
  </div>`;


export const hot = (go, state, html, cls = '') =>
  `<div class="w-hot ${cls}" data-go="${go}"${state ? ` data-state="${state}"` : ''}>${html}</div>`;

export const bars = (n = 3, w = ['', '--85', '--60']) =>
  Array.from({ length: n }, (_, i) => `<div class="w-bar w-bar--sm ${w[i % w.length] ? 'w-bar' + w[i % w.length] : ''}"></div>`).join('');

export const chip = (t, on = false) => `<span class="w-chip${on ? ' w-chip--on' : ''}">${t}</span>`;
export const badge = (t, mod = '') => `<span class="w-badge${mod ? ' w-badge--' + mod : ''}">${t}</span>`;
export const btn = (t, mod = '') => `<div class="w-btn${mod ? ' w-btn--' + mod : ''}">${t}</div>`;
export const icon = (t = '') => `<i class="w-icon">${t}</i>`;

export const rule = () => '<div class="w-rule"></div>';

export const secHead = (title, link = 'Все') => `
  <div class="w-row w-row--between" style="margin-bottom:12px">
    <h2 class="w-h2">${title}</h2>
    ${link ? `<span class="w-tsm">${link} →</span>` : ''}
  </div>`;

/** карточка товара: бренд первым, промо приглушено */
export const pcard = (o = {}) => {
  const {
    brand = 'TOMMY HILFIGER', name = 'Пальто из шерсти', price = '24 990 ₽',
    old = '', ratio = [300, 400], tag = '', badges = [], tier = '',
    swatches = 3, go = 'pdp', state = 'default', note = '',
  } = o;
  return hot(go, state, `
    <div class="w-card">
      <div style="position:relative">
        ${ph(ratio[0], ratio[1], tag)}
        ${badges.length ? `<div style="position:absolute;left:8px;bottom:8px;display:flex;gap:4px;flex-wrap:wrap">${badges.map((b) => badge(b[0], b[1] || '')).join('')}</div>` : ''}
        <div style="position:absolute;right:8px;top:8px;width:22px;height:22px;border:1px solid var(--w-line-strong);border-radius:50%;background:rgba(255,255,255,.85)"></div>
      </div>
      <div class="w-card__meta">
        <div class="w-row" style="gap:6px">
          <span class="w-brand">${brand}</span>
          ${tier ? badge(tier, 'tier') : ''}
        </div>
        <div class="w-tsm" style="margin:2px 0 5px">${name}</div>
        <div class="w-card__row">
          <span class="w-price">${price}${old ? `<span class="w-price-old">${old}</span>` : ''}</span>
          <span class="w-tsm w-dim">4,8 · 214</span>
        </div>
        ${note ? `<div class="w-tsm w-dim" style="margin-top:4px">${note}</div>` : ''}
        ${swatches ? `<div class="w-swatches">${'<i></i>'.repeat(swatches)}</div>` : ''}
      </div>
    </div>`);
};

export const shelf = (cards, w = 148) =>
  `<div class="w-scroller">${cards.map((c) => `<div style="width:${w}px">${c}</div>`).join('')}</div>`;

/** хедер раздела — собственная идентика, не шапка WB */
export const header = (o = {}) => {
  const { title = '', tabs = null, back = false, sub = '' } = o;
  return `
  <header class="w-header">
    <div class="w-header__bar">
      <div class="w-row" style="gap:10px">
        ${back ? icon('‹') : ''}
        ${title
          ? `<div><div class="w-h3">${title}</div>${sub ? `<div class="w-tsm w-dim">${sub}</div>` : ''}</div>`
          : `<div class="w-logo">WB <b>БРЕНДЫ</b></div>`}
      </div>
      <div class="w-row" style="gap:8px">${icon('⌕')}${icon('♡')}${icon('⌂')}</div>
    </div>
    ${tabs ? `<div class="w-tabs">${tabs.map((t, i) => `<span${i === 0 ? ' data-on' : ''}>${t}</span>`).join('')}</div>` : ''}
  </header>`;
};

export const bottomnav = (active = 0) => {
  const items = ['Главная', 'Каталог', 'Бренды', 'Журнал', 'Избранное'];
  return `<nav class="w-bottomnav">${items
    .map((t, i) => `<div${i === active ? ' data-on' : ''}><i></i>${t}</div>`)
    .join('')}</nav>`;
};

export const stickyCta = (html) => `<div class="w-sticky-cta">${html}</div>`;

/** блок ассистента: объяснение причины — обязательный элемент */
export const explained = (o = {}) => {
  const { reason = 'Спокойные оттенки и свободный силуэт — вы как раз такие вещи и смотрели.', cards = 3 } = o;
  return `
  <div class="w-note w-note--ai" style="margin:0 16px 12px">
    <div class="w-row" style="gap:8px;align-items:flex-start">
      <i style="width:20px;height:20px;border:1px solid var(--w-ink);border-radius:50%;flex:0 0 auto"></i>
      <div>
        <div class="w-eyebrow" style="margin-bottom:4px">Куратор</div>
        <div style="font-size:12.5px;color:var(--w-ink)">${reason}</div>
      </div>
    </div>
  </div>
  ${shelf(Array.from({ length: cards }, (_, i) =>
    pcard({ brand: ['MAX MARA', 'COS', 'ARNY PRAHT'][i % 3], name: 'Пальто прямого кроя', price: '18 900 ₽', tag: 'образ', swatches: 2 })), 142)}
  <div class="w-row" style="gap:8px;padding:12px 16px">
    <div style="flex:1">${btn('Показать ещё', 'ghost')}</div>
    <div style="flex:1">${btn('Не подходит — другое', 'ghost')}</div>
  </div>`;
};

/* ============================================================
   МОБИЛЬНЫЕ ЭКРАНЫ
   ============================================================ */

export const MOBILE = {

  /* 01 · поиск внутри раздела — визуальная версия */
  search: (st) => {
    const field = (q) => `
      <div style="position:sticky;top:0;z-index:25;background:#fff;border-bottom:1px solid var(--e-line);padding:12px 20px">
        <div class="w-row" style="gap:10px">
          <span class="w-hot w-hot--tight" data-go="home" data-state="default" style="font-size:17px">‹</span>
          <div class="ed-field" style="flex:1">${ico('search')}<span style="color:${q ? 'var(--e-ink)' : 'var(--e-mute)'}">${q || 'Бренд, вещь или материал'}</span></div>
          <button class="ed-ico w-hot w-hot--tight" data-go="cart" data-state="default" aria-label="Корзина">${ico('bag')}</button>
        </div>
      </div>`;

    if (st === 'empty') {
      return `<div class="ed">${field('пальтоо оверсайc')}
        <div class="ed-empty" style="padding-bottom:30px">
          ${pin(3)}
          <div class="ed-empty__t">Ничего не нашлось</div>
          <p class="ed-empty__d">Возможно, вы имели в виду <b style="color:var(--e-ink);border-bottom:1px solid var(--e-ink)">пальто оверсайз</b></p>
        </div>
        <section class="ed-sec--tight" style="border-top:1px solid var(--e-line);padding-bottom:12px">
          <div class="ed-head" style="padding:0"><h2 class="ed-h2">Похоже на то, что вы искали</h2></div>
        </section>
        <div class="ed-rail">
          ${[['COS', 'Пальто-кокон', '21 300 ₽'], ['MAX MARA', 'Пальто прямое', '39 000 ₽'], ['12 STOREEZ', 'Пальто оверсайз', '27 800 ₽']]
            .map(([b, n, pr]) => edP({ brand: b, name: n, price: pr, w: 150 })).join('')}
        </div>
        <section class="ed-sec--tight" style="padding-top:26px">
          ${pin(2)}
          ${hot('assistant', 'entry', `<div class="ed-value__i" style="border:1px solid var(--e-line);padding:14px"><span class="ed-usp__ico">${ico('chat')}</span><div><div class="ed-value__t">Описать словами</div><div class="ed-value__d">Куратор найдёт по описанию, даже если не знаете названия</div></div></div>`)}
        </section>
        ${edBottom(1)}
      </div>`;
    }

    if (st === 'results') {
      return `<div class="ed">${field('пальто')}
        <div class="ed-bar">
          <div class="ed-bar__row">${['Всё · 412', 'Бренды · 6', 'Вещи · 398', 'Журнал · 8'].map((t, i) => `<span class="ed-chip"${i === 0 ? ' data-on' : ''}>${t}</span>`).join('')}</div>
        </div>

        <section class="ed-sec--tight">
          ${pin(1)}
          <div class="ed-label ed-label--mute" style="margin-bottom:14px">Бренды</div>
          <div style="display:grid;gap:14px">
            ${[['MAX MARA', 'люкс · 214 вещей', 'default'], ['12 STOREEZ', 'российский · 168 вещей', 'concept']]
              .map(([b, d, gs]) => hot('brand', gs, `
                <div class="w-row" style="gap:14px;align-items:center">
                  <div style="width:56px;flex:0 0 auto">${edPh(100, 100, '')}</div>
                  <div><div class="ed-p__brand" style="margin-top:0">${b}</div><div class="ed-p__name">${d}</div></div>
                  <span style="margin-left:auto">›</span>
                </div>`)).join('')}
          </div>
        </section>

        <section class="ed-sec--tight" style="padding-top:8px;padding-bottom:8px">
          <div class="ed-label ed-label--mute">Вещи</div>
        </section>
        <div class="ed-grid" style="padding-top:8px">
          ${[['MAX MARA', 'Пальто из шерсти', '39 000 ₽'], ['COS', 'Пальто-кокон', '21 300 ₽']]
            .map(([b, n, pr]) => hot('pdp', 'default', `<div class="ed-p">${edPh(300, 380, '')}<div class="ed-p__brand">${b}</div><div class="ed-p__name">${n}</div><div class="ed-p__price">${pr}</div></div>`)).join('')}
        </div>

        <section class="ed-sec--tight" style="padding-top:8px">
          <div class="ed-label ed-label--mute" style="margin-bottom:14px">Журнал</div>
          ${hot('journal', 'article', `
          <div class="w-row" style="gap:14px;align-items:center">
            <div style="width:96px;flex:0 0 auto">${edPh(160, 120, '')}</div>
            <div><div class="chat-art__k">Гид · 6 минут</div><div class="chat-art__t">Пальто, которое переживёт сезон</div></div>
          </div>`)}
        </section>
        ${edBottom(1)}
      </div>`;
    }

    return `<div class="ed">${field('')}
      <section class="ed-sec--tight">
        <div class="ed-label ed-label--mute" style="margin-bottom:12px">Ищут сейчас</div>
        <div class="w-row w-row--chips" style="gap:8px">
          ${['пальто оверсайз', 'локальные марки', 'Max Mara', 'дроп недели', 'аутлет обувь'].map((t) => hot('search', 'results', `<span class="ed-chip">${t}</span>`)).join('')}
        </div>
      </section>
      <section class="ed-sec--tight" style="padding-top:8px">
        <div class="ed-label ed-label--mute" style="margin-bottom:14px">Бренды</div>
        <div class="ed-rows">
          ${[['MAX MARA', 'люкс'], ['MARC O’POLO', 'премиум'], ['12 STOREEZ', 'российский']]
            .map(([b, t]) => `<div class="ed-rows__i w-hot" data-go="brand" data-state="default"><span style="font-weight:500">${b}</span><span>${t}</span></div>`).join('')}
        </div>
      </section>
      <section class="ed-sec--tight">
        ${pin(2)}
        ${hot('assistant', 'entry', `<div class="ed-value__i" style="border:1px solid var(--e-line);padding:14px"><span class="ed-usp__ico">${ico('chat')}</span><div><div class="ed-value__t">Не знаете, с чего начать?</div><div class="ed-value__d">Опишите словами, куратор найдёт</div></div></div>`)}
      </section>
      ${edBottom(1)}
    </div>`;
  },

  /* 02 · главная витрины — визуальная версия */
  home: (st) => {
    if (st === 'loading') {
      return `<div class="ed">
        ${edHeader()}
        <div class="w-skel" style="height:520px"></div>
        <div class="ed-sec"><div class="w-skel" style="height:14px;width:40%"></div><div class="w-skel" style="height:30px;width:75%;margin-top:14px"></div></div>
        <div class="ed-rail">${[1, 2, 3].map(() => `<div style="width:158px"><div class="w-skel" style="height:200px"></div><div class="w-skel" style="height:11px;margin-top:12px"></div><div class="w-skel" style="height:11px;width:60%;margin-top:6px"></div></div>`).join('')}</div>
      </div>`;
    }

    const catalogOpen = st === 'catalog';
    const chatOpen = st === 'assistant';
    const hasDrop = st !== 'nodrop';

    const rail = (items, w = 158) => `<div class="ed-rail">${items.map(([b, n, pr]) => edP({ brand: b, name: n, price: pr, w })).join('')}</div>`;
    const head = (title, link, go, gs, sub = '') => `
      <section class="ed-sec--tight">
        <div class="ed-head" style="padding:0">
          <div>
            <h2 class="ed-h2">${title}</h2>
            ${sub ? `<p class="ed-sm" style="margin-top:6px;max-width:44ch">${sub}</p>` : ''}
          </div>
          ${link ? hot(go, gs, `<span class="ed-link">${link}</span>`) : ''}
        </div>
      </section>`;

    return `<div class="ed">
      ${chatOpen ? `<div class="ed-scrim w-hot" data-go="home" data-state="default"></div>${edChat()}` : (st === 'no-ai' ? '' : edFab())}
      ${pin(1)}
      ${edHeader(catalogOpen)}
      ${catalogOpen ? edCatalog() : ''}

      <!-- 1. кампания: понять, что это отдельное место -->
      ${hot('slide-journal', 'cover', `
      <div class="ed-hero">
        ${pin(2)}
        ${edPh(390, 560, '', 'campaign', 'editorial-06', '52% center')}
        <div class="ed-hero__copy ed-hero__copy--dark">
          <div class="ed-label" style="margin-bottom:10px">Кампания недели</div>
          <h1 class="ed-h1">Спокойный<br>объём</h1>
          <p class="ed-t" style="margin-top:10px;max-width:250px">Двенадцать вещей, которые задают силуэт сезона</p>
        </div>
        <div class="ed-progress ed-progress--dark">${[0, 1, 2, 3].map((i) => `<i${i === 0 ? ' data-on' : ''}></i>`).join('')}</div>
        <div class="ed-hero__tab">Смотреть <span>›</span></div>
      </div>`)}
      ${edMarquee()}

      <!-- 2. объяснённая подборка: Aha Moment сразу после входа -->
      ${st === 'no-ai'
        ? `${head('Выбор редакции', 'Ещё', 'journal', 'default', 'Куратор скоро вернётся. Пока — то, что редакция выбрала на этой неделе.')}${pin(9)}`
        : `${head('Собрано для вас', 'Ещё', 'assistant', 'set', 'Спокойные оттенки и свободный силуэт — вы как раз такие вещи и смотрели.')}${pin(9)}`}
      ${rail([['MAX MARA', 'Пальто камель', '39 000 ₽'], ['COS', 'Пальто-кокон', '21 300 ₽'], ['MARC O’POLO', 'Тренч', '24 000 ₽'], ['12 STOREEZ', 'Жакет', '17 400 ₽']], 150)}

      <!-- 4. повод именно сегодня -->
      ${hasDrop ? hot('drop', 'before', `
      <section class="ed-drop">
        ${pin(5)}
        <div>
          <div class="ed-label" style="color:rgba(255,255,255,.6);margin-bottom:12px">Дроп · 14 ноября, 12:00</div>
          <div class="ed-h2" style="color:#fff">USHATÁVA × WB</div>
          <p class="ed-t" style="color:rgba(255,255,255,.72);margin-top:8px">Капсула из восьми вещей. Ранний доступ для участников программы за 24 часа до общего старта.</p>
        </div>
        <div>
          <div class="ed-label" style="color:rgba(255,255,255,.6);margin-bottom:8px">До старта</div>
          <div class="ed-drop__timer">01 : 22 : 40</div>
          <div class="ed-drop__cta" style="margin-top:16px">Напомнить</div>
        </div>
      </section>`) : `<div style="margin-top:6px">${pin(5)}</div>`}

      <!-- 5. за брендами сюда и приходят -->
      ${head('Кого мы отобрали', 'Все бренды', 'brands-az', 'default')}
      <div class="ed-rail" style="align-items:stretch">${BRANDS.map((b) => edBrand(b)).join('')}</div>
      ${pin(4)}

      <!-- 6. пространство бренда внутри выдачи -->
      <section class="ed-sec--flush" style="padding-top:40px">
        ${pin(6)}
        <div class="ed-sis__head">
          <div class="ed-sis__brand"><i></i>MARC O’POLO</div>
          ${hot('sis', 'custom', `<span class="ed-link">В магазин</span>`)}
        </div>
        ${hot('sis', 'custom', `
        <div class="ed-hero" style="margin-bottom:16px">
          ${edPh(390, 300, '', 'sis', 'banner-15', '68% center')}
          <div class="ed-hero__tab" style="padding:12px 18px;font-size:10px">Смотреть <span>›</span></div>
        </div>`)}
        ${rail([['MARC O’POLO', 'Куртка замшевая', '38 900 ₽'], ['MARC O’POLO', 'Футболка', '4 200 ₽'], ['MARC O’POLO', 'Кепка', '3 400 ₽'], ['MARC O’POLO', 'Джинсы', '9 800 ₽']], 150)}
      </section>

      <!-- 7. новинки: одна полка вместо двух -->
      ${head('Новое на этой неделе', 'Все 214', 'listing', 'default')}
      ${rail([['USHATÁVA', 'Пальто-халат', '46 000 ₽'], ['ARNY PRAHT', 'Сумка Fold', '14 200 ₽'], ['LIME', 'Джемпер', '5 900 ₽'], ['BOSS', 'Пиджак', '54 000 ₽'], ['COS', 'Ботинки', '19 900 ₽']])}

      <!-- 8. журнал -->
      ${head('Журнал', 'Все материалы', 'journal', 'default')}
      ${pin(7)}
      <div class="ed-rail" style="padding-bottom:34px">
        ${[['Интервью', '29 июл', 'РАБОТА КАК ЛЮБОВЬ: РАЗГОВОР С 12 STOREEZ'], ['Гид', '26 июл', 'ПАЛЬТО, КОТОРОЕ ПЕРЕЖИВЁТ СЕЗОН'], ['Тренд', '22 июл', 'ТИХИЙ ЛЮКС ПО-РУССКИ']]
          .map(([k, d, t]) => hot('journal', 'article', `
            <div style="width:250px">
              ${edPh(250, 300, '')}
              <div class="w-row" style="gap:10px;margin-top:14px;align-items:center"><span class="ed-art__tag">${k}</span><span class="ed-art__date">${d}</span></div>
              <div class="ed-art__t">${t}</div>
            </div>`)).join('')}
      </div>

      <!-- 9. смена ритма: категория во весь экран -->
      ${hot('listing', 'default', `
      <section class="ed-life">
        ${pin(8)}
        ${edPh(390, 500, '', 'lifestyle', 'banner-lifestyle-mobile', 'center')}
        <div class="ed-life__copy">
          <div class="ed-label" style="margin-bottom:10px">Категория</div>
          <div class="ed-h1">Дом и вещи</div>
          <div class="ed-link" style="display:inline-block;margin-top:16px">Смотреть</div>
        </div>
      </section>`)}

      <!-- 10. второй бренд — другим форматом, без повтора первого -->
      <section class="ed-sec--flush" style="padding-top:34px">
        ${pin(6)}
        ${hot('sis', 'default', `
        <div class="ed-sec--tight" style="padding-bottom:14px">
          <div class="ed-head" style="padding:0">
            <div>
              <div class="ed-label ed-label--mute" style="margin-bottom:6px">Пространство бренда</div>
              <h2 class="ed-h2">12 STOREEZ</h2>
            </div>
            <span class="ed-link">В магазин</span>
          </div>
        </div>`)}
        ${rail([['12 STOREEZ', 'Пальто', '27 800 ₽'], ['12 STOREEZ', 'Костюм', '31 400 ₽'], ['12 STOREEZ', 'Рубашка', '8 900 ₽'], ['12 STOREEZ', 'Ботинки', '19 200 ₽']], 150)}
      </section>

      <!-- 11. вторая точка входа в редакцию -->
      ${hot('slide-journal', 'cover', `
      <section class="ed-sec--flush" style="padding-top:34px">
        ${pin(7)}
        <div style="padding:0 20px 16px"><span class="ed-label ed-label--mute">Слайд-журнал · 6 слайдов</span></div>
        <div class="ed-hero">
          ${edPh(390, 420, '')}
          <div class="ed-hero__copy ed-hero__copy--dark">
            <div class="ed-h2">Как носить объём,<br>чтобы он не носил вас</div>
          </div>
          <div class="ed-hero__tab" style="padding:12px 18px;font-size:10px">Открыть <span>›</span></div>
        </div>
      </section>`)}

      <!-- 12. причины вернуться -->
      <section class="ed-sec--tight" style="padding-top:34px">
        ${pin(11)}
        <div class="ed-head" style="padding:0"><h2 class="ed-h2">Что здесь ещё</h2></div>
        <div class="ed-value">
          ${USP_CLUB.map(([i, t, d], k) => `
            <div class="ed-value__i${k === 1 ? ' w-hot' : ''}"${k === 1 ? ' data-go="club" data-state="default"' : ''}>
              <span class="ed-usp__ico">${ico(i)}</span>
              <div>
                <div class="ed-value__t">${t}</div>
                <div class="ed-value__d">${d}</div>
              </div>
            </div>`).join('')}
        </div>
      </section>

      <!-- 13. аутлет: отдельный вход в конце -->
      ${hot('outlet', 'default', `
      <section class="ed-sec" style="background:var(--e-soft);margin-top:34px">
        ${pin(10)}
        <div class="ed-label" style="margin-bottom:12px">Аутлет</div>
        <h2 class="ed-h1" style="font-size:30px">Прошлые коллекции<br>тех же брендов</h2>
        <p class="ed-t" style="margin-top:12px;max-width:280px">Оригинал из коллекции прошлого сезона. Это единственная причина цены — и мы говорим об этом прямо.</p>
        <div class="ed-link" style="display:inline-block;margin-top:18px">Перейти</div>
      </section>`)}

      ${edBottom(0)}
    </div>`;
  },

  /* 03 · каталог и категории — визуальная версия */
  catalog: (st) => {
    const item = (t, note = '', go = 'listing', gs = 'default', mod = '') => `
      <div class="ed-catlist__i${mod ? ' ed-catlist__i--' + mod : ''} w-hot" data-go="${go}" data-state="${gs}">
        <span>${t}${note ? `<span class="ed-catlist__note"> · ${note}</span>` : ''}</span>
        <span>›</span>
      </div>`;

    if (st === 'l2') {
      return `<div class="ed">
        <header class="ed-header">
          <div class="ed-header__bar">
            <div class="w-row" style="gap:12px">
              <span class="w-hot" data-go="catalog" data-state="default" style="font-size:17px">‹</span>
              <div class="ed-logo" style="letter-spacing:.1em">Одежда</div>
            </div>
            <div class="ed-icons">
            <button class="ed-ico w-hot w-hot--tight" data-go="search" data-state="suggest" aria-label="Поиск">${ico('search')}</button>
            <button class="ed-ico w-hot w-hot--tight" data-go="cart" data-state="default" aria-label="Корзина">${ico('bag')}</button>
          </div>
          </div>
        </header>

        ${pin(4)}
        ${hot('listing', 'default', `
        <div class="ed-hero">
          ${edPh(390, 300, '')}
          <div class="ed-hero__copy ed-hero__copy--dark">
            <div class="ed-label" style="margin-bottom:8px">Женщины · осень</div>
            <div class="ed-h2">Пальто и куртки</div>
          </div>
          <div class="ed-hero__tab" style="padding:12px 18px;font-size:10px">Смотреть <span>›</span></div>
        </div>`)}

        <section class="ed-sec--tight">
          <div class="ed-catlist" style="padding:0">
            ${['Пальто и куртки', 'Платья', 'Трикотаж', 'Рубашки и блузы', 'Брюки', 'Джинсы', 'Костюмы', 'Юбки', 'Базовые футболки']
              .map((t) => item(t)).join('')}
          </div>
        </section>

        <section class="ed-sec--tight" style="padding-top:0">
          ${hot('listing', 'default', `<div class="ed-drop__cta" style="border-color:var(--e-ink);color:var(--e-ink)">Смотреть всю одежду · 2 480</div>`)}
        </section>

        ${edBottom(1)}
      </div>`;
    }

    return `<div class="ed">
      ${edFab()}
      ${edHeader(false, 0, false, false)}

      <section class="ed-sec--tight" style="padding-bottom:14px">
        ${pin(1)}
        <h1 class="ed-h1" style="font-size:30px;margin-bottom:16px">Каталог</h1>
        ${hot('search', 'suggest', `<div class="ed-field">${ico('search')}<span>Поиск по брендам и вещам</span></div>`)}
      </section>

      <div class="ed-catbar">
        <nav class="ed-tabs">
          ${pin(2)}
          ${CATS.map((t, i) => `<span class="w-hot" data-go="listing" data-state="default"${i === 0 ? ' data-on' : ''}>${t}</span>`).join('')}
          ${catsRest('span')}
        </nav>
        ${catsMore()}
      </div>

      <!-- кампании категории -->
      <section class="ed-sec--flush" style="padding:20px 0 6px">
        ${pin(3)}
        <div class="ed-rail">
          ${[['Новое', 'Спокойный объём'], ['Дроп', 'USHATÁVA × WB']].map(([k, t], i) => hot(i ? 'drop' : 'slide-journal', i ? 'before' : 'cover', `
            <div style="width:250px">
              <div class="ed-hero">
                ${edPh(250, 150, '')}
                <div class="ed-hero__copy ed-hero__copy--dark" style="left:14px;right:14px;bottom:14px">
                  <div class="ed-label" style="margin-bottom:4px;font-size:9px">${k}</div>
                  <div class="ed-h3">${t}</div>
                </div>
              </div>
            </div>`)).join('')}
        </div>
      </section>

      <!-- плоский список категорий -->
      <section class="ed-sec--tight">
        ${pin(4)}
        <div class="ed-catlist" style="padding:0">
          ${item('Новинки', 'за неделю', 'listing', 'default', 'accent')}
          ${item('Дропы', 'ближайший через 2 дня', 'drop', 'before', 'accent')}
          ${item('Все бренды A–Z', '640 брендов', 'brands-az', 'default', 'accent')}
          ${item('Одежда', '', 'catalog', 'l2')}
          ${item('Обувь', '', 'catalog', 'l2')}
          ${item('Сумки и аксессуары', '', 'catalog', 'l2')}
          ${item('Украшения', '', 'catalog', 'l2')}
          ${item('Красота', '', 'catalog', 'l2')}
          ${item('Дом и вещи', '', 'catalog', 'l2')}
          ${item('Спорт', '', 'catalog', 'l2')}
          ${item('Аутлет', 'прошлые коллекции', 'outlet', 'default', 'muted')}
        </div>
      </section>

      <div style="border-top:1px solid var(--e-line);margin-top:10px">${pin(5)}</div>
      ${edBottom(1)}
    </div>`;
  },

  /* 04 · бренды A–Z — визуальная версия */
  'brands-az': (st) => `<div class="ed">
    <header class="ed-header">
      <div class="ed-header__bar">
        <div class="w-row" style="gap:12px">
          <span class="w-hot w-hot--tight" data-go="home" data-state="default" style="font-size:17px">‹</span>
          <div class="ed-logo" style="font-size:13px;letter-spacing:.1em">Бренды</div>
        </div>
        <div class="ed-icons">
            <button class="ed-ico w-hot w-hot--tight" data-go="cart" data-state="default" aria-label="Корзина">${ico('bag')}</button>
          </div>
      </div>
    </header>

    <section class="ed-sec--tight" style="padding-bottom:14px">
      <h1 class="ed-h1" style="font-size:28px;margin-bottom:12px">640 брендов</h1>
      ${pin(2)}
      <div class="w-row w-row--chips" style="gap:8px">
        ${[['Все', st !== 'tier'], ['Популярные', 0], ['Премиум', st === 'tier'], ['Люкс', 0], ['Российские', 0]]
          .map(([t, on]) => `<span class="ed-chip"${on ? ' data-on' : ''}>${t}</span>`).join('')}
      </div>
    </section>

    <div style="position:sticky;top:0;z-index:20;background:var(--e-soft);padding:10px 20px;border-top:1px solid var(--e-line);border-bottom:1px solid var(--e-line)">
      ${pin(1)}
      <div class="w-row" style="gap:12px;overflow-x:auto;font-size:11px;color:var(--e-mute);scrollbar-width:none">
        ${'ABCDEFGHIJKLM'.split('').map((l) => `<span>${l}</span>`).join('')}
      </div>
    </div>

    ${['A', 'B'].map((letter) => `
      <section class="ed-sec--tight">
        <div class="ed-h2" style="margin-bottom:12px">${letter}</div>
        <div class="ed-rows">
          ${(letter === 'A'
              ? [['ACNE STUDIOS', 'премиум · 120'], ['ARNY PRAHT', 'российский · 52'], ['ADIDAS ORIGINALS', 'популярные · 340']]
              : [['BEFREE', 'популярные · 210'], ['BOSS', 'премиум · 180'], ['BALENCIAGA', 'люкс · 64']])
            .map(([b, d], i) => `
              <div class="ed-rows__i w-hot" data-go="brand" data-state="${i === 2 ? 'default' : 'concept'}">
                <span><span style="font-weight:500;letter-spacing:.02em">${b}</span><span class="ed-catlist__note" style="display:block;margin-top:2px">${d}</span></span>
                <span>${pin(3)}следить</span>
              </div>`).join('')}
        </div>
      </section>`).join('')}

    ${edBottom(2)}
  </div>`,

  /* 05 · категорийный листинг — визуальная версия */
  listing: (st) => {
    const head = () => `
      <header class="ed-header">
        <div class="ed-header__bar">
          <div class="w-row" style="gap:12px">
            <span class="w-hot" data-go="catalog" data-state="l2" style="font-size:17px">‹</span>
            <div class="ed-logo" style="letter-spacing:.1em;font-size:13px">Пальто и куртки</div>
          </div>
          <div class="ed-icons">
            <button class="ed-ico w-hot w-hot--tight" data-go="search" data-state="suggest" aria-label="Поиск">${ico('search')}</button>
            <button class="ed-ico w-hot w-hot--tight" data-go="cart" data-state="default" aria-label="Корзина">${ico('bag')}</button>
          </div>
        </div>
      </header>`;

    const bar = (filtersOn = false) => `
      <div class="ed-bar">
        ${pin(2)}
        <div class="ed-bar__row">
          ${hot('listing', 'filters', `<span class="ed-chip"${filtersOn ? ' data-on' : ''}>Фильтры ⌄</span>`)}
          ${['Новинки', 'Премиум', 'Шерсть', '44–46', 'Кросс-бордер'].map((t) => `<span class="ed-chip">${t}</span>`).join('')}
        </div>
        <div class="ed-bar__meta">
          <span>412 вещей</span>
          <div class="w-row" style="gap:14px">
            <span>Сначала новинки ⌄</span>
            <div class="ed-density">${[0, 1, 2].map((i) => `<i${i === 1 ? ' data-on' : ''}></i>`).join('')}</div>
          </div>
        </div>
      </div>`;

    const items = [
      ['MAX MARA', 'Пальто из шерсти', '39 000 ₽', 'премиум'],
      ['COS', 'Пальто-кокон', '21 300 ₽', 'премиум'],
      ['12 STOREEZ', 'Пальто оверсайз', '27 800 ₽', 'российский'],
      ['MARC O’POLO', 'Тренч из хлопка', '24 000 ₽', 'премиум'],
      ['BOSS', 'Пальто двубортное', '54 000 ₽', 'премиум'],
      ['LIME', 'Пальто прямое', '12 900 ₽', 'российский'],
    ];

    const grid = (from, to) => `
      <div class="ed-grid">
        ${items.slice(from, to).map(([b, n, pr]) => edP({ brand: b, name: n, price: pr, w: 0, ratio: [300, 380] })).join('')}
      </div>`;

    if (st === 'filters') {
      return `<div class="ed" style="position:relative;min-height:844px">
        ${head()}${bar(true)}${grid(0, 2)}
        <div class="ed-scrim"></div>
        <div class="ed-sheet">
          <div class="ed-sheet__grip"></div>
          <div class="ed-sheet__head">
            <div class="ed-h3">Фильтры</div>
            <span class="w-hot ed-sm" data-go="listing" data-state="default">Сбросить</span>
          </div>
          <div class="ed-sheet__body">
            ${pin(6)}
            <div class="ed-rows">
              ${[['Бренд', '640'], ['Тир бренда', 'популярные · премиум · люкс · российские'], ['Размер', '32 значения'], ['Цвет', '18'],
                 ['Цена', '2 400 – 180 000 ₽'], ['Состояние', 'новая коллекция · аутлет'], ['Материал', '14'], ['Доставка', 'сегодня · 2 дня']]
                .map(([t, v]) => `<div class="ed-rows__i"><span>${t}</span><span>${v} ›</span></div>`).join('')}
            </div>
          </div>
          <div class="ed-buy">${hot('listing', 'default', `<div class="ed-btn">Показать 412 вещей</div>`)}</div>
        </div>
      </div>`;
    }

    if (st === 'loading') {
      return `<div class="ed">${head()}${bar()}
        <div class="ed-grid">
          ${Array.from({ length: 6 }, () => `<div><div class="w-skel" style="aspect-ratio:300/380"></div><div class="w-skel" style="height:11px;margin-top:12px"></div><div class="w-skel" style="height:11px;width:55%;margin-top:7px"></div></div>`).join('')}
        </div>
      </div>`;
    }

    if (st === 'empty') {
      return `<div class="ed">${head()}
        <div class="ed-bar"><div class="ed-bar__row">${[['Премиум', 1], ['44–46', 1], ['до 10 000 ₽', 1]].map(([t]) => `<span class="ed-chip" data-on>${t} ✕</span>`).join('')}</div></div>
        <div class="ed-empty">
          <div class="ed-empty__t">Под эти фильтры<br>ничего нет</div>
          <p class="ed-empty__d">Премиум-брендов в этой цене не бывает. Снимите ограничение по цене — или посмотрите те же марки в аутлете.</p>
          <div style="display:grid;gap:10px;max-width:260px;margin:0 auto">
            ${hot('listing', 'default', `<div class="ed-btn ed-btn--ghost">Снять фильтр по цене</div>`)}
            ${hot('outlet', 'default', `<div class="ed-btn">Смотреть в аутлете</div>`)}
          </div>
        </div>
        ${edBottom(1)}
      </div>`;
    }

    return `<div class="ed">
      ${edFab()}
      ${head()}
      <section class="ed-sec--tight" style="padding-bottom:16px">
        ${pin(1)}
        <div class="ed-sm" style="margin-bottom:10px">Женщины / Одежда</div>
        <h1 class="ed-h1" style="font-size:28px;margin-bottom:10px">Пальто и куртки</h1>
        <p class="ed-t" style="color:var(--e-mute);max-width:44ch">Силуэт сезона — свободный и длинный. Собрали то, что держит форму: шерсть, кашемир, плотный твил.</p>
      </section>
      ${bar()}
      ${pin(3)}
      ${grid(0, 4)}

      ${hot('journal', 'article', `
      <section class="ed-infeed">
        ${pin(4)}
        <div class="ed-infeed__k">Подборка стилиста</div>
        <h2 class="ed-h2" style="margin-bottom:14px">Шесть пальто,<br>которые не выйдут из моды</h2>
        <div class="w-row" style="gap:10px;margin-bottom:14px">${[1, 2, 3].map(() => `<div style="flex:1">${edPh(120, 150, '')}</div>`).join('')}</div>
        <span class="ed-link">Читать разбор</span>
      </section>`)}

      ${grid(4, 6)}

      <section class="ed-sec--tight">
        ${pin(5)}
        <div class="ed-head" style="padding:0">
          <div class="ed-infeed__k" style="margin:0">Новый бренд в разделе</div>
          <span class="ed-adtag">Реклама</span>
        </div>
      </section>
      ${hot('sis', 'custom', `<div style="padding:0 20px 30px">${edPh(350, 190, '')}</div>`)}
      ${edBottom(1)}
    </div>`;
  },

  /* 06 · карточка товара — визуальная версия */
  pdp: (st) => {
    const soldout = st === 'soldout';
    const nosize = st === 'nosize';
    const cb = st === 'crossborder';
    const nopass = st === 'nopassport';

    return `<div class="ed">
      <header class="ed-header">
        <div class="ed-header__bar">
          <div class="w-row" style="gap:12px">
            <span class="w-hot" data-go="listing" data-state="default" style="font-size:17px">‹</span>
            <div class="ed-logo w-hot" data-go="home" data-state="default" style="font-size:12px"><i></i>WB Бренды</div>
          </div>
          <div class="ed-icons">
            <button class="ed-ico w-hot w-hot--tight" data-go="search" data-state="suggest" aria-label="Поиск">${ico('search')}</button>
            <button class="ed-ico w-hot w-hot--tight" data-go="cart" data-state="default" aria-label="Корзина">${ico('bag')}</button>
          </div>
        </div>
      </header>

      <!-- галерея: крупные вертикальные кадры -->
      <div style="position:relative">
        ${pin(1)}
        ${edPh(390, 500, '', 'model')}
        <div class="ed-progress ed-progress--dark" style="left:20px;bottom:16px">${[0, 1, 2, 3, 4, 5].map((i) => `<i${i === 0 ? ' data-on' : ''}></i>`).join('')}</div>
      </div>

      <section class="ed-sec--tight" style="padding-top:22px">
        ${pin(2)}
        <div class="ed-label ed-label--mute" style="margin-bottom:8px">Премиум</div>
        <div class="ed-p__brand" style="font-size:15px;margin-top:0">MAX MARA</div>
        <h1 class="ed-h2" style="margin:6px 0 12px">Пальто из шерсти и кашемира</h1>
        <div class="w-row" style="gap:12px;align-items:baseline">
          <span style="font-size:20px;font-weight:500">39 000 ₽</span>
          ${cb ? `<span class="ed-trust ed-trust--ghost">Кросс-бордер</span>` : ''}
        </div>
        <div class="w-row w-row--chips" style="gap:8px;margin-top:16px">
          ${hot('authenticity', 'how', `<span class="ed-trust">${ico('orig')} Оригинал</span>`)}
          ${nopass ? '' : hot('authenticity', 'passport', `<span class="ed-trust ed-trust--ghost">можно проверить самому</span>`)}
        </div>
        ${cb ? `<p class="ed-sm" style="margin-top:14px">Доставка из-за рубежа · 12–18 дней · пошлина 1 950 ₽ рассчитана и показана до оплаты · возврат 14 дней</p>` : ''}
        ${nopass ? `<div style="margin-top:14px">${pin(6)}</div>` : ''}
      </section>

      <section class="ed-sec--tight" style="padding-top:8px">
        <div class="ed-label ed-label--mute" style="margin-bottom:10px">Цвет · камель</div>
        <div class="ed-swatches">${[1, 2, 3, 4].map((i) => `<div class="ed-swatch"${i === 1 ? ' data-on' : ''}>${edPh(100, 120, '')}</div>`).join('')}</div>
      </section>

      <section class="ed-sec--tight">
        ${pin(3)}
        <div class="ed-head" style="padding:0;margin-bottom:12px">
          <span class="ed-label ed-label--mute">Размер</span>
          <span class="ed-link">Размерная сетка</span>
        </div>
        <div class="ed-sizes">
          ${['40', '42', '44', '46', '48'].map((sz, i) => {
            const out = (nosize && (i === 2 || i === 3)) || soldout;
            return `<div class="ed-size"${out ? ' data-out' : (i === 1 ? ' data-on' : '')}>${sz}</div>`;
          }).join('')}
        </div>
        ${nosize ? `<p class="ed-sm" style="margin-top:14px">Размера 44 сейчас нет. Сообщим, когда появится — подписка на конкретный размер, не на весь товар.</p>` : ''}
      </section>

      <section class="ed-sec--tight">
        ${pin(4)}
        <div class="ed-rows">
          ${[['Доставка', 'послезавтра, ПВЗ · бесплатно'], ['Возврат', '14 дней, без объяснений'], ['Упаковка', 'премиальная']]
            .map(([k, v]) => `<div class="ed-rows__i"><span>${k}</span><span>${v}</span></div>`).join('')}
        </div>
      </section>

      <section class="ed-sec--tight">
        ${pin(5)}
        <div class="ed-head" style="padding:0;margin-bottom:14px">
          <h2 class="ed-h2">Отзывы · 4,8</h2>
          <span class="ed-link">214</span>
        </div>
        <div style="display:grid;gap:18px">
          ${[['Марина', 'Села идеально, ткань плотная. Камель не желтит.'], ['Ольга', 'Второй сезон ношу — плечо держит форму.']]
            .map(([n, t]) => `<div><div class="w-row" style="gap:10px;margin-bottom:7px"><div style="width:26px;height:26px;border-radius:50%;background:var(--e-soft)"></div><span style="font-size:12.5px;font-weight:500">${n}</span><span class="ed-sm">★★★★★</span></div><p class="ed-t" style="color:var(--e-mute)">${t}</p></div>`).join('')}
        </div>
      </section>

      <section class="ed-sec--tight">
        <div class="ed-acc">
          ${['Описание', 'Состав и уход', 'Посадка и параметры модели', 'Как ухаживать', 'История бренда'].map((t) => `<div class="ed-acc__i">${t}<span>+</span></div>`).join('')}
        </div>
      </section>

      <!-- редакционный слой -->
      <section class="ed-sec--tight" style="padding-bottom:12px">
        ${pin(7)}
        <div class="ed-head" style="padding:0"><h2 class="ed-h2">Полный образ</h2><span class="ed-link">Собрать</span></div>
      </section>
      ${hot('slide-journal', 'products', `<div style="padding:0 20px">${edPh(350, 260, '')}<p class="ed-sm" style="margin-top:10px">Четыре вещи в образе — из истории «Спокойный объём»</p></div>`)}

      <section class="ed-sec--tight" style="padding-top:30px;padding-bottom:12px">
        <div class="ed-head" style="padding:0"><h2 class="ed-h2">Ещё от MAX MARA</h2>${hot('brand', 'default', `<span class="ed-link">Все 214</span>`)}</div>
      </section>
      <div class="ed-rail">
        ${[['Жакет', '28 000 ₽'], ['Брюки', '17 500 ₽'], ['Кашне', '9 900 ₽'], ['Юбка', '14 200 ₽']]
          .map(([n, pr]) => edP({ brand: 'MAX MARA', name: n, price: pr, w: 150 })).join('')}
      </div>

      <!-- точечный кросс-линк в аутлет -->
      <section class="ed-sec--tight" style="padding-top:30px">
        ${pin(8)}
        ${hot('outlet', 'pdp', `
        <div class="w-row" style="gap:14px;border:1px solid var(--e-line);padding:14px;align-items:center">
          <div style="width:64px;flex:0 0 auto">${edPh(120, 150, '')}</div>
          <div>
            <div class="ed-label ed-label--mute" style="margin-bottom:5px">Этот же силуэт дешевле</div>
            <div class="ed-t">Коллекция прошлого сезона — 24 900 ₽</div>
          </div>
          <span style="margin-left:auto;font-size:14px">›</span>
        </div>`)}
      </section>

      <section class="ed-sec--tight" style="padding-bottom:30px">
        ${hot('assistant', 'entry', `<div class="ed-value__i" style="border:1px solid var(--e-line);padding:14px"><span class="ed-usp__ico">${ico('chat')}</span><div><div class="ed-value__t">Сомневаетесь с размером?</div><div class="ed-value__d">Куратор подскажет по вашим меркам</div></div></div>`)}
      </section>

      ${soldout
        ? `<div class="ed-buy"><div class="ed-btn ed-btn--off">Распродано</div>${hot('favorites', 'subs', `<div class="ed-btn ed-btn--ghost">Сообщить</div>`)}</div>`
        : nosize
          ? `<div class="ed-buy"><div class="ed-btn ed-btn--off">Выберите размер</div>${hot('favorites', 'subs', `<div class="ed-btn ed-btn--ghost">Сообщить</div>`)}</div>`
          : `<div class="ed-buy">${hot('cart', 'default', `<div class="ed-btn">В корзину · 39 000 ₽</div>`)}<div class="ed-iconbtn">♡</div></div>`}
    </div>`;
  },

  /* 07 · бренд-лендинг — визуальная версия */
  brand: (st) => {
    const concept = st === 'concept';
    const name = concept ? '12 STOREEZ' : 'MAX MARA';
    const tier = concept ? 'российский' : 'люкс';

    return `<div class="ed">
      ${edFab()}
      <header class="ed-header">
        <div class="ed-header__bar">
          <span class="w-hot" data-go="brands-az" data-state="default" style="font-size:17px">‹</span>
          <div class="ed-icons">
            <button class="ed-ico w-hot w-hot--tight" data-go="search" data-state="suggest" aria-label="Поиск">${ico('search')}</button>
            <button class="ed-ico w-hot w-hot--tight" data-go="cart" data-state="default" aria-label="Корзина">${ico('bag')}</button>
          </div>
        </div>
      </header>

      <div class="ed-hero">
        ${pin(1)}
        ${edPh(390, 440, '', 'campaign')}
        <div class="ed-hero__copy ed-hero__copy--dark">
          <div class="ed-h1" style="letter-spacing:.06em;font-weight:700;font-size:28px">${name}</div>
        </div>
      </div>

      <section class="ed-sec--tight" style="padding-top:20px">
        ${pin(2)}
        <div class="w-row" style="gap:8px;margin-bottom:14px">
          <span class="ed-trust ed-trust--ghost">${tier}</span>
        </div>
        <p class="ed-t" style="color:var(--e-mute);max-width:44ch">${concept
          ? 'Русский минимализм, который не повышает голос. Базовый гардероб с той посадкой, ради которой возвращаются за второй вещью.'
          : 'Итальянский дом, известный пальто из верблюжьей шерсти. В разделе 214 вещей.'}</p>
        <div style="margin-top:18px">${hot('favorites', 'subs', `<div class="ed-btn ed-btn--ghost">Следить за брендом</div>`)}</div>
      </section>

      <div class="ed-bar" style="margin-top:8px">
        <div class="ed-bar__row">
          ${['Всё', 'Новинки', 'Бестселлеры', 'Коллекции', 'Категории', ...(concept ? ['Аутлет'] : [])]
            .map((t, i) => `<span class="ed-chip"${i === 0 ? ' data-on' : ''}>${t}</span>`).join('')}
        </div>
      </div>
      ${!concept ? `<div style="padding:0 20px">${pin(3)}</div>` : ''}

      <section class="ed-sec--tight" style="padding-bottom:12px">
        <div class="ed-head" style="padding:0"><h2 class="ed-h2">Новинки</h2>${hot('listing', 'default', `<span class="ed-link">Все 214</span>`)}</div>
      </section>
      <div class="ed-rail">
        ${[['Пальто', '39 000 ₽'], ['Жакет', '28 000 ₽'], ['Брюки', '17 500 ₽'], ['Кашне', '9 900 ₽']]
          .map(([n, pr]) => edP({ brand: name, name: n, price: pr, w: 150 })).join('')}
      </div>

      ${hot('slide-journal', 'story', `
      <section class="ed-sec--flush" style="padding-top:34px">
        ${pin(5)}
        <div style="padding:0 20px 14px"><span class="ed-label ed-label--mute">Brand Focus</span></div>
        <div class="ed-hero">
          ${edPh(390, 380, '')}
          <div class="ed-hero__copy ed-hero__copy--dark">
            <div class="ed-h2">Как устроено пальто,<br>которое носят двадцать лет</div>
          </div>
          <div class="ed-hero__tab" style="padding:12px 18px;font-size:10px">Читать <span>›</span></div>
        </div>
      </section>`)}

      <section class="ed-sec--tight" style="padding-top:30px;padding-bottom:12px">
        <h2 class="ed-h2">Категории бренда</h2>
      </section>
      <div class="ed-grid" style="padding-top:0;gap:20px 12px">
        ${['Пальто', 'Жакеты', 'Трикотаж', 'Брюки'].map((t) => hot('listing', 'default', `
          <div>${edPh(180, 200, '')}<div class="ed-t" style="margin-top:10px">${t}</div></div>`)).join('')}
      </div>

      <section class="ed-sec--tight" style="background:var(--e-soft);margin-top:14px">
        <div class="ed-value">
          ${[['orig', 'Оригинал с гарантией'], ['back', 'Возврат 14 дней'], ['delivery', 'Доставка по всей стране']]
            .map(([i, t]) => `<div class="ed-value__i"><span class="ed-usp__ico">${ico(i)}</span><div class="ed-value__t">${t}</div></div>`).join('')}
        </div>
      </section>
      ${edBottom(2)}
    </div>`;
  },

  /* 08 · shop-in-shop — визуальная версия */
  sis: (st) => {
    const custom = st === 'custom';
    return `<div class="ed"${custom ? ' style="--e-soft:#EDEAE4"' : ''}>
      <header class="ed-header"${custom ? ' style="background:#F6F3EE"' : ''}>
        <div class="ed-header__bar">
          <div class="w-row" style="gap:12px">
            <span class="w-hot w-hot--tight" data-go="home" data-state="default" style="font-size:17px">‹</span>
            <span class="ed-sis__brand" style="font-size:13px"><i></i>MARC O’POLO</span>
          </div>
          <div class="ed-icons">
            <button class="ed-ico w-hot w-hot--tight" data-go="search" data-state="suggest" aria-label="Поиск">${ico('search')}</button>
            <button class="ed-ico w-hot w-hot--tight" data-go="cart" data-state="default" aria-label="Корзина">${ico('bag')}</button>
          </div>
        </div>
        <div class="ed-bar__row" style="padding-top:0">
          ${['Новое', 'Пальто', 'Трикотаж', 'Denim', 'История бренда'].map((t, i) => `<span class="ed-chip"${i === 0 ? ' data-on' : ''}>${t}</span>`).join('')}
        </div>
      </header>

      <div class="ed-hero">
        ${pin(1)}
        ${edPh(390, 470, '', 'campaign')}
        <div class="ed-hero__copy ed-hero__copy--dark">
          <div class="ed-label" style="margin-bottom:10px">Пространство бренда</div>
          <div class="ed-h1">Осень<br>без спешки</div>
        </div>
        <div class="ed-hero__tab">Смотреть <span>›</span></div>
      </div>

      <section class="ed-sec--tight"${custom ? ' style="background:#F6F3EE"' : ''}>
        ${pin(2)}
        <p class="ed-t" style="color:var(--e-mute);max-width:46ch">${custom
          ? 'Бренд управляет палитрой, порядком блоков, выделенными коллекциями и своей историей.'
          : 'Собственный hero, логотип и порядок полок. Остальное — стандартные паттерны витрины.'}</p>
      </section>

      <section class="ed-sec--tight" style="padding-bottom:12px">
        <div class="ed-head" style="padding:0"><h2 class="ed-h2">Выделенная коллекция</h2><span class="ed-link">Вся</span></div>
      </section>
      <div class="ed-rail">
        ${[['Куртка замшевая', '38 900 ₽'], ['Кардиган', '11 200 ₽'], ['Джинсы', '9 800 ₽'], ['Рубашка', '7 400 ₽']]
          .map(([n, pr]) => edP({ brand: 'MARC O’POLO', name: n, price: pr, w: 150 })).join('')}
      </div>

      ${custom ? `
      <section class="ed-sec--flush" style="padding-top:34px">
        ${pin(3)}
        <div style="padding:0 20px 14px"><span class="ed-label ed-label--mute">История бренда · видео</span></div>
        ${hot('journal', 'article', `
        <div class="ed-hero">
          ${edPh(390, 320, '')}
          <div class="ed-hero__copy ed-hero__copy--dark"><div class="ed-h2">Как делают деним<br>в Дании</div></div>
          <div class="ed-hero__tab" style="padding:12px 18px;font-size:10px">Смотреть <span>›</span></div>
        </div>`)}
      </section>` : ''}

      <section class="ed-sec--tight" style="padding-top:30px">
        ${pin(4)}
        <div class="ed-value">
          ${[['orig', 'Корзина и карточка — общие для витрины'], ['box', 'Упаковка и доставка — как везде']]
            .map(([i, t]) => `<div class="ed-value__i"><span class="ed-usp__ico">${ico(i)}</span><div class="ed-value__t" style="font-weight:400">${t}</div></div>`).join('')}
        </div>
        <div style="margin-top:20px">${hot('favorites', 'subs', `<div class="ed-btn ed-btn--ghost">Следить за брендом</div>`)}</div>
      </section>

      ${edBottom(2)}
    </div>`;
  },

  /* 09 · аутлет — визуальная версия */
  outlet: (st) => {
    if (st === 'pdp') {
      return `<div class="ed">
        <header class="ed-header">
          <div class="ed-header__bar">
            <div class="w-row" style="gap:12px">
              <span class="w-hot" data-go="outlet" data-state="default" style="font-size:17px">‹</span>
              <div class="ed-logo w-hot" data-go="home" data-state="default" style="font-size:12px"><i></i>WB Бренды · Аутлет</div>
            </div>
            <div class="ed-icons">
            <button class="ed-ico w-hot w-hot--tight" data-go="cart" data-state="default" aria-label="Корзина">${ico('bag')}</button>
          </div>
          </div>
        </header>
        ${edPh(390, 470, '')}
        <section class="ed-sec--tight" style="padding-top:22px">
          <div class="ed-p__brand" style="font-size:15px;margin-top:0">MARC O’POLO</div>
          <h1 class="ed-h2" style="margin:6px 0 12px">Тренч из хлопка</h1>
          <div class="w-row" style="gap:12px;align-items:baseline">
            <span style="font-size:20px;font-weight:500">14 900 ₽</span>
            <span class="ed-p__old" style="font-size:14px">24 000 ₽</span>
            <span class="ed-trust ed-trust--ghost">−38%</span>
          </div>
        </section>
        <section class="ed-sec--tight">
          ${pin(2)}
          <div style="border:1px solid var(--e-ink);padding:16px">
            <div class="ed-label" style="margin-bottom:8px">Почему дешевле</div>
            <p class="ed-t">Коллекция осень–зима 2025. Это единственная причина цены: та же вещь, тот же бренд, та же гарантия оригинала. Не уценка за брак и не серый импорт.</p>
          </div>
          <div class="w-row" style="gap:8px;margin-top:14px">
            ${hot('authenticity', 'how', `<span class="ed-trust">${ico('orig')} Оригинал</span>`)}
            <span class="ed-trust ed-trust--ghost">возврат 14 дней</span>
          </div>
        </section>
        <section class="ed-sec--tight" style="padding-top:24px;padding-bottom:12px">
          ${pin(4)}
          <div class="ed-head" style="padding:0"><h2 class="ed-h2">Новая версия образа</h2><span class="ed-link">Смотреть</span></div>
        </section>
        <div class="ed-rail">
          ${[['MARC O’POLO', 'Тренч, коллекция 2026', '24 000 ₽'], ['COS', 'Тренч прямой', '19 900 ₽'], ['12 STOREEZ', 'Плащ', '22 400 ₽']]
            .map(([b, n, pr]) => edP({ brand: b, name: n, price: pr, w: 150 })).join('')}
        </div>
        <div style="height:30px"></div>
        <div class="ed-buy">${hot('cart', 'default', `<div class="ed-btn">В корзину · 14 900 ₽</div>`)}<div class="ed-iconbtn">♡</div></div>
      </div>`;
    }

    return `<div class="ed">
      <header class="ed-header">
        <div class="ed-header__bar">
          <div class="w-row" style="gap:12px">
            <span class="w-hot w-hot--tight" data-go="home" data-state="default" style="font-size:17px">‹</span>
            <div class="ed-logo w-hot" data-go="home" data-state="default" style="font-size:12px"><i></i>WB Бренды · Аутлет</div>
          </div>
          <div class="ed-icons">
            <button class="ed-ico w-hot w-hot--tight" data-go="search" data-state="suggest" aria-label="Поиск">${ico('search')}</button>
            <button class="ed-ico w-hot w-hot--tight" data-go="cart" data-state="default" aria-label="Корзина">${ico('bag')}</button>
          </div>
        </div>
      </header>

      <section class="ed-sec" style="background:var(--e-soft)">
        ${pin(1)}
        <div class="ed-label" style="margin-bottom:12px">Аутлет</div>
        <h1 class="ed-h1" style="font-size:32px;margin-bottom:12px">Прошлые<br>коллекции</h1>
        <p class="ed-t" style="color:var(--e-mute);max-width:40ch">Те же бренды и та же гарантия оригинала. Дешевле — потому что коллекция прошлого сезона, и мы говорим об этом прямо.</p>
      </section>

      <div class="ed-bar">
        ${pin(3)}
        <div class="ed-bar__row">
          ${[['Все скидки', 1], ['−30% и больше', 0], ['−50% и больше', 0], ['Женщины', 0], ['Обувь', 0]]
            .map(([t, on]) => `<span class="ed-chip"${on ? ' data-on' : ''}>${t}</span>`).join('')}
        </div>
      </div>

      <div class="ed-grid">
        ${[['MARC O’POLO', 'Тренч из хлопка', '14 900 ₽', '24 000 ₽', 'коллекция 2025'],
           ['BOSS', 'Пиджак', '29 000 ₽', '48 000 ₽', 'коллекция 2025'],
           ['LEVI’S', 'Джинсы прямые', '5 400 ₽', '8 900 ₽', 'коллекция 2024'],
           ['LACOSTE', 'Поло', '6 200 ₽', '9 900 ₽', 'коллекция 2025']]
          .map(([b, n, pr, old, note]) => hot('outlet', 'pdp', `
            <div class="ed-p">
              ${edPh(300, 380, '')}
              <div class="ed-p__brand">${b}</div>
              <div class="ed-p__name">${n}</div>
              <div class="ed-p__price">${pr}<span class="ed-p__old">${old}</span></div>
              <div class="ed-p__name" style="margin-top:5px">${note}</div>
            </div>`)).join('')}
      </div>

      <section class="ed-sec--tight" style="padding-bottom:12px">
        ${pin(4)}
        <div class="ed-head" style="padding:0"><h2 class="ed-h2">Новая версия этих образов</h2>${hot('listing', 'default', `<span class="ed-link">Смотреть</span>`)}</div>
      </section>
      <div class="ed-rail">
        ${[['COS', 'Тренч', '19 900 ₽'], ['12 STOREEZ', 'Жакет', '17 400 ₽'], ['MAX MARA', 'Пальто', '39 000 ₽']]
          .map(([b, n, pr]) => edP({ brand: b, name: n, price: pr, w: 150, go: 'pdp' })).join('')}
      </div>

      <section class="ed-sec--tight" style="background:var(--e-soft);margin-top:30px">
        ${pin(5)}
        <div class="ed-value">
          ${[['orig', 'Оригинал с гарантией площадки'], ['back', 'Возврат 14 дней'], ['delivery', 'Та же доставка, что в основной витрине']]
            .map(([i, t]) => `<div class="ed-value__i"><span class="ed-usp__ico">${ico(i)}</span><div class="ed-value__t" style="font-weight:400">${t}</div></div>`).join('')}
        </div>
      </section>

      ${edBottom(1)}
    </div>`;
  },

  /* 10 · журнал и редакция — глянцевая вёрстка */
  journal: (st) => {
    const RUBRICS = ['Последнее', 'Мода', 'Красота', 'Украшения', 'Дом и вещи', 'Интервью', 'Видео'];

    const head = (title = 'Журнал', active = 0) => `
      <header class="mag-head">
        <div class="mag-head__bar">
          <span class="w-hot w-hot--tight" data-go="home" data-state="default" style="font-size:17px">‹</span>
          <div class="mag-head__t">${title}</div>
          <button class="mag-head__cart w-hot" data-go="cart" data-state="default" aria-label="Корзина">${ico('bag')}</button>
        </div>
        <nav class="mag-rubrics">
          ${RUBRICS.map((r, i) => `<span${i === active ? ' data-on' : ''} class="w-hot" data-go="journal" data-state="${i === 0 ? 'default' : 'rubric'}">${r}</span>`).join('')}
        </nav>
      </header>`;

    const item = (rub, t, date, ratio = [350, 240]) => hot('journal', 'article', `
      <article class="mag-item">
        <div class="mag-vlabel">${rub}</div>
        <div>
          ${edPh(ratio[0], ratio[1], '')}
          <h3 class="mag-item__t">${t}</h3>
          <div class="mag-date">${date}</div>
        </div>
      </article>`);

    if (st === 'article') {
      return `<div class="ed mag">
        ${head('Журнал')}
        ${edPh(390, 420, '')}
        <section class="ed-sec" style="padding-bottom:8px;text-align:center">
          ${pin(1)}
          <div class="mag-kicker" style="margin-bottom:14px">Интервью</div>
          <h1 class="mag-h mag-h--lg">Работа как любовь<br><i>с</i> 12 STOREEZ</h1>
          <div class="mag-date" style="margin-top:14px">29 июля 2026 · 8 минут</div>
        </section>
        <section class="ed-sec" style="padding-top:18px">
          <p class="mag-lead" style="margin-bottom:24px">Как две сестры из Екатеринбурга собрали марку, которую носят, не сверяясь с сезоном, — и почему они до сих сами отсматривают каждую посадку.</p>
          <div class="mag-body">
            <p>Первый магазин открылся в 2014 году и был размером с примерочную. Сегодня марка делает четыре коллекции в год, но принцип остался тем же: вещь идёт в производство, только если её хочется носить ежедневно.</p>
            <p>«Мы никогда не считали себя дизайнерами трендов, — говорит Ирина. — Мы делаем то, что можно надеть в среду, а потом в субботу, и оба раза чувствовать себя собой».</p>
            <p>Посадка — отдельная история. На каждую модель уходит от четырёх до девяти примерок, и решение принимают вдвоём.</p>
          </div>
        </section>
        <section class="ed-sec" style="padding-top:0">
          ${pin(2)}
          <div class="mag-shop">
            <div class="mag-shop__t">Вещи из материала</div>
            <div class="ed-rail" style="padding:0">
              ${[['12 STOREEZ', 'Пальто', '27 800 ₽'], ['12 STOREEZ', 'Костюм', '31 400 ₽'], ['12 STOREEZ', 'Рубашка', '8 900 ₽']]
                .map(([b, n, pr]) => edP({ brand: b, name: n, price: pr, w: 150 })).join('')}
            </div>
            <div class="w-note" style="margin-top:18px;border-color:var(--e-line);background:var(--e-soft)">
              ${pin(3)}Одной вещи из материала больше нет в продаже. Вместо ошибки — статус и кураторская замена из того же эдита.
            </div>
          </div>
        </section>
        <section class="ed-sec" style="padding-top:0">
          ${hot('journal', 'default', `<div class="ed-drop__cta" style="border-color:var(--e-ink);color:var(--e-ink)">Все материалы</div>`)}
        </section>
        ${edBottom(3)}
      </div>`;
    }

    if (st === 'rubric') {
      return `<div class="ed mag">
        ${head('Журнал', 1)}
        <section class="mag-dark" style="padding-bottom:26px">
          ${pin(4)}
          <div class="mag-dark__t">Мода</div>
          <div class="mag-dots">${[0, 1, 2, 3].map((i) => `<i${i === 0 ? ' data-on' : ''}></i>`).join('')}</div>
          ${hot('journal', 'article', `
          <div class="mag-dark__card">
            ${edPh(340, 400, '')}
            <div class="mag-dark__plate">
              <div class="mag-kicker" style="margin-bottom:12px">Мода</div>
              <h3 class="mag-h">Пять силуэтов,<br><i>которые</i> определят осень</h3>
              <div class="mag-readshop">Читать и купить</div>
            </div>
          </div>`)}
        </section>
        <section style="padding-top:34px">
          ${item('Мода', 'Как носить объём, чтобы он не носил вас', '29 июля')}
          ${item('Мода', 'Тихий люкс по-русски: пять локальных марок', '26 июля')}
          ${item('Мода', 'Пальто, которое переживёт сезон', '22 июля')}
        </section>
        ${edBottom(3)}
      </div>`;
    }

    return `<div class="ed mag">
      ${head('Журнал')}

      <!-- мастхед издания -->
      <div class="mag-masthead">
        ${pin(5)}
        <div class="mag-slogan">Отобранное. Объяснённое. Каждую неделю.</div>
        <div class="mag-logo">ОТБОР<small>журнал WB Бренды</small></div>
      </div>

      <!-- главный материал номера -->
      ${hot('journal', 'article', `
      <section class="mag-cover">
        ${pin(1)}
        ${edPh(390, 470, '', 'campaign')}
        <div class="mag-cover__play">▶</div>
        <div class="mag-cover__plate">
          <span class="mag-kicker">Главный материал</span>
          <h2 class="mag-h mag-h--lg">Работа как любовь<br><i>с</i> 12 STOREEZ</h2>
          <span class="mag-date">29 июля 2026</span>
        </div>
      </section>`)}

      <!-- лента последнего -->
      <section style="padding-top:34px">
        ${pin(6)}
        ${item('Мода', 'Как носить объём, чтобы он не носил вас', '8 часов назад')}
        ${item('Красота', 'Уход, который работает на смене сезона', '1 день назад')}
      </section>

      <!-- рубрика на чёрном -->
      <section class="mag-dark">
        ${pin(4)}
        <div class="mag-dark__t">Мода</div>
        <div class="mag-dots">${[0, 1, 2, 3].map((i) => `<i${i === 0 ? ' data-on' : ''}></i>`).join('')}</div>
        ${hot('journal', 'article', `
        <div class="mag-dark__card">
          ${edPh(340, 400, '')}
          <div class="mag-dark__plate">
            <div class="mag-kicker" style="margin-bottom:12px">Мода</div>
            <h3 class="mag-h">Пять силуэтов,<br><i>которые</i> определят осень</h3>
            <div class="mag-readshop">Читать и купить</div>
          </div>
        </div>`)}
      </section>

      <section style="padding-top:34px">
        ${item('Дом и вещи', 'Как я собираю пространство: квартира стилиста в Москве', '2 дня назад')}
        ${item('Интервью', 'Дизайнер о том, как собрать капсулу на десять лет', '3 дня назад')}
      </section>

      <!-- слайд-журнал как отдельный формат -->
      <section class="ed-sec--tight" style="padding-bottom:6px">
        ${pin(7)}
        <div class="ed-head" style="padding:0"><h2 class="mag-h" style="font-size:22px">Слайд-журнал</h2>${hot('slide-journal', 'cover', `<span class="ed-link">Открыть</span>`)}</div>
      </section>
      ${hot('slide-journal', 'cover', `
      <div class="ed-hero" style="margin-bottom:20px">
        ${edPh(390, 300, '')}
        <div class="ed-hero__copy ed-hero__copy--dark">
          <div class="mag-h" style="font-size:22px">Спокойный объём<br><i>в шести слайдах</i></div>
        </div>
        <div class="ed-hero__tab" style="padding:12px 18px;font-size:10px">Смотреть <span>›</span></div>
      </div>`)}

      <section class="ed-sec--tight" style="border-top:1px solid var(--e-line)">
        ${hot('journal', 'article', `<div class="ed-head" style="padding:0"><h2 class="mag-h" style="font-size:20px">Архив дропов</h2><span class="ed-link">Смотреть</span></div>`)}
      </section>

      ${edBottom(3)}
    </div>`;
  },

  /* 11 · слайд-журнал — глянцевый разворот в формате истории */
  'slide-journal': (st) => {
    const N = 6;
    const idx = { cover: 1, story: 3, products: 4, cta: 6 }[st] || 1;

    const top = () => `
      <div class="slide-top">
        <div class="slide-bars">${Array.from({ length: N }, (_, i) => `<i${i < idx ? ' data-on' : ''}></i>`).join('')}</div>
        <div class="slide-top__row">
          <span class="w-hot" data-go="home" data-state="default">✕ Закрыть</span>
          <span>${idx} / ${N}</span>
        </div>
      </div>`;

    const foot = (label, nextState, ghost = '') => `
      <div class="slide-foot">
        ${ghost ? `<div class="slide-arrow w-hot" data-go="slide-journal" data-state="${ghost}">‹</div>` : ''}
        <div class="slide-btn w-hot" data-go="slide-journal" data-state="${nextState}">${label}</div>
      </div>`;

    if (st === 'story') {
      return `<div class="slide">
        ${top()}
        ${pin(1)}
        <div class="slide-sec" style="padding-bottom:20px">
          <div class="slide-rule"></div>
          <h2 class="slide-sub">Что делает объём<br><i>объёмом</i></h2>
        </div>
        ${edPh(390, 470, '')}
        <div class="slide-sec" style="padding-top:18px">
          <div class="slide-cap" style="margin:0 0 22px">Пальто MAX MARA · съёмка для WB Бренды</div>
          ${pin(2)}
          <div class="slide-body">
            <p>Свободный силуэт держится не тканью, а линией плеча. Если шов уходит на два-три сантиметра ниже естественной точки, вещь начинает жить самостоятельно — и объём читается как замысел, а не как размер больше нужного.</p>
            <p>Проверить это легко: поднимите руки. Хорошо посаженное пальто <span class="slide-link">потянется вместе с вами</span>, а не соберётся складкой на спине.</p>
            <p><em>Три вещи из этой истории собраны на следующем слайде — от российской марки до люкса.</em></p>
          </div>
          ${pin(8)}
          ${hot('pdp', 'default', `
          <div class="slide-inline">
            <div style="width:78px;flex:0 0 auto">${edPh(160, 200, '')}</div>
            <div>
              <div class="slide-cap" style="margin-bottom:6px">Вещь из этого абзаца</div>
              <div class="slide-prod__brand" style="margin-top:0">MAX MARA</div>
              <div class="slide-prod__name">Пальто из шерсти и кашемира</div>
              <div class="slide-prod__price">39 000 ₽</div>
            </div>
            <span style="margin-left:auto;font-family:var(--font-ui);font-size:13px">›</span>
          </div>`)}
        </div>
        <div class="slide-hint">Свайп влево — дальше · свайп вниз — выход</div>
        ${foot('Дальше', 'products', 'cover')}
      </div>`;
    }

    if (st === 'products') {
      return `<div class="slide">
        ${top()}
        <div class="slide-sec" style="padding-bottom:18px">
          ${pin(3)}
          <div class="slide-rule"></div>
          <h2 class="slide-sub">Один силуэт,<br><i>три уровня</i></h2>
          <div class="slide-body" style="font-size:16px">От российской марки до люкса — чтобы было видно, за что именно доплачивают.</div>
        </div>
        <div class="ed-rail" style="padding:0 20px 8px">
          ${[['12 STOREEZ', 'Пальто оверсайз', '27 800 ₽', 'российский'], ['COS', 'Пальто-кокон', '21 300 ₽', 'премиум'], ['MAX MARA', 'Пальто из шерсти', '39 000 ₽', 'люкс']]
            .map(([b, n, pr, tier]) => slideProd({ brand: b, name: n, price: pr, tier, w: 196 })).join('')}
        </div>
        <div class="slide-sec" style="padding-top:22px">
          ${pin(4)}
          <div class="slide-body">
            <p>Разница не в тепле, а в том, сколько сезонов вещь держит форму. У кашемировой смеси плечо не проседает после третьей зимы — за это и берут.</p>
          </div>
          <div style="margin-top:20px">${hot('listing', 'default', `<div class="slide-btn slide-btn--ghost">Вся подборка · 12 вещей</div>`)}</div>
        </div>
        <div class="slide-hint">Свайп влево — дальше</div>
        ${foot('Дальше', 'cta', 'story')}
      </div>`;
    }

    if (st === 'cta') {
      return `<div class="slide">
        ${top()}
        <div class="slide-sec" style="padding-top:44px;text-align:center">
          ${pin(5)}
          <div class="slide-rule" style="margin:0 auto 22px"></div>
          <h2 class="slide-title" style="font-size:34px">Собрать образ<br><i>целиком</i></h2>
          <p class="slide-lead" style="font-size:17px;margin-top:18px">Четыре вещи из истории — в одной корзине, с одной доставкой.</p>
        </div>
        <div class="ed-rail" style="padding:0 20px">
          ${LOOK.map(([b, n, pr, t]) => slideProd({ brand: b, name: n, price: pr, tier: t, w: 148, ratio: [220, 290] })).join('')}
        </div>
        <div class="slide-sec" style="padding-top:22px">
          <div class="slide-body" style="font-size:16px;margin-bottom:18px">Образ целиком — <em>74 300 ₽</em>. Любую вещь можно убрать перед оформлением.</div>
          <div style="display:grid;gap:10px">
            ${hot('cart', 'default', `<div class="slide-btn">В корзину · 4 вещи</div>`)}
            ${hot('assistant', 'set', `<div class="slide-btn slide-btn--ghost">Подобрать под меня</div>`)}
            ${hot('journal', 'default', `<div class="slide-btn slide-btn--ghost">Другие истории</div>`)}
          </div>
          ${pin(6)}
        </div>
      </div>`;
    }

    /* обложка */
    return `<div class="slide">
      ${top()}
      <div class="slide-sec" style="padding-bottom:22px">
        ${pin(7)}
        <div class="slide-cap" style="margin-bottom:16px">Слайд-журнал · мода</div>
        <h1 class="slide-title">Спокойный <i>объём</i></h1>
        <p class="slide-lead">Свободный силуэт сезона держится не на ткани, а на линии плеча. Разбираем на трёх пальто — и объясняем, за что доплачивают.</p>
      </div>
      ${edPh(390, 520, '', 'campaign')}
      <div class="slide-sec" style="padding-top:16px">
        <div class="slide-cap">Съёмка для WB Бренды · стилист Анна Ковалёва</div>
      </div>
      <div class="slide-hint">Свайп влево — начать историю</div>
      ${foot('Читать историю', 'story')}
    </div>`;
  },

  /* 12 · дроп и ранний доступ — визуальная версия */
  drop: (st) => {
    const cfg = {
      before:      { badge: 'до старта 1 д 22:40', note: 'Товар и цена уже видны — чтобы решить заранее.' },
      'early-out': { badge: 'ранний доступ · лояльность', note: 'Участники программы покупают на 24 часа раньше. Через 21:40 откроется всем.' },
      'early-in':  { badge: 'ранний доступ · открыт вам', note: 'Вы в программе — можно брать сейчас.' },
      open:        { badge: 'дроп идёт', note: 'Открытый доступ для всех.' },
      soldout:     { badge: 'sold out', note: 'Разобрали. Сообщим, если вернётся.' },
      archive:     { badge: 'дроп завершён', note: 'Карточка остаётся: подпишитесь на следующий запуск.' },
    }[st] || {};

    const cta = {
      before:      `${hot('favorites', 'subs', `<div class="ed-btn ed-btn--ghost">Напомнить о старте</div>`)}`,
      'early-out': `<div class="ed-btn ed-btn--off">Купить</div>${hot('club', 'default', `<div class="ed-btn ed-btn--ghost">Открыть доступ</div>`)}`,
      'early-in':  `${hot('cart', 'default', `<div class="ed-btn">Купить · 18 900 ₽</div>`)}`,
      open:        `${hot('cart', 'default', `<div class="ed-btn">Купить · 18 900 ₽</div>`)}`,
      soldout:     `<div class="ed-btn ed-btn--off">Sold out</div>${hot('favorites', 'subs', `<div class="ed-btn ed-btn--ghost">Сообщить</div>`)}`,
      archive:     `${hot('favorites', 'subs', `<div class="ed-btn ed-btn--ghost">Подписаться на дропы</div>`)}`,
    }[st] || '';

    return `<div class="ed">
      <header class="ed-header">
        <div class="ed-header__bar">
          <div class="w-row" style="gap:12px">
            <span class="w-hot w-hot--tight" data-go="home" data-state="default" style="font-size:17px">‹</span>
            <div class="ed-logo" style="font-size:13px;letter-spacing:.1em">Дроп</div>
          </div>
          <div class="ed-icons">
            <button class="ed-ico w-hot w-hot--tight" data-go="cart" data-state="default" aria-label="Корзина">${ico('bag')}</button>
          </div>
        </div>
      </header>

      <div class="ed-hero">
        ${pin(2)}
        ${edPh(390, 440, '')}
        <div class="ed-hero__copy" style="color:var(--e-ink)">
          <span class="ed-trust" style="background:#fff">${cfg.badge}</span>
        </div>
      </div>

      <section class="ed-sec--tight" style="padding-top:22px">
        ${pin(1)}
        <div class="ed-p__brand" style="font-size:15px;margin-top:0">USHATÁVA × WB</div>
        <h1 class="ed-h2" style="margin:6px 0 12px">Капсула из восьми вещей</h1>
        <div style="font-size:19px;font-weight:500;margin-bottom:16px">от 18 900 ₽</div>
        ${['before', 'early-out'].includes(st) ? `
        <div style="border:1px solid var(--e-ink);padding:16px;margin-bottom:14px">
          ${pin(3)}
          <div class="ed-label ed-label--mute" style="margin-bottom:8px">${st === 'before' ? 'Старт через' : 'В общий доступ через'}</div>
          <div style="font-size:32px;font-weight:400;font-variant-numeric:tabular-nums">${st === 'before' ? '01 : 22 : 40' : '21 : 40 : 12'}</div>
        </div>` : ''}
        <p class="ed-t" style="color:var(--e-mute)">${cfg.note}</p>
      </section>

      <div class="ed-grid">
        ${[1, 2, 3, 4].map((i) => hot('pdp', 'default', `
          <div class="ed-p">
            ${edPh(300, 380, st === 'soldout' && i < 3 ? 'sold out' : '')}
            <div class="ed-p__brand">USHATÁVA</div>
            <div class="ed-p__name">Вещь ${i}</div>
            <div class="ed-p__price">18 900 ₽</div>
          </div>`)).join('')}
      </div>

      ${st === 'archive' ? `
      <section class="ed-sec--tight" style="padding-bottom:12px">
        ${pin(4)}
        <div class="ed-head" style="padding:0"><h2 class="ed-h2">Как прошёл дроп</h2>${hot('journal', 'article', `<span class="ed-link">Читать</span>`)}</div>
      </section>
      ${hot('journal', 'article', `<div style="padding:0 20px 20px">${edPh(350, 200, '')}</div>`)}` : ''}

      <div class="ed-buy">${cta}</div>
    </div>`;
  },

  /* 12 · куратор — живой диалог с карточками и входом в журнал */
  assistant: (st) => {
    const head = (status = 'обычно отвечаю за минуту') => `
      <div class="chat-head">
        <div class="chat-who">
          <div class="chat-ava">К</div>
          <div>
            <div class="chat-name">Куратор</div>
            <div class="chat-status">${status}</div>
          </div>
        </div>
        <span class="w-hot" data-go="home" data-state="default" style="font-size:16px">✕</span>
      </div>`;

    const me = (t) => `<div class="chat-row chat-row--me"><div class="chat-msg chat-msg--me">${t}</div></div>`;

    const him = (inner) => `
      <div class="chat-row">
        <div class="chat-ava">К</div>
        <div class="chat-msg">${inner}</div>
      </div>`;

    const card = (brand, name, price, why) => hot('pdp', 'default', `
      <div class="chat-card">
        ${edPh(220, 280, '')}
        <div class="chat-card__brand">${brand}</div>
        <div class="chat-card__name">${name}</div>
        <div class="chat-card__price">${price}</div>
        <div class="chat-card__why">${why}</div>
      </div>`);

    const art = (kicker, title) => hot('journal', 'article', `
      <div class="chat-art">
        <div style="width:78px;flex:0 0 auto">${edPh(160, 140, '')}</div>
        <div>
          <div class="chat-art__k">${kicker}</div>
          <div class="chat-art__t">${title}</div>
        </div>
        <span style="margin-left:auto;font-size:13px">›</span>
      </div>`);

    const chips = (items) => `<div class="chat-row"><div></div><div class="chat-chips">${items.map(([t, go, gs]) => `<span class="w-hot" data-go="${go}" data-state="${gs}">${t}</span>`).join('')}</div></div>`;

    const input = () => `
      <div class="chat-input">
        <div class="chat-input__field">Написать куратору…</div>
        <div class="chat-send">↑</div>
      </div>`;

    if (st === 'off') {
      return `<div class="ed chat">
        ${head('скоро вернусь')}
        <div class="chat-thread">
          ${him(`Я ненадолго отошла. Оставляю то, что редакция выбрала на этой неделе — вернусь и соберу под вас.`)}
        </div>
        <div class="ed-rail" style="padding:0 20px 24px">
          ${[['COS', 'Пальто-кокон', '21 300 ₽'], ['MAX MARA', 'Пальто из шерсти', '39 000 ₽'], ['12 STOREEZ', 'Жакет', '17 400 ₽']]
            .map(([b, n, pr]) => edP({ brand: b, name: n, price: pr, w: 150 })).join('')}
        </div>
        <div class="ed-sec--tight" style="padding-top:0">${pin(5)}${hot('journal', 'default', `<div class="ed-drop__cta" style="border-color:var(--e-ink);color:var(--e-ink)">Читать журнал</div>`)}</div>
      </div>`;
    }

    if (st === 'read') {
      return `<div class="ed chat">
        ${head()}
        <div class="chat-thread">
          ${me('А почитать про это что-нибудь есть?')}
          ${pin(6)}
          ${him(`Есть что почитать — от короткого разбора до интервью с маркой, которую вы смотрели.
            ${art('Гид · 6 минут', 'Пальто, которое переживёт сезон')}
            ${art('Интервью', 'Работа как любовь <i>с</i> 12 STOREEZ')}
            ${art('Слайд-журнал · 6 слайдов', 'Спокойный объём')}`)}
          ${chips([['Показать вещи из статьи', 'assistant', 'set'], ['Ещё про пальто', 'journal', 'rubric'], ['Весь журнал', 'journal', 'default']])}
        </div>
        ${input()}
      </div>`;
    }

    if (st === 'skip') {
      return `<div class="ed chat">
        ${head()}
        <div class="chat-thread">
          ${me('Не то')}
          ${me('И это тоже не то')}
          ${pin(3)}
          ${him(`Поняла, это направление убираю. Скажите, что именно мимо — пересоберу.`)}
          ${chips([['Слишком дорого', 'assistant', 'set'], ['Не мой силуэт', 'assistant', 'set'], ['Не те бренды', 'assistant', 'set'], ['Не тот повод', 'assistant', 'set']])}
          ${him(`Могу и вовсе не писать первой. Захотите — вернётесь, я на месте.`)}
          ${chips([['Не пиши мне первой', 'assistant', 'entry']])}
        </div>
        ${input()}
      </div>`;
    }

    if (st === 'set') {
      return `<div class="ed chat">
        ${head('печатает…')}
        <div class="chat-thread">
          ${me('Нужно тёплое пальто на осень, не чёрное')}
          ${pin(1)}
          ${him(`<b>Собрала целый образ вокруг одного пальто.</b> Взяла свободный силуэт: вы две недели листали именно такую посадку, а на прошлой неделе засматривались на камель.
            <div class="chat-look">
              ${[
                ['Пальто', 'MAX MARA', 'Из шерсти и кашемира', '39 000 ₽', 'Тот самый камель. Плечо ниже на три сантиметра — за счёт этого и получается объём.'],
                ['Под него', 'COS', 'Водолазка мериносовая', '6 900 ₽', 'Тонкая, не будет комкаться под пальто. Молочный вместо белого — с камелем дружит лучше.'],
                ['Обувь', 'ARNY PRAHT', 'Ботинки на тракторе', '18 400 ₽', 'Плотная подошва уравновешивает объём. С лодочками образ сразу поплывёт.'],
                ['Деталь', '12 STOREEZ', 'Шарф из альпаки', '7 200 ₽', 'Вы дважды открывали шарфы на неделе. Этот закроет вырез, если носить пальто нараспашку.'],
              ].map(([role, b, n, pr, why]) => hot('pdp', 'default', `
                <div class="chat-look__i">
                  <div>${edPh(160, 200, '')}</div>
                  <div>
                    <div class="chat-look__role">${role}</div>
                    <div class="chat-look__brand">${b}</div>
                    <div class="chat-look__name">${n}</div>
                    <div class="chat-look__price">${pr}</div>
                    <div class="chat-look__why">${why}</div>
                  </div>
                </div>`)).join('')}
            </div>`)}
          ${pin(2)}
          ${him(`Если совсем коротко, почему так:
            <div class="chat-trend">
              <div class="chat-trend__k">Тенденция сезона</div>
              <div class="chat-trend__t">Плечо вниз,<br>талия на выход</div>
              <div class="chat-trend__d">Осенью объём держат кроем, а не поясом: спущенное плечо, прямая линия, длина ниже колена. Так вышли Toteme и Max Mara, а локальные быстро подтянулись — у 12 STOREEZ на этом построена вся капсула.</div>
            </div>`)}
          ${chips([['Дороже', 'assistant', 'set'], ['Другой цвет', 'assistant', 'set'], ['Без ботинок', 'assistant', 'skip'], ['Почитать про это', 'assistant', 'read']])}
          ${pin(4)}
          ${him(`Кстати, если интересно, почему у одного пальто плечо держит форму, а у другого нет — про это есть разбор.
            ${art('Гид · 6 минут', 'Пальто, которое переживёт сезон')}`)}
        </div>
        ${input()}
      </div>`;
    }

    /* первый контакт */
    return `<div class="ed chat">
      ${head()}
      <div class="chat-thread">
        ${pin(5)}
        ${him(`<b>Екатерина, привет.</b> Я тут, чтобы вы не листали тысячу карточек. Скажите, что ищете — покажу и расскажу, почему именно это. Регистрироваться не надо.`)}
        ${him(`Вижу, вы засматривались на длинные пальто спокойных оттенков. Начнём с них?`)}
        ${chips([['Собрать образ на осень', 'assistant', 'set'], ['Найти марку, похожую на…', 'assistant', 'set'], ['Что почитать', 'assistant', 'read'], ['Помочь с размером', 'assistant', 'set'], ['Проверить подлинность', 'authenticity', 'how']])}
      </div>
      ${input()}
    </div>`;
  },

  /* 14 · Лояльность — визуальная версия */
  club: (st) => {
    const member = st === 'member';
    return `<div class="ed">
      <header class="ed-header">
        <div class="ed-header__bar">
          <div class="w-row" style="gap:12px">
            <span class="w-hot w-hot--tight" data-go="home" data-state="default" style="font-size:17px">‹</span>
            <div class="ed-logo" style="font-size:13px;letter-spacing:.1em">Лояльность</div>
          </div>
          <div class="ed-icons">
            <button class="ed-ico w-hot w-hot--tight" data-go="cart" data-state="default" aria-label="Корзина">${ico('bag')}</button>
          </div>
        </div>
      </header>

      <section class="ed-sec" style="background:var(--e-soft)">
        ${pin(1)}
        <div class="ed-label" style="margin-bottom:12px">Привилегии раздела</div>
        <h1 class="ed-h1" style="font-size:32px;margin-bottom:12px">${member ? 'Вы в программе' : 'Раньше и лучше'}</h1>
        <p class="ed-t" style="color:var(--e-mute);max-width:40ch">${member
          ? 'Ранний доступ открыт. Ближайший дроп — через два дня.'
          : 'Ранний доступ к дропам за сутки, премиальный сервис и доставка в день заказа там, где она есть.'}</p>
      </section>

      <section class="ed-sec--tight">
        <div class="ed-rows">
          ${[['Ранний доступ к дропам', 'за 24 часа', 1], ['Премиальная упаковка', 'по всей стране', 1],
             ['Курьерская доставка', 'по всей стране', 1], ['Премиум-ПВЗ', 'в вашем городе', 0], ['Доставка день в день', 'по адресу', 0]]
            .map(([t, d, all]) => `<div class="ed-rows__i"><span>${t}</span><span>${d}${all ? '' : ' ·  не везде'}</span></div>`).join('')}
        </div>
        <p class="ed-sm" style="margin-top:14px">${pin(2)}Показываем только то, что доступно по вашему адресу — обещания, которые не выполняются, мы не даём.</p>
      </section>

      ${!member ? `
      <section class="ed-sec--tight">
        ${pin(3)}
        ${hot('drop', 'early-out', `
        <div style="border:1px solid var(--e-ink);padding:16px">
          <div class="ed-label" style="margin-bottom:8px">Прямо сейчас</div>
          <div class="ed-t" style="margin-bottom:10px">Дроп USHATÁVA × WB открыт для участников программы</div>
          <div style="font-size:22px;font-variant-numeric:tabular-nums">в общий доступ через 21 : 40</div>
        </div>`)}
      </section>` : ''}

      <div class="ed-buy">${member
        ? hot('drop', 'before', `<div class="ed-btn ed-btn--ghost">Смотреть дропы</div>`)
        : `<div class="ed-btn">Вступить в программу</div>`}</div>
    </div>`;
  },

  /* 15 · оригинальность и цифровой паспорт — визуальная версия */
  authenticity: (st) => {
    const head = (t) => `
      <header class="ed-header">
        <div class="ed-header__bar">
          <div class="w-row" style="gap:12px">
            <span class="w-hot" data-go="pdp" data-state="default" style="font-size:17px">‹</span>
            <div class="ed-logo w-hot" data-go="home" data-state="default" style="font-size:13px;letter-spacing:.1em">${t}</div>
          </div>
          <div class="ed-icons">
            <button class="ed-ico w-hot w-hot--tight" data-go="cart" data-state="default" aria-label="Корзина">${ico('bag')}</button>
          </div>
        </div>
      </header>`;

    if (st === 'passport') {
      return `<div class="ed">${head('Цифровой паспорт')}
        <section class="ed-sec--tight" style="padding-top:22px">
          ${pin(1)}
          <div class="w-row" style="gap:14px;margin-bottom:20px">
            <div style="width:88px;flex:0 0 auto">${edPh(160, 200, '')}</div>
            <div>
              <div class="ed-p__brand" style="margin-top:0">MAX MARA</div>
              <div class="ed-p__name">Пальто из шерсти и кашемира</div>
              <div class="ed-sm" style="margin-top:6px">Style ID 4109-A</div>
            </div>
          </div>
          <div style="border:1px solid var(--e-ink);padding:18px;margin-bottom:18px">
            <div class="ed-label" style="margin-bottom:12px">Оригинал · можно проверить самому</div>
            <div class="ed-rows">
              ${[['Производитель', 'подтверждён правообладателем'], ['Партия', 'AW-2026-118'], ['Продавец', 'в белом списке'], ['Метка', 'NFC в подкладке']]
                .map(([k, v]) => `<div class="ed-rows__i"><span>${k}</span><span>${v}</span></div>`).join('')}
            </div>
          </div>
          ${hot('authenticity', 'result', `<div class="ed-btn">Проверить метку на вещи</div>`)}
          <p class="ed-sm" style="margin-top:12px;text-align:center">Проверка доступна после получения заказа</p>
        </section>
      </div>`;
    }

    if (st === 'result') {
      return `<div class="ed">${head('Проверка')}
        <div class="ed-empty" style="padding-top:80px">
          <div style="width:60px;height:60px;border:1px solid var(--e-ink);border-radius:50%;margin:0 auto 22px;display:grid;place-items:center;font-size:22px">✓</div>
          <div class="ed-empty__t" style="font-size:26px">Метка подтверждена</div>
          <p class="ed-empty__d">Партия AW-2026-118, зарегистрирована производителем 14 августа 2026 года.</p>
        </div>
        <section class="ed-sec--tight">
          ${pin(2)}
          <p class="ed-t" style="text-align:center;color:var(--e-mute)">Это <b style="color:var(--e-ink)">вы</b> проверили вещь, а не мы пообещали.</p>
        </section>
        <div class="ed-buy">${hot('pdp', 'default', `<div class="ed-btn ed-btn--ghost">Вернуться к товару</div>`)}</div>
      </div>`;
    }

    if (st === 'hidden') {
      return `<div class="ed">${head('')}
        <div class="ed-empty" style="padding-top:100px">
          <div class="ed-empty__t">Товар временно недоступен</div>
          <p class="ed-empty__d">Вернём в продажу, когда закончим проверку.</p>
          <div style="max-width:240px;margin:0 auto">${hot('listing', 'default', `<div class="ed-btn ed-btn--ghost">Похожие вещи</div>`)}</div>
        </div>
        <div style="padding:0 20px">${pin(3)}</div>
      </div>`;
    }

    return `<div class="ed">${head('Как мы проверяем')}
      <section class="ed-sec" style="background:var(--e-soft)">
        ${pin(2)}
        <h1 class="ed-h1" style="font-size:30px;margin-bottom:12px">Оригинал —<br>это условие входа</h1>
        <p class="ed-t" style="color:var(--e-mute);max-width:40ch">Вещей, в подлинности которых мы не уверены, в разделе нет. Плашка «Оригинал» это утверждает, а не предполагает.</p>
      </section>

      <section class="ed-sec--tight">
        <div style="display:grid;gap:20px">
          ${[['Документы', 'Проверяем документы на партию и права на бренд'],
             ['Белый список', 'Продавать в разделе может не каждый'],
             ['Правообладатель', 'Подтверждение от бренда или официального дистрибутора'],
             ['Гарантия площадки', 'Если вещь окажется неоригинальной — вернём деньги полностью']]
            .map(([t, d]) => `
              <div class="ed-value__i">
                <span class="ed-usp__ico">${ico('orig')}</span>
                <div><div class="ed-value__t">${t}</div><div class="ed-value__d">${d}</div></div>
              </div>`).join('')}
        </div>
      </section>

      <section class="ed-sec--tight" style="border-top:1px solid var(--e-line)">
        ${pin(1)}
        <div class="ed-label ed-label--mute" style="margin-bottom:10px">Второй уровень</div>
        <h2 class="ed-h2" style="margin-bottom:10px">У части вещей есть<br>цифровой паспорт</h2>
        <p class="ed-t" style="color:var(--e-mute);margin-bottom:16px">Возможность проверить вещь самостоятельно после получения. Это дополнение, а не деление на проверенное и непроверенное.</p>
        ${hot('authenticity', 'passport', `<div class="ed-btn ed-btn--ghost">Посмотреть, как это выглядит</div>`)}
        <div style="margin-top:14px">${pin(4)}</div>
      </section>
    </div>`;
  },

  /* 16 · избранное и подписки — визуальная версия */
  favorites: (st) => {
    const head = () => `
      <header class="ed-header">
        <div class="ed-header__bar">
          <div class="ed-logo" style="font-size:13px;letter-spacing:.1em">Избранное</div>
          <div class="ed-icons">
            <button class="ed-ico w-hot w-hot--tight" data-go="cart" data-state="default" aria-label="Корзина">${ico('bag')}</button>
          </div>
        </div>
        <div class="ed-bar__row" style="padding-top:0">
          ${[['Вещи', st === 'default'], ['Подписки', st === 'subs'], ['Дропы', 0]]
            .map(([t, on]) => `<span class="ed-chip"${on ? ' data-on' : ''}>${t}</span>`).join('')}
        </div>
      </header>`;

    if (st === 'empty') {
      return `<div class="ed">${head()}
        <div class="ed-empty" style="padding-top:80px">
          ${pin(2)}
          <div class="ed-empty__t">Здесь появится то,<br>что вы отметили</div>
          <p class="ed-empty__d">А пока — то, что куратор собрал на этой неделе.</p>
          <div style="max-width:250px;margin:0 auto">${hot('assistant', 'set', `<div class="ed-btn">Смотреть подборку</div>`)}</div>
        </div>
        ${edBottom(4)}
      </div>`;
    }

    if (st === 'subs') {
      return `<div class="ed">${head()}
        <section class="ed-sec--tight">
          ${pin(1)}
          <div style="border:1px solid var(--e-ink);padding:14px;margin-bottom:22px">
            <div class="w-row" style="gap:12px">
              <div style="width:22px;height:22px;border:1px solid var(--e-ink);border-radius:50%;display:grid;place-items:center;font-size:11px">✓</div>
              <div class="ed-t">Сообщим, когда появится <b>размер 44</b>. Одно уведомление, без рассылки.</div>
            </div>
          </div>
          <div class="ed-label ed-label--mute" style="margin-bottom:12px">Ваши подписки</div>
          <div class="ed-rows">
            ${[['MAX MARA', 'бренд · новинки и дропы'], ['USHATÁVA × WB', 'дроп · старт 14 ноября'], ['Пальто из шерсти, 44', 'вещь · сообщить о поступлении']]
              .map(([t, d]) => `<div class="ed-rows__i"><span><span style="font-weight:500">${t}</span><span class="ed-catlist__note" style="display:block;margin-top:2px">${d}</span></span><span>отписаться</span></div>`).join('')}
          </div>
        </section>
        ${edBottom(4)}
      </div>`;
    }

    return `<div class="ed">${head()}
      <div class="ed-grid">
        ${[['MAX MARA', 'Пальто из шерсти', '39 000 ₽', ''], ['COS', 'Пальто-кокон', '21 300 ₽', 'цена снизилась'],
          ['12 STOREEZ', 'Жакет', '17 400 ₽', ''], ['LEVI’S', 'Джинсы', '5 400 ₽', 'остался размер 29']]
          .map(([b, n, pr, note]) => hot('pdp', 'default', `
            <div class="ed-p">${edPh(300, 380, '')}<div class="ed-p__brand">${b}</div><div class="ed-p__name">${n}</div><div class="ed-p__price">${pr}</div>${note ? `<div class="ed-p__name" style="margin-top:5px">${note}</div>` : ''}</div>`)).join('')}
      </div>
      ${edBottom(4)}
    </div>`;
  },

  /* 17 · корзина и покупка — визуальная версия */
  cart: (st) => {
    if (st === 'done') {
      return `<div class="ed">
        <header class="ed-header"><div class="ed-header__bar"><div class="ed-logo w-hot" data-go="home" data-state="default" style="font-size:12px"><i></i>WB Бренды</div><div class="ed-icons">
            <button class="ed-ico w-hot w-hot--tight" data-go="cart" data-state="default" aria-label="Корзина">${ico('bag')}</button>
          </div></div></header>
        <div class="ed-empty" style="padding-top:80px">
          <div style="width:60px;height:60px;border:1px solid var(--e-ink);border-radius:50%;margin:0 auto 22px;display:grid;place-items:center;font-size:22px">✓</div>
          <div class="ed-empty__t" style="font-size:26px">Заказ оформлен</div>
          <p class="ed-empty__d">Придёт послезавтра в ПВЗ на Ленина, 14. В премиальной упаковке.</p>
        </div>
        <section class="ed-sec--tight">
          ${pin(3)}
          <p class="ed-sm" style="text-align:center">У пальто есть цифровой паспорт — проверить метку можно будет после получения.</p>
        </section>
        <section class="ed-sec--tight" style="display:grid;gap:10px">
          ${hot('authenticity', 'passport', `<div class="ed-btn ed-btn--ghost">Цифровой паспорт вещи</div>`)}
          ${hot('home', 'default', `<div class="ed-btn ed-btn--ghost">Вернуться в раздел</div>`)}
        </section>
      </div>`;
    }

    return `<div class="ed">
      <header class="ed-header">
        <div class="ed-header__bar">
          <div class="w-row" style="gap:12px">
            <span class="w-hot" data-go="pdp" data-state="default" style="font-size:17px">‹</span>
            <div class="ed-logo w-hot" data-go="home" data-state="default" style="font-size:13px;letter-spacing:.1em">Корзина</div>
          </div>
          <div class="ed-icons">
            <button class="ed-ico w-hot w-hot--tight" data-go="cart" data-state="default" aria-label="Корзина">${ico('bag')}</button>
          </div>
        </div>
      </header>

      <section class="ed-sec--tight">
        ${pin(1)}
        <div class="ed-label ed-label--mute" style="margin-bottom:16px">Из раздела WB Бренды</div>
        <div style="display:grid;gap:20px">
          ${[['MAX MARA', 'Пальто из шерсти · 44 · камель', '39 000 ₽'], ['COS', 'Шарф кашемировый · one size', '7 900 ₽']]
            .map(([b, n, pr]) => `
              <div class="w-row" style="gap:14px;align-items:flex-start">
                <div style="width:72px;flex:0 0 auto">${edPh(120, 160, '')}</div>
                <div style="flex:1">
                  <div class="ed-p__brand" style="margin-top:0">${b}</div>
                  <div class="ed-p__name">${n}</div>
                  <div class="w-row w-row--between" style="margin-top:8px">
                    <span class="ed-p__price" style="margin:0">${pr}</span>
                    <span class="ed-trust ed-trust--ghost" style="padding:4px 8px;font-size:10px">Оригинал</span>
                  </div>
                </div>
              </div>`).join('')}
        </div>
      </section>

      <section class="ed-sec--tight">
        ${pin(2)}
        <div class="ed-rows">
          ${[['Доставка', 'послезавтра · бесплатно'], ['Упаковка', 'премиальная'], ['Возврат', '14 дней']]
            .map(([k, v]) => `<div class="ed-rows__i"><span>${k}</span><span>${v}</span></div>`).join('')}
        </div>
        <p class="ed-sm" style="margin-top:14px">Вещей из-за рубежа в заказе нет. Если бы были — срок, пошлина и условия возврата раскрывались бы здесь, до оплаты.</p>
      </section>

      <section class="ed-sec--tight">
        <div class="ed-rows"><div class="ed-rows__i" style="border-bottom:0"><span style="font-size:17px;font-weight:500">Итого</span><span style="font-size:17px;font-weight:500;color:var(--e-ink)">46 900 ₽</span></div></div>
      </section>

      <div class="ed-buy">${hot('cart', 'done', `<div class="ed-btn">Оформить заказ</div>`)}</div>
    </div>`;
  },
};
