import { Router, Request, Response } from 'express';
import { getAddress } from '../controllers/getAddress';

const dadataRoutes = Router();

dadataRoutes.get('/address',  async (req: Request, res: Response) => {
    const { query } = req.query;

    if (typeof query !== 'string') {
        return res.status(400).json({ error: 'Параметр query обязателен' });
    }

    try {
        const data = await getAddress(query);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Ошибка при получении адресов' });
    }
});

export default dadataRoutes;
