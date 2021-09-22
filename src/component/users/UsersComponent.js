import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import PropTypes from 'prop-types';
import Users from './UserList';
import SideBar from '../common/userLayout/SideBar';
import Header from '../common/Header';
import { useStyles } from '../../assets/js/common';
import Topbar from '../common/userLayout/Topbar/topBar/UserTopbar';
import Terms from '../tnc/TermsContainer';
import { getToken, getLastLoggedInTime } from '../../utils';
import Loader from '../loader';

const User = (props) => {
  const { actions } = props;
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const token = getToken();
  const lastLoggedInTime = getLastLoggedInTime();
  const { userDetails: userInfo, siteListLoaded, roleListLoaded, roles, sitesList, users } = props;
  useEffect(() => {
    actions.getSites(token, { StatusId: 1 });
    actions.getUsers(token);
    actions.getRoles(token);
    const params = { userId: userInfo.userId, lastLoggedInTime };
    actions.updateLastLoggedIn(token, params);
  }, []);
  return (
    <div className={classes.root}>
      <Loader />
      <CssBaseline />
      <Header onMobileNavOpen={() => setMobileNavOpen(true)} />
      <Terms />
      <SideBar onMobileClose={() => setMobileNavOpen(false)} openMobile={isMobileNavOpen} user={userInfo} />
      {siteListLoaded && roleListLoaded ? (
        <main className={classes.content}>
          <Container className={classes.container}>
            <div className={classes.wrapper}>
              <Grid direction="clomun" justify="flex-start" alignItems="flex-start" container spacing={2}>
                <Grid item>
                  <Topbar name="User" />
                </Grid>
                <Grid item xs={12}>
                  <Users sites={sitesList} roles={roles} users={users} userInfo={userInfo} actions={actions} />
                </Grid>
              </Grid>
            </div>
          </Container>
        </main>
      ) : (
        <div className="load" />
      )}
    </div>
  );
};

User.propTypes = {
  actions: PropTypes.object,
  roles: PropTypes.array,
  users: PropTypes.array,
  sitesList: PropTypes.array,
  userDetails: PropTypes.object.isRequired,
  siteListLoaded: PropTypes.bool,
  roleListLoaded: PropTypes.bool,
};

export default User;
