const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./db');

import config from './config';

// parsing the request body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//adding sqlConnection to every request
app.use((req, res, next) => {
  req.mysqlConnection = db;
  next();
});

// adding API routes
require('./api').default(app);


app.listen(config.port, (err, res) => {
  console.log("listening to port 3000");
});
