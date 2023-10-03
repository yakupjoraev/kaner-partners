// Custom Scripts
// Custom scripts
// Мобильное меню бургер
function burgerMenu() {
  const burger = document.querySelector('.burger')
  const menu = document.querySelector('.menu')
  const body = document.querySelector('body')
  burger.addEventListener('click', () => {
    if (!menu.classList.contains('active')) {
      menu.classList.add('active')
      burger.classList.add('active-burger')
      body.classList.add('locked')
    } else {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    }
  })
  //снять классы при клике на элементы меню
  const menuItems = document.querySelectorAll('.menu__item')

  menuItems.forEach(item => {
    item.addEventListener('click', function () {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    })
  });

  // Вот тут мы ставим брейкпоинт навбара
  window.addEventListener('resize', () => {
    if (window.innerWidth > 991.98) {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    }
  })
}
burgerMenu()


// Вызываем эту функцию, если нам нужно зафиксировать меню при скролле.
function fixedNav() {
  const nav = document.querySelector('nav')

  // тут указываем в пикселях, сколько нужно проскроллить что бы наше меню стало фиксированным
  const breakpoint = 1
  if (window.scrollY >= breakpoint) {
    nav.classList.add('fixed__nav')
  } else {
    nav.classList.remove('fixed__nav')
  }
}
window.addEventListener('scroll', fixedNav)

function faqAccardion() {
  const container = document.querySelector('[data-accordion-container]');

  if (!container) {
    return null
  }
  // Аккордеон
  const accordionItems = document.querySelectorAll('[data-accordion-item]');
  let openAccordion = null; // переменная для хранения ссылки на открытый аккордеон

  function toggleAccordion() {
    if (openAccordion && openAccordion !== this) {
      // Если есть открытый аккордеон, который не совпадает с текущим
      openAccordion.classList.remove('active'); // закрыть его
      const openAccordionContent = openAccordion.nextElementSibling;
      if (openAccordionContent) {
        // если у аккордеона есть содержимое
        openAccordionContent.style.maxHeight = null; // сбросить высоту контента
      }
    }

    this.classList.toggle('active'); // открыть или закрыть текущий аккордеон

    const content = this.nextElementSibling;
    if (content) {
      // если у аккордеона есть содержимое
      if (content.style.maxHeight) {
        // Если контент открыт, закрыть его
        content.style.maxHeight = null;
      } else {
        // Если контент закрыт, открыть его
        content.style.maxHeight = content.scrollHeight + "px";
      }
    }

    openAccordion = this; // запомнить ссылку на открытый аккордеон
  }

  accordionItems.forEach(item => item.addEventListener('click', toggleAccordion));

}
faqAccardion();

function tabs(headerSelector, tabSelector, contentSelector, activeClass, display = 'flex') {
  const header = document.querySelector(headerSelector),
    tab = document.querySelectorAll(tabSelector),
    content = document.querySelectorAll(contentSelector)
  function hideTabContent() {
    content.forEach(item => {
      item.style.display = 'none'
    });
    tab.forEach(item => {
      item.classList.remove(activeClass)
    });
  }
  function showTabContent(i = 0) {
    content[i].style.display = display
    tab[i].classList.add(activeClass)
  }
  hideTabContent()
  showTabContent()
  header.addEventListener('click', e => {
    const target = e.target
    if (target.classList.contains(tabSelector.replace(/\./, '')) ||
      target.parentNode.classList.contains(tabSelector.replace(/\./, ''))) {
      tab.forEach((item, i) => {
        if (target == item || target.parentNode == item) {
          hideTabContent()
          showTabContent(i)
        }
      });
    }
  })
}

// ПЕРВЫЙ аргумент - класс всего нашего хедера табов.
// ВТОРОЙ аргумент - класс конкретного элемента, при клике на который будет переключатся таб.
// ТРЕТИЙ аргумент - класс того блока, который будет переключаться.
// ЧЕТВЕРТЫЙ аргумент - класс активности, который будет добавлятся для таба, который сейчас активен.
tabs('.tabs__header', '.tabs__header-item', '.tabs__content-item', 'active')
