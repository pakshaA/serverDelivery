import express, { Request, Response } from "express";
import { checkAuthController } from "../controllers/checkAuth";

const checkAuth = express.Router();

checkAuth.get("/check-auth", (req: Request, res: Response) => {
    checkAuthController(req, res);
});

export default checkAuth;
