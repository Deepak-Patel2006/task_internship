import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import route from './route/routes.js';
import router from './route/auth.routes.js';
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname,'../public')));
app.use(express.json());

console.log(process.env.SESSION_SECRET);

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1000*60*10
        }
    })
);
app.use(cookieParser());

app.use('/auth',router);
app.use('/movies',route);

export default app;



