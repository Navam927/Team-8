import bcrypt from 'bcryptjs';
import User from '../model/userModel.js';
import jwt from 'jsonwebtoken';
import { userAlreadyExists, userRegistered, userNotFound, invalidCredentials, loginFailed } from '../utils/message.js';

process.loadEnvFile('./.env')

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

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

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message : userNotFound,
        success : false
      })
    } 

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({
        message: invalidCredentials,
        success: false
      });
    } 

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      success : true, 
      token, 
      user: { 
      id: user._id, 
      name: user.name}
      });
  } catch (err) {
    res.status(500).json({
      message: loginFailed, 
      error: err.message });
    }
};


export {registerUser, loginUser};