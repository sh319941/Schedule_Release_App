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
import ShellList from './ShellRegList';
import { getToken } from '../../utils';
import Loader from '../loader';

function ShellListComponent(props) {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const token = getToken();

  const { actions } = props;

  useEffect(() => {
    actions.getShellList(token);
    actions.getCountries(token);
  }, []);

  const { countries, shellList, userDetails: userData, countryLoaded } = props;

  return (
    <div className={classes.root}>
      <Loader />
      <CssBaseline />
      <Header onMobileNavOpen={() => setMobileNavOpen(true)} />
      <SideBar onMobileClose={() => setMobileNavOpen(false)} openMobile={isMobileNavOpen} />
      {countryLoaded && (
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
                    <ShellList countries={countries} shellList={shellList} userData={userData} actions={actions} />
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Container>
        </main>
      )}
    </div>
  );
}

ShellListComponent.propTypes = {
  actions: PropTypes.object,
  countries: PropTypes.array,
  shellList: PropTypes.array,
  countryLoaded: PropTypes.bool,
  userDetails: PropTypes.object.isRequired,
};

export default ShellListComponent;
