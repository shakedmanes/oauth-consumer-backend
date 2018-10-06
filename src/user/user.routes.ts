// user.routes

import axios from 'axios';
import { Router } from 'express';
import { AuthController } from '../auth/auth.controller';

const userRoutes = Router();

userRoutes.get('/userinfo', AuthController.authorize, (req, res) => {
  // Get the token inside the session and request from the authorization server
  // Profile information like picture and full name and return that json to the client
  // Note: That route should be protected via session token checks
  return res.status(200).send((req.session as any).token);
});

export default userRoutes;
