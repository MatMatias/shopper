import express from "express";
import multer from "multer";

import { ValidateController } from "@controllers/index";
// import { uploadMiddleware } from "./middlewares";

const router = express.Router();
const upload = multer();

router.post(
  "/validate",
  upload.single("file"),
  new ValidateController().validateCSV
);

export { router };
