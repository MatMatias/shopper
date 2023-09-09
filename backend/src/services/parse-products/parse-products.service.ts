import type { ProductsRepository, PacksRepository } from "@repositories/index";
import type { AggregatedPack, ProductWithErrors, Product } from "@models/index";

import { getParsedProductsAndPacks } from "./helper";
import { brlMask } from "./mask";
import {
  getIsPriceValid,
  getIsReadjustmentValid,
} from "@services/validate-data";

export class ParseProductsService {
  constructor(
    private productsRepository: ProductsRepository,
    private packsRepository: PacksRepository
  ) {}

  async parseProducts(csv: Express.Multer.File): Promise<ProductWithErrors[]> {
    const { parsedProducts, parsedPacks } = await getParsedProductsAndPacks(
      csv,
      this.productsRepository
    );

    const parsedProductsWithErrors: ProductWithErrors[] =
      this.getParsedProductsWithErrors(parsedProducts);
    let parsedPacksWithErrors: ProductWithErrors[] =
      this.getParsedProductsWithErrors(parsedPacks);

    parsedPacksWithErrors = await this.getParsedPacksWithErrors(
      parsedProductsWithErrors,
      parsedPacks
    );

    return [...parsedProductsWithErrors, ...parsedPacksWithErrors];
  }

  private getParsedProductsWithErrors(
    parsedProducts: ProductWithErrors[]
  ): ProductWithErrors[] {
    const parsedProductsWithErrors: ProductWithErrors[] = [];

    for (let i = 0; i < parsedProducts.length; ++i) {
      const parsedProductWithErrors = parsedProducts[i]!;

      const isPriceValid = getIsPriceValid(
        parsedProductWithErrors.cost_price,
        parsedProductWithErrors.new_price
      );
      const isReadjusmentValid = getIsReadjustmentValid(
        parsedProductWithErrors.sales_price,
        parsedProductWithErrors.new_price
      );

      if (!isPriceValid) {
        const errorMessage = `Invalid Price: new price ${brlMask(
          parsedProductWithErrors.new_price
        )} must be bigger than ${brlMask(parsedProductWithErrors.cost_price)}`;
        parsedProductWithErrors.errors.push(errorMessage);
      }

      if (!isReadjusmentValid) {
        const errorMessage = `Invalid Readjustment: new price must be of 10% (${brlMask(
          parsedProductWithErrors.sales_price * 1.1
        )} or ${brlMask(
          parsedProductWithErrors.sales_price * 0.9
        )}) of the current price ${brlMask(
          parsedProductWithErrors.sales_price
        )}`;
        parsedProductWithErrors.errors.push(errorMessage);
      }

      parsedProductsWithErrors.push(parsedProductWithErrors);
    }

    return parsedProductsWithErrors;
  }

  private async getParsedPacksWithErrors(
    parsedProductsWithErrors: ProductWithErrors[],
    parsedPacks: ProductWithErrors[]
  ): Promise<ProductWithErrors[]> {
    const parsedPacksWithErrors: ProductWithErrors[] = [];

    for (let i = 0; i < parsedPacks.length; ++i) {
      const parsedPackWithErrors = parsedPacks[i]!;
      const packId = parsedPackWithErrors.code;
      const packFromDatabase: AggregatedPack | undefined =
        await this.packsRepository.getPackByPackId(packId);

      if (!packFromDatabase) {
        parsedPackWithErrors.errors.push(
          "Pack not found in the packs database"
        );
        parsedPacksWithErrors.push(parsedPackWithErrors);
        continue;
      }
      // Get associated products
      const { products_quantities } = packFromDatabase;
      const associatedProductsCodes: number[] = products_quantities.map(
        (pq) => pq.product_id
      );
      const associatedProductsPromises = associatedProductsCodes.map(
        async (associatedProductCode) => {
          const product: Product | undefined =
            await this.productsRepository.getProductByCode(
              associatedProductCode
            );

          return product;
        }
      );
      const associatedProducts = await Promise.all(associatedProductsPromises);
      // If at least one associated Product is undefined, insert error in pack
      if (associatedProducts.includes(undefined)) {
        parsedPackWithErrors.errors.push(
          "One or more associated products with this pack is missing in the CSV"
        );
        parsedPacksWithErrors.push(parsedPackWithErrors);
        continue;
      }

      // Check if associatedParsedProductsWithErrors prices matches with the parsedPackWithErrors new price
      const associatedParsedProductsWithErrors =
        parsedProductsWithErrors.filter((parsedProductWithError) => {
          let found = false;
          for (let i = 0; i < associatedProductsCodes.length; ++i) {
            if (associatedProductsCodes[i] == parsedProductWithError.code) {
              found = true;
            }
          }
          return found;
        });

      const associatedParsedProductsWithPrices =
        associatedParsedProductsWithErrors.map((parsedProduct) => {
          const parsedProductQty: number = products_quantities.find(
            (elem) => elem.product_id == parsedProduct.code
          )!.qty;
          return { ...parsedProduct, qty: parsedProductQty };
        });

      let associatedParsedProductNewPriceSum = 0;
      associatedParsedProductsWithPrices.forEach((associatedProduct) => {
        associatedParsedProductNewPriceSum +=
          associatedProduct.new_price * associatedProduct.qty;
      });

      if (
        parseFloat(associatedParsedProductNewPriceSum.toFixed(2)) !==
        parseFloat(parsedPackWithErrors.new_price.toFixed(2))
      ) {
        parsedPackWithErrors.errors.push(
          `Pack price ${brlMask(
            parsedPackWithErrors.new_price
          )} does not match the sum of all it's asociated products: ${brlMask(
            associatedParsedProductNewPriceSum
          )}`
        );
      }
      parsedPacksWithErrors.push(parsedPackWithErrors);
    }
    return parsedPacksWithErrors;
  }
}
