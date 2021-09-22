import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Trans } from 'react-i18next';
import jwtDecode from 'jwt-decode';
import { Link, Redirect } from 'react-router-dom';
import {
  TokenRequest,
  BaseTokenRequestHandler,
  GRANT_TYPE_AUTHORIZATION_CODE,
  AuthorizationServiceConfiguration,
  RedirectRequestHandler,
  AuthorizationNotifier,
  FetchRequestor,
  LocalStorageBackend,
  DefaultCrypto,
} from '@openid/appauth';
import Logo from '../../assets/images/shellLogo.png';
import { pingConfig, janrain } from '../pingConfiguration/AccessToken';
import NoHashQueryStringUtils from '../pingConfiguration/NoHashQueryStringUtils';
import { pingClientId, janrainClientId, tokenPingUrl, tokenJanrainUrl, redirectURL } from '../config/urls/Ping';
import { landing } from '../config/userRole';
import { useStyles } from '../../assets/css/loginCss';
import { loginSubHeader, login, shellUser, ClickHere } from '../config/language/language';
import { getUserData } from '../config/api/masterScreen/GetRecord';
import AlertDalog from '../common/Utilities/AlertDialog';
import constants from '../../constants';

const Login = (props) => {
  const { loader: load } = props;
  const classes = useStyles();
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(load);
  const [userDetails, setuserDetails] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('logout')) {
      setLoader('');
      localStorage.clear();
    }
    if (searchParams.get('code') && searchParams.get('state')) {
      const code = searchParams.get('code');
      setLoader('load');
      const loginType = localStorage.getItem('loginType');
      let tokenurl = '';
      let clientId = '';
      if (loginType === 'Janrain') {
        tokenurl = tokenJanrainUrl;
        clientId = janrainClientId;
      } else {
        tokenurl = tokenPingUrl;
        clientId = pingClientId;
      }
      const tokenHandler = new BaseTokenRequestHandler(new FetchRequestor());
      const authorizationHandler = new RedirectRequestHandler(
        new LocalStorageBackend(),
        new NoHashQueryStringUtils(),
        window.location,
        new DefaultCrypto()
      );
      const notifier = new AuthorizationNotifier();
      authorizationHandler.setAuthorizationNotifier(notifier);
      notifier.setAuthorizationListener((request, resp, error) => {
        if (resp) {
          let extras = null;
          if (request && request.internal) {
            extras = {};
            extras.code_verifier = request.internal.code_verifier;
          }
          const tokenRequest = new TokenRequest({
            client_id: clientId,
            redirect_uri: redirectURL,
            grant_type: GRANT_TYPE_AUTHORIZATION_CODE,
            code,
            refresh_token: undefined,
            extras,
          });
          AuthorizationServiceConfiguration.fetchFromIssuer(tokenurl, new FetchRequestor())
            .then((oResponse) => tokenHandler.performTokenRequest(oResponse, tokenRequest))
            .then((response) => {
              let decodedToken = '';
              localStorage.setItem('authenication', JSON.stringify(response));
              let newToken = '';
              let newEmail = '';
              if (loginType === 'Ping') {
                localStorage.setItem('access_token', response.accessToken);
                decodedToken = jwtDecode(response.accessToken);
                newEmail = decodedToken.mail;
                newToken = response.accessToken;
              } else {
                localStorage.setItem('access_token', response.idToken);
                decodedToken = jwtDecode(response.idToken);
                newEmail = decodedToken.email;
                newToken = response.idToken;
              }
              const lastLoggedInTime = new Date().toISOString().toString();
              localStorage.setItem('last_loggedin_time', lastLoggedInTime);
              localStorage.setItem('NewToken', `Bearer ${newToken}`);
              localStorage.setItem('newEmail', newEmail);
              getUserData(newToken, newEmail).then(function (res) {
                console.log("Checking The response");
                console.log(res);
                setLoader('');
                if (res.status === 200) {
                  setuserDetails(res.data);
                  return true;
                }
                localStorage.removeItem('access_token');
                if (res.status === 401) {
                  setOpen(true);
                  setError(constants.errorHandler.statusCode401.message);
                  return false;
                }
                setError(constants.errorHandler.statusCode500.message);
                setOpen(true);
              });
            })
            .catch((err) => {
              setLoader('');
            });
        }
      });
      authorizationHandler.completeAuthorizationRequestIfPossible();
    }
  }, []);

  const shellUserAuthorization = () => {
    pingConfig();
    localStorage.setItem('loginType', 'Ping');
  };
  const nonShellUserAuthorization = () => {
    janrain();
    localStorage.setItem('loginType', 'Janrain');
  };

  if (userDetails) {
    window.location.search = '';
    const home = landing(userDetails);
    return <Redirect to={`${home}`} />;
  }

  return (
    <Grid container className={classes.root}>
      <AlertDalog open={open} message={error} />
      <div className={loader} />
      <CssBaseline />
      <Grid item xs={false} sm={7} md={7} className="login-image" />
      <Grid item xs={12} sm={5} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper} style={{ paddingTop: '2%' }}>
          <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
            <Grid item>
              <img src={Logo} alt="pic" />
            </Grid>
            <Grid item>
              <Grid container direction="column" justify="center" alignItems="center" spacing={0}>
                <Grid item className="login-Header">
                  <Trans i18nKey="loginHeader">Welcome to Shell Aviation</Trans>
                </Grid>
                <Grid item className="login-sub-Header">
                  <Trans i18nKey="loginsubHeading">Schedule Release</Trans>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className="login-user-text">
              <Trans i18nKey="loginSubHeader">{loginSubHeader}</Trans>
            </Grid>
            <Grid item className="loginBtn">
              <Button
                fullWidth
                variant="contained"
                width="80%"
                onClick={() => nonShellUserAuthorization()}
                className={classes.submit}
              >
                <div className="submit">
                  <Trans i18nKey="loginButton">{login}</Trans>
                </div>
              </Button>
            </Grid>
            <Grid item className="userTypeBtn">
              <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
                <Grid item className="menuHeading">
                  <Trans i18nKey="loginShellUser">{shellUser}</Trans>
                </Grid>
                <Grid item className="clickClass" style={{ cursor: 'pointer' }}>
                  <Link onClick={(e) => shellUserAuthorization()}>
                    <Trans i18nKey="clickHere">{ClickHere}</Trans>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

Login.propTypes = {
  loader: PropTypes.string,
};
export default Login;
