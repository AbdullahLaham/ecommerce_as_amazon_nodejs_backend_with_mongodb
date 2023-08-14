import express from 'express';
import dotenv from 'dotenv/config';
import { dbConnect } from './config/dbConnect.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRouter from './routes/authRoutes.js'
import { errorHandler, notFound } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import productRouter from './routes/productRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import morgan from 'morgan';
import categoryRouter from './routes/categoryRoutes.js'
import blogCategoryRouter from './routes/BlogCategRoutes.js'
import brandRouter from './routes/BrandRoutes.js';
import couponRouter from './routes/couponRoutes.js';
import colorRouter from './routes/colorRoutes.js';
import enqRouter from './routes/enqRoutes.js';
import stripeRouter from './routes/stripeRoutes.js'
import chatRouter from './routes/ChatRoute.js';
import messageRouter from './routes/MessageRoute.js';
import { authMiddleware } from './middlewares/authMiddleware.js';
import ws, {WebSocketServer} from 'ws';

const app = express();
// morgan is to show the requests that comes to your server in the terminal
app.use(morgan("dev"));
app.use(bodyParser.json({"limit": "30mb", extended: true})); // 30mb because we will send images
app.use(bodyParser.urlencoded({"limit": "30mb", extended: true}));
app.use(cookieParser());
app.use(cors())
const PORT = process.env.PORT || 4000;
// app.use('/', (req, res) => {
//     res.send('server is running')
// });

app.use('/user', authRouter);
app.use('/product', productRouter);
app.use('/stripe', stripeRouter);
app.use('/blog', blogRouter);
app.use('/category', categoryRouter);
app.use('/blogcategory', blogCategoryRouter);
app.use('/brand', brandRouter);
app.use('/coupon', couponRouter);
app.use('/color', colorRouter);
app.use('/enquiry', enqRouter);
app.use(notFound);
app.use(errorHandler);
app.use('/chat', chatRouter);
app.use('/messages', messageRouter)

app.use('/', async (req, res) => {
    res.json("Server is running")
});


let server = app.listen(PORT, () => {
    console.log('server is running at port ', PORT);
});

// const wss = new WebSocketServer({port: 4000});

// wss.on('connection', (connection, req) => {
//     console.log('connected');
//     // connection.send('hello')
//     // const cookies = req.headers.cookie;
//     console.log(req.headers.token, 'tttttttttttt');

// });






dbConnect();