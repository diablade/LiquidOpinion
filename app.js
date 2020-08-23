const express = require('express');
require('dotenv').config()
const mongoose = require('./config/database'); //database configuration & connection
const bodyParser = require('body-parser');
const morgan = require('morgan');
var pjson = require('./package.json');
const app = express();

// IMPORT ROUTES
const usersRoutes = require('./src/user/user.routes');
const surveysRoutes = require('./src/survey/survey.routes');
const candidatesRoutes = require('./src/candidate/candidate.routes');
const votesRoutes = require('./src/vote/vote.routes');

// USE MIDDLEWARE
app.use(morgan(":remote-addr | :remote-user |[:date[clf]] " +
    "| :method | \":url\" | :status | res-size: :res[content-length] | :response-time ms"));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

// CORS POLICY
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, liquid-token, liquid-master-token"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// MAIN ROUTES middleware
app.use('/user', usersRoutes);
app.use('/survey', surveysRoutes);
app.use('/candidate', candidatesRoutes);
app.use('/vote', votesRoutes);

//api health routes
app.get('/api', (req, res) => {
    res.status(200).json({status: 'running', version: pjson.version})
});
app.get('/', (req, res) => {
    res.json({"welcome": "to the jungle"});
});


// for all other routes go with 404 error
app.use(function (req, res, next) {
    let error = new Error('Not Found');
    error.status = 404;
    next(error);
});
// handle errors
app.use(function (err, req, res, next) {
    if (err.status === 500) console.log(err);
    res.status(err.status || 500);
    const message = err.message || "something looks wrong :(";
    res.json({error: message});
});


app.listen(process.env.PORT_NODE, () => console.log('' +
    '|-----------------------------------------------------------------------------------------------------------|\n' +
    '|  _       _                   _       _      ___            _           _                                  |\n' +
    '| | |     (_)   __ _   _   _  (_)   __| |    / _ \\   _ __   (_)  _ __   (_)   ___    _ __                   |\n' +
    '| | |     | |  / _` | | | | | | |  / _` |   | | | | | \'_ \\  | | | \'_ \\  | |  / _ \\  | \'_ \\                  |\n' +
    '| | |___  | | | (_| | | |_| | | | | (_| |   | |_| | | |_) | | | | | | | | | | (_) | | | | |    _   _   _    |\n' +
    '| |_____| |_|  \\__, |  \\__,_| |_|  \\__,_|    \\___/  | .__/  |_| |_| |_| |_|  \\___/  |_| |_|   (_) (_) (_)   |\n' +
    '|                 |_|                               |_|                                                     |\n' +
    '|-----------------------------------------------------------------------------------------------------------|\n' +
    'server ' + pjson.version + ' is started and listening'));

