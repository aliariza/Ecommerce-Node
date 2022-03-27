import { showAlert } from './alerts';
const mainpageProduct = new bootstrap.Modal(
  document.getElementById('mainpageProduct')
);

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

const modalQtyHTML = document.querySelector('.modal-qty');
const buttonPlus = document.querySelector('.button-plus');
const buttonMinus = document.querySelector('.button-minus');

export const getProductView = async (products) => {
  try {
    products.forEach(function (product, i) {
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

        let QTY = (modalQtyHTML.innerHTML = 1);
        let totalPrice = modalPrice.innerHTML * QTY * 1;
        modalTutari.innerHTML = totalPrice;
        buttonPlus.addEventListener('click', () => {
          QTY = QTY++ < 100 ? QTY : 100;
          totalPrice = modalPrice.innerHTML * QTY;
          modalTutari.innerHTML = totalPrice;
          modalQtyHTML.innerHTML = QTY;
        });
        buttonMinus.addEventListener('click', () => {
          QTY = QTY-- > 1 ? QTY : 1;
          totalPrice = modalPrice.innerHTML * QTY;

          modalTutari.innerHTML = totalPrice;

          modalQtyHTML.innerHTML = QTY;
        });
        console.log(QTY);
        mainpageProduct.show();
      });
    });
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
