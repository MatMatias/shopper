import type { ProductsRepository } from "@repositories/products.repository";
import type { CSVRow, Product, ProductWithErrors } from "@models/index";

import { parseCSV } from "@helpers/parse-csv.helper";
import { POLICY_PRICE_READJUSTMENT } from "@src/policies";

export class InsertErrorsInProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async insertErrorsInProduct(
    csv: Express.Multer.File
  ): Promise<ProductWithErrors[]> {
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

      const isPriceValid = this.getIsPriceValid(product, csvRow.new_price);
      const isReadjusmentValid = this.getIsReadjustmentValid(
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

  private getIsPriceValid(product: Product, price: number) {
    const costPrice = parseFloat(product.cost_price.toFixed(1));
    const newPrice = parseFloat(price.toFixed(1));

    return newPrice > costPrice ? true : false;
  }

  private getIsReadjustmentValid(product: Product, price: number) {
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
}
