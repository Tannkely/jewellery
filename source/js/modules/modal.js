(function () {

  // Обработчик нажатия на кнопку Esc при открытой модалке
  function escapeClickHandler(evt) {
    if (evt.key === window.utils.KeyCode.ESCAPE) {
      evt.preventDefault();
      setModalVisibility(false);
    }
  }

  // Установка видимости эл-та overlay и модалки
  function setModalVisibility(visible, modal) {
    if (visible) {
      document.body.classList.add('overlay--open');
      createOverlay();
      document.addEventListener('keydown', escapeClickHandler);
      modal.classList.add('modal-show');
    } else {
      document.body.classList.remove('overlay--open');
      if(document.querySelector('.modal-show')){
        document.querySelector('.modal-show').classList.remove('modal-show');
      }
      if(document.querySelector('.overlay')){
        document.querySelector('.overlay').remove();
      }
      document.removeEventListener('keydowm', escapeClickHandler);
    }
  }

  // Создание эл-та overlay со своей логикой (по клику)
  function createOverlay() {
    const overlay = document.createElement('div');

    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    overlay.addEventListener('click', (overlayEvt) => {
      if (overlayEvt.target === overlay) {
        setModalVisibility(false);
      }
    });
  }

  // Обработчик открытия модалки
  function modalOpenHandler(modal) {
    setModalVisibility(true, modal);
  }

  // Обработчик закрытия модалки
  function modalCloseHandler(event) {
    event.preventDefault();
    setModalVisibility(false);
  }

  window.addEventListener('resize', modalCloseHandler);


  const modalLoginOpen = document.querySelector('.modal-button');
  const modalLoginClose = document.querySelector('.modal__close--login');
  const modalLogin = document.querySelector('.modal--login');
  const email = document.querySelector('[id=email]');
  // const loginForm = document.querySelector('.login__form');

  const modalFilterOpen = document.querySelector('.catalog__filter-button');
  const modalFilterClose = document.querySelector('.filter__modal-close');
  const modalFilter = document.querySelector('.filter');


  if (modalLoginOpen && modalLogin) {
    modalLoginOpen.addEventListener('click', (event) => {
      event.preventDefault();

      modalOpenHandler(modalLogin);
      email.focus();

    });
  }

  if (modalLoginClose) {
    modalLoginClose.addEventListener('click', modalCloseHandler);
  }

  if (modalFilterOpen && modalFilter) {
    modalFilterOpen.addEventListener('click', (event) => {
      event.preventDefault();
      modalOpenHandler(modalFilter);
    });
  }

  if (modalFilterClose) {
    modalFilterClose.addEventListener('click', modalCloseHandler);
  }
})();
