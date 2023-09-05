import type { Request, Response } from "express";

export class ValidateController {
  async getUsers(req: Request, res: Response) {
    console.log(req.body);

    return res.status(200).json({ data: "success" });
  }
}
