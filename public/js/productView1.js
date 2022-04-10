const CalcProduct = require('../../utils/calcProduct');
const Product = require('/models/productModel');

export const productView = (products) => {
  // DOM ELEMENTS RELATED TO CAROUSEL
  const productHeaders = document.querySelectorAll('.isim h2');
  const productPrices = document.querySelectorAll('.product-price');
  const productColors = document.querySelectorAll('.product-color');
  const productCodes = document.querySelectorAll('.product-code');
  const productKategoris = document.querySelectorAll('.product-kategori');
  const productMarkas = document.querySelectorAll('.product-marka');
  const productStoks = document.querySelectorAll('.product-stok');
  const productImages = document.querySelectorAll('.product-image');
  const productIds = document.querySelectorAll('.product-id');

  // DOM ELEMENTS RELATED TO Product Modal
  const modalTitle = document.querySelector('.modal-baslik');
  const modalPrice = document.querySelector('.modal-price');
  const modalColor = document.querySelector('.modal-color');
  const modalCode = document.querySelector('.modal-code');
  const modalKategori = document.querySelector('.modal-kategori');
  const modalMarka = document.querySelector('.modal-marka');
  const modalStok = document.querySelector('.modal-stok');
  const modalImage = document.querySelector('.modal-image');
  const modalTutari = document.querySelector('.modal-total');
  const modalQty = document.querySelector('.modal-qty');
  const modalId = document.querySelector('.modal-id');

  const buttonPlus = document.querySelector('.button-plus');
  const buttonMinus = document.querySelector('.button-minus');

  const productViewModal = new CalcProduct(
    modalQty,
    buttonMinus,
    buttonPlus,
    modalPrice,
    modalTutari
  );

  const mainpageProduct = new bootstrap.Modal(
    document.getElementById('mainpageProduct')
  );

  products.forEach((product, i) => {
    product.addEventListener('click', function () {
      modalId.innerHTML = productIds[i].innerHTML;
      modalTitle.innerHTML = productHeaders[i].innerHTML;
      modalPrice.innerHTML = productPrices[i].innerHTML;
      modalColor.innerHTML = productColors[i].innerHTML;
      modalCode.innerHTML = productCodes[i].innerHTML;
      modalKategori.innerHTML = productKategoris[i].innerHTML;
      modalMarka.innerHTML = productMarkas[i].innerHTML;
      modalStok.innerHTML = productStoks[i].innerHTML;

      const attribute = productImages[i].getAttribute('src');
      modalImage.setAttribute('src', attribute);


      productViewModal.reset();

      mainpageProduct.show();
    });
  });
  productViewModal.add();
  productViewModal.subtract();
};
