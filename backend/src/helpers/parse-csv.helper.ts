import type { CSVRow } from "@models/interfaces";

import { InvalidCSVBodyError } from "@errors/index";
import { parse } from "csv-parse/sync";

export async function parseCSV(csv: Express.Multer.File): Promise<CSVRow[]> {
  try {
    const csvData: string[][] = await parse(csv.buffer);
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
  } catch (_) {
    throw new InvalidCSVBodyError();
  }
}
