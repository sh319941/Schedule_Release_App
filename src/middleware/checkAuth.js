import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';

import getUserPermissions from './Permissions';
import { getToken, getEmail } from '../utils';

import Authenticated from '../redux/Authenticated';

export const getRenderAuth = (role) => {
  try {
    const permissions = getUserPermissions(role);
    let path = window.location.pathname;
    if (!path || path === '/') {
      path = Object.keys(permissions)[0] ? Object.keys(permissions)[0] : '/';
    }
    return path;
  } catch {
    return null;
  }
};

const { getUserDetails } = Authenticated.actions;

export default function requireAuth(Component) {
  class AuthenticatedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        auth: getToken(),
      };
    }

    componentDidMount() {
      const { actions } = this.props;
      const { token } = this.state;
      this.checkAuth();
      const email = getEmail();
      actions.getUserDetails(token, { email });
    }

    checkAuth() {
      const { auth } = this.state;
      if (!auth) {
        this.props.history.push(`/`);
      }
    }

    render() {
      const { auth } = this.state;
      const { path } = this.props;
      return auth && path ? (
        <>
          <Component {...this.props} />
          <Redirect to={`/${path}`} />
        </>
      ) : null;
    }
  }

  const mapStateToProps = (state) => {
    const { role } = state[Authenticated.name].userDetails;
    if (role) {
      return {
        path: getRenderAuth(role.roleName),
      };
    }
  };

  const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(
      {
        getUserDetails,
      },
      dispatch
    ),
  });

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent));
}
