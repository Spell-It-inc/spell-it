import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function validateJwt(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ errors: ["Missing or invalid token"] });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      accountId: number;
    };

    (req as any).accountId = decoded.accountId;
    next();
  } catch (err) {
    res.status(401).json({ errors: ["Invalid or expired token"] });
  }
}
