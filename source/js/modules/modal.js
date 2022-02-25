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
