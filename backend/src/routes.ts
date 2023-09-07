import express from "express";
import multer from "multer";
import bodyParser from "body-parser";

import { ValidateController, UpdateController } from "@controllers/index";
// import { uploadMiddleware } from "./middlewares";

const router = express.Router();
const upload = multer();

router.post(
  "/validate",
  upload.single("file"),
  new ValidateController().validateCSV
);

router.put("/products/:code", bodyParser.json(), new UpdateController().put);

export { router };
