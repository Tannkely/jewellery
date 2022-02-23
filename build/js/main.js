// аккордеон для блока FAQ

(function () {
  let faqList = document.querySelector('.faq__list');

  if (faqList) {
    faqList.classList.remove('faq__list--nojs');

    let toggleFaqItem = function (item) {
      item.classList.toggle('faq__item--open');
    };

    faqList.addEventListener('click', (evt) => {
      let faqItem = evt.target.closest('li');
      toggleFaqItem(faqItem);
    });
  }

})();

// аккордеон для фильтра

(function () {

  let filter = document.querySelector('.filter');
  let filterButtons = document.querySelectorAll('.filter__item > button');

  if (filter && filterButtons) {

    filter.classList.remove('filter--nojs');

    for (let i = 0; i < filterButtons.length; i++) {
      filterButtons[i].addEventListener('click', (evt) => {
        evt.target.parentNode.classList.toggle('filter__item--open');
      });
    }
  }

})();

// мобильное меню - начиная с планшетной версии

(function () {
  let pageHeader = document.querySelector('.page-header');
  let headerToggle = document.querySelector('.page-header__toggle');

  if (pageHeader && headerToggle) {
    pageHeader.classList.remove('page-header--nojs');

    headerToggle.addEventListener('click', () => {
      if (pageHeader.classList.contains('page-header--closed')) {
        pageHeader.classList.remove('page-header--closed');
        pageHeader.classList.add('page-header--opened');
      } else {
        pageHeader.classList.add('page-header--closed');
        pageHeader.classList.remove('page-header--opened');
      }
    });
  }

})();

// модальные окна

(function () {

  let modalLoginOpen = document.querySelector('.modal-open--login');
  let modalLogin = document.querySelector('.modal--login');
  let modalLoginClose = document.querySelector('.modal__close--login');
  let loginForm = document.querySelector('.login__form');

  let modalBasketOpen = document.querySelectorAll('.modal-open--basket');
  let modalBasket = document.querySelector('.modal--basket');
  let modalBasketClose = document.querySelector('.modal__close--basket');

  let modalFilterOpen = document.querySelector('.catalog__filter-button');
  let modalFilter = document.querySelector('.filter');
  let modalFilterClose = document.querySelector('.filter__modal-close');

  let body = document.querySelector('body');

  let email = document.querySelector('[id=email]');

  let isStorage = true;
  let emailStorage = '';

  try {
    emailStorage = localStorage.getItem('emailStorage');
  } catch (err) {
    isStorage = false;
  }

  let escapeClickHandler = function (evt) {
    if (evt.key === window.utils.KeyCode.ESCAPE) {
      evt.preventDefault();
      // eslint-disable-next-line no-use-before-define
      setVisible(false);
    }
  };

  let setVisible = function (visible) {
    if (visible) {
      body.classList.add('overlay--open');
      document.addEventListener('keydown', escapeClickHandler);
    } else {
      body.classList.remove('overlay--open');
      document.querySelector('.modal-show').classList.remove('modal-show');
      document.querySelector('.overlay').remove();
      document.removeEventListener('keydowm', escapeClickHandler);

      if (modalFilter && modalFilterClose) {
        modalFilter.classList.remove('filter--modal-open');
      }
    }
  };

  let createOverlay = function () {
    let overlay = document.createElement('div');
    overlay.classList.add('overlay');
    body.appendChild(overlay);

    overlay.addEventListener('click', (overlayEvt) => {
      if (overlayEvt.target === overlay) {
        setVisible(false);
      }
    });
  };

  let modalOpenHandler = function (modal) {
    modal.classList.add('modal-show');
    createOverlay();
    setVisible(true);
  };

  let modalCloseHandler = function (evt) {
    evt.preventDefault();
    setVisible(false);
  };

  if (modalLoginOpen && modalLogin) {
    modalLoginOpen.addEventListener('click', (evt) => {
      evt.preventDefault();
      modalOpenHandler(modalLogin);
      email.focus();

      if (emailStorage) {
        email.value = emailStorage;
      }
    });
  }

  if (modalLoginClose) {
    modalLoginClose.addEventListener('click', modalCloseHandler);
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (evt) => {
      if (!email.value) {
        evt.preventDefault();
      } else {
        if (isStorage) {
          localStorage.setItem('emailStorage', email.value);
        }
      }
    });
  }

  if (modalBasketOpen && modalBasket) {
    for (let i = 0; i < modalBasketOpen.length; i++) {
      modalBasketOpen[i].addEventListener('click', (evt) => {
        evt.preventDefault();
        modalOpenHandler(modalBasket);
      });
    }
  }

  if (modalBasketClose) {
    modalBasketClose.addEventListener('click', modalCloseHandler);
  }

  if (modalFilterOpen && modalFilter) {
    modalFilterOpen.addEventListener('click', (evt) => {
      evt.preventDefault();
      modalOpenHandler(modalFilter);
      modalFilter.classList.add('filter--modal-open');
    });
  }

  if (modalFilterClose) {
    modalFilterClose.addEventListener('click', modalCloseHandler);
  }

})();

