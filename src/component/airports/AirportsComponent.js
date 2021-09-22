import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import SideBar from '../common/userLayout/SideBar';
import Header from '../common/Header';
import AirportList from './AirportList';
import { useStyles } from '../../assets/js/common';
import Topbar from '../common/userLayout/Topbar/topBar/MasterTopbar';
import AirportListTopbar from '../common/userLayout/Topbar/subTopBar/AirportListTopbar';
import { getToken } from '../../utils';
import Loader from '../loader';

function Airports(props) {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const token = getToken();
  const { actions } = props;

  useEffect(() => {
    actions.getCountries(token, { StatusId: 1 });
    actions.getAirports(token);
    actions.getSites(token);
  }, [token, actions]);

  const { airports, countryListLoaded, countries, sites, userDetails: userInfo } = props;

  return (
    <div className={classes.root}>
      <Loader />
      <CssBaseline />
      <Header onMobileNavOpen={() => setMobileNavOpen(true)} />
      <SideBar onMobileClose={() => setMobileNavOpen(false)} openMobile={isMobileNavOpen} user={userInfo} />
      {countryListLoaded ? (
        <main className={classes.content}>
          <Container className={classes.container}>
            <div className={classes.wrapper}>
              <Grid direction="column" justify="flex-start" alignItems="center" container spacing={1}>
                <Grid direction="column" justify="flex-start" alignItems="flex-start" container spacing={1}>
                  <Grid item>
                    <Topbar name="Airports" />
                  </Grid>
                </Grid>
                <Grid direction="column" justify="flex-start" alignItems="center" container spacing={1}>
                  <Grid item>
                    <AirportListTopbar />
                  </Grid>
                  <Grid item>
                    <AirportList
                      countryDetails={countries}
                      airportDetails={airports}
                      list={sites}
                      actions={actions}
                      userDetails={userInfo}
                    />
                  </Grid>
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
}

Airports.propTypes = {
  actions: PropTypes.object,
  airports: PropTypes.array,
  countries: PropTypes.array,
  userDetails: PropTypes.object,
  countryListLoaded: PropTypes.bool,
  sites: PropTypes.array,
};

export default Airports;
