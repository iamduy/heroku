import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import productRouter from './routes/product'
import homepage from './routes/homepage'



const app = express();
app.use(morgan('dev'));
dotenv.config();

//routes
app.use('/api', productRouter);
app.use(homepage);




const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log('server is running !', port);
})