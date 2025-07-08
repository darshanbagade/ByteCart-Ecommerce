import {app} from './app.js'
import dotenv from 'dotenv'
import { connectDB } from './db/db.js'
import {PORT} from './constants.js'
dotenv.config({
    path: './.env'

})


;connectDB()
.then( () => {


    app.on('error',(error)=>{
        console.log("MongoDB Connection Failed : ",error);
        
    })

    const port  = PORT;
    app.listen(port,()=>{
        console.log("Server is running on port : ", port);
        
    })


})