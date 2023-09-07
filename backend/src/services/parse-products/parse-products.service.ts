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
          name: "Produto Não Encontrado",
          cost_price: 0,
          sales_price: 0,
          new_price: 0,
          errors: ["Produto não registrado no banco de dados"],
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
        productWithErrors.errors.push(
          `Preço invalido: novo preço R$${productWithErrors.new_price} menor que o preço de custo R$${productWithErrors.cost_price}`
        );
      }

      if (!isReadjusmentValid) {
        productWithErrors.errors.push(
          "Reajuste invalido: O reajuste deve ser de exatos 10%"
        );
      }

      productsWithErrors.push(productWithErrors);
    }

    return productsWithErrors;
  }
}
