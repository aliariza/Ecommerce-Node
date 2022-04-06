const { ServerSession } = require('mongodb');
const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const Cart = require('../utils/cart');
const Security = require('../utils/security');

const CartM = new Cart();

const security = new Security();

exports.getAll = (req, res) => {
  if (!req.session.cart) {
    req.session.cart = {
      items: [],
      totals: 0.0,
      formattedTotals: '',
    };
  }
  Product.find({ price: { $gt: 0 } })
    .sort({ price: -1 })
    .limit(6)
    .then((products) => {
      const format = new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
      });
      products.forEach((product) => {
        product.formattedPrice = format.format(product.price);
      });
      res.render('index', {
        pageTitle: 'Node.js Shopping Cart',
        products: products,
        nonce: security.md5(req.sessionID + req.headers['user-agent']),
      });
    })
    .catch(() => {
      res.status(400).send('Bad request');
    });
  // SEND RESPONSE
};

exports.getCart = catchAsync(async (req, res, next) => {
  const sess = req.session;
  const cart = typeof sess.cart !== 'undefined' ? sess.cart : false;
  res.render('cart', {
    pageTitle: 'Cart',
    cart: cart,
    nonce: security.md5(req.sessionID + req.headers['user-agent']),
  });
});

exports.addToCart = (req, res) => {
  const qty = parseInt(req.body.qty, 10);
  const product = parseInt(req.body.product_id, 10);
  if (qty > 0 && security.isValidNonce(req.body.nonce, req)) {
    Product.findOne({ product_id: product })
      .then((prod) => {
        const cart = req.session.cart ? req.session.cart : null;
        CartM.addToCart(prod, qty, cart);
        res.redirect('/cart');
      })
      .catch(() => {
        res.redirect('/');
      });
  } else {
    res.redirect('/');
  }
};
