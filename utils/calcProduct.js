class CalcProduct {
  constructor(bm, bp, modalPrice, modalTutari, qty) {
    this.bm = bm;
    this.bp = bp;
    this.modalPrice = modalPrice;
    this.modalTutari = modalTutari;
    this.qty = qty;
  }

  add() {
    this.bp.addEventListener('click', () => {
      let QTY = this.qty.innerHTML * 1;
      // eslint-disable-next-line no-plusplus
      QTY = QTY++ >= 100 ? 100 : QTY;
      console.log(QTY);

      this.subTotal(QTY);
    });
  }

  subtract() {
    this.bm.addEventListener('click', () => {
      let QTY = this.qty.innerHTML * 1;
      // eslint-disable-next-line no-plusplus
      QTY = QTY-- <= 1 ? 1 : QTY;
      console.log(QTY);
      this.subTotal(QTY);
    });
  }

  subTotal(QTY) {
    console.log(this.modalPrice.innerHTML);
    this.qty.innerHTML = QTY;
    this.modalTutari.innerHTML = this.modalPrice.innerHTML * QTY * 1;
  }

  reset() {
    this.modalTutari.innerHTML = this.modalPrice.innerHTML * 1;
    this.qty.innerHTML = 1;
  }
}

module.exports = CalcProduct;
