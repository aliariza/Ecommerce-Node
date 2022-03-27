import '@babel/polyfill';
import { login, logout, signup } from './login';
// import { updateSettings } from './updateSettings';
// import { bookTour } from './stripe';
import { showAlert } from './alerts';
import { carousel } from './carousel';
import { countDocuments } from '../../models/productModel';
import { makeArray } from 'jquery';

// DOM ELEMENTS
// const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
// const userDataForm = document.querySelector('.form-user-data');
// const userPasswordForm = document.querySelector('.form-user-password');
// const bookBtn = document.getElementById('book-tour');
const signupForm = document.querySelector('.form--signup');
const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
const signupModal = new bootstrap.Modal(document.getElementById('signupModal'));

// FIRST PAGE PRODUCT MODAL

// CAROUSEL
const items = document.querySelectorAll(
  '.carousel .carousel-inner .carousel-item'
);

if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
    loginModal.toggle();
  });
if (signupForm)
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    signup(name, email, password, passwordConfirm);
    signupModal.toggle();
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);

// if (userDataForm)
//   userDataForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const form = new FormData();
//     form.append('name', document.getElementById('name').value);
//     form.append('email', document.getElementById('email').value);
//     form.append('photo', document.getElementById('photo').files[0]);

//     updateSettings(form, 'data');
//   });

// if (userPasswordForm)
//   userPasswordForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     document.querySelector('.btn--save-password').textContent = 'Updating...';

//     const passwordCurrent = document.getElementById('password-current').value;
//     const password = document.getElementById('password').value;
//     const passwordConfirm = document.getElementById('password-confirm').value;
//     await updateSettings(
//       { passwordCurrent, password, passwordConfirm },
//       'password'
//     );

//     document.querySelector('.btn--save-password').textContent = 'Save password';
//     document.getElementById('password-current').value = '';
//     document.getElementById('password').value = '';
//     document.getElementById('password-confirm').value = '';
//   });

// if (bookBtn)
//   bookBtn.addEventListener('click', (e) => {
//     e.target.textContent = 'Processing...';
//     const { tourId } = e.target.dataset;
//     bookTour(tourId);
//   });

const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 20);

if (items) carousel(items);

const mainpageProduct = new bootstrap.Modal(
  document.getElementById('mainpageProduct')
);
const products = document.querySelectorAll('.productModal');
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

console.log(productImages[0]);

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
    console.log(modalImage);
    mainpageProduct.show();
  });
});
