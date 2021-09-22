import {
  TokenRequest,
  BaseTokenRequestHandler,
  GRANT_TYPE_REFRESH_TOKEN,
  AuthorizationServiceConfiguration,
  RedirectRequestHandler,
  FetchRequestor,
  AuthorizationRequest,
  BasicQueryStringUtils,
} from '@openid/appauth';
import { pingClientId, janrainClientId, tokenPingUrl, tokenJanrainUrl, redirectURL, scope } from '../config/urls/Ping';

class NoHashQueryStringUtils extends BasicQueryStringUtils {
  parse(input, useHash) {
    return super.parse(input, false /* never use hash */);
  }
}

export const pingConfig = () => {
  const authorizationHandler = new RedirectRequestHandler();
  AuthorizationServiceConfiguration.fetchFromIssuer(tokenPingUrl, new FetchRequestor())
    .then((response) => {
      localStorage.setItem('token_endPoint', JSON.stringify(response));
      const authRequest = new AuthorizationRequest({
        client_id: pingClientId,
        redirect_uri: redirectURL,
        scope,
        response_type: AuthorizationRequest.RESPONSE_TYPE_CODE,
        state: undefined,
      });
      authorizationHandler.performAuthorizationRequest(response, authRequest);
    })
    .catch((error) => {});
};

export const janrain = () => {
  const authorizationHandler = new RedirectRequestHandler();
  AuthorizationServiceConfiguration.fetchFromIssuer(tokenJanrainUrl, new FetchRequestor())
    .then((response) => {
      localStorage.setItem('token_endPoint', JSON.stringify(response));
      const authRequest = new AuthorizationRequest({
        client_id: janrainClientId,
        redirect_uri: redirectURL,
        scope,
        response_type: AuthorizationRequest.RESPONSE_TYPE_CODE,
        state: undefined,
      });
      authorizationHandler.performAuthorizationRequest(response, authRequest);
    })
    .catch((error) => {});
};

export const fetchUserInfo = async (newToken) => {
  const res = await fetch(localStorage.getItem('userinfoUrl'), {
    headers: {
      authorization: `Bearer ${newToken}`,
    },
  });
  return res.json();
};

export const refreshToken = (configuration) => {
  const loginType = localStorage.getItem('loginType');
  const authenicateDetails = JSON.parse(localStorage.getItem('authenication'));
  const refreshtoken = authenicateDetails.refreshToken;
  let clientId = '';
  if (loginType === 'Janrain') {
    clientId = janrainClientId;
  } else {
    clientId = pingClientId;
  }
  const tokenHandler = new BaseTokenRequestHandler(new FetchRequestor());
  const tokenRequest = new TokenRequest({
    client_id: clientId,
    redirect_uri: redirectURL,
    grant_type: GRANT_TYPE_REFRESH_TOKEN,
    code: undefined,
    refresh_token: refreshtoken,
    extras: undefined,
  });
  tokenHandler
    .performTokenRequest(JSON.parse(localStorage.getItem('token_endPoint')), tokenRequest)
    .then((response) => {
      localStorage.setItem('authenication', JSON.stringify(response));
      if (loginType === 'Ping') {
        localStorage.setItem('access_token', response.accessToken);
      } else {
        localStorage.setItem('access_token', response.idToken);
      }
    })
    .catch((oError) => oError);
};
export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('email_id');
  localStorage.removeItem('authenication');
  localStorage.removeItem('loginType');
};

export const compareDate = () => {
  const authenicateDetails = JSON.parse(localStorage.getItem('authenication'));
  if (authenicateDetails) {
    const issuedTime = authenicateDetails.issuedAt;
    const tokenDate = issuedTime + parseInt(3300);

    const currentDtae = Math.round(new Date().getTime() / 1000);

    if (currentDtae >= tokenDate) {
      logout();
    }
  }
};
