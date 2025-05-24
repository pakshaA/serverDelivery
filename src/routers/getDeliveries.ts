import { Router } from "express";
import { getUserDeliveries } from "../controllers/getUserDeliveries";
import { NextFunction, Request, Response } from "express";

const getDeliveriesRouter = Router();

getDeliveriesRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
    getUserDeliveries(req, res).catch(next);
});

export default getDeliveriesRouter;