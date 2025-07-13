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
app.use('/api/v1/user',userRouter)


export {app}