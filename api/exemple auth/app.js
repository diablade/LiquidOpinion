import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';
import * as db from "./config/database.js";
import env from "./config/env.js";

if (env.environment !== "test") {
    db.connect();
}

const app = express();

// USE MIDDLEWARE
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(":remote-addr | :remote-user |[:date[clf]] " + "| :method | \":url\" | :status | res-size: :res[content-length] | :response-time ms"));

// CORS POLICY
app.use(cors({
    //TODO change for production with env variable, restrict to front-end domain
    origin: 'http://localhost:4200',
    credentials: true, // methods:        ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    // allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    // exposedHeaders: ['Content-Range', 'X-Content-Range']
}));

// MAIN ROUTES middleware
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);

//api health routes
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'running',
        version: env.version
    })
});


// for all other routes go with 404 error
app.use(function (req, res, next) {
    let error = new Error('Not Found');
    error.status = 404;
    next(error);
});
// handle errors
app.use(function (err, req, res, next) {
    if (err.status === 500) {
        console.log(err);
    }
    res.status(err.status || 500);
    const message = err.message || "something looks wrong :(";
    res.json({
        status: "error",
        message: message
    });
});

app.listen(env.port, () => console.log(
    "==> starting API...\n==> version: " + env.version + " \n==> server is started and ready on port: " + env.port));
