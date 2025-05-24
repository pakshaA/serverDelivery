import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const SECRET = process.env.SECRET

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email и пароль обязательны' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ message: 'Пользователь с таким email уже существует' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({ email, password: hashedPassword })
    await newUser.save()

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      SECRET!,
      { expiresIn: '7d' }
    )

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(201).json({ message: 'Пользователь успешно зарегистрирован' })
  } catch (error) {
    console.error('Ошибка регистрации:', error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}
