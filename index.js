import dotenv from 'dotenv';
import express from 'express';
import mainRouter from './routes/index.js'
import cors from 'cors';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors()); //using cors as frontend and backend will be hosted on separate route

app.use('/api/v1', mainRouter)

app.listen(3000, ()=>{
    console.log("App is running");
})