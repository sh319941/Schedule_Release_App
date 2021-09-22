import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { history } from '../routes/history';
import { getToken, getEmail, getTokenExpiresIn, getDiffMinutes } from '../utils';
import { logout } from '../component/common/Utilities/Logout';
import { refreshToken } from '../component/pingConfiguration/AccessToken';

export const PolicyControl = (props) => {
  const { actions } = props;
  const { tokenExpDateBeforeSec, tokenExpDateAfterSec } = getTokenExpiresIn();
  const token = getToken();
  const email = getEmail();
  const minutes = getDiffMinutes();

  useEffect(() => {
    if (tokenExpDateBeforeSec > new Date() && minutes < 6 && minutes > 1) {
      refreshToken();
    }
    if (tokenExpDateAfterSec < new Date()) {
      logout();
    }
    actions.getUserDetails(token, { email });
  }, [token]);

  const { userPermissions, route, perms, children } = props;
  const [render, setRender] = useState(false);
  try {
    // eslint-disable-next-line no-unused-expressions
    !render &&
      perms.forEach((perm) => {
        if (!!userPermissions && !!userPermissions[route] && !!userPermissions[route].includes(perm)) {
          setRender(true);
        }
      });
    if (render) {
      return <>{children}</>;
    }
    history.push(`/${route}`);

    if (userPermissions[route] === undefined || !userPermissions[route]) {
      const path = Object.keys(userPermissions)[0] ? Object.keys(userPermissions)[0] : '';
      // eslint-disable-next-line no-unused-expressions
      route && alert(`Sorry You don't have access to ${route}`);
      return <Redirect to={`/${path}`} />;
    }
    return null;
  } catch (e) {
    return null;
  }
};

export default PolicyControl;
