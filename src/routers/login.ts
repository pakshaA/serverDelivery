import express, { NextFunction, Request, Response } from 'express'
import { login } from '../controllers/login'

const loginRouter = express.Router()

loginRouter.post('/login', (req: Request, res: Response, next: NextFunction) => {
    login(req, res).catch(next);
})

export default loginRouter