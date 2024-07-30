// Packages (required)
const express = require('express');
const bodyParser = require('body-parser');
cors = require('cors');

// Exported Express Module
module.exports = function () {

  // Initialize express
  const app = express();

  // Set cors variables
  app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
  });


  //Set req.body property with any type (extended: true)
  app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}));

  app.use(bodyParser.json({limit: '50mb'}));
  app.use(cors({
    origin: (origin, callback) => {
      return callback(null, true);
    }
  }));

  // All Routes
  require('../routes/marvel.route')(app, express);

  return app;

};

