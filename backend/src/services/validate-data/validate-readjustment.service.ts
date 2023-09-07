import type { Product } from "@models/index";

import { POLICY_PRICE_READJUSTMENT } from "@src/policies";

export function getIsReadjustmentValid(product: Product, price: number) {
  const positiveReadjustedPrice = parseFloat(
    ((1 + POLICY_PRICE_READJUSTMENT) * product.sales_price).toFixed(1)
  );
  const negativeReadjustedPrice = parseFloat(
    ((1 - POLICY_PRICE_READJUSTMENT) * product.sales_price).toFixed(1)
  );

  const newPrice = parseFloat(price.toFixed(1));

  if (
    newPrice === positiveReadjustedPrice ||
    newPrice === negativeReadjustedPrice
  ) {
    return true;
  }

  return false;
}
