import dotenv from "dotenv";
import { Router } from "express";

dotenv.config({ path: "../local.env" })

export const validateGoogleProfile = async (
    req: Request,
    res: Response
): Promise<void> => {
    console.log("tried to validate token too")
}

// import { Router } from "express";
// import { AuthController } from "../controllers/authController";

// const router = Router();

// router.post("/signin", AuthController.handleGoogleLogin);

// export default router;