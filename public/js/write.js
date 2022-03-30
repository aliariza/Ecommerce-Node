export const write = (calcVars) => {
  const { qty, tprice, uprice, QTY } = calcVars;
  qty.innerHTML = QTY;
  tprice.innerHTML = QTY * uprice.innerHTML;
};
export const plus = (calcVars) => {
  const { bp, QTY } = calcVars;
  bp.addEventListener('click', () => {
    QTY = calcVars.QTY++ >= 100 ? 100 : calcVars.QTY;
    calcVars.QTY = QTY;
    write(calcVars);
  });
};
export const minus = (calcVars) => {
  const { bm, QTY } = calcVars;
  bm.addEventListener('click', () => {
    QTY = calcVars.QTY-- <= 1 ? 1 : calcVars.QTY;
    calcVars.QTY = QTY;
    write(calcVars);
  });
};
