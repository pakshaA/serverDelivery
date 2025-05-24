import express, { Request, Response } from "express";
import { logoutController } from "../controllers/logout";

const logoutRouter = express.Router();

logoutRouter.post("/logout", (req: Request, res: Response) => {
    logoutController(req, res);
});

export default logoutRouter;