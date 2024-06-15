import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from './Router/UserRoute.js';
import { con } from './database/db.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

con.connect((err) => {
    if(err){
        console.log("Cannot connect to mysql database");
    }
    else{
        console.log("Connected to mysql database");
    }
})

app.use('/user', router);

app.listen(process.env.PORT, () => {
    try{
        console.log("Listen on port " + process.env.PORT);
    }
    catch(error){
        console.log("Error : " + error);
    }
})