/* ============================================================
   WIRE · desktop-каркасы (1440, рабочая область от 1280)
   Desktop — самостоятельная адаптация, а не растянутый мобильный
   ============================================================ */

import { ph, pin, hot, bars, chip, badge, btn, rule, pcard,
         edPh, edP, edBrand, edHeader, edCatalog, edFab, edChat, edMarquee, ico, slideProd, CATS, catsMore, catsRest, LOOK, BRANDS, USP, USP_CLUB } from './wire.js?v=dda2b1d8';

const dheader = (active = 0, mode = '') => `
  <header class="w-dheader">
    <div class="w-dheader__top">
      <div class="w-logo" style="font-size:17px">WB <b>БРЕНДЫ</b>${mode ? `<span style="font-weight:400;color:var(--w-ink-mid)"> / ${mode}</span>` : ''}</div>
      <div class="w-dsearch">Поиск по брендам, вещам и материалам</div>
      <div class="w-row" style="gap:18px">
        <span class="w-tsm">Куратор</span>
        <span class="w-tsm">Лояльность</span>
        <span class="w-tsm">Избранное</span>
        <span class="w-tsm">Корзина · 2</span>
      </div>
    </div>
    <div class="ed-catbar ed-catbar--wide">
      <nav class="w-dheader__nav">
        ${[...CATS, 'Бренды A–Z', 'Дропы', 'Журнал', 'Аутлет']
          .map((t, i) => `<span class="w-hot" data-go="listing" data-state="default"${i === active ? ' data-on' : ''}>${t}</span>`).join('')}
        ${catsRest('span')}
      </nav>
      ${catsMore()}
    </div>
  </header>`;

const dsecHead = (title, link = 'Смотреть все') => `
  <div class="w-row w-row--between" style="margin-bottom:24px">
    <h2 class="w-h2">${title}</h2>
    ${link ? `<span class="w-tsm">${link} →</span>` : ''}
  </div>`;

