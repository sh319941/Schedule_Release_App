import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import SiteList from './SiteList';
import SideBar from '../common/userLayout/SideBar';
import Header from '../common/Header';
import { useStyles } from '../../assets/js/common';
import Topbar from '../common/userLayout/Topbar/topBar/UserTopbar';
import { getToken } from '../../utils';
import Loader from '../loader';

const Sites = (props) => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const token = getToken();
  const { actions } = props;

  useEffect(() => {
    actions.getAirports(token, { StatusId: 1 });
    actions.getSites(token);
  }, [actions, token]);

  const { airportsList, sitesList, airportListLoaded, userDetails: userInfo } = props;

  return (
    <div className={classes.root}>
      <Loader />
      <CssBaseline />
      <Header onMobileNavOpen={() => setMobileNavOpen(true)} />
      <SideBar onMobileClose={() => setMobileNavOpen(false)} openMobile={isMobileNavOpen} user={userInfo} />
      {airportListLoaded ? (
        <main className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>
            <div className={classes.wrapper}>
              <Grid direction="column" justify="flex-start" alignItems="flex-start" container spacing={2}>
                <Grid item>
                  <Topbar name="Site" />
                </Grid>
                <Grid item>
                  <SiteList
                    site={sitesList}
                    airportList={airportsList}
                    list={sitesList}
                    actions={actions}
                    userDetails={userInfo}
                  />
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

Sites.propTypes = {
  actions: PropTypes.object,
  airportsList: PropTypes.array,
  sitesList: PropTypes.array,
  userDetails: PropTypes.object.isRequired,
  airportListLoaded: PropTypes.bool,
};

export default Sites;
