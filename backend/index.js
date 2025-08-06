import express from 'express';
import connectDb from './config/connectDb.js';

const PORT = 4000;

const app = express(); 

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 

await connectDb();