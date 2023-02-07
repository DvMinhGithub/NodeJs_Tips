const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const createError = require('http-errors');
const logEvents = require('./v1/utils/logEvents');
const { v4: uuid } = require('uuid');

app.use(helmet());

app.use(morgan('common'));

app.use(express.json());

app.use(require('./v1/routes/index.router'));

app.use((req, res, next) => {
    next(createError(404, '404 Not Found'));
});
app.use((err, req, res, next) => {
    logEvents(`${uuid()} -- ${req.url} -- ${req.method} -- ${err.message}`);
    res.status(err.status || 500).json({
        status: err.status || 500,
        message: err.message,
    });
});

module.exports = app;
const { URL_MONGODB } = process.env;
mongoose.set('strictQuery', false);
mongoose
    .connect(URL_MONGODB)
    .then(() => {
        // console.log('Database connection success');
    })
    .catch((err) => console.error(`Database connection failed`, err));
