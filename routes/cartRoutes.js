const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

router
  .route('/')
  .get(cartController.getCart)
  .post(cartController.addItemToCart);

router.route('/empty-cart').delete(cartController.emptyCart);

module.exports = router;
