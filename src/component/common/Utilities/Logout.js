import { janrainClientId, redirectURL, tokenJanrainUrl } from '../../config/urls/Ping';
import { refreshToken } from '../../pingConfiguration/AccessToken';

export const logout = () => {
  const loginType = localStorage.getItem('loginType');
  if (loginType === 'Janrain') {
    localStorage.clear();
    window.location.replace(
      `${tokenJanrainUrl}/endsession?client_id=${janrainClientId}&post_logout_redirect_uri=${redirectURL}`
    );
  } else {
    localStorage.clear();
    window.location.href = '/';
  }
};

export const profile = () => {
  window.location.replace(
    `${tokenJanrainUrl}/personal-details?client_id=${janrainClientId}&post_logout_redirect_uri=${redirectURL}`
  );
};

export const checkAuthenication = () => {
  const authenication = JSON.parse(localStorage.getItem('authenication'));
  const issuedTime = authenication.issuedAt;
  const tokentime = issuedTime + parseInt(3300);
  const currenttime = Math.round(new Date().getTime() / 1000);
  if (currenttime >= tokentime) {
    logout();
  }
  const time = tokentime - 300000;
  setInterval(() => {
    refreshToken();
  }, time);
};
