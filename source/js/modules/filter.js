// аккордеон для фильтра

(function () {
  let filter = document.querySelector('.filter');
  let filterButtons = document.querySelectorAll('.filter__item > button');

  if (filter && filterButtons) {
    filter.classList.remove('filter--nojs');

    for (let i = 0; i < filterButtons.length; i++) {
      filterButtons[i].addEventListener('click', () => {
        filterButtons[i].parentNode.classList.toggle('filter__item--open');
      });
    }
  }
})();
