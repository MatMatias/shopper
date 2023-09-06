import type { Request, Response } from "express";

import { ValidateCSVService } from "@services/index";
import { NoFileError, FieldnameError, GenericClientError } from "@errors/index";

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

    const validateCSVService = new ValidateCSVService();
    try {
      await validateCSVService.validateCSV(req.file);
    } catch (error: unknown) {
      if (error instanceof GenericClientError) {
        console.error(error);
        res.status(error.statusCode).json({ error: error.message });
      } else {
        console.error(error);
        res.status(500).json({ error: "Unexpected internal server error " });
      }
    }

    res.status(200).json({ message: "success" });
    return;
  }
}
