export function getIsPriceValid(costPrice: number, newPrice: number) {
  const _costPrice = parseFloat(costPrice.toFixed(1));
  const _newPrice = parseFloat(newPrice.toFixed(1));

  return _newPrice > _costPrice ? true : false;
}
