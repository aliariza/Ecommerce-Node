class Cart {
  constructor() {
    this.cart = {};
    this.cart.items = [];
    this.cart.totals = 0;
    this.cart.formattedTotals = '';
  }

  // eslint-disable-next-line default-param-last
  addToCart(product = null, qty = 1, cart) {
    if (!this.inCart(product.product_id, cart)) {
      const format = new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
      });
      const prod = {
        id: product.product_id,
        title: product.title,
        price: product.price,
        qty: qty,
        image: product.image,
        formattedPrice: format.format(product.price),
      };
      cart.items.push(prod);
      this.calculateTotals(cart);
    }
  }

  // eslint-disable-next-line default-param-last
  removeFromCart(id = 0, cart) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < cart.items.length; i++) {
      const item = cart.items[i];
      if (item.id === id) {
        cart.items.splice(i, 1);
        this.calculateTotals(cart);
      }
    }
  }

  // eslint-disable-next-line default-param-last
  updateCart(ids = [], qtys = [], cart) {
    const map = [];
    let updated = false;

    ids.forEach((id) => {
      qtys.forEach((qty) => {
        map.push({
          id: parseInt(id, 10),
          qty: parseInt(qty, 10),
        });
      });
    });
    map.forEach((obj) => {
      cart.items.forEach((item) => {
        if (item.id === obj.id) {
          if (obj.qty > 0 && obj.qty !== item.qty) {
            item.qty = obj.qty;
            updated = true;
          }
        }
      });
    });
    if (updated) {
      this.calculateTotals(cart);
    }
  }

  // eslint-disable-next-line default-param-last
  inCart(productID = 0, cart) {
    let found = false;
    cart.items.forEach((item) => {
      if (item.id === productID) {
        found = true;
      }
    });
    return found;
  }

  calculateTotals(cart) {
    cart.totals = 0.0;
    cart.items.forEach((item) => {
      const { price } = item;
      const { qty } = item;
      const amount = price * qty;

      cart.totals += amount;
    });
    this.setFormattedTotals(cart);
  }

  emptyCart(request) {
    if (request.session) {
      request.session.cart.items = [];
      request.session.cart.totals = 0.0;
      request.session.cart.formattedTotals = '';
    }
  }

  setFormattedTotals(cart) {
    const format = new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    });
    const { totals } = cart;
    cart.formattedTotals = format.format(totals);
  }
}

module.exports = Cart;
