// config

import stateGenerator from './utils/stateGenerator';

export const config = {
  // Session Secret
  SESSION_SECRET: 'SESSION_SECRET_DONT_TELL_ANYONE',

  // OAuth configuration
  clientCredentials: {
    client: {
      id: '9w~vzkjSDKmoMlI5GI0yg9UjJ~OW8ESOGOoCOMvT',
      // tslint:disable-next-line:max-line-length
      secret: 'nBdkjtWRg5L7a5WBzGCvO~9y8~0iul9B57mG81ps7aB5sh2L0wdHivO09fRbptZTC0AS1WtO0LqeqhnptVH7HJGduXN6wG5QathO',
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

  axios: {
    baseURL: 'https://localhost:1337',
  },

};
