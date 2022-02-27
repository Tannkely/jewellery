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

if (document.querySelector('.swiper-container')) {
	new Swiper('.swiper-container', {
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
			renderBullet: function (index, className) {
				return '<span class="' + className + '">' + (index + 1) + '</span>';
			}
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
					el: '.swiper-pagination',
					type: 'fraction',
					clickable: true,
					renderFraction: function (currentClass, totalClass) {
						return '<span class="' + currentClass + '"></span>' +
							'&nbsp;&nbsp;of&nbsp;&nbsp;' +
							'<span class="' + totalClass + '"></span>';
					},
				},
				slidesPerView: 2,
				slidesPerGroup: 2,
			},
			768: {
				slidesPerView: 2,
				slidesPerGroup: 2,
				pagination: {
					el: '.swiper-pagination',
					type: 'bullets',
					clickable: true,
					renderBullet: function (index, className) {
						return '<span class="' + className + '">' + (index + 1) + '</span>';
					}
				}
			},
			1024: {
				slidesPerView: 3,
				slidesPerGroup: 3,
			},
			1300: {
				slidesPerView: 4,
				slidesPerGroup: 4,
			}
		}
	});
}

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
