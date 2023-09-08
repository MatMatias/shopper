import { getDatabaseInstance } from "@database/index";
import { DatabaseError } from "@errors/index";
import { Product } from "@models/index";

export class ProductsRepository {
  async getProductByCode(code: number): Promise<Product | undefined> {
    let product: Product | undefined;

    try {
      const dbInstance = await getDatabaseInstance();

      const [rows, _] = await dbInstance.query(
        `SELECT code, CONVERT(CAST(CONVERT(name USING LATIN1) AS BINARY) USING UTF8) as name, cost_price, sales_price FROM products WHERE code=${code};`
      );
      await dbInstance.end();

      const queryResult = rows as any[];

      if (queryResult.length === 1) {
        const costPrice = parseFloat(queryResult[0].cost_price);
        const salesPrice = parseFloat(queryResult[0].sales_price);
        product = {
          code: queryResult[0]!.code,
          name: queryResult[0]!.name,
          cost_price: costPrice,
          sales_price: salesPrice,
        };
      }
    } catch (error) {
      console.error("Error ocorrued in getAllProducts function:", error);
      throw new DatabaseError("getAllProducts");
    } finally {
      return product;
    }
  }

  async updateProductPriceByCode(
    newPrice: number,
    productCode: number
  ): Promise<void> {
    try {
      const dbInstance = await getDatabaseInstance();

      await dbInstance.query(
        `UPDATE products SET sales_price=${newPrice} WHERE code=${productCode}`
      );
    } catch (error) {
      console.error(
        "Error ocorrued in updateProductPriceByCode function:",
        error
      );
      throw new DatabaseError("updateProductPriceByCode");
    }
  }
}
