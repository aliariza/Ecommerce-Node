/* eslint-disable */
import axios from 'axios';

import { showAlert } from './alerts';
const CalcProduct = require('/utils/calcProduct');
const catchAsync = require('/utils/catchAsync');

export const productView = catchAsync(async (slug) => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/products',
      params: {
        slug: `${slug}`,
      },
    });

    if (res.data.status === 'success') {
      showProductModal(res);
      calculate();
    }
  } catch (err) {
    showAlert('error', err);
  }
});

const showProductModal = (res) => {
  document.getElementById('res').innerHTML = `
  <div class="row justify-content-between"> 
  <h5 id="mainpageProductLabel">
  ${res.data.data.data[0].name}
</h5>
<button
  class="btn-close"
  type="button"
  data-bs-dismiss="modal"
  aria-label="Close"
></button>
</div> 
<div class="modal-body">
  <div class="row justify-content-center ms-auto">
    <div class="col-md-4 border-end text-center">
      <img
        class="img-fluid modal-image"
        src="./img/product/${res.data.data.data[0].imageCover}"
        alt="${res.data.data.data[0].name}"
        width="350"
        height="auto"
      />
    </div>
    <div class="col-md-4 border-end">
      <div class="d-flex flex-column h-100 justify-content-between">
        <div class="row justify-content-between">
          <div class="col-md-6 text-start">Birim fiyat:</div>
          <div class="col-md-6 text-end modal-price">${res.data.data.data[0].price}</div>
        </div>
        <div class="row justify-content-between">
          <div class="col-md-6 text-start">Urun Kodu:</div>
          <div class="col-md-6 text-end modal-code">
            ${res.data.data.data[0].code}
          </div>
        </div>
        <div class="row justify-content-between">
          <div class="col-md-6 text-start">Kategori:</div>
          <div class="col-md-6 text-end modal-kategori">
            ${res.data.data.data[0].category}
          </div>
        </div>
        <div class="row justify-content-between">
          <div class="col-md-6 text-start">Marka:</div>
          <div class="col-md-6 text-end modal-marka">
            ${res.data.data.data[0].brand}
          </div>
        </div>
        <div class="row justify-content-between">
          <div class="col-md-6 text-start">Stok Durumu:</div>
          <div class="col-md-6 text-end modal-stok">
            ${res.data.data.data[0].stock}
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="d-flex flex-column h-100 justify-content-around">
        <div class="row justify-content-between">
          <div class="col-md-6 text-start">Renk:</div>
          <div class="col-md-6 text-end modal-color">
            ${res.data.data.data[0].color}
          </div>
        </div>
        <div class="row justify-content-between border-bottom">
          <div class="col-md-6 text-start" style="line-height: 3rem">Adet</div>
          <div class="col-md-6 d-inline-flex justify-content-end">
            <span
              class="btn button-minus"
              style="
                width: 2.5rem;
                height: 2.5rem;
                border: 1px solid grey;
                border-radius: 0;
              "
            >
              -
            </span>
            <p
              class="text-center modal-qty"
              style="width: 3rem; height: 3rem; line-height: 3rem"
            >
              1
            </p>
            <span
              class="btn button-plus"
              style="
                width: 2.5rem;
                height: 2.5rem;
                border: 1px solid grey;
                border-radius: 0;
              "
            >
              +
            </span>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-6 text-start">Tutari:</div>
          <div class="col-md-6 text-end modal-total"></div>
        </div>
      </div>
    </div>
  </div>
</div>

`;
};
const calculate = () => {
  const modalPrice = document.querySelector('.modal-price');
  const buttonPlus = document.querySelector('.button-plus');
  const buttonMinus = document.querySelector('.button-minus');
  const modalQty = document.querySelector('.modal-qty');
  const modalTutari = document.querySelector('.modal-total');

  const calc = new CalcProduct(
    buttonMinus,
    buttonPlus,
    modalPrice,
    modalTutari,
    modalQty
  );
  calc.reset();
  calc.add();
  calc.subtract();
};
