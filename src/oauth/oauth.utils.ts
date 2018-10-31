// oauth2.utils

import { create, AccessToken } from 'simple-oauth2';
import { config } from '../config';

// TODO: Need to add the server token somehow in the authroization server api requests

export class OAuthUtils {

  // OAuth2 configured root flow with Client Credentials options
  static oauth2Flow = create(config.clientCredentials);

  // Client Credentials flow shirnked to easy callable function which returns access token which
  // Should be wrapped via accessToken.create for parsing the
  // response from the authorization server
  static clientCredentialsFlow =
    OAuthUtils.oauth2Flow.clientCredentials.getToken.bind({}, config.tokenConfig);

  // Contains the Access Token
  static accessToken: AccessToken | null = null;

  /**
   * Returns the access token from the authorization server and save it in the controller
   */
  static async getToken() {
    try {
      // If there's already an access token, need to check it's validity
      if (OAuthUtils.accessToken) {

        // Check if access token expired
        if (!OAuthUtils.accessToken.expired()) {
          return OAuthUtils.accessToken.token.access_token;
        }
      }

      // All other cases require creating new access token
      const result = await OAuthUtils.clientCredentialsFlow();

      OAuthUtils.accessToken = OAuthUtils.oauth2Flow.accessToken.create(result);

      return OAuthUtils.accessToken.token.access_token;
    } catch (err) {
      throw err;
    }
  }
}
