"use strict";

import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';


// import API routes
import { api } from './routes/api';

const app = express();
const clientPath = path.join(__dirname,'../client/');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(clientPath));

/** Seting up server to accept cross-origin browser requests */
app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// set API routes
app.use('/api', api);

// index page
app.get('/*', (req, res) => {
    res.sendFile(path.join(clientPath,'index.html'))
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('404 Page Not Found');
    return res.status(404).json({
        responseCode: 404,
        responseMessage: "page not found"
    });
});

if ('development' == app.get('env')) {
    app.listen(3000, function () {
        console.log('** express started on port 3000. **');
    });
} else {
    app.listen(8080, function () {
        console.log('** express started on port 8080. **');
    });
}

export const backend = app;