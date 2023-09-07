import { Product } from "@models/index";

export function getIsPriceValid(product: Product, price: number) {
  const costPrice = parseFloat(product.cost_price.toFixed(1));
  const newPrice = parseFloat(price.toFixed(1));

  return newPrice > costPrice ? true : false;
}
