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
