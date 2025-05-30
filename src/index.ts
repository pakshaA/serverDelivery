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
import createDeliveryRouter from './routers/createDelivery';
import getDeliveriesRouter from './routers/getDeliveries';
import getDeliveryByIdRouter from './routers/getDeliveryById';

dotenv.config();
try {
    const app = express();
    const PORT = process.env.PORT || 5000;

    db_connect()

    app.use(cors({
        origin: 'https://logistic-diplom.vercel.app', 
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
    app.use('/api', createDeliveryRouter);
    app.use('/api', getDeliveriesRouter);
    app.use('/api', getDeliveryByIdRouter);

    app.listen(PORT, () => {
    console.log(`Сервер запущен`);
    });   
} catch (error) {
    console.log(error);
}