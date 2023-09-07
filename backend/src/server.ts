import path from "path";
const parentDir = path.resolve(__dirname, "..");
const envFilePath = path.join(parentDir, ".env");
require("dotenv").config({ path: envFilePath });

// import "express-async-errors";
import type { Express, Router } from "express";
// import { errorMiddleware } from "@middlewares/index";
import { router } from "./routes";
import express from "express";

export class ExpressServer {
  private readonly instance: Express = express();
  private readonly route: Router = router;

  constructor() {
    const deploymentMode = process.argv[2];

    this.instance.use((_, res, next) => {
      res.header(
        "Access-Control-Allow-Origin",
        deploymentMode === "dev"
          ? `http://${process.env.DEV_URL}:${process.env.VITE_LOCAL_APP_PORT}`
          : `https://${process.env.PROD_URL}`
      );
      res.header("Access-Control-Allow-Methods", ["POST"]);
      next();
    });
    // this.instance.use((_, __, next) => {
    //   express.json();
    //   next();
    // });
    // this.instance.use((_, __, next) => {
    //   errorMiddleware;
    //   next();
    // });
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
