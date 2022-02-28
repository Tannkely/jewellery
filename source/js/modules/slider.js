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
