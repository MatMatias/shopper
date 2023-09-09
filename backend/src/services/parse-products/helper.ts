import type { CSVRow, Product, ProductWithErrors } from "@models/interfaces";
import type { ProductsRepository } from "@repositories/index";

import { parseCSV } from "@helpers/index";
import {} from "@repositories/packs.repository";

export async function getParsedProductsAndPacks(
  csv: Express.Multer.File,
  productsRepository: ProductsRepository
): Promise<{
  parsedProducts: ProductWithErrors[];
  parsedPacks: ProductWithErrors[];
}> {
  const parsedProducts: ProductWithErrors[] = [];
  const parsedPacks: ProductWithErrors[] = [];

  const csvRows: CSVRow[] = await parseCSV(csv);

  for (let i = 0; i < csvRows.length; ++i) {
    const csvRow = csvRows[i]!;

    if (csvRow.product_code < 1000) {
      const product: Product | undefined =
        await productsRepository.getProductByCode(csvRow.product_code);

      if (!product) {
        const parsedProduct: ProductWithErrors = {
          code: csvRow.product_code,
          name: "PRODUCT NOT FOUND",
          cost_price: 0,
          sales_price: 0,
          new_price: 0,
          errors: ["Product not found in the database"],
        } as ProductWithErrors;

        parsedProducts.push(parsedProduct);
      } else {
        const parsedProduct: ProductWithErrors = {
          ...product,
          new_price: csvRow.new_price,
          errors: [],
        } as ProductWithErrors;

        parsedProducts.push(parsedProduct);
      }
    } else {
      const pack: Product | undefined =
        await productsRepository.getProductByCode(csvRow.product_code);

      if (!pack) {
        const parsedPack: ProductWithErrors = {
          code: csvRow.product_code,
          name: "PACK NOT FOUND",
          cost_price: 0,
          sales_price: 0,
          new_price: 0,
          errors: ["Pack not found in the products database"],
        } as ProductWithErrors;
        parsedPacks.push(parsedPack);
      } else {
        const parsedPack: ProductWithErrors = {
          ...pack,
          new_price: csvRow.new_price,
          errors: [],
        } as ProductWithErrors;
        parsedPacks.push(parsedPack);
      }
    }
  }

  return { parsedProducts: parsedProducts, parsedPacks: parsedPacks };
}
