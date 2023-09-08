import path from "path";
const parentDir = path.resolve(__dirname, "..");
const envFilePath = path.join(parentDir, ".env");
require("dotenv").config({ path: envFilePath });

// import "express-async-errors";
import type { Express, Router } from "express";
import express from "express";
var cors = require("cors");
import { router } from "./routes";

export class ExpressServer {
  private readonly instance: Express = express();
  private readonly route: Router = router;

  constructor() {
    this.instance.use(cors());
    this.instance.use(express.json());
    this.instance.use("/api", this.route);
  }

  getInstance(): Express {
    return this.instance;
  }

  listen(serverPort: number): void {
    this.instance.listen(serverPort, () =>
      console.log(
        `Server running on port ${serverPort} on ${process.argv[2]} mode`
      )
    );
  }
}
