import '@babel/polyfill';
import { login, logout, signup } from './login';
// import { updateSettings } from './updateSettings';
// import { bookTour } from './stripe';
import { showAlert } from './alerts';
import { carousel } from './carousel';
import { productView } from './productView';
// import { miniCartView } from './miniCartView';

// DOM ELEMENTS
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
// const userDataForm = document.querySelector('.form-user-data');
// const userPasswordForm = document.querySelector('.form-user-password');
// const bookBtn = document.getElementById('book-tour');
const signupForm = document.querySelector('.form--signup');
const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
const signupModal = new bootstrap.Modal(document.getElementById('signupModal'));
const mainpageProduct = new bootstrap.Modal(
  document.getElementById('mainpageProduct')
);

const miniCartForm = document.querySelector('.form--miniCart');

// CAROUSEL
const items = document.querySelectorAll(
  '.carousel .carousel-inner .carousel-item'
);
if (items) carousel(items);

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

const products = document.querySelectorAll('.productModalBtn');
const slugs = document.querySelectorAll('.product-slug');
if (products)
  products.forEach((product, i) => {
    product.addEventListener('click', (e) => {
      e.preventDefault();
      const slug = slugs[i].innerHTML;
      productView(slug);
      mainpageProduct.toggle();
    });
  });
// const productsMC = document.querySelector('.miniCartModal');
// if (productsMC) miniCartView();

const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 20);
