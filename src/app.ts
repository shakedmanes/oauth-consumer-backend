// app

import express, { Request, Response, NextFunction } from 'express';
import { default as session } from 'express-session';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { config } from './config';
import { default as OAuthRoutes } from './oauth/oauth.routes';
import { default as UserRoutes } from './user/user.routes';
import { AuthError } from './error/error.types';

// Load enviroment variables from .env file
dotenv.config();

const app = express();
app.set('port', process.env.PORT);

// Allow self signed certifiate
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV || 'dev'));

app.use(session({
  secret: config.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: true,
  },
}));

// Routes
app.use('/oauth', OAuthRoutes);
app.use('/api', UserRoutes);

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {

  if (err instanceof AuthError) {
    return res.status(err.status).send(err.message);
  }

  return res.status(500).send('Internal Server Error');
});

export default app;
