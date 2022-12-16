import express from "express";
import errorHandler from "./middleware/error-handler";
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import methodOverride from 'method-override';
// import router from './routes/indexroutes';
import pagesRouter from './routes/indexroutes'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import {dashboardGetProducts} from './controllers/products.controller'
import productRouter from './routes/products.routes'
dotenv.config();
// import dbService from "./database/db";


// dbService()
mongoose.connect(process.env.Database_Url!, () => {
    console.log('using mongodb database')
})

const app = express();
app.use('/product', productRouter)
//view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(methodOverride('_method'))

// app.use(router);
app.use(errorHandler);

app.use('/', pagesRouter)


const port = 3005;
app.listen(port, ()=>{
    console.log(`Server running at port http://localhost:${port}`)
})

export default app;
