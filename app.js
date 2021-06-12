'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes/routes');


app.use(express.json());

routes(app);

module.exports = app;