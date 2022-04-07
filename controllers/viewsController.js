const Product = require('../models/productModel');
// const User = require('../models/userModel');
// // const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Cart = require('../utils/cart');
const Security = require('../utils/security');

const CartM = new Cart();

const security = new Security();

exports.alerts = (req, res, next) => {
  const { alert } = req.query;
  console.log(alert);
  if (alert === 'booking')
    res.locals.alert =
      "Your booking was successful! Please check your email for a confirmation. If your booking doesn't show up here immediately, please come back later.";
  next();
};

exports.getOverview = catchAsync(async (req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = {
      items: [],
      totals: 0.0,
      formattedTotals: '',
    };
  }
  // 1) Get tour data from collection
  const products = await Product.find({ price: { $gt: 0 } });

  // 2) Build template
  // 3) Render that template using tour data from 1)
  res.status(200).render('overview', {
    title: 'All Products',
    products,
    nonce: security.md5(req.sessionID + req.headers['user-agent']),
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const product = await Product.findOne({ slug: req.params.slug });

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

exports.getLoginForm = (req, res) => {
  res.status(200).render('modals/login', {
    title: 'Giriş',
  });
};

exports.getSignupForm = (req, res) => {
  res.status(200).render('modals/signup', {
    title: 'Kayıt',
  });
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
  console.log(req.body);
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

// exports.getAccount = (req, res) => {
//   res.status(200).render('account', {
//     title: 'Your account',
//   });
// };

// exports.getMyTours = catchAsync(async (req, res, next) => {
//   // 1) Find all bookings
//   const bookings = await Booking.find({ user: req.user.id });

//   // 2) Find tours with the returned IDs
//   const tourIDs = bookings.map((el) => el.tour);
//   const tours = await Tour.find({ _id: { $in: tourIDs } });

//   res.status(200).render('overview', {
//     title: 'My Tours',
//     tours,
//   });
// });

// exports.updateUserData = catchAsync(async (req, res, next) => {
//   const updatedUser = await User.findByIdAndUpdate(
//     req.user.id,
//     {
//       name: req.body.name,
//       email: req.body.email,
//     },
//     {
//       new: true,
//       runValidators: true,
//     }
//   );

//   res.status(200).render('account', {
//     title: 'Your account',
//     user: updatedUser,
//   });
// });
