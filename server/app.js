import express from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser';
const app = express()

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials:true
}));


app.use(express.json({
    limit:'16kb'
}))


//tells Express to serve files from a public directory. 
//When someone visits http://yoursite.com/style.css, 
//Express will look for public/style.css and serve it if found.
app.use(express.static("public"))

app.use(cookieParser());

import { userRouter } from './routes/user.route.js';
import { categoryRouter } from './routes/category.route.js';
import { productRouter } from './routes/product.route.js';
import { cartRouter } from './routes/cart.route.js'
import { orderRouter } from './routes/order.route.js';
app.use('/api/v1/user',userRouter)
app.use('/api/v1/category',categoryRouter)
app.use('/api/v1/product',productRouter)
app.use('/api/v1/cart',cartRouter)
app.use('/api/v1/order', orderRouter)

export {app}