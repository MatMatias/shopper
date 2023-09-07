import type { ProductsRepository } from "@repositories/index";

import { ProductNotFoundError } from "@errors/index";
import {
  getIsPriceValid,
  getIsReadjustmentValid,
} from "@services/validate-data";

export async function getIsPriceCompliantToPolicies(
  code: number,
  new_price: number,
  productsRepository: ProductsRepository
): Promise<boolean> {
  const productToBeUpdated = await productsRepository.getProductByCode(code);

  if (!productToBeUpdated) {
    throw new ProductNotFoundError();
  }

  const isPriceValid = getIsPriceValid(productToBeUpdated, new_price);
  const isReadjustmentValid = getIsReadjustmentValid(
    productToBeUpdated,
    new_price
  );

  if (isPriceValid && isReadjustmentValid) {
    return true;
  }

  return false;
}