// слайдер

(function () {

  let PictureCount = {
    DESKTOP: 4,
    TABLET: 2,
  };

  let mobile = window.matchMedia('(max-width: 767px)');
  let tablet = window.matchMedia('(max-width: 1023px)');

  let list = document.querySelector('.slider__list');
  let items = document.querySelectorAll('.slider__item');
  let buttonLeft = document.querySelector('.slider__button--left');
  let buttonRight = document.querySelector('.slider__button--right');

  let wrapperWidth; // вычисляемая под конкретное разрешение ширина контейнера
  let itemWidth; // вычисляемая под конкретное разрешение ширина 1 слайда

  let positionLeftItem = 0;
  // eslint-disable-next-line no-unused-vars
  let transform = 0;

  let step; // шаг
  let itemsArray = [];

  let startX = 0; // для мобильного тача - начало перемещения

  if (items) {
    items.forEach((item, index) => {
      itemsArray.push({item: item, position: index, transform: 0});
    });
  }

  let position = {
    getMin: 0,
    getMax: itemsArray.length - 1,
  };

  let count; // временная переменная для определения количества изображений на адаптиве

  let changeSizeHandler = function (evt) {

    if (evt.matches) {
      count = PictureCount.TABLET;
    } else {
      count = PictureCount.DESKTOP;
    }

    if (list && items) {
      wrapperWidth = parseFloat(getComputedStyle(list).width);
      itemWidth = parseFloat(getComputedStyle(items[0]).width);

      step = itemWidth / wrapperWidth * 100;

      positionLeftItem = 0;
      transform = 0;
      list.style.transform = 'translateX(, &{transform}!%)';
    }
  };

  let buttonRightClickHandler = function () {
    if (positionLeftItem + count >= position.getMax) {
      return;
    }

    positionLeftItem = positionLeftItem + count;

    transform -= step * count;
    list.style.transform = 'translateX(, &{transform}%)';
  };

  let setMobileTouch = function () {
    if (list) {
      list.addEventListener('touchstart', (evt) => {
        startX = evt.changedTouches[0].clientX;
      });

      list.addEventListener('touchend', (evt) => {
        let endX = evt.changedTouches[0].clientX;
        let deltaX = endX - startX;

        if (deltaX > 50) {
          buttonRightClickHandler();
        } else if (deltaX < -50) {
          // eslint-disable-next-line no-use-before-define
          buttonLeftClickHandler();
        }
      });
    }
  };

  let setMobileHandler = function (evt) {
    if (evt.matches) {
      setMobileTouch();
    }
  };

  let buttonLeftClickHandler = function () {
    if (positionLeftItem <= position.getMin) {
      return;
    }

    positionLeftItem = positionLeftItem - count;
    transform += step * count;

    list.style.transform = 'translateX(, &{transform}%)';
  };

  if (buttonLeft && buttonRight) {
    buttonRight.addEventListener('click', buttonRightClickHandler);
    buttonLeft.addEventListener('click', buttonLeftClickHandler);
  }

  tablet.addListener(changeSizeHandler);
  changeSizeHandler(tablet);

  mobile.addListener(setMobileHandler);
  setMobileHandler(mobile);

})();

// утилитарный модуль - экспортирует общие функции и переменные для всех модулей

(function () {

  window.utils = {
    KeyCode: {
      BACKSPACE: 'Backspace',
      ESCAPE: 'Escape',
    }
  };

})();
//# sourceMappingURL=main.js.map
