import express, { Request, Response } from "express";
import { createDelivery } from "../controllers/createDelivery";

const createDeliveryRouter = express.Router();

createDeliveryRouter.post("/create-delivery", (req: Request, res: Response) => {
    createDelivery(req, res);
});

export default createDeliveryRouter;