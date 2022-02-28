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
