/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PolicyControl from '../middleware/PolicyControlContainer';

const parsePath = (path) => {
  if (path.charAt(0) === '/') {
    return path.substr(1);
  }
  if (path.charAt(path.length - 1) === '/') {
    return path.substr(0, path.length - 1);
  }
};

export const PrivateRoute = ({ component: Component, permissions, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const tocken = localStorage.getItem('access_token');
      if (!tocken) {
        return <Redirect to={{ pathname: '/' }} />;
      }
      const route = parsePath(props.location.pathname);
      return (
        <PolicyControl route={route} perms={[route]} {...props}>
          <Component {...props} />
        </PolicyControl>
      );
    }}
  />
);
