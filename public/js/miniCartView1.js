const Product = require('/models/productModel');
const catchAsync = require('/utils/catchAsync');

export const miniCartView = () => {
  // DOM ELEMENTS RELATED TO Product Modal

  const modalQty = document.querySelector('.modal-qty');
  const modalId = document.querySelector('.modal-id');

  // DOM ELEMENTS RELATED TO MINI CART

  const cartProductId = document.querySelector('.mini-cart-product-id');
  const cartProductQty = document.querySelector('.mini-cart-product-qty');

  const miniCartModal = new bootstrap.Modal(
    document.getElementById('miniCart')
  );
  const miniCart = document.querySelector('.miniCartModal');
  miniCart.addEventListener('click', (e) => {
    // e.preventDefault();
    catchAsync(async (req, res, next) => {
      // 1) Get the data, for the requested tour (including reviews and guides)
      const product = await Product.findOne({ id: modalId.innerHTML });

      if (!product) {
        return next(new AppError('There is no product with that name.', 404));
      }
      console.log(product);

      // 2) Build template
      // 3) Render template using data from 1)
      res.status(200).render('singleProduct', {
        title: `${product.name}`,
        product,
      });
    });
    cartProductId.innerHTML = modalId.innerHTML;
    cartProductQty.innerHTML = modalQty.innerHTML;
    console.log(cartProductId.innerHTML, cartProductQty.innerHTML);
    console.log(product);
    miniCartModal.show();
  });
};
