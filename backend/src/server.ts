require("dotenv").config();
import "express-async-errors";
import type { Express, Router } from "express";
import { errorMiddleware } from "@middlewares/errorMiddleware";
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
          ? `http://${process.env.DEV_URL}:${process.env.PORT}`
          : `https://${process.env.PROD_URL}`
      );
      res.header("Access-Control-Allow-Methods", ["GET"]);
      next();
    });
    this.instance.use((_, __, next) => {
      errorMiddleware;
      next();
    });
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
