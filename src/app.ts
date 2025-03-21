import express from 'express';
import { json } from 'body-parser';
import cors from "cors";
import cookieParser from 'cookie-parser';
import indexroute from './routes/index';
import connection from './db';

connection();

const app = express();

app.use(json());
app.use(cors(
    {
        origin:"http://localhost:3000",
        credentials:true
    }
));
app.use(cookieParser());
app.use('/uploads',express.static('./uploads'))

app.use('/api',indexroute)
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})