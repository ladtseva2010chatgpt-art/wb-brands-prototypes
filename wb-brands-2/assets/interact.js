/* ============================================================
   ИНТЕРАКТИВНЫЙ СЛОЙ · всё, что выглядит нажимаемым, отвечает
   Подключается и в прототипе, и в документе.
   ============================================================ */

/** Авторская подпись. Проставляется на каждый отрисованный экран — и в мобильной
    версии, и в вебе, — а не вписывается в шаблоны руками: иначе новый экран
    рано или поздно уедет без подписи. */
export const CREDIT = 'CONCEPT & PROTOTYPE © ALESYA MISHCHANINA · 2026';

export function signScreens(scope = document) {
  scope.querySelectorAll('.ed').forEach((screen) => {
    if ([...screen.children].some((n) => n.classList?.contains('ed-credit'))) return;
    const credit = document.createElement('footer');
    credit.className = 'ed-credit';
    credit.textContent = CREDIT;
    // в мобильной версии нижняя навигация липкая — подпись встаёт над ней,
    // иначе она окажется под панелью; на вебе .ed-bottom нет и вставка идёт в конец
    const bottom = [...screen.children].find((n) => n.classList?.contains('ed-bottom'));
    screen.insertBefore(credit, bottom ?? null);
  });
}

/** группы, внутри которых активен ровно один элемент */
const SINGLE = [
  { sel: '.ed-chip', scope: '.ed-bar__row, .ed-sec--tight, .w-row, .ed-header' },
  { sel: '.ed-cat', scope: '.ed-cats' },
  { sel: '.ed-tabs span', scope: '.ed-tabs' },
  { sel: '.mag-rubrics span', scope: '.mag-rubrics' },
  { sel: '.ed-density i', scope: '.ed-density' },
  { sel: '.ed-size', scope: '.ed-sizes' },
  { sel: '.ed-swatch', scope: '.ed-swatches' },
  { sel: '.proto__seg button', scope: '.proto__seg' },
];

/** содержимое аккордеонов — раскрывается по нажатию */
const ACC = {
  'Описание': 'Прямой силуэт, спущенное плечо, длина ниже колена. Подкладка из вискозы, потайная застёжка, два прорезных кармана.',
  'Состав и уход': '70% шерсть, 30% кашемир. Подкладка — 100% вискоза. Только сухая чистка, хранить на широких плечиках.',
  'Посадка и параметры модели': 'Рост модели 176 см, на ней размер 42. Модель садится по фигуре, для многослойности берите размер как обычно.',
  'Как ухаживать': 'Раз в сезон — чистка, между выходами достаточно щётки. Катышки снимать машинкой, не бритвой.',
  'История бренда': 'Дом основан в 1951 году в Реджо-Эмилии. Пальто из верблюжьей шерсти — его визитная карточка с 1981 года.',
  'Styling notes': 'Носите нараспашку с водолазкой и прямыми брюками. Плотная подошва уравновешивает объём.',
};

const el = (sel, root = document) => root.querySelector(sel);

export function initInteractions(root = document) {
  root.addEventListener('click', (e) => {
    /* --- бургер с остальными категориями ---
       Закрываем чужие панели до всех остальных веток: клик мимо бургера — в том
       числе по ссылке внутри самой панели — должен убирать раскрытое меню. */
    const moreBtn = e.target.closest('[data-more]');
    root.querySelectorAll('[data-more-panel]').forEach((panel) => {
      if (moreBtn && moreBtn.nextElementSibling === panel) return;
      panel.hidden = true;
      panel.previousElementSibling?.setAttribute('aria-expanded', 'false');
    });
    if (moreBtn) {
      const panel = moreBtn.nextElementSibling;
      panel.hidden = !panel.hidden;
      moreBtn.setAttribute('aria-expanded', String(!panel.hidden));
      return;
    }

    // переход важнее переключения: если элемент ведёт на экран, слой не вмешивается
    if (e.target.closest('.w-hot[data-go]')) return;

    /* --- одиночный выбор внутри группы --- */
    for (const { sel, scope } of SINGLE) {
      const item = e.target.closest(sel);
      if (!item) continue;
      const box = item.closest(scope);
      if (!box) continue;
      if (item.hasAttribute('data-out')) return; // недоступный размер
      box.querySelectorAll(sel).forEach((n) => n.removeAttribute('data-on'));
      item.setAttribute('data-on', '');
      return;
    }

    /* --- аккордеон --- */
    const acc = e.target.closest('.ed-acc__i, .w-acc > div');
    if (acc) {
      const title = acc.firstChild?.textContent?.trim() || acc.textContent.trim().replace(/[+−]$/, '').trim();
      const next = acc.nextElementSibling;
      if (next && next.classList.contains('ed-acc__body')) {
        next.remove();
        acc.querySelector('span').textContent = '+';
      } else {
        const body = document.createElement('div');
        body.className = 'ed-acc__body';
        body.textContent = ACC[title] || 'Раздел заполняется контент-менеджером бренда.';
        acc.after(body);
        acc.querySelector('span').textContent = '−';
      }
      return;
    }

    /* --- избранное на карточке --- */
    const fav = e.target.closest('.ed-iconbtn');
    if (fav) { fav.toggleAttribute('data-on'); return; }

    /* --- переключатели строк сервиса и подписок --- */
    const toggle = e.target.closest('[data-toggle-row]');
    if (toggle) { toggle.toggleAttribute('data-on'); }
  });
}
