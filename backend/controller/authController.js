import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { userAlreadyExists, userRegistered } from '../utils/message.js';

process.loadEnvFile('./.env'); 

const JWT_SECRET = process.env.JWT_SECRET 

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({
            message : userAlreadyExists,
            success : false 
      })
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, passwordHash });
    await newUser.save();

    return res.status(201).json({
      message: userRegistered,
      success : true 
    })
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};
