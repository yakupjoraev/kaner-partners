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

function tabsContainer() {
  const container = document.querySelector('.tabs');

  if (!container) {
    return null
  }

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
  tabs('.tabs__header', '.tabs__header-item', '.tabs__content-item', 'active');
}

tabsContainer();










////////////////////////////////////////////////////////////////////////////////////////////////////



function validate() {

  var number = $("#phone").intlTelInput('getNumber');
  iso = $("#phone").intlTelInput('getSelectedCountryData').iso2;

  var exampleNumber = intlTelInputUtils.getExampleNumber(iso, 0, 0);
  if (number == '')
    number = exampleNumber;

  var formattedNumber = intlTelInputUtils.formatNumber(number, iso, intlTelInputUtils.numberFormat.NATIONAL);
  var isValidNumber = intlTelInputUtils.isValidNumber(number, iso);
  var validationError = intlTelInputUtils.getValidationError(number, iso);

  console.log(number);
  console.log(formattedNumber);
  console.log(intlTelInputUtils.formatNumber(number, iso, intlTelInputUtils.numberFormat.INTERNATIONAL));
  console.log(intlTelInputUtils.formatNumber(number, iso, intlTelInputUtils.numberFormat.E164));
  console.log(intlTelInputUtils.formatNumber(number, iso, intlTelInputUtils.numberFormat.RFC3966));
  console.log(isValidNumber);
  console.log(validationError);

}


//var input = document.querySelector("#phone");

$("#phone").intlTelInput({
  geoIpLookup: function (callback) {
    $.get("http://ipinfo.io", function () { }, "jsonp").always(function (resp) {
      var countryCode = (resp && resp.country) ? resp.country : "";
      callback(countryCode);
    });
  },
  initialCountry: "ru", // Россия по умолчанию
  preferredCountries: ["ru", "il"], // Россия и Израиль в начале списка
  separateDialCode: true,
});

// Применить маску при выборе страны по умолчанию
var selectedCountry = $("#phone").intlTelInput('getSelectedCountryData');
var dialCode = selectedCountry.dialCode;
var maskNumber = intlTelInputUtils.getExampleNumber(selectedCountry.iso2, 0, 0);
maskNumber = intlTelInputUtils.formatNumber(maskNumber, selectedCountry.iso2, 2);
maskNumber = maskNumber.replace('+' + dialCode + ' ', '');
var mask = maskNumber.replace(/[0-9+]/ig, '0');
$('#phone').mask(mask, { placeholder: maskNumber });

// Обработчик события при изменении страны
$('#phone').on('countrychange', function (e) {
  $(this).val('');

  var selectedCountry = $(this).intlTelInput('getSelectedCountryData');
  var dialCode = selectedCountry.dialCode;
  var maskNumber = intlTelInputUtils.getExampleNumber(selectedCountry.iso2, 0, 0);
  maskNumber = intlTelInputUtils.formatNumber(maskNumber, selectedCountry.iso2, 2);
  maskNumber = maskNumber.replace('+' + dialCode + ' ', '');
  var mask = maskNumber.replace(/[0-9+]/ig, '0');
  $('#phone').mask(mask, { placeholder: maskNumber });
});











////////////////////////////////////////////////////////////////////////////////////////////////////



function validate() {

  var number = $("#phone2").intlTelInput('getNumber');
  iso = $("#phone2").intlTelInput('getSelectedCountryData').iso2;

  var exampleNumber = intlTelInputUtils.getExampleNumber(iso, 0, 0);
  if (number == '')
    number = exampleNumber;

  var formattedNumber = intlTelInputUtils.formatNumber(number, iso, intlTelInputUtils.numberFormat.NATIONAL);
  var isValidNumber = intlTelInputUtils.isValidNumber(number, iso);
  var validationError = intlTelInputUtils.getValidationError(number, iso);

  console.log(number);
  console.log(formattedNumber);
  console.log(intlTelInputUtils.formatNumber(number, iso, intlTelInputUtils.numberFormat.INTERNATIONAL));
  console.log(intlTelInputUtils.formatNumber(number, iso, intlTelInputUtils.numberFormat.E164));
  console.log(intlTelInputUtils.formatNumber(number, iso, intlTelInputUtils.numberFormat.RFC3966));
  console.log(isValidNumber);
  console.log(validationError);

}


//var input = document.querySelector("#phone");

$("#phone2").intlTelInput({
  geoIpLookup: function (callback) {
    $.get("http://ipinfo.io", function () { }, "jsonp").always(function (resp) {
      var countryCode = (resp && resp.country) ? resp.country : "";
      callback(countryCode);
    });
  },
  initialCountry: "ru", // Россия по умолчанию
  preferredCountries: ["ru", "il"], // Россия и Израиль в начале списка
  separateDialCode: true,
});

// Применить маску при выборе страны по умолчанию
var selectedCountry = $("#phone2").intlTelInput('getSelectedCountryData');
var dialCode = selectedCountry.dialCode;
var maskNumber = intlTelInputUtils.getExampleNumber(selectedCountry.iso2, 0, 0);
maskNumber = intlTelInputUtils.formatNumber(maskNumber, selectedCountry.iso2, 2);
maskNumber = maskNumber.replace('+' + dialCode + ' ', '');
var mask = maskNumber.replace(/[0-9+]/ig, '0');
$('#phone2').mask(mask, { placeholder: maskNumber });

// Обработчик события при изменении страны
$('#phone2').on('countrychange', function (e) {
  $(this).val('');

  var selectedCountry = $(this).intlTelInput('getSelectedCountryData');
  var dialCode = selectedCountry.dialCode;
  var maskNumber = intlTelInputUtils.getExampleNumber(selectedCountry.iso2, 0, 0);
  maskNumber = intlTelInputUtils.formatNumber(maskNumber, selectedCountry.iso2, 2);
  maskNumber = maskNumber.replace('+' + dialCode + ' ', '');
  var mask = maskNumber.replace(/[0-9+]/ig, '0');
  $('#phone2').mask(mask, { placeholder: maskNumber });
});



////////////////////////////////////////////////////////////////////////////////////////////////////







const openModalBtns = document.querySelectorAll('.open-modal-btn');
const closeModalBtns = document.querySelectorAll('.close-modal-btn');
const modals = document.querySelectorAll('.modal');

openModalBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const modalId = btn.dataset.modalId;
    const modal = document.getElementById(modalId);
    modal.classList.add('show');
  });
});

closeModalBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('.modal');
    modal.classList.remove('show');
  });
});

window.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal')) {
    event.target.classList.remove('show');
  }
});
