// allow for env file
import 'dotenv/config';
// Packages (required)
import { createServer } from 'http';
import express from 'express';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import exp from "./express/express.js"
import path from "path";

// Initiate express file
const app = exp();
app.enable('trust proxy');

// Set __dirname for directories
const dirname1 = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(dirname1, "../../")));
app.use(express.static(path.join(dirname1, "./")));


// Server Initialization
createServer(app).listen(
  process.env.APP_PORT,
  '127.0.0.1',
  () => console.log('Server running on:', `http://127.0.0.1:${process.env.APP_PORT}`)
);