export const DESKTOP = {

  /* 01 · поиск внутри раздела — визуальная версия */
  search: (st) => {
    if (st === 'empty') {
      return `<div class="ed ed--d">
        ${edHeader(false, -1, true, true)}
        <div class="ed-empty">
          ${pin(3)}
          <div class="ed-empty__t">По запросу «пальтоо оверсайc»<br>ничего не нашлось</div>
          <p class="ed-empty__d" style="font-size:15px">Возможно, вы имели в виду <b style="color:var(--e-ink);border-bottom:1px solid var(--e-ink)">пальто оверсайз</b></p>
        </div>
        <section class="ed-sec" style="border-top:1px solid var(--e-line)">
          ${pin(2)}
          <div class="ed-head"><h2 class="ed-h2">Похоже на то, что вы искали</h2></div>
          <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:26px">
            ${['COS', 'MAX MARA', '12 STOREEZ', 'LIME', 'BOSS'].map((b) => edP({ brand: b, name: 'Пальто оверсайз', price: '21 300 ₽' })).join('')}
          </div>
        </section>
      </div>`;
    }

    return `<div class="ed ed--d">
      ${edHeader(false, -1, true, true)}
      <section class="ed-sec" style="padding-bottom:22px">
        ${pin(1)}
        <h1 class="ed-h1" style="font-size:44px;margin-bottom:10px">пальто</h1>
        <p class="ed-sm">412 результатов · 6 брендов · 8 материалов</p>
      </section>
      <div class="ed-bar">
        <div class="ed-bar__row">${['Всё · 412', 'Бренды · 6', 'Вещи · 398', 'Журнал · 8'].map((t, i) => `<span class="ed-chip"${i === 0 ? ' data-on' : ''}>${t}</span>`).join('')}</div>
      </div>
      <section class="ed-sec">
        <div style="display:grid;grid-template-columns:300px minmax(0,1fr);gap:56px">
          <aside>
            <div class="ed-label ed-label--mute" style="margin-bottom:16px">Бренды</div>
            <div style="display:grid;gap:16px">
              ${[['MAX MARA', 'люкс · 214', 'default'], ['12 STOREEZ', 'российский · 168', 'concept'], ['COS', 'премиум · 96', 'default']]
                .map(([b, d, gs]) => hot('brand', gs, `
                  <div class="w-row" style="gap:14px;align-items:center">
                    <div style="width:52px;flex:0 0 auto">${edPh(100, 100, '')}</div>
                    <div><div class="ed-p__brand" style="margin-top:0">${b}</div><div class="ed-p__name">${d}</div></div>
                  </div>`)).join('')}
            </div>
            <div class="ed-label ed-label--mute" style="margin:34px 0 16px">Журнал</div>
            <div style="display:grid;gap:16px">
              ${[['Гид', 'Пальто, которое переживёт сезон'], ['Тренд', 'Тихий люкс по-русски']]
                .map(([k, t]) => hot('journal', 'article', `<div><div class="chat-art__k">${k}</div><div class="chat-art__t" style="font-size:17px">${t}</div></div>`)).join('')}
            </div>
            ${pin(2)}
            ${hot('assistant', 'entry', `
            <div class="ed-value__i" style="border:1px solid var(--e-line);padding:16px;margin-top:32px">
              <span class="ed-usp__ico">${ico('chat')}</span>
              <div><div class="ed-value__t">Описать словами</div><div class="ed-value__d">Куратор найдёт по описанию</div></div>
            </div>`)}
          </aside>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:40px 26px">
            ${['MAX MARA', 'COS', '12 STOREEZ', 'BOSS', 'LIME', 'MARC O’POLO'].map((b) => edP({ brand: b, name: 'Пальто', price: '21 300 ₽', ratio: [320, 420] })).join('')}
          </div>
        </div>
      </section>
    </div>`;
  },

  /* 02 · главная — визуальная версия */
  home: (st) => {
    if (st === 'loading') {
      return `<div class="ed ed--d">
        ${edHeader(false, 0, true)}
        <div class="w-skel" style="height:620px"></div>
        <div class="ed-sec"><div class="w-skel" style="height:16px;width:22%"></div><div class="w-skel" style="height:44px;width:46%;margin-top:18px"></div></div>
      </div>`;
    }

    const catalogOpen = st === 'catalog';
    const chatOpen = st === 'assistant';
    const hasDrop = st !== 'nodrop';

    const sis = (o) => `
      <section class="ed-sisd${o.mirror ? ' ed-sisd--mirror' : ''}">
        ${o.mirror ? `
        <div class="ed-sisd__rail">
          ${o.items.map(([n, pr]) => edP({ brand: o.brand, name: n, price: pr, w: 0, ratio: [330, 440] })).join('')}
        </div>` : ''}
        <div class="ed-sisd__banner">
          <div class="ed-sis__head" style="padding-left:48px">
            <div class="ed-sis__brand"><i></i>${o.brand}</div>
            ${hot('sis', o.state, `<span class="ed-link">В магазин</span>`)}
          </div>
          ${hot('sis', o.state, `
          <div class="ed-hero ed-fill" style="${o.mirror ? 'margin-right:48px' : 'margin-left:48px'};height:600px">
            ${edPh(560, 640, '', 'sis', o.asset || '', o.position || 'center')}
            <div class="ed-hero__tab">Смотреть <span>›</span></div>
          </div>`)}
        </div>
        ${!o.mirror ? `
        <div class="ed-sisd__rail">
          ${o.items.map(([n, pr]) => edP({ brand: o.brand, name: n, price: pr, w: 0, ratio: [330, 440] })).join('')}
        </div>` : ''}
      </section>`;

    return `<div class="ed ed--d">
      ${pin(1)}
      ${edHeader(catalogOpen, 0, true)}
      ${catalogOpen ? `<div class="ed-catalog" style="display:grid;grid-template-columns:repeat(4,1fr);gap:40px">${edCatalog().replace('<div class="ed-catalog">', '').replace(/<\/div>\s*$/, '')}
        <div>${hot('journal', 'article', `${edPh(300, 200, '')}<div class="ed-art__t" style="font-size:15px;margin-top:12px">ПАЛЬТО, КОТОРОЕ ПЕРЕЖИВЁТ СЕЗОН</div>`)}</div>
      </div>` : ''}

      <!-- кампания-карусель во всю ширину -->
      ${hot('slide-journal', 'cover', `
      <div class="ed-hero">
        ${pin(2)}
        ${edPh(1440, 660, '', 'campaign', 'banner-16', 'center')}
        <div class="ed-hero__copy ed-hero__copy--dark">
          <div class="ed-label" style="margin-bottom:16px">Кампания недели</div>
          <h1 class="ed-h1">Спокойный объём</h1>
          <p class="ed-t" style="margin-top:16px;font-size:16px;max-width:440px">Двенадцать вещей, которые задают силуэт сезона, и объяснение, почему именно они.</p>
        </div>
        <div class="ed-progress ed-progress--dark">${[0, 1, 2, 3].map((i) => `<i${i === 0 ? ' data-on' : ''}></i>`).join('')}</div>
        <div class="ed-hero__tab">Смотреть <span>›</span></div>
      </div>`)}
      ${edMarquee()}

      <!-- объяснённая подборка (редакционная, ассистент свёрнут в кнопку) -->
      <section class="ed-sec ed-featured-section">
        ${pin(9)}
        <div class="ed-head">
          <div>
            <h2 class="ed-h2">Собрано для вас</h2>
            <p class="ed-sm" style="margin-top:8px;max-width:56ch">Спокойные оттенки и свободный силуэт — вы как раз такие вещи и смотрели</p>
          </div>
          ${hot('assistant', 'set', `<span class="ed-link">Ещё</span>`)}
        </div>
        <div class="ed-featured-products">
          ${['Пальто камель', 'Пальто-кокон', 'Тренч', 'Пальто-халат'].map((n, i) => edP({ brand: ['MAX MARA', 'COS', 'MARC O’POLO', 'USHATÁVA'][i], name: n, price: '21 300 ₽', ratio: [300, 380], w: 0 })).join('')}
        </div>
      </section>

      <!-- бренды словами -->
      <section class="ed-sec ed-brands-intro" style="padding-bottom:0">
        ${pin(4)}
        <div class="ed-head">
          <h2 class="ed-h2">Кого мы отобрали</h2>
          ${hot('brands-az', 'default', `<span class="ed-link">Все бренды</span>`)}
        </div>
      </section>
      <div class="ed-rail" style="padding-bottom:64px">
        ${BRANDS.map((b) => edBrand(b)).join('')}
      </div>


      ${hasDrop ? hot('drop', 'before', `
      <section class="ed-drop">
        ${pin(4)}
        <div>
          <div class="ed-label" style="color:rgba(255,255,255,.6);margin-bottom:14px">Дроп · 14 ноября, 12:00</div>
          <div class="ed-h1" style="color:#fff;font-size:44px">USHATÁVA × WB</div>
          <p class="ed-t" style="color:rgba(255,255,255,.72);margin-top:12px;max-width:52ch;font-size:15px">Капсула из восьми вещей. Ранний доступ для участников программы за 24 часа до общего старта.</p>
        </div>
        <div>
          <div class="ed-label" style="color:rgba(255,255,255,.6);margin-bottom:10px">До старта</div>
          <div class="ed-drop__timer">01 : 22 : 40</div>
          <div class="ed-drop__cta" style="margin-top:20px">Напомнить</div>
        </div>
      </section>`) : `<div>${pin(4)}</div>`}

      <!-- новинки -->
      <section class="ed-sec">
        <div class="ed-head">
          <h2 class="ed-h2">Новое на этой неделе</h2>
          ${hot('listing', 'default', `<span class="ed-link">Все 214</span>`)}
        </div>
        <div class="ed-home-product-grid">
          ${[['MAX MARA', 'Пальто из шерсти', '39 000 ₽'], ['COS', 'Пальто-кокон', '21 300 ₽'], ['12 STOREEZ', 'Жакет прямой', '17 400 ₽'], ['MARC O’POLO', 'Тренч', '24 000 ₽']]
            .map(([b, n, pr]) => edP({ brand: b, name: n, price: pr, w: 0, ratio: [300, 380] })).join('')}
        </div>
      </section>

      <!-- shop-in-shop: товары уезжают за баннер -->
      ${pin(5)}
      ${sis({ brand: 'MARC O’POLO', state: 'custom', asset: 'banner-15', position: '67% center', items: [['Куртка замшевая', '38 900 ₽'], ['Футболка', '4 200 ₽'], ['Кепка', '3 400 ₽'], ['Джинсы', '9 800 ₽'], ['Рубашка', '7 900 ₽']] })}

      <div class="ed-rule" style="margin:0 48px"></div>

      <!-- журнал · точка входа 1 -->
      <section class="ed-sec ed-journal-section">
        ${pin(7)}
        <div class="ed-head">
          <h2 class="ed-h2">Журнал</h2>
          ${hot('journal', 'default', `<span class="ed-link">Все материалы</span>`)}
        </div>
        <div class="ed-features">
          ${[['Интервью', '29 июл', 'РАБОТА КАК ЛЮБОВЬ: РАЗГОВОР С 12 STOREEZ'], ['Гид', '26 июл', 'ПАЛЬТО, КОТОРОЕ ПЕРЕЖИВЁТ СЕЗОН'], ['Тренд', '22 июл', 'ТИХИЙ ЛЮКС ПО-РУССКИ']]
            .map(([k, d, t]) => hot('journal', 'article', `
              <div>
                ${edPh(420, 300, '')}
                <div class="w-row" style="gap:12px;margin-top:16px;align-items:center"><span class="ed-art__tag">${k}</span><span class="ed-art__date">${d}</span></div>
                <div class="ed-art__t">${t}</div>
              </div>`)).join('')}
        </div>
      </section>

      <!-- lifestyle во весь экран -->
      ${hot('listing', 'default', `
      <section class="ed-life">
        ${pin(8)}
        ${edPh(1440, 620, '', 'lifestyle', 'banner-lifestyle-wide', 'center')}
        <div class="ed-life__copy" style="color:var(--e-ink)">
          <div class="ed-label" style="margin-bottom:14px">Категория</div>
          <div class="ed-h1">Дом и вещи</div>
          <p class="ed-t" style="margin-top:14px;max-width:38ch;font-size:15px">Дом, ароматы, книги и предметы, из которых собирается остальная часть жизни.</p>
          <div class="ed-link" style="display:inline-block;margin-top:20px">Смотреть</div>
        </div>
      </section>`)}

      <!-- второй shop-in-shop, зеркальный -->
      ${pin(9)}
      ${sis({ brand: '12 STOREEZ', state: 'default', mirror: true, asset: 'banner-18', position: '68% center', items: [['Пальто', '27 800 ₽'], ['Костюм', '31 400 ₽'], ['Рубашка', '8 900 ₽'], ['Ботинки', '19 200 ₽'], ['Сумка', '12 400 ₽']] })}

      <!-- журнал · точка входа 2 -->
      ${hot('slide-journal', 'cover', `
      <section class="ed-sec" style="padding-top:0">
        ${pin(7)}
        <div style="display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);gap:48px;align-items:center">
          ${edPh(800, 520, '')}
          <div>
            <div class="ed-label" style="margin-bottom:14px">Слайд-журнал · 6 слайдов</div>
            <div class="ed-h1" style="font-size:40px">Как носить объём,<br>чтобы он не носил вас</div>
            <div class="ed-link" style="display:inline-block;margin-top:22px">Открыть историю</div>
          </div>
        </div>
      </section>`)}

      <!-- аутлет -->
      ${hot('outlet', 'default', `
      <section class="ed-sec" style="background:var(--e-soft)">
        ${pin(11)}
        <div style="display:grid;grid-template-columns:minmax(0,1fr) 520px;gap:60px;align-items:center">
          <div>
            <div class="ed-label" style="margin-bottom:14px">Аутлет</div>
            <h2 class="ed-h1" style="font-size:48px">Прошлые коллекции<br>тех же брендов</h2>
            <p class="ed-t" style="margin-top:16px;max-width:48ch;font-size:15px">Оригинал из коллекции прошлого сезона. Это единственная причина цены — и мы говорим об этом прямо.</p>
            <div class="ed-link" style="display:inline-block;margin-top:22px">Перейти в аутлет</div>
          </div>
          ${edPh(520, 340, '')}
        </div>
      </section>`)}

      <!-- подпись автора ставит signScreens() на каждый экран, см. interact.js -->

      ${pin(11)}
      ${chatOpen ? edChat(true) : (st === 'no-ai' ? '' : edFab())}
    </div>`;
  },

  /* 03 · каталог и категории — визуальная версия */
  catalog: (st) => {
    const col = (t, items, go = 'catalog', gs = 'l2') => `
      <div>
        <div class="ed-catcol__t">${t}</div>
        <div class="ed-catlist">
          ${items.map((i) => `<div class="ed-catlist__i w-hot" data-go="${go}" data-state="${gs}"><span>${i}</span><span>›</span></div>`).join('')}
        </div>
      </div>`;

    if (st === 'l2') {
      return `<div class="ed ed--d">
        ${edHeader(false, 0, true, false)}
        <section class="ed-sec" style="padding-bottom:28px">
          ${pin(4)}
          <div class="ed-sm" style="margin-bottom:14px">Каталог / Женщины / Одежда</div>
          <h1 class="ed-h1" style="font-size:52px">Одежда</h1>
        </section>
        ${hot('listing', 'default', `
        <div class="ed-hero">
          ${edPh(1440, 480, '')}
          <div class="ed-hero__copy ed-hero__copy--dark">
            <div class="ed-label" style="margin-bottom:12px">Женщины · осень</div>
            <div class="ed-h1" style="font-size:44px">Пальто и куртки</div>
          </div>
          <div class="ed-hero__tab">Смотреть <span>›</span></div>
        </div>`)}
        <section class="ed-sec">
          <div class="ed-catcols">
            ${col('Верх', ['Пальто и куртки', 'Жакеты', 'Трикотаж', 'Рубашки и блузы'])}
            ${col('Низ', ['Брюки', 'Джинсы', 'Юбки', 'Шорты'])}
            ${col('Целиком', ['Платья', 'Костюмы', 'Комбинезоны'])}
            ${col('Базовое', ['Футболки', 'Белье', 'Домашняя одежда'])}
            <div>
              ${hot('journal', 'article', `${edPh(320, 220, '')}<div class="ed-art__t" style="font-size:15px;margin-top:14px">ПАЛЬТО, КОТОРОЕ ПЕРЕЖИВЁТ СЕЗОН</div>`)}
            </div>
          </div>
          <div style="margin-top:40px;width:320px">
            ${hot('listing', 'default', `<div class="ed-drop__cta" style="border-color:var(--e-ink);color:var(--e-ink)">Смотреть всю одежду · 2 480</div>`)}
          </div>
        </section>
      </div>`;
    }

    return `<div class="ed ed--d">
      ${edHeader(false, 0, true, false)}

      <section class="ed-sec" style="padding-bottom:26px">
        ${pin(1)}
        <div style="display:grid;grid-template-columns:minmax(0,1fr) 460px;gap:60px;align-items:end">
          <h1 class="ed-h1" style="font-size:56px">Каталог</h1>
          ${hot('search', 'suggest', `<div class="ed-field">${ico('search')}<span>Поиск по брендам, вещам и материалам</span></div>`)}
        </div>
      </section>

      <div class="ed-catbar ed-catbar--wide">
        <nav class="ed-tabs">
          ${pin(2)}
          ${CATS.map((t, i) => `<span class="w-hot" data-go="listing" data-state="default"${i === 0 ? ' data-on' : ''}>${t}</span>`).join('')}
          ${catsRest('span')}
        </nav>
        ${catsMore()}
      </div>

      <section class="ed-sec">
        ${pin(4)}
        <div class="ed-catcols">
          ${col('Одежда', ['Пальто и куртки', 'Платья', 'Трикотаж', 'Брюки', 'Костюмы', 'Джинсы'])}
          ${col('Обувь и сумки', ['Ботинки', 'Кроссовки', 'Туфли', 'Сумки', 'Ремни'])}
          ${col('Украшения и красота', ['Украшения', 'Часы', 'Уход', 'Ароматы'])}
          ${col('По подаче', ['Новинки', 'Дропы', 'Подборки стилиста', 'Все бренды A–Z', 'Аутлет'], 'listing', 'default')}
          <div>
            ${hot('journal', 'article', `${edPh(320, 240, '')}<div class="w-row" style="gap:10px;margin-top:14px;align-items:center"><span class="ed-art__tag">Гид</span><span class="ed-art__date">26 июл</span></div><div class="ed-art__t" style="font-size:15px">ПАЛЬТО, КОТОРОЕ ПЕРЕЖИВЁТ СЕЗОН</div>`)}
          </div>
        </div>
      </section>

      <!-- кампании категорий -->
      <section class="ed-sec" style="padding-top:0">
        ${pin(3)}
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:26px">
          ${[['Новое', 'Спокойный объём', 'slide-journal', 'cover'], ['Дроп · через 2 дня', 'USHATÁVA × WB', 'drop', 'before'], ['Категория', 'Дом и вещи', 'listing', 'default']]
            .map(([k, t, go, gs]) => hot(go, gs, `
              <div class="ed-hero">
                ${edPh(420, 300, '')}
                <div class="ed-hero__copy ed-hero__copy--dark" style="left:22px;right:22px;bottom:22px">
                  <div class="ed-label" style="margin-bottom:6px">${k}</div>
                  <div class="ed-h3" style="font-size:20px">${t}</div>
                </div>
              </div>`)).join('')}
        </div>
      </section>

      <div style="border-top:1px solid var(--e-line)">${pin(5)}</div>

      ${edFab()}
    </div>`;
  },

  /* 04 · бренды A–Z — визуальная версия */
  'brands-az': (st) => `<div class="ed ed--d">
    ${edHeader(false, -1, true, true)}
    <section class="ed-sec" style="padding-bottom:26px">
      <h1 class="ed-h1" style="font-size:52px;margin-bottom:20px">640 брендов</h1>
      ${pin(2)}
      <div class="w-row" style="gap:10px">
        ${[['Все', st !== 'tier'], ['Популярные', 0], ['Премиум', st === 'tier'], ['Люкс', 0], ['Российские', 0], ['Официальное присутствие', 0]]
          .map(([t, on]) => `<span class="ed-chip"${on ? ' data-on' : ''}>${t}</span>`).join('')}
      </div>
    </section>

    <div style="border-top:1px solid var(--e-line);border-bottom:1px solid var(--e-line);padding:16px 48px">
      ${pin(1)}
      <div class="w-row" style="gap:16px;font-size:13px;color:var(--e-mute)">
        ${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((l) => `<span>${l}</span>`).join('')}
        <span style="margin-left:20px">А Б В Г Д Е Ж З И К Л М Н</span>
      </div>
    </div>

    <section class="ed-sec">
      ${['A', 'B'].map((letter) => `
        <div style="margin-bottom:48px">
          <div class="ed-h2" style="margin-bottom:22px">${letter}</div>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0 48px">
            ${Array.from({ length: 8 }, (_, i) => hot('brand', i % 3 === 0 ? 'concept' : 'default', `
              <div class="ed-rows__i">
                <span>
                  <span style="font-weight:500;letter-spacing:.02em">${['ACNE STUDIOS', 'ARNY PRAHT', 'ADIDAS', 'AERONAUTICA', 'BOSS', 'BEFREE', 'BALENCIAGA', 'BRUNELLO'][i]}</span>
                  <span class="ed-catlist__note" style="display:block;margin-top:2px">${['популярные', 'премиум', 'люкс', 'российский'][i % 4]} · ${120 + i * 17}</span>
                </span>
                <span>${pin(3)}следить</span>
              </div>`)).join('')}
          </div>
        </div>`).join('')}
    </section>
  </div>`,

  /* 05 · категорийный листинг — визуальная версия */
  listing: (st) => {
    const items = [
      ['MAX MARA', 'Пальто из шерсти', '39 000 ₽', 'премиум'],
      ['COS', 'Пальто-кокон', '21 300 ₽', 'премиум'],
      ['12 STOREEZ', 'Пальто оверсайз', '27 800 ₽', 'российский'],
      ['MARC O’POLO', 'Тренч из хлопка', '24 000 ₽', 'премиум'],
      ['BOSS', 'Пальто двубортное', '54 000 ₽', 'премиум'],
      ['LIME', 'Пальто прямое', '12 900 ₽', 'российский'],
      ['USHATÁVA', 'Пальто-халат', '46 000 ₽', 'российский'],
      ['LACOSTE', 'Куртка', '22 400 ₽', 'популярные'],
    ];

    const bar = (on = false) => `
      <div class="ed-bar">
        ${pin(2)}
        <div class="ed-bar__row" style="justify-content:space-between">
          <div class="w-row" style="gap:8px">
            ${hot('listing', 'filters', `<span class="ed-chip"${on ? ' data-on' : ''}>Фильтры ⌄</span>`)}
            ${['Новинки', 'Премиум', 'Шерсть', '44–46', 'Кросс-бордер'].map((t) => `<span class="ed-chip">${t}</span>`).join('')}
          </div>
          <div class="w-row" style="gap:22px">
            <span class="ed-sm">412 вещей</span>
            <span class="ed-sm">Сначала новинки ⌄</span>
            <div class="ed-density">${[0, 1, 2].map((i) => `<i${i === 1 ? ' data-on' : ''}></i>`).join('')}</div>
          </div>
        </div>
      </div>`;

    const grid = (from, to, cols = 4) => `
      <div class="ed-grid" style="grid-template-columns:repeat(${cols},1fr)">
        ${items.slice(from, to).map(([b, n, pr, tier]) => hot('pdp', 'default', `
          <div class="ed-p">
            ${edPh(320, 420, '')}
            <div class="ed-p__brand">${b}</div>
            <div class="ed-p__name">${n}</div>
            <div class="ed-p__price">${pr}</div>
            <div class="ed-p__name" style="margin-top:5px">${tier}</div>
          </div>`)).join('')}
      </div>`;

    if (st === 'loading') {
      return `<div class="ed ed--d">${edHeader(false, 0, true, true)}${bar()}
        <div class="ed-grid">
          ${Array.from({ length: 8 }, () => `<div><div class="w-skel" style="aspect-ratio:320/420"></div><div class="w-skel" style="height:12px;margin-top:14px"></div><div class="w-skel" style="height:12px;width:55%;margin-top:8px"></div></div>`).join('')}
        </div>
      </div>`;
    }

    if (st === 'empty') {
      return `<div class="ed ed--d">${edHeader(false, 0, true, true)}
        <div class="ed-bar"><div class="ed-bar__row">${['Премиум', '44–46', 'до 10 000 ₽'].map((t) => `<span class="ed-chip" data-on>${t} ✕</span>`).join('')}</div></div>
        <div class="ed-empty">
          <div class="ed-empty__t">Под эти фильтры ничего нет</div>
          <p class="ed-empty__d">Премиум-брендов в этой цене не бывает. Снимите ограничение по цене — или посмотрите те же марки в аутлете.</p>
          <div class="w-row" style="gap:16px;justify-content:center">
            <div style="width:250px">${hot('listing', 'default', `<div class="ed-btn ed-btn--ghost">Снять фильтр по цене</div>`)}</div>
            <div style="width:250px">${hot('outlet', 'default', `<div class="ed-btn">Смотреть в аутлете</div>`)}</div>
          </div>
        </div>
      </div>`;
    }

    const filtersOpen = st === 'filters';

    return `<div class="ed ed--d">
      ${edHeader(false, 0, true, true)}
      <section class="ed-sec" style="padding-bottom:24px">
        ${pin(1)}
        <div class="ed-sm" style="margin-bottom:14px">Женщины / Одежда</div>
        <div style="display:grid;grid-template-columns:minmax(0,1fr) 460px;gap:60px;align-items:end">
          <h1 class="ed-h1" style="font-size:52px">Пальто и куртки</h1>
          <p class="ed-t" style="color:var(--e-mute)">Силуэт сезона — свободный и длинный. Собрали то, что держит форму: шерсть, кашемир, плотный твил.</p>
        </div>
      </section>
      ${bar(filtersOpen)}

      <div style="display:grid;grid-template-columns:${filtersOpen ? '280px minmax(0,1fr)' : 'minmax(0,1fr)'}">
        ${filtersOpen ? `
        <aside style="border-right:1px solid var(--e-line);padding:40px 40px 40px 48px">
          ${pin(6)}
          <div class="ed-rows">
            ${[['Бренд', '640'], ['Тир бренда', 'популярные · премиум · люкс · российские'], ['Размер', '32'], ['Цвет', '18'],
               ['Цена', '2 400 – 180 000 ₽'], ['Состояние', 'новая коллекция · аутлет'], ['Материал', '14'], ['Доставка', 'сегодня · 2 дня']]
              .map(([t, v]) => `<div class="ed-rows__i"><span>${t}</span><span>${v} ›</span></div>`).join('')}
          </div>
          <div style="margin-top:28px">${hot('listing', 'default', `<div class="ed-btn ed-btn--ghost">Показать 412 вещей</div>`)}</div>
        </aside>` : ''}

        <div>
          ${pin(3)}
          ${grid(0, filtersOpen ? 3 : 4, filtersOpen ? 3 : 4)}

          ${hot('journal', 'article', `
          <section class="ed-infeed">
            ${pin(4)}
            <div>
              <div class="ed-infeed__k">Подборка стилиста</div>
              <h2 class="ed-h1" style="font-size:34px;margin-bottom:16px">Шесть пальто,<br>которые не выйдут из моды</h2>
              <span class="ed-link">Читать разбор</span>
            </div>
            <div class="w-row" style="gap:20px">${[1, 2, 3].map(() => `<div style="flex:1">${edPh(200, 260, '')}</div>`).join('')}</div>
          </section>`)}

          ${grid(4, 8, filtersOpen ? 3 : 4)}

          <section class="ed-sec" style="padding-top:0">
            ${pin(5)}
            <div class="ed-head">
              <div class="ed-infeed__k" style="margin:0">Новый бренд в разделе</div>
              <span class="ed-adtag">Реклама</span>
            </div>
            ${hot('sis', 'custom', edPh(1330, 280, ''))}
          </section>
        </div>
      </div>

      ${edFab()}
    </div>`;
  },

  /* 06 · карточка товара — визуальная версия */
  pdp: (st) => {
    const soldout = st === 'soldout';
    const nosize = st === 'nosize';
    const cb = st === 'crossborder';
    const nopass = st === 'nopassport';

    return `<div class="ed ed--d">
      ${edHeader(false, 0, true, true)}

      <section class="ed-sec" style="padding-bottom:22px">
        <div class="ed-sm">WB Бренды / Женщины / Пальто / Max Mara</div>
      </section>

      <section class="ed-sec" style="padding-top:0">
        <div style="display:grid;grid-template-columns:minmax(0,1fr) 420px;gap:64px;align-items:start">
          <!-- галерея -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
            ${pin(1)}
            ${edPh(460, 600, '')}${edPh(460, 600, '')}
            ${edPh(460, 600, '')}${edPh(460, 600, '')}
          </div>

          <!-- липкая панель покупки -->
          <div style="position:sticky;top:24px">
            ${pin(2)}
            <div class="ed-label ed-label--mute" style="margin-bottom:10px">Премиум</div>
            <div class="ed-p__brand" style="font-size:17px;margin-top:0">MAX MARA</div>
            <h1 class="ed-h2" style="margin:8px 0 16px">Пальто из шерсти и кашемира</h1>
            <div class="w-row" style="gap:14px;align-items:baseline;margin-bottom:20px">
              <span style="font-size:26px;font-weight:500">39 000 ₽</span>
              ${cb ? `<span class="ed-trust ed-trust--ghost">Кросс-бордер</span>` : ''}
            </div>
            <div class="w-row w-row--chips" style="gap:10px;margin-bottom:26px">
              ${hot('authenticity', 'how', `<span class="ed-trust">${ico('orig')} Оригинал</span>`)}
              ${nopass ? '' : hot('authenticity', 'passport', `<span class="ed-trust ed-trust--ghost">можно проверить самому</span>`)}
            </div>
            ${cb ? `<p class="ed-sm" style="margin-bottom:24px">Доставка из-за рубежа · 12–18 дней · пошлина 1 950 ₽ показана до оплаты</p>` : ''}
            ${nopass ? `<div style="margin-bottom:20px">${pin(6)}</div>` : ''}

            <div class="ed-label ed-label--mute" style="margin-bottom:12px">Цвет · камель</div>
            <div class="ed-swatches" style="margin-bottom:26px">${[1, 2, 3, 4].map((i) => `<div class="ed-swatch" style="width:56px"${i === 1 ? ' data-on' : ''}>${edPh(100, 120, '')}</div>`).join('')}</div>

            ${pin(3)}
            <div class="ed-head" style="margin-bottom:12px">
              <span class="ed-label ed-label--mute">Размер</span>
              <span class="ed-link">Размерная сетка</span>
            </div>
            <div class="ed-sizes" style="margin-bottom:${nosize ? '16' : '26'}px">
              ${['40', '42', '44', '46', '48'].map((sz, i) => {
                const out = (nosize && (i === 2 || i === 3)) || soldout;
                return `<div class="ed-size" style="min-width:62px"${out ? ' data-out' : (i === 1 ? ' data-on' : '')}>${sz}</div>`;
              }).join('')}
            </div>
            ${nosize ? `<p class="ed-sm" style="margin-bottom:24px">Размера 44 сейчас нет. Сообщим, когда появится.</p>` : ''}

            ${soldout
              ? `<div style="display:grid;gap:10px"><div class="ed-btn ed-btn--off">Распродано</div>${hot('favorites', 'subs', `<div class="ed-btn ed-btn--ghost">Сообщить о поступлении</div>`)}</div>`
              : nosize
                ? `<div style="display:grid;gap:10px"><div class="ed-btn ed-btn--off">Выберите размер</div>${hot('favorites', 'subs', `<div class="ed-btn ed-btn--ghost">Сообщить о поступлении</div>`)}</div>`
                : `<div class="w-row" style="gap:12px">${hot('cart', 'default', `<div class="ed-btn">В корзину · 39 000 ₽</div>`)}<div class="ed-iconbtn">♡</div></div>`}

            <div class="ed-rows" style="margin-top:28px">
              ${[['Доставка', 'послезавтра, ПВЗ · бесплатно'], ['Возврат', '14 дней, без объяснений'], ['Упаковка', 'премиальная']]
                .map(([k, v]) => `<div class="ed-rows__i"><span>${k}</span><span>${v}</span></div>`).join('')}
            </div>

            <div class="ed-acc" style="margin-top:28px">
              ${['Описание', 'Состав и уход', 'Посадка и параметры модели', 'История бренда'].map((t) => `<div class="ed-acc__i">${t}<span>+</span></div>`).join('')}
            </div>

            ${hot('assistant', 'entry', `
            <div class="ed-value__i" style="border:1px solid var(--e-line);padding:16px;margin-top:26px">
              <span class="ed-usp__ico">${ico('chat')}</span>
              <div><div class="ed-value__t">Сомневаетесь с размером?</div><div class="ed-value__d">Куратор подскажет по вашим меркам</div></div>
            </div>`)}
          </div>
        </div>
      </section>

      <!-- отзывы -->
      <section class="ed-sec" style="border-top:1px solid var(--e-line)">
        ${pin(5)}
        <div style="display:grid;grid-template-columns:300px minmax(0,1fr);gap:64px">
          <div>
            <div style="font-size:56px;font-weight:300;letter-spacing:-.04em;line-height:1">4,8</div>
            <p class="ed-sm" style="margin-top:10px">214 отзывов · 96% рекомендуют</p>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px">
            ${[['Марина', 'Села идеально, ткань плотная. Камель не желтит и не выглядит дёшево.'], ['Ольга', 'Второй сезон ношу — плечо держит форму, катышков нет.']]
              .map(([n, t]) => `<div><div class="w-row" style="gap:12px;margin-bottom:10px"><div style="width:30px;height:30px;border-radius:50%;background:var(--e-soft)"></div><span style="font-size:13.5px;font-weight:500">${n}</span><span class="ed-sm">★★★★★</span></div><p class="ed-t" style="color:var(--e-mute)">${t}</p></div>`).join('')}
          </div>
        </div>
      </section>

      <!-- полный образ -->
      <section class="ed-sec" style="border-top:1px solid var(--e-line)">
        ${pin(7)}
        <div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:56px;align-items:center">
          ${hot('slide-journal', 'products', edPh(660, 480, ''))}
          <div>
            <div class="ed-label ed-label--mute" style="margin-bottom:14px">Полный образ</div>
            <h2 class="ed-h1" style="font-size:34px;margin-bottom:20px">Четыре вещи,<br>собранные вместе</h2>
            <div class="ed-rows" style="margin-bottom:24px">
              ${[['MAX MARA · Пальто', '39 000 ₽'], ['COS · Водолазка', '6 900 ₽'], ['ARNY PRAHT · Ботинки', '18 400 ₽'], ['12 STOREEZ · Шарф', '7 200 ₽']]
                .map(([t, pr]) => `<div class="ed-rows__i w-hot" data-go="pdp" data-state="default"><span>${t}</span><span>${pr}</span></div>`).join('')}
            </div>
            <div style="width:280px">${hot('cart', 'default', `<div class="ed-btn ed-btn--ghost">Собрать образ целиком</div>`)}</div>
          </div>
        </div>
      </section>

      <section class="ed-sec" style="padding-top:0">
        <div class="ed-head"><h2 class="ed-h2">Ещё от MAX MARA</h2>${hot('brand', 'default', `<span class="ed-link">Все 214</span>`)}</div>
        <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:26px">
          ${['Жакет', 'Брюки', 'Кашне', 'Юбка', 'Тренч'].map((n) => edP({ brand: 'MAX MARA', name: n, price: '28 000 ₽' })).join('')}
        </div>
      </section>

      <section class="ed-sec" style="padding-top:0">
        ${pin(8)}
        ${hot('outlet', 'pdp', `
        <div class="w-row" style="gap:24px;border:1px solid var(--e-line);padding:24px 28px;align-items:center">
          <div style="width:84px;flex:0 0 auto">${edPh(120, 150, '')}</div>
          <div>
            <div class="ed-label ed-label--mute" style="margin-bottom:6px">Этот же силуэт дешевле</div>
            <div class="ed-t" style="font-size:15px">Коллекция прошлого сезона — 24 900 ₽ вместо 39 000 ₽</div>
          </div>
          <span style="margin-left:auto;font-size:16px">›</span>
        </div>`)}
      </section>
    </div>`;
  },

  /* 07 · бренд-лендинг — визуальная версия */
  brand: (st) => {
    const concept = st === 'concept';
    const name = concept ? '12 STOREEZ' : 'MAX MARA';
    const tier = concept ? 'российский' : 'люкс';

    return `<div class="ed ed--d">
      ${edHeader(false, -1, true, true)}
      <div class="ed-hero">
        ${pin(1)}
        ${edPh(1440, 540, '')}
        <div class="ed-hero__copy ed-hero__copy--dark">
          <div class="ed-h1" style="font-size:56px;letter-spacing:.05em;font-weight:700">${name}</div>
        </div>
      </div>

      <section class="ed-sec">
        <div style="display:grid;grid-template-columns:minmax(0,1fr) 420px;gap:60px;align-items:start">
          <div>
            ${pin(2)}
            <div class="w-row" style="gap:10px;margin-bottom:18px">
              <span class="ed-trust ed-trust--ghost">${tier}</span>
              <span class="ed-trust ed-trust--ghost">официальный бренд</span>
            </div>
            <p class="ed-t" style="font-size:16px;color:var(--e-mute);max-width:56ch">${concept
              ? 'Русский минимализм, который не повышает голос. Базовый гардероб с той посадкой, ради которой возвращаются за второй вещью.'
              : 'Итальянский дом, известный пальто из верблюжьей шерсти. В разделе — официально, 214 вещей.'}</p>
          </div>
          <div>
            ${hot('favorites', 'subs', `<div class="ed-btn ed-btn--ghost">Следить за брендом</div>`)}
            <p class="ed-sm" style="margin-top:12px;text-align:center">Уведомим о новинках и дропах</p>
          </div>
        </div>
      </section>

      <div class="ed-bar">
        <div class="ed-bar__row">
          ${['Всё', 'Новинки', 'Бестселлеры', 'Коллекции', 'Категории', ...(concept ? ['Аутлет'] : [])]
            .map((t, i) => `<span class="ed-chip"${i === 0 ? ' data-on' : ''}>${t}</span>`).join('')}
        </div>
      </div>
      ${!concept ? `<div class="ed-sec" style="padding-bottom:0">${pin(3)}</div>` : ''}

      <section class="ed-sec">
        <div class="ed-head"><h2 class="ed-h2">Новинки</h2>${hot('listing', 'default', `<span class="ed-link">Все 214</span>`)}</div>
        <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:26px">
          ${['Пальто', 'Жакет', 'Брюки', 'Платье', 'Кашне'].map((n) => edP({ brand: name, name: n, price: '28 000 ₽' })).join('')}
        </div>
      </section>

      <section class="ed-sec" style="padding-top:0">
        ${pin(5)}
        ${hot('slide-journal', 'story', `
        <div style="display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:48px;align-items:center">
          ${edPh(760, 470, '')}
          <div>
            <div class="ed-label ed-label--mute" style="margin-bottom:14px">Brand Focus</div>
            <div class="ed-h1" style="font-size:38px;margin-bottom:16px">Как устроено пальто,<br>которое носят двадцать лет</div>
            <p class="ed-t" style="color:var(--e-mute);margin-bottom:18px">Разбор конструкции, ткани и посадки — и три вещи, где это видно.</p>
            <span class="ed-link">Читать</span>
          </div>
        </div>`)}
      </section>

      <section class="ed-sec" style="padding-top:0">
        <div class="ed-head"><h2 class="ed-h2">Категории бренда</h2></div>
        <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:26px">
          ${['Пальто', 'Жакеты', 'Трикотаж', 'Брюки', 'Платья', 'Аксессуары'].map((t) => hot('listing', 'default', `
            <div>${edPh(200, 240, '')}<div class="ed-t" style="margin-top:12px">${t}</div></div>`)).join('')}
        </div>
      </section>

      <section class="ed-sec" style="background:var(--e-soft)">
        <div class="ed-value ed-value--d">
          ${[['orig', 'Оригинал с гарантией площадки'], ['back', 'Возврат 14 дней'], ['delivery', 'Доставка по всей стране']]
            .map(([i, t]) => `<div class="ed-value__i"><span class="ed-usp__ico">${ico(i)}</span><div class="ed-value__t">${t}</div></div>`).join('')}
        </div>
      </section>
    </div>`;
  },

  /* 08 · shop-in-shop — визуальная версия */
  sis: (st) => {
    const custom = st === 'custom';
    return `<div class="ed ed--d"${custom ? ' style="--e-soft:#EDEAE4"' : ''}>
      <header class="ed-header"${custom ? ' style="background:#F6F3EE"' : ''}>
        <div class="ed-header__bar">
          <div class="w-row" style="gap:18px">
            <span class="w-hot ed-sm" data-go="home" data-state="default">‹ WB Бренды</span>
            <span class="ed-sis__brand" style="font-size:16px"><i></i>MARC O’POLO</span>
          </div>
          <div class="w-row" style="gap:26px">
            ${['Новое', 'Пальто', 'Трикотаж', 'Denim', 'История бренда'].map((t, i) => `<span style="font-size:12.5px${i === 0 ? ';font-weight:500' : ';color:var(--e-mute)'}">${t}</span>`).join('')}
          </div>
          <div class="w-row" style="gap:18px"><span class="ed-sm">Избранное</span><span class="ed-sm">Корзина · 2</span></div>
        </div>
      </header>

      <div class="ed-hero">
        ${pin(1)}
        ${edPh(1440, 600, '')}
        <div class="ed-hero__copy ed-hero__copy--dark">
          <div class="ed-label" style="margin-bottom:14px">Пространство бренда внутри WB Бренды</div>
          <div class="ed-h1" style="font-size:56px">Осень без спешки</div>
        </div>
        <div class="ed-hero__tab">Смотреть <span>›</span></div>
      </div>

      <section class="ed-sec"${custom ? ' style="background:#F6F3EE"' : ''}>
        ${pin(2)}
        <p class="ed-t" style="font-size:16px;max-width:62ch;color:var(--e-mute)">${custom
          ? 'Бренд управляет палитрой, порядком блоков, выделенными коллекциями, видео и своей историей.'
          : 'Собственный hero, логотип и порядок полок. Остальное — стандартные паттерны витрины.'}</p>
      </section>

      <section class="ed-sec" style="padding-top:0">
        <div class="ed-head"><h2 class="ed-h2">Выделенная коллекция</h2><span class="ed-link">Вся коллекция</span></div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:26px">
          ${['Куртка замшевая', 'Кардиган', 'Джинсы', 'Рубашка'].map((n) => edP({ brand: 'MARC O’POLO', name: n, price: '24 000 ₽', ratio: [320, 420] })).join('')}
        </div>
      </section>

      ${custom ? `
      <section class="ed-sec" style="padding-top:0">
        ${pin(3)}
        ${hot('journal', 'article', `
        <div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:48px;align-items:center">
          ${edPh(660, 420, '')}
          <div>
            <div class="ed-label ed-label--mute" style="margin-bottom:14px">История бренда · видео</div>
            <div class="ed-h1" style="font-size:38px;margin-bottom:16px">Как делают деним<br>в Дании</div>
            <p class="ed-t" style="color:var(--e-mute)">Три минуты о фабрике, ткани и людях, которые её делают.</p>
          </div>
        </div>`)}
      </section>` : ''}

      <section class="ed-sec" style="border-top:1px solid var(--e-line)">
        ${pin(4)}
        <div class="ed-value ed-value--d">
          ${[['orig', 'Корзина и карточка — общие для всей витрины'], ['box', 'Упаковка и доставка — как везде'], ['club', 'Привилегии программы действуют и здесь']]
            .map(([i, t]) => `<div class="ed-value__i"><span class="ed-usp__ico">${ico(i)}</span><div class="ed-value__t" style="font-weight:400">${t}</div></div>`).join('')}
        </div>
      </section>
    </div>`;
  },

  /* 09 · аутлет — визуальная версия */
  outlet: (st) => {
    if (st === 'pdp') {
      return `<div class="ed ed--d">
        ${edHeader(false, -1, true, true)}
        <section class="ed-sec">
          <div style="display:grid;grid-template-columns:minmax(0,1fr) 420px;gap:64px;align-items:start">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
              ${edPh(460, 600, '')}${edPh(460, 600, '')}
            </div>
            <div style="position:sticky;top:24px">
              <div class="ed-label ed-label--mute" style="margin-bottom:10px">Аутлет · премиум</div>
              <div class="ed-p__brand" style="font-size:17px;margin-top:0">MARC O’POLO</div>
              <h1 class="ed-h2" style="margin:8px 0 16px">Тренч из хлопка</h1>
              <div class="w-row" style="gap:14px;align-items:baseline;margin-bottom:22px">
                <span style="font-size:26px;font-weight:500">14 900 ₽</span>
                <span class="ed-p__old" style="font-size:16px">24 000 ₽</span>
                <span class="ed-trust ed-trust--ghost">−38%</span>
              </div>
              ${pin(2)}
              <div style="border:1px solid var(--e-ink);padding:20px;margin-bottom:24px">
                <div class="ed-label" style="margin-bottom:10px">Почему дешевле</div>
                <p class="ed-t">Коллекция осень–зима 2025. Это единственная причина цены: та же вещь, тот же бренд, та же гарантия оригинала. Не уценка за брак и не серый импорт.</p>
              </div>
              <div class="w-row" style="gap:10px;margin-bottom:26px">
                ${hot('authenticity', 'how', `<span class="ed-trust">${ico('orig')} Оригинал</span>`)}
                <span class="ed-trust ed-trust--ghost">возврат 14 дней</span>
              </div>
              ${hot('cart', 'default', `<div class="ed-btn">В корзину · 14 900 ₽</div>`)}
            </div>
          </div>
        </section>
        <section class="ed-sec" style="padding-top:0">
          ${pin(4)}
          <div class="ed-head"><h2 class="ed-h2">Новая версия этого образа</h2>${hot('listing', 'default', `<span class="ed-link">Смотреть</span>`)}</div>
          <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:26px">
            ${['MARC O’POLO', 'COS', '12 STOREEZ', 'BOSS', 'LIME'].map((b) => edP({ brand: b, name: 'Тренч, коллекция 2026', price: '24 000 ₽', go: 'pdp' })).join('')}
          </div>
        </section>
      </div>`;
    }

    return `<div class="ed ed--d">
      ${edHeader(false, -1, true, true)}
      <section class="ed-sec" style="background:var(--e-soft)">
        ${pin(1)}
        <div style="display:grid;grid-template-columns:minmax(0,1fr) 520px;gap:60px;align-items:center">
          <div>
            <div class="ed-label" style="margin-bottom:14px">Аутлет</div>
            <h1 class="ed-h1" style="font-size:52px;margin-bottom:18px">Прошлые коллекции</h1>
            <p class="ed-t" style="font-size:16px;color:var(--e-mute);max-width:52ch">Те же бренды и та же гарантия оригинала. Дешевле — потому что коллекция прошлого сезона, и мы говорим об этом прямо.</p>
          </div>
          ${edPh(520, 320, '')}
        </div>
      </section>

      <div class="ed-bar">
        ${pin(3)}
        <div class="ed-bar__row">
          ${[['Все скидки', 1], ['−30% и больше', 0], ['−50% и больше', 0], ['Женщины', 0], ['Мужчины', 0], ['Обувь', 0], ['Премиум-бренды', 0]]
            .map(([t, on]) => `<span class="ed-chip"${on ? ' data-on' : ''}>${t}</span>`).join('')}
        </div>
      </div>

      <div class="ed-grid">
        ${[['MARC O’POLO', '14 900 ₽', '24 000 ₽', 'коллекция 2025'], ['BOSS', '29 000 ₽', '48 000 ₽', 'коллекция 2025'],
           ['LEVI’S', '5 400 ₽', '8 900 ₽', 'коллекция 2024'], ['LACOSTE', '6 200 ₽', '9 900 ₽', 'коллекция 2025']]
          .map(([b, pr, old, note]) => hot('outlet', 'pdp', `
            <div class="ed-p">
              ${edPh(320, 420, '')}
              <div class="ed-p__brand">${b}</div>
              <div class="ed-p__name">Вещь прошлой коллекции</div>
              <div class="ed-p__price">${pr}<span class="ed-p__old">${old}</span></div>
              <div class="ed-p__name" style="margin-top:5px">${note}</div>
            </div>`)).join('')}
      </div>

      <section class="ed-sec" style="padding-top:0">
        ${pin(4)}
        <div class="ed-head"><h2 class="ed-h2">Новая версия этих образов</h2>${hot('listing', 'default', `<span class="ed-link">Смотреть</span>`)}</div>
        <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:26px">
          ${['COS', '12 STOREEZ', 'MAX MARA', 'LIME', 'BEFREE'].map((b) => edP({ brand: b, name: 'Актуальная коллекция', price: '19 900 ₽', go: 'pdp' })).join('')}
        </div>
      </section>

      <section class="ed-sec" style="background:var(--e-soft)">
        ${pin(5)}
        <div class="ed-value ed-value--d">
          ${[['orig', 'Оригинал с гарантией площадки'], ['back', 'Возврат 14 дней'], ['delivery', 'Та же доставка, что в основной витрине']]
            .map(([i, t]) => `<div class="ed-value__i"><span class="ed-usp__ico">${ico(i)}</span><div class="ed-value__t" style="font-weight:400">${t}</div></div>`).join('')}
        </div>
      </section>
    </div>`;
  },

  /* 10 · журнал и редакция — глянцевая вёрстка */
  journal: (st) => {
    const RUBRICS = ['Последнее', 'Мода', 'Красота', 'Украшения', 'Дом и вещи', 'Интервью', 'Видео'];

    const masthead = (active = 0) => `
      <div class="mag-masthead">
        <div class="mag-slogan">Отобранное. Объяснённое. Каждую неделю.</div>
        <div class="mag-logo">ОТБОР<small>журнал WB Бренды</small></div>
      </div>
      <nav class="mag-rubrics">
        ${RUBRICS.map((r, i) => `<span${i === active ? ' data-on' : ''} class="w-hot" data-go="journal" data-state="${i === 0 ? 'default' : 'rubric'}">${r}</span>`).join('')}
      </nav>`;

    const card = (rub, t, date, ratio = [420, 300]) => hot('journal', 'article', `
      <article>
        ${edPh(ratio[0], ratio[1], '')}
        <div class="mag-kicker" style="margin-top:18px">${rub}</div>
        <h3 class="mag-grid__t">${t}</h3>
        <div class="mag-date">${date}</div>
      </article>`);

    if (st === 'article') {
      return `<div class="ed ed--d mag mag--d">
        ${edHeader(false, 0, true, false)}
        <section class="ed-sec" style="text-align:center;max-width:860px;margin:0 auto;padding-bottom:30px">
          ${pin(1)}
          <div class="mag-kicker" style="margin-bottom:20px">Интервью</div>
          <h1 class="mag-h" style="font-size:56px;line-height:1.06">Работа как любовь<br><i>с</i> 12 STOREEZ</h1>
          <p class="mag-lead" style="font-size:20px;margin-top:22px">Как две сестры из Екатеринбурга собрали марку, которую носят, не сверяясь с сезоном.</p>
          <div class="mag-date" style="margin-top:20px">29 июля 2026 · Текст: редакция · 8 минут</div>
        </section>
        ${edPh(1440, 660, '')}
        <section class="ed-sec">
          <div style="display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:80px;max-width:1180px;margin:0 auto">
            <div class="mag-body" style="font-size:16px">
              <p>Первый магазин открылся в 2014 году и был размером с примерочную. Сегодня марка делает четыре коллекции в год, но принцип остался тем же: вещь идёт в производство, только если её хочется носить ежедневно.</p>
              <p>«Мы никогда не считали себя дизайнерами трендов, — говорит Ирина. — Мы делаем то, что можно надеть в среду, а потом в субботу, и оба раза чувствовать себя собой».</p>
              <p class="mag-lead" style="font-size:24px;margin:32px 0">«Посадка — это не сантиметры. Это то, как вещь ведёт себя, когда вы про неё забыли».</p>
              <p>На каждую модель уходит от четырёх до девяти примерок, и решение принимают вдвоём. Ткани выбирают в Италии и Португалии, но лекала делают на месте.</p>
            </div>
            <aside style="position:sticky;top:24px;align-self:start">
              ${pin(2)}
              <div class="mag-shop" style="border-top-color:var(--e-ink)">
                <div class="mag-shop__t" style="font-size:20px;text-align:left">Вещи из материала</div>
                <div style="display:grid;gap:22px">
                  ${[['12 STOREEZ', 'Пальто', '27 800 ₽'], ['12 STOREEZ', 'Костюм', '31 400 ₽']].map(([b, n, pr]) => hot('pdp', 'default', `
                    <div class="w-row" style="gap:16px"><div style="width:96px;flex:0 0 auto">${edPh(160, 200, '')}</div>
                    <div><div class="ed-p__brand">${b}</div><div class="ed-p__name">${n}</div><div class="ed-p__price">${pr}</div></div></div>`)).join('')}
                </div>
                <div class="w-note" style="margin-top:22px;border-color:var(--e-line);background:var(--e-soft)">${pin(3)}Одной вещи больше нет в продаже — показываем статус и кураторскую замену, а не ошибку.</div>
              </div>
            </aside>
          </div>
        </section>
        <section class="mag-grid" style="border-top:1px solid var(--e-line)">
          ${card('Мода', 'Как носить объём, чтобы он не носил вас', '29 июля')}
          ${card('Красота', 'Уход, который работает на смене сезона', '28 июля')}
          ${card('Дом и вещи', 'Как я собираю пространство: квартира стилиста', '27 июля')}
        </section>
      </div>`;
    }

    if (st === 'rubric') {
      return `<div class="ed ed--d mag mag--d">
        ${edHeader(false, 0, true, false)}
        ${masthead(1)}
        <section class="mag-dark">
          ${pin(4)}
          <div class="mag-dark__t">Мода</div>
          <div class="mag-dots">${[0, 1, 2, 3].map((i) => `<i${i === 0 ? ' data-on' : ''}></i>`).join('')}</div>
          <div class="mag-dark__grid">
            ${[['Пять силуэтов, которые определят осень', '29 июля'], ['Как носить объём', '28 июля'], ['Тихий люкс по-русски', '26 июля'], ['Пальто на десять лет', '22 июля']]
              .map(([t, d]) => hot('journal', 'article', `
                <article>${edPh(320, 400, '')}
                <div class="mag-kicker" style="margin-top:16px;color:#fff">Мода</div>
                <h3 class="mag-grid__t" style="font-size:20px;color:#fff">${t}</h3>
                <div class="mag-date" style="color:rgba(255,255,255,.5)">${d}</div></article>`)).join('')}
          </div>
        </section>
        <section class="mag-grid">
          ${card('Мода', 'Шесть пальто, которые не выйдут из моды', '20 июля')}
          ${card('Мода', 'Что носят в Тбилиси этой осенью', '18 июля')}
          ${card('Мода', 'Локальные марки, за которыми стоит следить', '15 июля')}
        </section>
      </div>`;
    }

    return `<div class="ed ed--d mag mag--d">
      ${edHeader(false, 0, true, false)}
      ${pin(5)}
      ${masthead(0)}

      <!-- главный материал номера -->
      ${hot('journal', 'article', `
      <section class="mag-coverd">
        ${pin(1)}
        <div class="mag-coverd__inner">
          <div style="position:relative">
            ${edPh(520, 660, '')}
            <div style="position:absolute;right:18px;top:18px;font-family:var(--font-mag);font-size:26px;color:#fff">ОТБОР</div>
          </div>
          <div style="align-self:center">
            <div class="mag-kicker" style="margin-bottom:22px">Главный материал</div>
            <h2 class="mag-h" style="font-size:46px;line-height:1.06">Работа как любовь<br><i>с</i> 12 STOREEZ</h2>
            <p class="mag-lead" style="margin-top:24px">Как две сестры из Екатеринбурга собрали марку, которую носят, не сверяясь с сезоном, — и почему они до сих пор сами отсматривают каждую посадку.</p>
            <div class="mag-date" style="margin-top:24px">29 июля 2026 · 8 минут</div>
          </div>
        </div>
      </section>`)}

      <!-- ступенчатая сетка материалов -->
      <section class="mag-grid">
        ${pin(6)}
        ${card('Мода', 'Как носить объём, чтобы он не носил вас', '8 часов назад')}
        ${card('Красота', 'Уход, который работает на смене сезона', '29 июля')}
        ${card('Интервью', 'Дизайнер о капсуле на десять лет', '28 июля')}
      </section>

      <!-- рубрика на чёрном -->
      <section class="mag-dark">
        ${pin(4)}
        <div class="mag-dark__t">Дом и вещи</div>
        <div class="mag-dots">${[0, 1, 2, 3].map((i) => `<i${i === 0 ? ' data-on' : ''}></i>`).join('')}</div>
        <div class="mag-dark__grid">
          ${[['Как я собираю пространство: квартира стилиста', '29 июля'], ['Ароматы, которые держат осень', '28 июля'], ['Книги на сентябрь', '27 июля'], ['Дом как продолжение гардероба', '26 июля']]
            .map(([t, d]) => hot('journal', 'article', `
              <article>${edPh(320, 360, '')}
              <div class="mag-kicker" style="margin-top:16px;color:#fff">Дом и вещи</div>
              <h3 class="mag-grid__t" style="font-size:20px;color:#fff">${t}</h3>
              <div class="mag-date" style="color:rgba(255,255,255,.5)">${d}</div></article>`)).join('')}
        </div>
      </section>

      <!-- слайд-журнал -->
      <section class="ed-sec">
        ${pin(7)}
        ${hot('slide-journal', 'cover', `
        <div style="display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:56px;align-items:center">
          ${edPh(800, 500, '')}
          <div>
            <div class="mag-kicker" style="margin-bottom:18px">Слайд-журнал · 6 слайдов</div>
            <div class="mag-h" style="font-size:40px">Спокойный объём<br><i>в шести слайдах</i></div>
            <div class="ed-link" style="display:inline-block;margin-top:24px">Открыть историю</div>
          </div>
        </div>`)}
      </section>

      <section class="mag-grid" style="padding-top:0">
        ${card('Мода', 'Шесть пальто, которые не выйдут из моды', '20 июля')}
        ${card('Архив дропа', 'USHATÁVA × WB: как прошёл сентябрьский запуск', '18 июля')}
        ${card('Гид', 'Как отличить хорошую шерсть', '15 июля')}
      </section>
    </div>`;
  },

  /* 11 · слайд-журнал — полноэкранный разворот */
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

    const foot = (label, nextState, prev = '') => `
      <div class="slide-foot">
        ${prev ? `<div class="slide-arrow w-hot" data-go="slide-journal" data-state="${prev}">‹</div>` : ''}
        <div class="slide-btn w-hot" data-go="slide-journal" data-state="${nextState}">${label}</div>
      </div>`;

    if (st === 'story') {
      return `<div class="slide slide--d">
        ${top()}
        <div class="slide-sec" style="padding-bottom:0">
          ${pin(1)}
          <div class="slide-spread">
            <div>${edPh(660, 620, '')}<div class="slide-cap">Пальто MAX MARA · съёмка для WB Бренды</div></div>
            <div style="padding-top:20px">
              <div class="slide-rule"></div>
              <h2 class="slide-sub">Что делает объём<br><i>объёмом</i></h2>
              ${pin(2)}
              <div class="slide-body">
                <p>Свободный силуэт держится не тканью, а линией плеча. Если шов уходит на два-три сантиметра ниже естественной точки, вещь начинает жить самостоятельно — и объём читается как замысел, а не как размер больше нужного.</p>
                <p>Проверить это легко: поднимите руки. Хорошо посаженное пальто <span class="slide-link">потянется вместе с вами</span>, а не соберётся складкой на спине.</p>
                <p><em>Три вещи из этой истории собраны на следующем слайде — от российской марки до люкса.</em></p>
              </div>
              ${pin(8)}
              <div class="slide-cap" style="margin:34px 0 14px">Вещь из этого абзаца</div>
              ${hot('pdp', 'default', `
              <div class="slide-inline" style="padding:16px">
                <div style="width:120px;flex:0 0 auto">${edPh(200, 250, '')}</div>
                <div>
                  <div class="slide-prod__brand" style="margin-top:0;font-size:14px">MAX MARA</div>
                  <div class="slide-prod__name" style="font-size:13px">Пальто из шерсти и кашемира</div>
                  <div class="slide-prod__price" style="font-size:15px">39 000 ₽</div>
                  <div class="slide-cap" style="margin-top:10px">премиум · линия плеча ниже на 3 см</div>
                </div>
                <span style="margin-left:auto;font-family:var(--font-ui);font-size:15px">›</span>
              </div>`)}
            </div>
          </div>
        </div>
        ${foot('Дальше', 'products', 'cover')}
      </div>`;
    }

    if (st === 'products') {
      return `<div class="slide slide--d">
        ${top()}
        <div class="slide-sec" style="padding-bottom:24px">
          ${pin(3)}
          <div class="slide-spread" style="gap:60px;align-items:end">
            <div>
              <div class="slide-rule"></div>
              <h2 class="slide-sub">Один силуэт,<br><i>три уровня</i></h2>
            </div>
            <div class="slide-body">От российской марки до люкса — чтобы было видно, за что именно доплачивают. Разница не в тепле, а в том, сколько сезонов вещь держит форму.</div>
          </div>
        </div>
        <div class="slide-sec" style="padding-top:0">
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:40px">
            ${[['12 STOREEZ', 'Пальто оверсайз', '27 800 ₽', 'российский'], ['COS', 'Пальто-кокон', '21 300 ₽', 'премиум'], ['MAX MARA', 'Пальто из шерсти', '39 000 ₽', 'люкс']]
              .map(([b, n, pr, tier]) => hot('pdp', 'default', `
                <div class="slide-prod">
                  ${edPh(420, 540, '')}
                  <div class="slide-cap" style="margin-top:14px">${tier}</div>
                  <div class="slide-prod__brand" style="font-size:14px">${b}</div>
                  <div class="slide-prod__name" style="font-size:13px">${n}</div>
                  <div class="slide-prod__price" style="font-size:14px">${pr}</div>
                </div>`)).join('')}
          </div>
          ${pin(4)}
          <div style="margin-top:40px;max-width:320px">${hot('listing', 'default', `<div class="slide-btn slide-btn--ghost">Вся подборка · 12 вещей</div>`)}</div>
        </div>
        ${foot('Дальше', 'cta', 'story')}
      </div>`;
    }

    if (st === 'cta') {
      return `<div class="slide slide--d">
        ${top()}
        <div class="slide-sec" style="padding-top:70px;text-align:center">
          ${pin(5)}
          <div class="slide-rule" style="margin:0 auto 26px"></div>
          <h2 class="slide-title" style="font-size:72px">Собрать образ <i>целиком</i></h2>
          <p class="slide-lead" style="margin:22px auto 0;max-width:44ch">Четыре вещи из истории — в одной корзине, с одной доставкой.</p>
        </div>
        <div class="slide-sec" style="padding-top:10px">
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:26px;max-width:1080px;margin:0 auto">
            ${LOOK.map(([b, n, pr, t]) => slideProd({ brand: b, name: n, price: pr, tier: t, ratio: [260, 330] })).join('')}
          </div>
          <div class="slide-body" style="text-align:center;margin-top:30px">Образ целиком — <em>74 300 ₽</em>. Любую вещь можно убрать перед оформлением.</div>
          <div class="w-row" style="gap:16px;justify-content:center;margin-top:30px">
            <div style="width:260px">${hot('cart', 'default', `<div class="slide-btn">В корзину · 4 вещи</div>`)}</div>
            <div style="width:260px">${hot('assistant', 'set', `<div class="slide-btn slide-btn--ghost">Подобрать под меня</div>`)}</div>
            <div style="width:260px">${hot('journal', 'default', `<div class="slide-btn slide-btn--ghost">Другие истории</div>`)}</div>
          </div>
          ${pin(6)}
        </div>
      </div>`;
    }

    /* обложка */
    return `<div class="slide slide--d">
      ${top()}
      <div class="slide-sec" style="padding-bottom:30px">
        ${pin(7)}
        <div class="slide-cap" style="margin-bottom:20px">Слайд-журнал · мода</div>
        <h1 class="slide-title">Спокойный <i>объём</i></h1>
      </div>
      <div class="slide-sec" style="padding-top:0">
        <div class="slide-spread">
          <div>${edPh(660, 700, '')}<div class="slide-cap">Съёмка для WB Бренды · стилист Анна Ковалёва</div></div>
          <div>
            <div class="slide-rule"></div>
            <p class="slide-lead" style="margin:0 0 26px">Свободный силуэт сезона держится не на ткани, а на линии плеча. Разбираем на трёх пальто — и объясняем, за что доплачивают.</p>
            <div class="slide-body">
              <p>Шесть слайдов: линия плеча, длина, пропорция низа — и вещи, на которых это видно.</p>
            </div>
            ${pin(8)}
            <div class="slide-cap" style="margin:34px 0 16px">Вещи из истории</div>
            <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:26px">
              ${LOOK.slice(0, 2).map(([b, n, pr, t]) => slideProd({ brand: b, name: n, price: pr, tier: t, ratio: [300, 380] })).join('')}
            </div>
          </div>
        </div>
      </div>
      ${foot('Читать историю', 'story')}
    </div>`;
  },

  /* 12 · куратор — живой диалог с карточками и входом в журнал */
  assistant: (st) => {
    const head = (status = 'обычно отвечаю за минуту') => `
      <div class="chat-head">
        <div class="chat-who">
          <span class="ed-logo w-hot" data-go="home" data-state="default" style="font-size:13px;margin-right:18px"><i></i>WB Бренды</span>
          <div class="chat-ava">К</div>
          <div>
            <div class="chat-name" style="font-size:15px">Куратор</div>
            <div class="chat-status">${status}</div>
          </div>
        </div>
        <span class="w-hot" data-go="home" data-state="default" style="font-size:16px">✕ Закрыть</span>
      </div>`;

    const me = (t) => `<div class="chat-row chat-row--me"><div class="chat-msg chat-msg--me">${t}</div></div>`;
    const him = (inner) => `<div class="chat-row"><div class="chat-ava">К</div><div class="chat-msg">${inner}</div></div>`;

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
        <div style="width:104px;flex:0 0 auto">${edPh(200, 160, '')}</div>
        <div>
          <div class="chat-art__k">${kicker}</div>
          <div class="chat-art__t">${title}</div>
        </div>
        <span style="margin-left:auto;font-size:14px">›</span>
      </div>`);

    const chips = (items) => `<div class="chat-row"><div></div><div class="chat-chips">${items.map(([t, go, gs]) => `<span class="w-hot" data-go="${go}" data-state="${gs}">${t}</span>`).join('')}</div></div>`;

    const input = () => `
      <div class="chat-input">
        <div class="chat-input__field">Написать куратору…</div>
        <div class="chat-send">↑</div>
      </div>`;

    const aside = () => `
      <aside class="chat-aside">
        <div class="ed-label ed-label--mute" style="margin-bottom:18px">История подборок</div>
        <div style="display:grid;gap:16px">
          ${[['Сегодня', 'Пальто на осень'], ['26 июля', 'Сумка под кэжуал'], ['18 июля', 'Капсула в отпуск']]
            .map(([d, t]) => `<div style="border-bottom:1px solid var(--e-line);padding-bottom:14px"><div class="ed-sm">${d}</div><div style="font-size:14px;margin-top:3px">${t}</div></div>`).join('')}
        </div>
        ${pin(7)}
        <div class="ed-label ed-label--mute" style="margin:34px 0 16px">Что читают сейчас</div>
        <div style="display:grid;gap:14px">
          ${[['Гид', 'Пальто, которое переживёт сезон'], ['Интервью', 'Работа как любовь с 12 STOREEZ']]
            .map(([k, t]) => hot('journal', 'article', `<div><div class="chat-art__k">${k}</div><div class="chat-art__t" style="font-size:17px">${t}</div></div>`)).join('')}
        </div>
      </aside>`;

    let thread;
    if (st === 'off') {
      thread = `
        ${him(`Я ненадолго отошла. Оставляю то, что редакция выбрала на этой неделе — вернусь и соберу под вас.`)}
        <div class="chat-row"><div></div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:22px">
          ${['COS', 'MAX MARA', '12 STOREEZ', 'MARC O’POLO'].map((b) => edP({ brand: b, name: 'Пальто', price: '21 300 ₽' })).join('')}
        </div></div>
        ${pin(5)}`;
    } else if (st === 'read') {
      thread = `
        ${me('А почитать про это что-нибудь есть?')}
        ${pin(6)}
        ${him(`Есть что почитать — от короткого разбора до интервью с маркой, которую вы смотрели.
          <div class="chat-arts">
            ${art('Гид · 6 минут', 'Пальто, которое переживёт сезон')}
            ${art('Интервью', 'Работа как любовь <i>с</i> 12 STOREEZ')}
            ${art('Слайд-журнал', 'Спокойный объём')}
          </div>`)}
        ${chips([['Показать вещи из статьи', 'assistant', 'set'], ['Ещё про пальто', 'journal', 'rubric'], ['Весь журнал', 'journal', 'default']])}`;
    } else if (st === 'skip') {
      thread = `
        ${me('Не то')}
        ${me('И это тоже не то')}
        ${pin(3)}
        ${him(`Поняла, это направление убираю. Скажите, что именно мимо — пересоберу.`)}
        ${chips([['Слишком дорого', 'assistant', 'set'], ['Не мой силуэт', 'assistant', 'set'], ['Не те бренды', 'assistant', 'set'], ['Не тот повод', 'assistant', 'set']])}
        ${him(`Могу и вовсе не писать первой. Захотите — вернётесь, я на месте.`)}
        ${chips([['Не пиши мне первой', 'assistant', 'entry']])}`;
    } else if (st === 'set') {
      thread = `
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
          ${art('Гид · 6 минут', 'Пальто, которое переживёт сезон')}`)}`;
    } else {
      thread = `
        ${pin(5)}
        ${him(`<b>Екатерина, привет.</b> Я тут, чтобы вы не листали тысячу карточек. Скажите, что ищете — покажу и расскажу, почему именно это. Регистрироваться не надо.`)}
        ${him(`Вижу, вы засматривались на длинные пальто спокойных оттенков. Начнём с них?`)}
        ${chips([['Собрать образ на осень', 'assistant', 'set'], ['Найти марку, похожую на…', 'assistant', 'set'], ['Что почитать', 'assistant', 'read'], ['Помочь с размером', 'assistant', 'set'], ['Проверить подлинность', 'authenticity', 'how']])}`;
    }

    return `<div class="ed ed--d chat chat--d">
      ${head(st === 'off' ? 'скоро вернусь' : st === 'set' ? 'печатает…' : 'обычно отвечаю за минуту')}
      <div class="chat-layout">
        <div class="chat-col">
          <div class="chat-thread">${thread}</div>
          ${st === 'off' ? '' : input()}
        </div>
        ${aside()}
      </div>
    </div>`;
  },
};
