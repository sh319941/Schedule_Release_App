import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CountryList from './CountryList';
import { useStyles } from '../../assets/js/common';
import SideBar from '../common/userLayout/SideBar';
import Header from '../common/Header';
import Topbar from '../common/userLayout/Topbar/topBar/MasterTopbar';
import AirportListTopbar from '../common/userLayout/Topbar/subTopBar/AirportListTopbar';
import { getToken } from '../../utils';
import Loader from '../loader';

const Countries = (props) => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const token = getToken();
  const { actions } = props;
  useEffect(() => {
    actions.getCountries(token);
  }, []);

  const { countries, userDetails: userInfo } = props;

  return (
    <div className={classes.root}>
      <Loader />
      <CssBaseline />
      <Header onMobileNavOpen={() => setMobileNavOpen(true)} />
      <SideBar onMobileClose={() => setMobileNavOpen(false)} openMobile={isMobileNavOpen} user={userInfo} />
      {countries && (
        <main className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>
            <div className={classes.wrapper}>
              <Grid direction="column" justify="flex-start" alignItems="center" container spacing={2}>
                <Grid direction="column" justify="flex-start" alignItems="flex-start" container spacing={2}>
                  <Grid item>
                    <Topbar name="Country" />
                  </Grid>
                </Grid>
                <Grid direction="column" justify="center" alignItems="center" container spacing={2}>
                  <Grid item>
                    <AirportListTopbar />
                  </Grid>
                  <Grid direction="column" justify="flex-start" alignItems="flex-start" container spacing={2}>
                    <Grid item>
                      <CountryList countries={countries} userInfo={userInfo} actions={actions} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Container>
        </main>
      )}
    </div>
  );
};

Countries.propTypes = {
  actions: PropTypes.object,
  countries: PropTypes.array,
  userDetails: PropTypes.object.isRequired,
};
export default Countries;
