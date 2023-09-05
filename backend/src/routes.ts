import express from "express";
import { ValidateController } from "@controllers/index";

const router = express.Router();

router.get("/validate", new ValidateController().getUsers);

export { router };
