import type { AggregatedPack, ProductQuantity, Pack } from "@models/index";

import { getDatabaseInstance } from "@database/index";
import { DatabaseError } from "@errors/index";

export class PacksRepository {
  async getPackByPackId(packId: number): Promise<AggregatedPack | undefined> {
    let pack: AggregatedPack | undefined;

    try {
      const dbInstance = await getDatabaseInstance();

      const [rows, _] = await dbInstance.query(
        `SELECT pack_id, GROUP_CONCAT(product_id) AS product_ids, GROUP_CONCAT(qty) as qtys FROM packs WHERE pack_id=${packId} GROUP BY pack_id;`
      );
      await dbInstance.end();

      const queryResult = rows as any[];

      if (queryResult.length === 1) {
        const productIds = queryResult[0]!.product_ids.split(",");
        const quantities = queryResult[0]!.qtys.split(",");
        const productsQuantities: ProductQuantity[] = [];

        for (let i = 0; i < productIds.length; ++i) {
          productsQuantities.push({
            product_id: productIds[i],
            qty: quantities[i],
          } as ProductQuantity);
        }

        pack = {
          id: queryResult[0]!.id,
          pack_id: queryResult[0]!.pack_id,
          products_quantities: productsQuantities,
        };
      }
    } catch (error) {
      console.error("Error ocorrued in getAllProducts function:", error);
      throw new DatabaseError("getAllProducts");
    } finally {
      return pack;
    }
  }

  async getPackByProductCode(productCode: number): Promise<Pack | undefined> {
    let pack: Pack | undefined;

    try {
      const dbInstance = await getDatabaseInstance();

      const [rows, _] = await dbInstance.query(
        `SELECT * FROM packs WHERE product_id=${productCode};`
      );
      await dbInstance.end();

      const queryResult = rows as any[];

      if (queryResult.length === 1) {
        pack = {
          id: queryResult[0]!.id,
          pack_id: queryResult[0]!.pack_id,
          product_id: queryResult[0]!.product_id,
          qty: queryResult[0]!.qty,
        };
      }
    } catch (error) {
      console.error("Error ocorrued in getAllProducts function:", error);
      throw new DatabaseError("getAllProducts");
    } finally {
      return pack;
    }
  }
}
