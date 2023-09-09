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

  if (productToBeUpdated.code >= 1000) {
    return true;
  }

  const isPriceValid = getIsPriceValid(
    productToBeUpdated.cost_price,
    new_price
  );
  const isReadjustmentValid = getIsReadjustmentValid(
    productToBeUpdated.sales_price,
    new_price
  );

  if (isPriceValid && isReadjustmentValid) {
    return true;
  }

  return false;
}
