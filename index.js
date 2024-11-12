// import essntial packages
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import seq from './schemas/index.js';
import colors from 'colors'
import app from './app.js'
import cookieParser from 'cookie-parser';
import { reloadServer } from './utils/functions.js';
dotenv.config()
const server = express();
const PORT = process.env.PORT || 8000

// middlewares
server.use(express.json());
server.use(cors());
server.use(cookieParser(process.env.COOKIE_SECRET));


// routes
server.use("/api", app)

// listener
seq.authenticate()
.then(()=> {
    console.log("Flaunt Fashion database connected".bgGreen);
    server.listen(PORT, () => console.log(`${process.env.SERVER} server listening on ${PORT}`.bgCyan));
    reloadServer();
})
.catch(e => console.log(e.bgRed))