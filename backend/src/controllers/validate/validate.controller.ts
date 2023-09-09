import type { Request, Response } from "express";

import { ValidateCSVService, ParseProductsService } from "@services/index";
import { ProductsRepository, PacksRepository } from "@repositories/index";
import {
  NoFileError,
  FieldnameError,
  GenericClientError,
  GenericServerError,
} from "@errors/index";

export class ValidateController {
  async validateCSV(req: Request, res: Response) {
    if (!req.file) {
      const error = new NoFileError();
      res.status(error.statusCode).json({ error: error.message });
      return;
    }

    if (req.file!.fieldname !== "file") {
      const error = new FieldnameError();
      res.status(error.statusCode).json({ error: error.message });
      return;
    }

    const productsRepository = new ProductsRepository();
    const packsRepository = new PacksRepository();
    const validateCSVService = new ValidateCSVService();
    const parseProductsService = new ParseProductsService(
      productsRepository,
      packsRepository
    );

    try {
      await validateCSVService.validateCSV(req.file);
      const productsWithErrors = await parseProductsService.parseProducts(
        req.file
      );

      res.status(200).json({ message: "success", data: productsWithErrors });
    } catch (error: unknown) {
      if (error instanceof GenericClientError) {
        console.error(error);
        res.status(error.statusCode).json({ error: error.message });
        return;
      }

      if (error instanceof GenericServerError) {
        console.error(error);
        res.status(error.statusCode).json({ error: error.message });
        return;
      }

      console.error(error);
      res.status(500).json({ error: "Unexpected internal server error " });
    }

    return;
  }
}
