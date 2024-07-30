// Packages (required)
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require("morgan");
const compression = require('compression');
const bodyParser = require('body-parser');
cors = require('cors');
const flash = require('connect-flash');
const router = express.Router();

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


  //Log out to stdout for dev format all http/https request/responses or compress based on environment
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compression({threshold: 2}));
  }

  //Set req.body property with any type (extended: true)
  app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}));

  app.use(bodyParser.json({limit: '50mb'}));
  app.use(cors({
    origin: (origin, callback) => {
      return callback(null, true);
    }
  }));

  app.use('/insecure', router);


  app.use(flash());

  app.use(cookieParser());

  // All Routes
  require('../app/routes/admin.routes')(app, express);
  require('../app/routes/customer.routes')(app, express);
  require('../app/routes/dashboard.routes')(app, express);
  require('../app/routes/analyticsData.routes')(app, express);
  require('../app/routes/product.routes')(app, express);
  require('../app/routes/ads.routes')(app, express);
  require('../app/routes/retailer.routes')(app, express);
  require('../app/routes/cart.routes')(app, express);
  require('../app/routes/global.routes')(app, express);
  require('../app/routes/instantShop.routes')(app, express);


  return app;

};

