import express from 'express';
import connectDb from './config/connectDb.js';
import authRouter from './routes/authRoute.js';
import cors from 'cors';

const PORT = 4000;

const app = express(); 

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
await connectDb();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 
app.use('/auth', authRouter);
