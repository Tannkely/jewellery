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
