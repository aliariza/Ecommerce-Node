const express = require('express');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
const viewsController = require('../controllers/viewsController');
// const reviewRouter = require('../routes/reviewRoutes');

const router = express.Router();

// router.param('id', productController.checkID);

// POST /product/234fad4/reviews
// GET /product/234fad4/reviews

// router.use('/:productId/reviews', reviewRouter);

// router
//   .route('/top-5-cheap')
//   .get(productController.aliasTopProducts, productController.getAllProducts);

// router.route('/product-stats').get(productController.getProductStats);
// router
//   .route('/monthly-plan/:year')
//   .get(
//     authController.protect,
//     authController.restrictTo('admin'),
//     productController.getMonthlyPlan
//   );

// router
//   .route('/products-within/:distance/center/:latlng/unit/:unit')
//   .get(productController.getproductsWithin);
// /products-within?distance=233&center=-40,45&unit=mi
// /products-within/233/center/-40,45/unit/mi

// router
//   .route('/distances/:latlng/unit/:unit')
//   .get(productController.getDistances);

router
  .route('/')
  .get(productController.getAllProducts)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    productController.createProduct
  );

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    // productController.uploadProductImages,
    // productController.resizeProductImages,
    productController.updateProduct
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    productController.deleteProduct
  );
router.route('/:slug').get(viewsController.getProduct);

module.exports = router;
