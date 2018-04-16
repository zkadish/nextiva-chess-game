
const routes = require('./routes');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');


const bearerToken = require('express-bearer-token');

// Constants
const PORT = process.env.PORT || 7000;
const HOST = '0.0.0.0';

// App
const app = express();


// CORS
app.use(cors({
  origin: process.env.FRONTEND_URI || 'http://localhost:3000',
  optionsSuccessStatus: 200,
}));


app.use(bearerToken());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

// Add routes for API
routes(app, '/api/v1');

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);


