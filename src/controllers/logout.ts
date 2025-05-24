import { Request, Response } from "express";

export const logoutController = (req: Request, res: Response) => {
    res.clearCookie("access_token", {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    });

    return res.status(200).json({ message: "Вы вышли из системы" });
};
