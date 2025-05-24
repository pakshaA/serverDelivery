import { Request, Response } from "express";
import Delivery from "../models/Delivery";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const createDelivery = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Не авторизован" });
    }

    const { sender, receiver, packageInfo } = req.body;

    if (!sender || !receiver || !packageInfo) {
      return res.status(400).json({ message: "Отсутствуют обязательные поля" });
    }

    const id = Date.now().toString();
    const decoded: any = jwt.verify(token, process.env.SECRET!);
    const userId = decoded.id;
    
    await User.findByIdAndUpdate(userId, { $push: { deliveres: id } });

    const newDelivery = new Delivery({
      sender,
      receiver,
      packageInfo,
      shipmentId: id,
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
