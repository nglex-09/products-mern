import express, { Router } from 'express';
import dotenv from 'dotenv';
import path from 'path';

import { ConnectDB } from './config/db.js';
import router from './routers/product.router.js';
import { get } from 'http';

dotenv.config();


const app=express();
const PORT=process.env.PORT || 5000

const __dirname =path.resolve();

app.use(express.json());

app.use('/api/products',router);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")));

    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
    })
}

app.listen(PORT,()=>{
    ConnectDB();
    console.log("Server started at http://localhost:",PORT)
});
