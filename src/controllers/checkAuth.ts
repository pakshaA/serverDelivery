import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.SECRET || "secret";

export const checkAuthController = (req: Request, res: Response) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ message: "Не авторизован" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return res.status(200).json({ message: "Авторизован", user: decoded });
    } catch (error) {
        return res.status(401).json({ message: "Неверный токен" });
    }
};
