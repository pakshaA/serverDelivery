import express, { NextFunction, Request, Response} from "express";
import { getDeliveryByShipmentId } from "../controllers/getDeliveryById";

const getDeliveryByIdRouter = express.Router();

getDeliveryByIdRouter.get("/get-delivery-by-id", (req: Request, res: Response, next: NextFunction) => {
    getDeliveryByShipmentId(req, res).catch(next);
});

export default getDeliveryByIdRouter;
