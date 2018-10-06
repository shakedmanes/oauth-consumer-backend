// oauth.routes

import { create, AccessToken } from 'simple-oauth2';
import { Router } from 'express';
import { config } from '../config';

const oauth = create(config.clientCredentials);
const oauthRouter = Router();

oauthRouter.get('/auth', (req, res) => {

  // Creating authorize route and redirect the user to it
  console.log(req.session);
  const authorizeRoute =
    oauth.authorizationCode.authorizeURL(config.authorizationUri);
  res.redirect(authorizeRoute);
});

oauthRouter.get('/callback', async (req, res) => {

  // Authorization code received from authorization server
  const code = req.query.code;

  try {
    // Exchanging the code for the access token
    const rawToken = await oauth.authorizationCode.getToken({ ...config.redirectUri, code });
    const accessToken = oauth.accessToken.create(rawToken);

    // Associate the token withing the session instance
    console.log(req.session);
    if (req.session) {
      req.session.token = accessToken;
    }

    return res.status(200).send({ auth: true });
  } catch (err) {
    return res.status(err.status || 500).send(err.message || 'Authentication Error');
  }
});

export default oauthRouter;
