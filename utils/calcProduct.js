class CalcProduct {
  constructor(qty, bm, bp, modalPrice, modalTutari) {
    this.qty = qty;
    this.bm = bm;
    this.bp = bp;
    this.modalPrice = modalPrice;
    this.modalTutari = modalTutari;
  }

  add() {
    this.bp.addEventListener('click', () => {
      let QTY = this.qty.innerHTML * 1;
      // eslint-disable-next-line no-plusplus
      QTY = QTY++ >= 100 ? 100 : QTY;
      this.subTotal(QTY);
    });
  }

  subtract() {
    this.bm.addEventListener('click', () => {
      let QTY = this.qty.innerHTML * 1;
      // eslint-disable-next-line no-plusplus
      QTY = QTY-- <= 1 ? 1 : QTY;

      this.subTotal(QTY);
    });
  }

  subTotal(QTY) {
    this.qty.innerHTML = QTY;
    this.modalTutari.innerHTML = this.modalPrice.innerHTML * QTY * 1;
  }

  reset() {
    this.modalTutari.innerHTML = this.modalPrice.innerHTML * 1;
    this.qty.innerHTML = 1;
  }
}

module.exports = CalcProduct;
