const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.route('/').get(cartController.getAll);
router
  .route('/cart')
  .get(cartController.getCart)
  .post(cartController.addToCart);

// router.route("cart/remove/:id").get(cartController.removeCart);
// router.route("/cart/empty").get(cartController.emptyCart);

module.exports = router;
