// allow for env file
require('dotenv').config();
// Packages (required)
const exp = require('express');
const http = require('http');
// Files (required)
const config = require('./configs/config');
const express = require('./configs/express');


// Initiate express file
const app = express();
app.enable('trust proxy');


// Set __dirname for directories
app.use(exp.static(__dirname + "../../"));
app.use(exp.static(__dirname + "./"));


// Server Initialization
const httpServer = http.createServer(app);
httpServer.listen(
  config.prodServer.port,
  '127.0.0.1',
  () => console.log('Server running on:', `http://127.0.0.1:${config.devServer.port}`)
);