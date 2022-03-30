const Product = require('../models/productModel');
// const User = require('../models/userModel');
// // const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.alerts = (req, res, next) => {
  const { alert } = req.query;
  if (alert === 'booking')
    res.locals.alert =
      "Your booking was successful! Please check your email for a confirmation. If your booking doesn't show up here immediately, please come back later.";
  next();
};

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const products = await Product.find();

  // 2) Build template
  // 3) Render that template using tour data from 1)
  res.status(200).render('overview', {
    title: 'All Products',
    products,
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
