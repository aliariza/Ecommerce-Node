export const carousel = (items) =>
  items.forEach((el) => {
    const minPerSlide = 2;
    let next = el.nextElementSibling;
    for (let i = 1; i < minPerSlide; i++) {
      if (!next) {
        next = items[0];
      }
      if (el.classList.contains('active')) {
        items[i].classList.remove('active');
      } else {
        items[i + 1].classList.add('active');
      }

      let cloneChild = next.cloneNode(true);

      el.appendChild(cloneChild.children[0]);
      next = next.nextElementSibling;
    }
  });
