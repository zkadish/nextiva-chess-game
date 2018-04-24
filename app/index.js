
const routes = require('./routes');
const cors = require('cors');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');


const bearerToken = require('express-bearer-token');

// Constants
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';

// App
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);



// CORS
app.use(cors({
  origin: process.env.FRONTEND_URI || 'http://localhost:8081',
  optionsSuccessStatus: 200,
}));


app.use(bearerToken());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

// Add routes for API
routes(app, io, '/api/v1');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(
    path.resolve(__dirname, '..', 'build'),
  ));

  app.get('/', (req, res) => {
    const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');

    fs.readFile(filePath, 'utf8', (err, htmlData) => {
      if (err) {
        console.error('err', err);
        return res.status(404).end()
      }
      return res.send(htmlData);
    });
  });
}

server.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);


