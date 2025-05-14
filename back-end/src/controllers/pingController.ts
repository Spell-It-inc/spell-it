import type { Request, Response } from "express";

export class PingController {
  static async getPing(req: Request, res: Response) {
    console.log('SOMEONE SAID HI')
    res.status(200).json({message:"HI"})
  }
}
