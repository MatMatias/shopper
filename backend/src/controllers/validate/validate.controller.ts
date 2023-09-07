import type { Request, Response } from "express";

import {
  ValidateCSVService,
  InsertErrorsInProductsService,
} from "@services/index";
import { ProductsRepository } from "@repositories/index";
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
    const validateCSVService = new ValidateCSVService(productsRepository);
    const insertErrorsInProductsService = new InsertErrorsInProductsService(
      productsRepository
    );

    try {
      await validateCSVService.validateCSV(req.file);
      const productsWithErrors =
        await insertErrorsInProductsService.insertErrorsInProduct(req.file);

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
