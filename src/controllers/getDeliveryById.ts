import { Request, Response } from "express";
import Delivery from "../models/Delivery";

export const getDeliveryByShipmentId = async (req: Request, res: Response) => {
  try {
    const { shipmentId } = req.params;

    if (!shipmentId) {
      return res.status(400).json({ message: "shipmentId обязателен" });
    }

    const delivery = await Delivery.findOne({ shipmentId: Number(shipmentId) }).populate("user");

    if (!delivery) {
      return res.status(404).json({ message: "Доставка не найдена" });
    }

    res.status(200).json({ delivery });
  } catch (error) {
    console.error("Ошибка при получении доставки:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
