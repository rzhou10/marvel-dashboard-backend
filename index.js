// allow for env file
require('dotenv').config();
// Packages (required)
const exp = require('express');
const http = require('http');
// Files (required)
const express = require('./express/express');


// Initiate express file
const app = express();
app.enable('trust proxy');


// Set __dirname for directories
app.use(exp.static(__dirname + "../../"));
app.use(exp.static(__dirname + "./"));


// Server Initialization
const httpServer = http.createServer(app);
httpServer.listen(
  process.env.APP_PORT,
  '127.0.0.1',
  () => console.log('Server running on:', `http://127.0.0.1:${process.env.APP_PORT}`)
);