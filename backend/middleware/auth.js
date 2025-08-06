import jwt from 'jsonwebtoken';
import { notAuthorized } from '../utils/message.js';

process.loadEnvFile('./.env')
const JWT_SECRET = process.env.JWT_SECRET 

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ 
        message: notAuthorized,
        success : false 
    });
  } 

  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.user = decoded;
    next();
  });
};
export default verifyToken;
