// аккордеон для блока FAQ

if (document.querySelectorAll('.accordion__item').length) {
  const accordionItems = document.querySelectorAll('.accordion__item');

  accordionItems.forEach((item) => {
    item.classList.remove('no-js');
    item.addEventListener('click', () => {
      const activeAccordionItem = document.querySelector(
        '.accordion__item.active'
      );

      if (activeAccordionItem && activeAccordionItem !== item) {
        activeAccordionItem.classList.toggle('active');
      }

      item.classList.toggle('active');
    });

    item.addEventListener('keydown', (evt) => {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        const activeAccordionItem = document.querySelector(
          '.accordion__item.active'
        );
        if (activeAccordionItem && activeAccordionItem !== item) {
          activeAccordionItem.classList.toggle('active');
        }

        item.classList.toggle('active');
      }
    });
  });
}

if (document.querySelectorAll('.filter__accordion-item').length) {
  const filterAccordionItems = document.querySelectorAll(
    '.filter__accordion-item'
  );

  filterAccordionItems.forEach((item) => {
    item.classList.remove('no-js');

    const filterItemTitle = item.querySelector(
      '.filter__accordion-item-title-wrap'
    );

    filterItemTitle.addEventListener('click', (evt) => {
      if (
        evt.target &&
        evt.target.closest('.filter__accordion-item-title-wrap')
      ) {
        if (
          !item
            .querySelector('.filter__accordion-item-body')
            .classList.contains('active') &&
          !item.classList.contains('active')
        ) {
          item
            .querySelector('.filter__accordion-item-body')
            .classList.add('active');
          item.classList.add('active');
          item.blur();
        } else if (
          item
            .querySelector('.filter__accordion-item-body')
            .classList.contains('active')
        ) {
          item
            .querySelector('.filter__accordion-item-body')
            .classList.remove('active');
          item.classList.remove('active');
        }
      }
    });

    const onFilterItemKeydown = (evt) => {
      if (evt.key === 'Enter') {
        evt.preventDefault();

        if (
          !item
            .querySelector('.filter__accordion-item-body')
            .classList.contains('active') &&
          !item.classList.contains('active')
        ) {
          item
            .querySelector('.filter__accordion-item-body')
            .classList.add('active');
          item.classList.add('active');
        } else if (
          item
            .querySelector('.filter__accordion-item-body')
            .classList.contains('active')
        ) {
          item
            .querySelector('.filter__accordion-item-body')
            .classList.remove('active');
          item.classList.remove('active');
        }
      }
    };

    item.addEventListener('keydown', onFilterItemKeydown);

    const filterItemInputs = item.querySelectorAll(
      '.filter__accordion-item-input-wrap input'
    );

    filterItemInputs.forEach((input) => {
      input.addEventListener('keydown', (evt) => {
        if (evt.key === 'Enter') {
          evt.preventDefault();
          item.removeEventListener('keydown', onFilterItemKeydown);

          if (evt.target.checked === true) {
            evt.target.checked = false;
          } else {
            evt.target.checked = true;
          }
        }
      });
    });
  });
}

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
  const menu = document.querySelector('.page-header');
  const menuButton = document.querySelector('.page-header__hamburger button');

  menu.classList.remove('no-js');

  if (menu && menuButton) {
    menuButton.addEventListener('click', () => {
      if (menu.classList.contains('page-header--closed')) {
        menu.classList.remove('page-header--closed');
        menu.classList.add('page-header--opened');
        document.body.style.overflow = 'hidden';
      } else {
        menu.classList.add('page-header--closed');
        menu.classList.remove('page-header--opened');
        document.body.removeAttribute('style');
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

(function () {
  if (!document.querySelector('.swiper-container')) {
    // Прерывание функции
    return;
  }

  new window.Swiper('.swiper-container', {
    navigation: {
      prevEl: '.slider__button--prev',
      nextEl: '.slider__button--next',
    },
    pagination: {
      el: '.slider__pagination',
      bulletClass: 'slider__pagination-bullet',
      bulletActiveClass: 'slider__pagination-bullet--active',
      type: 'bullets',
      clickable: true,
      renderBullet: function (index, className) {
        // todo
        return `<span class="${className}">${index + 1}</span>`;
      },
    },
    grabCursor: true,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    autoheight: true,
    slidesPerView: 'auto',
    spaceBetween: 30,
    slidesPerGroup: 4,
    loop: true,
    breakpoints: {
      320: {
        pagination: {
          el: '.slider__pagination',
          bulletClass: 'slider__pagination-bullet',
          bulletActiveClass: 'slider__pagination-bullet--active',
          type: 'fraction',
          clickable: false,
          renderFraction: function (currentClass, totalClass) {
            // todo
            return (
              `<span class="${currentClass}"></span>` +
              `&nbsp;&nbsp;of&nbsp;&nbsp;` +
              `<span class="${totalClass}"></span>`
            );
          },
        },
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        pagination: {
          el: '.slider__pagination',
          bulletClass: 'slider__pagination-bullet',
          bulletActiveClass: 'slider__pagination-bullet--active',
          type: 'fraction',
          clickable: false,
          renderFraction: function (currentClass, totalClass) {
            // todo
            return (
              `<span class="${currentClass}"></span>` +
              `&nbsp;&nbsp;of&nbsp;&nbsp;` +
              `<span class="${totalClass}"></span>`
            );
          },
        },
      },
      1024: {
        pagination: {
          el: '.slider__pagination',
          bulletClass: 'slider__pagination-bullet',
          bulletActiveClass: 'slider__pagination-bullet--active',
          type: 'bullets',
          clickable: true,
          renderBullet: function (index, className) {
            // todo
            return `<span class="${className}">${index + 1}</span>`;
          },
        },
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      1300: {
        pagination: {
          el: '.slider__pagination',
          bulletClass: 'slider__pagination-bullet',
          bulletActiveClass: 'slider__pagination-bullet--active',
          type: 'bullets',
          clickable: true,
          renderBullet: function (index, className) {
            // todo
            return `<span class="${className}">${index + 1}</span>`;
          },
        },
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
    },
  });
})();

// утилитарный модуль - экспортирует общие функции и переменные для всех модулей

(function () {
  window.utils = {
    KeyCode: {
      BACKSPACE: 'Backspace',
      ESCAPE: 'Escape',
    },
  };
})();
//# sourceMappingURL=main.js.map
