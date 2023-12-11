import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDb from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import customerRoutes from './routes/cutomerRoutes.js'
import sellerRotues from './routes/sellerRoutes.js'
const app = express();



//.env file config
dotenv.config();

//middlewares
app.use(express.json());
app.use(morgan())

//routing
app.use('/api/auth', authRoutes)
app.use('/api/buyer', customerRoutes)
app.use('/api/seller', sellerRotues)

//db connection
connectDb();


//server initialization
const port = process.env.PORT

app.listen(port, () => {
    console.log('server listening at ', port);
})