// Packages (required)
import express from 'express';
import pkg from 'body-parser';
import cors from "cors";

import routes from "../routes/marvel.route.js"

const { urlencoded, json } = pkg;

// Exported Express Module
export default function exp() {

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
  app.use(urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

  app.use(json({ limit: '50mb' }));
  app.use(cors({
    origin: (origin, callback) => {
      return callback(null, true);
    }
  }));

  // All Routes
  routes(app, express)

  return app;

};

