import { write, plus, minus } from './write';

export const productView = (products) => {
  const productHeaders = document.querySelectorAll('.isim h2');
  const productPrices = document.querySelectorAll('.product-price');
  const productColors = document.querySelectorAll('.product-color');
  const productCodes = document.querySelectorAll('.product-code');
  const productKategoris = document.querySelectorAll('.product-kategori');
  const productMarkas = document.querySelectorAll('.product-marka');
  const productStoks = document.querySelectorAll('.product-stok');
  const productImages = document.querySelectorAll('.product-image');

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

  const buttonPlus = document.querySelector('.button-plus');
  const buttonMinus = document.querySelector('.button-minus');
  // const QTY = 1;
  const calcVars = {
    bp: buttonPlus,
    bm: buttonMinus,
    qty: modalQty,
    tprice: modalTutari,
    uprice: modalPrice,
    QTY: 1,
  };

  const mainpageProduct = new bootstrap.Modal(
    document.getElementById('mainpageProduct')
  );
  plus(calcVars);
  minus(calcVars);

  products.forEach((product, i) => {
    product.addEventListener('click', function () {
      const productID = product.getAttribute('data-id');
      modalTitle.innerHTML = productHeaders[i].innerHTML;
      modalPrice.innerHTML = productPrices[i].innerHTML;
      modalColor.innerHTML = productColors[i].innerHTML;
      modalCode.innerHTML = productCodes[i].innerHTML;
      modalKategori.innerHTML = productKategoris[i].innerHTML;
      modalMarka.innerHTML = productMarkas[i].innerHTML;
      modalStok.innerHTML = productStoks[i].innerHTML;

      const attribute = productImages[i].getAttribute('src');
      modalImage.setAttribute('src', attribute);
      calcVars.QTY = 1;
      write(calcVars);
      mainpageProduct.show();
    });
  });
};
