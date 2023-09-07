import type { CSVRow, Product } from "@models/interfaces";
import type { ProductsRepository } from "@repositories/index";

import { ProductNotFoundError } from "@errors/index";
import { POLICY_PRICE_READJUSTMENT } from "@src/policies";

export function getCSVRowsFromCSVData(csvData: string[][]): CSVRow[] {
  const csvRows: CSVRow[] = [];

  for (let i = 1; i < csvData.length; ++i) {
    const unparsedCSVRow = csvData[i]!;
    const product: CSVRow = {
      product_code: parseInt(unparsedCSVRow[0]!),
      new_price: parseFloat(unparsedCSVRow[1]!),
    };
    csvRows.push(product);
  }

  return csvRows;
}

// TODO: Make areNewPricesBiggerThanCostPrice and
// areNewPricesComplientToReadjustmentPolicy query the database only one time

export async function areNewPricesBiggerThanCostPrice(
  parsedCSVRows: CSVRow[],
  productsRepository: ProductsRepository
): Promise<boolean> {
  const productsFromCSV = await getProductsFromCSVRows(
    parsedCSVRows,
    productsRepository
  );

  for (let i = 0; i < parsedCSVRows.length; ++i) {
    const newPrice = parseFloat(parsedCSVRows[i]!.new_price.toFixed(1));
    const costPrice = parseFloat(productsFromCSV[i]!.cost_price.toFixed(1));

    if (newPrice < costPrice) {
      return false;
    }
  }

  return true;
}

export async function areNewPricesComplientToReadjustmentPolicy(
  parsedCSVRows: CSVRow[],
  productsRepository: ProductsRepository
): Promise<boolean> {
  const productsFromCSV = await getProductsFromCSVRows(
    parsedCSVRows,
    productsRepository
  );

  for (let i = 0; i < parsedCSVRows.length; ++i) {
    const positiveReadjustedPrice = parseFloat(
      (
        (1 + POLICY_PRICE_READJUSTMENT) *
        productsFromCSV[i]!.sales_price
      ).toFixed(1)
    );
    const negativeReadjustedPrice = parseFloat(
      (
        (1 - POLICY_PRICE_READJUSTMENT) *
        productsFromCSV[i]!.sales_price
      ).toFixed(1)
    );

    const newPrice = parseFloat(parsedCSVRows[i]!.new_price.toFixed(1));

    if (
      newPrice !== positiveReadjustedPrice &&
      newPrice !== negativeReadjustedPrice
    ) {
      return false;
    }
  }

  return true;
}

async function getProductsFromCSVRows(
  parsedCSVRows: CSVRow[],
  productsRepository: ProductsRepository
): Promise<Product[]> {
  const productsFromCSV: Product[] = [];

  for (let i = 0; i < parsedCSVRows.length; ++i) {
    const product: Product | undefined =
      await productsRepository.getProductByCode(parsedCSVRows[i]!.product_code);

    if (!product) {
      throw new ProductNotFoundError();
    }

    productsFromCSV.push(product);
  }

  return productsFromCSV;
}
