import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import expressValidator from 'express-validator';
const app = express();
dotenv.config();

const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const blogRoutes = require('./routes/blog');
const orderRoutes = require('./routes/order')
const order_detailRouter = require('./routes/order_detail')


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB CONNECTED !')
})

mongoose.connection.on('error', (err) => {
    console.log(`DB connection error : ${err.message}`)
})

//midleware
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use(expressValidator());

//routes midleware
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', blogRoutes);
app.use('/api', orderRoutes);
app.use('/api', order_detailRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log('server is running !', PORT);
})

