
const routes = require('./routes');
const cors = require('cors');
// const http = require('http');
// const io = require('socket.io');
const express = require('express');
const bodyParser = require('body-parser');


const bearerToken = require('express-bearer-token');

// Constants
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

// App
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);



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
routes(app, io, '/api/v1');


server.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);


