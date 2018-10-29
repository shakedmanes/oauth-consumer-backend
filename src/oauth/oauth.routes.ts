// oauth.routes

import axios from 'axios';
import { create, AccessToken } from 'simple-oauth2';
import { Router } from 'express';
import { config } from '../config';

const oauth = create(config.clientCredentials);
const oauthRouter = Router();

// Authentication route
oauthRouter.get('/auth', (req, res) => {

  // Creating authorize route and redirect the user to it
  const authorizeRoute =
    oauth.authorizationCode.authorizeURL(config.authorizationUri);
  res.redirect(authorizeRoute);
});

// Callback for the authorization code
oauthRouter.get('/callback', async (req, res) => {

  // Authorization code received from authorization server
  const code = req.query.code;

  try {
    // Exchanging the code for the access token
    const rawToken = await oauth.authorizationCode.getToken({ ...config.redirectUri, code });
    const accessToken = oauth.accessToken.create(rawToken);

    // Associate the token withing the session instance
    if (req.session) {
      req.session.token = accessToken;
      req.session.save(() => {
        console.log('saved successfuly');
        return res.status(200).send({ auth: true });
      });
    }
  } catch (err) {
    return res.status(err.output.statusCode || 500)
              .send(err.data.payload.message || 'Authentication Error');
  }
});

// Get token information
oauthRouter.get('/tokeninfo', async (req, res) => {

  if (!(req.session as any).token) {
    return res.status(500).send('Token not exists');
  }

  const response =
    await axios.post(
      '/oauth2/tokeninfo',
      { token: (req.session as any).token.token.access_token },
      { headers: { Authorization: `Basic ${createCredentials(config.clientCredentials.client)}` } },
    );

  if (response.status === 200) {
    if (!response.data.active) {
      if (req.session) {
        req.session.destroy((err) => {
          if (err) {
            console.log(err);
          }
        });
      }
      return res.redirect('/oauth/auth');
    }
    return res.status(200).send(response.data);
  }

  return res.status(500).send('Internal Server Error');
});

const createCredentials = (clientCred: { id: string, secret: string }) => {
  return (Buffer.from(`${clientCred.id}:${clientCred.secret}`).toString('base64'));
};

export default oauthRouter;
