import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dadataRoutes from './routers/getAddressRouter';
import registerRouter from './routers/register';
import loginRouter from './routers/login';
import checkAuthRouter from './routers/checkAuthRouter';
import logoutRouter from './routers/logoutRouter';
import { db_connect } from './services/connect';
import cookieParser from 'cookie-parser';

dotenv.config();
try {
    const app = express();
    const PORT = process.env.PORT || 5000;

    db_connect()

    app.use(cors({
        origin: 'http://localhost:3000', 
        credentials: true 
    }))
    
    app.use(express.json());
    app.use(cookieParser());

    app.get('/', (_req, res) => {
    res.send('Сервер работает!');
    });

    app.use('/api', dadataRoutes);
    app.use('/api', registerRouter);
    app.use('/api', loginRouter);
    app.use('/api', checkAuthRouter);
    app.use('/api', logoutRouter);

    app.listen(PORT, () => {
    console.log(`Сервер запущен`);
    });   
} catch (error) {
    console.log(error);
}