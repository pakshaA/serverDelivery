import express, { NextFunction, Request, Response } from 'express'
import { registerUser } from '../controllers/register'

const registerRouter = express.Router()

registerRouter.post('/register', (req: Request, res: Response, next: NextFunction) => {
    registerUser(req, res).catch(next);
})

export default registerRouter
 