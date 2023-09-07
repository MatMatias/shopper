import { getDatabaseInstance } from "@database/index";
import { Product } from "@models/index";

export class ProductsRepository {
  async getProductByCode(code: number): Promise<Product | undefined> {
    let product: Product | undefined;

    try {
      const dbInstance = await getDatabaseInstance();

      const [rows, _] = await dbInstance.query(
        `SELECT * FROM products WHERE code=${code};`
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
    } finally {
      return product;
    }
  }
}
