import type { CSVRow } from "@models/interfaces";
import type { ProductsRepository } from "@repositories/products.repository";

import { parse } from "csv-parse/sync";

import {
  getCSVRowsFromCSVData,
  areNewPricesComplientToReadjustmentPolicy,
  areNewPricesBiggerThanCostPrice,
} from "./helpers";
import {
  InvalidCSVHeaderError,
  InvalidCSVBodyError,
  EmptyCSVError,
  LowerPricesError,
  PricesReadjustmentError,
} from "@errors/index";

export class ValidateCSVService {
  validHeaderFields: string[] = ["product_code", "new_price"];

  constructor(private productsRepository: ProductsRepository) {}

  async validateCSV(csv: Express.Multer.File): Promise<void> {
    try {
      var csvData: string[][] = await parse(csv.buffer);
    } catch (_) {
      throw new InvalidCSVBodyError();
    }

    this.validateCSVFillness(csvData);
    this.validateCSVHeader(csvData);
    this.validateCSVBody(csvData);
    // await this.validatePricePolicy(csvData);
  }

  private validateCSVFillness(csvData: string[][]): void {
    if (csvData.length === 0) {
      throw new EmptyCSVError();
    }
  }

  private validateCSVHeader(csvData: string[][]): void {
    const csvHeader = csvData[0];
    if (JSON.stringify(csvHeader) !== JSON.stringify(this.validHeaderFields)) {
      throw new InvalidCSVHeaderError();
    }
  }

  private validateCSVBody(csvData: string[][]): void {
    for (let i = 1; i < csvData.length; ++i) {
      const row: string[] = csvData[i]!;

      if (isNaN(parseFloat(row[0]!)) || isNaN(parseFloat(row[1]!))) {
        throw new InvalidCSVBodyError();
      }
    }
  }

  private async validatePricePolicy(csvData: string[][]): Promise<void> {
    const parsedCSVRows: CSVRow[] = getCSVRowsFromCSVData(csvData);

    const areNewPricesValid: boolean = await areNewPricesBiggerThanCostPrice(
      parsedCSVRows,
      this.productsRepository
    );

    const areNewPricesReadjustmentValid: boolean =
      await areNewPricesComplientToReadjustmentPolicy(
        parsedCSVRows,
        this.productsRepository
      );

    if (!areNewPricesValid) {
      throw new LowerPricesError();
    }

    if (!areNewPricesReadjustmentValid) {
      throw new PricesReadjustmentError();
    }
  }
}
