const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

const cart = async () => {
  const carts = await Cart.find().populate({
    path: 'items.productId',
    select: 'name price total',
  });
  return carts[0];
};

const addItem = async (payload) => {
  const newItem = await Cart.create(payload);
  return newItem;
};

exports.addItemToCart = async (req, res) => {
  const { productId } = req.body;
  const quantity = Number.parseInt(req.body.quantity, 10);

  try {
    let carth = await cart();
    const productDetails = await Product.findById(productId);
    if (!productDetails) {
      return res.status(500).json({
        type: 'Bulunamadı',
        msg: 'Geçersiz istek',
      });
    }
    //--If Cart Exists ----
    if (carth) {
      //---- check if index exists ----
      const indexFound = carth.items.findIndex(
        (item) => item.productId.id === productId
      );
      //------this removes an item from the the cart if the quantity is set to zero,We can use this method to remove an item from the list  -------
      if (indexFound !== -1 && quantity <= 0) {
        carth.items.splice(indexFound, 1);
        if (carth.items.length === 0) {
          carth.subTotal = 0;
        } else {
          carth.subTotal = carth.items
            .map((item) => item.total)
            .reduce((acc, next) => acc + next);
        }
      }
      //----------check if product exist,just add the previous quantity with the new quantity and update the total price-------
      else if (indexFound !== -1) {
        // eslint-disable-next-line operator-assignment
        carth.items[indexFound].quantity =
          carth.items[indexFound].quantity + quantity;
        carth.items[indexFound].total =
          carth.items[indexFound].quantity * productDetails.price;
        carth.items[indexFound].price = productDetails.price;
        carth.subTotal = carth.items
          .map((item) => item.total)
          .reduce((acc, next) => acc + next);
      }
      //----Check if Quantity is Greater than 0 then add item to items Array ----
      else if (quantity > 0) {
        carth.items.push({
          productId: productId,
          quantity: quantity,
          price: productDetails.price,
          total: parseInt(productDetails.price * quantity, 10),
        });
        carth.subTotal = carth.items
          .map((item) => item.total)
          .reduce((acc, next) => acc + next);
      }
      //----if quantity of price is 0 throw the error -------
      else {
        return res.status(400).json({
          type: 'Invalid',
          msg: 'Invalid request',
        });
      }
      const data = await carth.save();
      res.status(200).json({
        type: 'success',
        mgs: 'Process Successful',
        data: data,
      });
    }
    //------------ if there is no user with a cart...it creates a new cart and then adds the item to the cart that has been created------------
    else {
      const cartData = {
        items: [
          {
            productId: productId,
            quantity: quantity,
            total: parseInt(productDetails.price * quantity, 10),
            price: productDetails.price,
          },
        ],
        subTotal: parseInt(productDetails.price * quantity, 10),
      };
      carth = await addItem(cartData);
      // let data = await cart.save();
      res.json(carth);
    }
  } catch (err) {
    // console.log(err);
    res.status(400).json({
      type: 'Invalid',
      msg: 'Something Went Wrong',
      err: err,
    });
  }
};

exports.getCart = async (req, res) => {
  try {
    const carth = await cart();
    if (!carth) {
      return res.status(400).json({
        type: 'Invalid',
        msg: 'Cart Not Found',
      });
    }
    res.status(200).json({
      status: true,
      data: carth,
    });
  } catch (err) {
    // console.log(err);
    res.status(400).json({
      type: 'Invalid',
      msg: 'Something Went Wrong',
      err: err,
    });
  }
};

exports.emptyCart = async (req, res) => {
  try {
    const carth = await cart();
    carth.items = [];
    carth.subTotal = 0;
    const data = await carth.save();
    res.status(200).json({
      type: 'success',
      mgs: 'Cart Has been emptied',
      data: data,
    });
  } catch (err) {
    // console.log(err);
    res.status(400).json({
      type: 'Invalid',
      msg: 'Something Went Wrong',
      err: err,
    });
  }
};
