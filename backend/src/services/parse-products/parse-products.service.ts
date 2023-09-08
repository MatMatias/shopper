import type { ProductsRepository } from "@repositories/products.repository";
import type { CSVRow, ProductWithErrors } from "@models/index";

import { parseCSV } from "@helpers/parse-csv.helper";
import {
  getIsPriceValid,
  getIsReadjustmentValid,
} from "@services/validate-data";

export class ParseProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async parseProducts(csv: Express.Multer.File): Promise<ProductWithErrors[]> {
    const csvRows: CSVRow[] = await parseCSV(csv);

    const productsWithErrors: ProductWithErrors[] = [];

    for (let i = 0; i < csvRows.length; ++i) {
      const csvRow: CSVRow = csvRows[i]!;

      const product = await this.productsRepository.getProductByCode(
        csvRow.product_code
      );

      let productWithErrors: ProductWithErrors;

      if (!product) {
        productWithErrors = {
          code: csvRow.product_code,
          name: "PRODUCT NOT FOUND",
          cost_price: 0,
          sales_price: 0,
          new_price: 0,
          errors: ["Product not found in the database"],
        };

        productsWithErrors.push(productWithErrors);
        continue;
      }

      productWithErrors = {
        code: product.code,
        name: product.name,
        cost_price: product.cost_price,
        sales_price: product.sales_price,
        new_price: csvRow.new_price,
        errors: [],
      };

      const isPriceValid = getIsPriceValid(product, csvRow.new_price);
      const isReadjusmentValid = getIsReadjustmentValid(
        product,
        csvRow.new_price
      );

      if (!isPriceValid) {
        const errorMessage =
          `Invalid Price: new price R$${productWithErrors.new_price.toFixed(
            2
          )} must be bigger than R$${productWithErrors.cost_price.toFixed(
            2
          )}`.replace(new RegExp("\\.", "g"), ",");
        productWithErrors.errors.push(errorMessage);
      }

      if (!isReadjusmentValid) {
        const errorMessage =
          `Invalid Readjustment: new price must be of 10% (R$ ${(
            productWithErrors.sales_price * 1.1
          ).toFixed(2)} or R$ ${(productWithErrors.sales_price * 0.9).toFixed(
            2
          )}) of the current price R$ ${productWithErrors.sales_price.toFixed(
            2
          )}`.replace(new RegExp("\\.", "g"), ",");
        productWithErrors.errors.push(errorMessage);
      }

      productsWithErrors.push(productWithErrors);
    }

    return productsWithErrors;
  }
}
