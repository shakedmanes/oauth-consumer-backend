// config

import stateGenerator from './utils/stateGenerator';

export const config = {
  // Session Secret
  SESSION_SECRET: 'SESSION_SECRET_DONT_TELL_ANYONE',

  // OAuth configuration
  clientCredentials: {
    client: {
      id: '0BfSsUy~eGcPh_s6YgwEq7WDMZQkGloImx92zIxv',
      // tslint:disable-next-line:max-line-length
      secret: 'rgXjVleVkg8ahyt6qxO1k4yQfSkvoYDQV583zDDSWIklC9VmJhGICMiYk1QCqslf17W_aHPABVVHjUA_F~bkHGtnBDcVAB_9MKum',
    },
    auth: {
      tokenHost: 'https://localhost:1337',
      authorizePath: '/oauth2/authorize',
      revokePath: '/oauth2/token',
      tokenPath: '/oauth2/token',
    },
  },

  redirectUri: {
    redirect_uri: 'https://localhost:5000/oauth/callback', // Redirect URI for getting the code
  },

  get authorizationUri() {
    return {
      ...this.redirectUri,
      scope: 'profile', // The scopes required for the token
      state: stateGenerator(),
    };
  },

};
