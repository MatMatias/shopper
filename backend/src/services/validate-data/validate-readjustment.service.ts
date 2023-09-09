import { POLICY_PRICE_READJUSTMENT } from "@src/policies";

export function getIsReadjustmentValid(salesPrice: number, newPrice: number) {
  const positiveReadjustedPrice = parseFloat(
    ((1 + POLICY_PRICE_READJUSTMENT) * salesPrice).toFixed(1)
  );
  const negativeReadjustedPrice = parseFloat(
    ((1 - POLICY_PRICE_READJUSTMENT) * salesPrice).toFixed(1)
  );

  const _newPrice = parseFloat(newPrice.toFixed(1));

  if (
    _newPrice === positiveReadjustedPrice ||
    _newPrice === negativeReadjustedPrice
  ) {
    return true;
  }

  return false;
}
