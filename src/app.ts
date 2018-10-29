// app

import axios from 'axios';
import express, { Request, Response, NextFunction } from 'express';
import { default as session } from 'express-session';
import mongoose from 'mongoose';
import { default as connectMongo } from 'connect-mongo';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { config } from './config';
import { default as OAuthRoutes } from './oauth/oauth.routes';
import { AuthError } from './error/error.types';
import thirdpartyRoutes from './thirdparty/thirdparty.routes';

// Connect to mongo
mongoose.connect('mongodb://user:user123@ds143893.mlab.com:43893/tokenstore').then(() => {
  console.log('Connected to mongo');
}).catch((error: any) => {
  console.log('Error connecting to mongo');
});

mongoose.Promise = global.Promise;
const mongoStore = connectMongo(session);

const db = mongoose.connection;

// Load enviroment variables from .env file
dotenv.config();

// Axios global configuration
axios.defaults.baseURL = config.axios.baseURL;

const app = express();
app.set('port', process.env.PORT);

/*
app.use(session({
  secret: 'no-one-knows-it',
  resave: true,
  saveUninitialized: true,
  store: new mongoStore({ mongooseConnection: mongoose.connection }),
  cookie: {
    path: '/',
    maxAge: 1000 * 60 * 60 * 5, // 5h
  },
}));*/

app.use(session({
  name: 'amp',
  secret: 'amp',
  store: new mongoStore({ mongooseConnection: mongoose.connection }),
  cookie: {
    expires: false,
    httpOnly: false,
    secure: false,
    maxAge: 360000000,
  },
  saveUninitialized: true,
  resave: false,
  rolling: true,
}));

// Allow self signed certifiate
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV || 'dev'));
/*
app.use(session(
  { secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false ,
    cookie: { maxAge: 3600000, secure: false, httpOnly: true },
  }),
);*/

// Routes
app.use('/oauth', OAuthRoutes);
app.use('/resources', thirdpartyRoutes);

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {

  if (err instanceof AuthError) {
    return res.status(err.status).send(err.message);
  }

  return res.status(500).send('Internal Server Error');
});

export default app;
