import express from 'express';
import dotenv from 'dotenv/config';
import { dbConnect } from './config/dbConnect.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRouter from './routes/authRoutes.js'
import { errorHandler, notFound } from './middlewares/errorHandler.js';
const app = express();

app.use(bodyParser.json({"limit": "30mb", extended: true})); // 30mb because we will send images
app.use(bodyParser.urlencoded({"limit": "30mb", extended: true}));

app.use(cors())
const PORT = process.env.PORT || 4000;
// app.use('/', (req, res) => {
//     res.send('server is running')
// });
app.use('/user', authRouter);
app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log('server is running at port ', PORT);
});
dbConnect();