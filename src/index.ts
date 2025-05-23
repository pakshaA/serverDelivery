import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dadataRoutes from './routers/getAddressRouter';

dotenv.config();
try {
    const app = express();
    const PORT = process.env.PORT || 5000;

    app.use(cors());
    app.use(express.json());

    app.get('/', (_req, res) => {
    res.send('Сервер работает!');
    });

    app.use('/api', dadataRoutes);

    app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
    });   
} catch (error) {
    console.log(error);
}