import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import SideBar from '../common/userLayout/SideBar';
import Header from '../common/Header';
import AircraftTypesList from './AircraftTypesList';
import { useStyles } from '../../assets/js/common';
import Topbar from '../common/userLayout/Topbar/topBar/MasterTopbar';
import { getToken } from '../../utils';
import Loader from '../loader';

const AircraftTypeComponent = (props) => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const token = getToken();
  const { actions } = props;
  useEffect(() => {
    actions.getAircraftTypes(token);
  }, []);

  const { userDetails: userInfo, aircraftTypes } = props;
  return (
    <div className={classes.root}>
      <Loader />
      <CssBaseline />
      <Header onMobileNavOpen={() => setMobileNavOpen(true)} />
      <SideBar onMobileClose={() => setMobileNavOpen(false)} openMobile={isMobileNavOpen} user={userInfo} />
      {aircraftTypes && (
        <main className={classes.content}>
          <Container className={classes.container}>
            <div className={classes.wrapper}>
              <Grid direction="clomun" justify="flex-start" alignItems="flex-start" container spacing={2}>
                <Grid item>
                  <Topbar name="Aircraft Types" />
                </Grid>
                <Grid item>
                  <AircraftTypesList aircraftTypes={aircraftTypes} actions={actions} userInfo={userInfo} />
                </Grid>
              </Grid>
            </div>
          </Container>
        </main>
      )}
    </div>
  );
};

AircraftTypeComponent.propTypes = {
  actions: PropTypes.object,
  aircraftTypes: PropTypes.array,
  userDetails: PropTypes.object,
};

export default AircraftTypeComponent;
