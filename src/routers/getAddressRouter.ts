import { Router, Request, Response, NextFunction } from 'express';
import { getAddress } from '../controllers/getAddress';

const dadataRoutes = Router();

dadataRoutes.get('/address', async (req: Request, res: Response, next: NextFunction) => {
  getAddress(req, res).catch(next);
});

export default dadataRoutes;