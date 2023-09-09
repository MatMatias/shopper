import type { Request, Response } from "express";
import type { Pack } from "@models/interfaces";

import { GenericClientError, GenericServerError } from "@errors/index";
import { getIsPriceCompliantToPolicies } from "./helper";
import { PacksRepository, ProductsRepository } from "@repositories/index";

export class UpdateController {
  async put(
    req: Request<{ code: number }, {}, { new_price: number }>,
    res: Response
  ) {
    const { new_price } = req.body;
    const { code } = req.params;
    const productsRepository = new ProductsRepository();
    const packsRepository = new PacksRepository();
    const pack: Pack | undefined = await packsRepository.getPackByProductCode(
      code
    );

    try {
      const isNewPriceCompliantToPolicies = await getIsPriceCompliantToPolicies(
        code,
        new_price,
        productsRepository
      );
      if (isNewPriceCompliantToPolicies) {
        if (pack) {
          const newPackPrice = new_price * pack.qty;
          await productsRepository.updateProductPriceByCode(
            newPackPrice,
            pack.pack_id
          );
        }

        await productsRepository.updateProductPriceByCode(new_price, code);
        res.status(200).json({ message: "success" });

        return;
      }

      res.status(400).json({
        error: `Product of code ${code} is not compliant to prices policy`,
      });
    } catch (error: unknown) {
      if (
        error instanceof GenericClientError ||
        error instanceof GenericServerError
      ) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }
}
