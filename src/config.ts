// config

import stateGenerator from './utils/stateGenerator';

export const config = {
  // Session Secret
  SESSION_SECRET: 'SESSION_SECRET_DONT_TELL_ANYONE',

  // OAuth configuration
  clientCredentials: {
    client: {
      id: 'svs1J2pWq5RnWi7DzHsDE0aLh~aT_h2rNpZg_yGZ',
      // tslint:disable-next-line:max-line-length
      secret: 'PlA76OG7_gdGgJXiBnhGsCgIV5pbySmaeYUF3swP~OFG_B~xpTiHILd1DxSyQ_np42Z98Txv~gWe5BFhYE9~BkG8lqeArARzEiiX',
    },
    auth: {
      tokenHost: 'https://localhost:1337',
      authorizePath: '/oauth2/authorize',
      revokePath: '/oauth2/token',
      tokenPath: '/oauth2/token',
    },
  },

  // Third party api configuration

  apiRequests: {
    apiBaseURL: 'https://localhost:6000',
    apiResourcesRoute: '/resources/files',
  },

   // Token configuration used for OAuth2 Client Credentials flow
  tokenConfig: {
    scope: 'read',
    audience: 'https://localhost:1337', // audience of the access token (resource server)
  },

  redirectUri: {
    redirect_uri: 'https://localhost:5000/oauth/callback', // Redirect URI for getting the code
  },

  get authorizationUri() {
    return {
      ...this.redirectUri,
      scope: 'profile', // The scopes required for the token
      state: stateGenerator(),
      audience: this.apiRequests.apiBaseURL,
    };
  },

  axios: {
    baseURL: 'https://localhost:1337',
  },

};
