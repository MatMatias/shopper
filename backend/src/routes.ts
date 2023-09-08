import express from "express";
import multer from "multer";

import { ValidateController, UpdateController } from "@controllers/index";

const router = express.Router();
const upload = multer();

router.post(
  "/validate",
  upload.single("file"),
  new ValidateController().validateCSV
);

router.put("/products/:code", new UpdateController().put);

export { router };
