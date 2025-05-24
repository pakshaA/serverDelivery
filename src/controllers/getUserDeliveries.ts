import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import Delivery from "../models/Delivery";

export const getUserDeliveries = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Не авторизован" });
    }

    const decoded: any = jwt.verify(token, process.env.SECRET!);
    const userId = decoded.userId;

    const user = await User.findById(userId).populate("deliveries");

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.status(200).json({ deliveries: user.deliveries });
  } catch (error) {
    console.error("Ошибка при получении доставок:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
