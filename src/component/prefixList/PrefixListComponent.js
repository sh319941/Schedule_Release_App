import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useStyles } from '../../assets/js/common';
import SideBar from '../common/userLayout/SideBar';
import Header from '../common/Header';
import Topbar from '../common/userLayout/Topbar/topBar/MasterTopbar';
import AircraftRegTopbar from '../common/userLayout/Topbar/subTopBar/AircraftRegTopbar';
import { getToken } from '../../utils';
import PrefixList from './PrefixList';
import Loader from '../loader';

const PrefixListComponent = (props) => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const token = getToken();
  const { actions, countries, prefixList, userDetails, countryLoaded } = props;

  useEffect(() => {
    actions.getCountries(token);
    actions.getPrefixList(token);
  }, []);
  return (
    <div className={classes.root}>
      <Loader />
      <CssBaseline />
      <Header onMobileNavOpen={() => setMobileNavOpen(true)} />
      <SideBar onMobileClose={() => setMobileNavOpen(false)} openMobile={isMobileNavOpen} />
      {countryLoaded && prefixList && (
        <main className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>
            <div className={classes.wrapper}>
              <Grid direction="column" justify="flex-start" alignItems="center" container spacing={2}>
                <Grid direction="column" justify="flex-start" alignItems="flex-start" container spacing={2}>
                  <Grid item>
                    <Topbar name="Aircraft Registration Number" />
                  </Grid>
                </Grid>
                <Grid direction="column" justify="flex-start" alignItems="center" container spacing={2}>
                  <Grid item>
                    <AircraftRegTopbar />
                  </Grid>
                  <Grid item xs={12}>
                    <PrefixList
                      userInfo={userDetails}
                      actions={actions}
                      countries={countries}
                      prefixList={prefixList}
                    />
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

PrefixListComponent.propTypes = {
  actions: PropTypes.object,
  countries: PropTypes.array,
  prefixList: PropTypes.array,
  countryLoaded: PropTypes.bool,
  userDetails: PropTypes.object.isRequired,
};

export default PrefixListComponent;
