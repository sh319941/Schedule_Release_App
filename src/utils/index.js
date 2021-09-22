// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import constants from '../constants';

export const getToken = () => localStorage.getItem('access_token');
export const getEmail = () => {
  const decodedToken = jwt_decode(getToken());
  return decodedToken.email || decodedToken.mail;
};

export const getLoginType = () => localStorage.getItem('loginType');

export const getLastLoggedInTime = () => localStorage.getItem('last_loggedin_time');

export const getTokenExpiresIn = () => {
  const token = getToken();
  const { beforeSeconds } = constants.sessionTimeout;
  const { afterSeconds } = constants.sessionTimeout;
  const decodedToken = jwt_decode(token);
  const timestamp = decodedToken.exp;
  const tokenExpDate = new Date(timestamp * 1000);
  const tokenExpDateBeforeSec = new Date(tokenExpDate.getTime() - beforeSeconds);
  const tokenExpDateAfterSec = new Date(tokenExpDate.getTime() - afterSeconds);
  return { tokenExpDateBeforeSec, tokenExpDateAfterSec };
};

export const getTokenExpireBefore90minutesIn = () => {
  const token = getToken();
  const { beforeSeconds } = constants.tokenRefresh;
  const decodedToken = jwt_decode(token);
  const timestamp = decodedToken.exp;
  const tokenExpDate = new Date(timestamp * 1000);
  const tokenExpDateBeforeSec = new Date(tokenExpDate.getTime() - beforeSeconds);
  return tokenExpDateBeforeSec;
};

export const getDiffMinutes = () => {
  const token = getToken();
  const { beforeSeconds } = constants.sessionTimeout;
  const decodedToken = jwt_decode(token);
  const timestamp = decodedToken.exp;
  const tokenExpDate = new Date(timestamp * 1000);
  const tokenExpDateBeforeSec = new Date(tokenExpDate.getTime() - beforeSeconds);
  const today = new Date();
  const minutes = parseInt((Math.abs(tokenExpDateBeforeSec.getTime() - today.getTime()) / (1000 * 60)) % 60);
  return minutes;
};

const getTokenAndEmail = (token, mail) => {
  localStorage.setItem('access_token', token);
  const decodedToken = jwt_decode(token);
  const email = decodedToken[mail];
  return { token, email };
};

export const saveToken = (loginType, response) => {
  if (loginType === 'Ping') {
    return getTokenAndEmail(response.accessToken, 'mail');
  }

  return getTokenAndEmail(response.idToken, 'email');
};

// session storage
export const saveCurrentUser = (email, userDetails) => {
  const { role: { roleName } = {} } = userDetails;
  return sessionStorage.setItem('current_user', JSON.stringify({ email, roleName }));
};

export const getCurrentUser = () => sessionStorage.getItem('current_user');
