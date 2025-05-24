import { Request, Response } from "express";
import Delivery from "../models/Delivery";
import jwt from "jsonwebtoken";

export const createDelivery = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).json({ message: "Не авторизован" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    const { sender, receiver, packageInfo } = req.body;

    if (!decoded.id) {
      return res.status(401).json({ message: "Не авторизован" });
    }

    if (!sender || !receiver || !packageInfo) {
      return res.status(400).json({ message: "Отсутствуют обязательные поля" });
    }

    const newDelivery = new Delivery({
      sender,
      receiver,
      packageInfo,
    });

    await newDelivery.save();

    res.status(201).json({
      message: "Доставка успешно создана",
      delivery: newDelivery,
    });
  } catch (error) {
    console.error("Ошибка при создании доставки:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
