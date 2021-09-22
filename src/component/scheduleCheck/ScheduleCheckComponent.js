import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Snackbar from '@material-ui/core/Snackbar';
import Header from '../common/Header';
import SideBar from '../common/supervisorLayout/SideBar';
import Terms from '../tnc/TermsContainer';
import { useStyles } from './ScheduleCheckStyles';
import ScheduleCheckTopbar from '../common/supervisorLayout/Topbar/topBar/ScheduleCheckTopbar';
import Alert from '../common/Utilities/Alert';
import { getToken, getLastLoggedInTime } from '../../utils';
import Loader from '../loader';
import ScheduleCheckForm from './ScheduleCheckForm';

const ScheduleCheck = (props) => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const token = getToken();
  const lastLoggedInTime = getLastLoggedInTime();
  const { actions, aircraftListLoaded, airportListLoaded, userDetails: userData, airportList, airportTypeList } = props;
  const { getAirports, getairportTypeList, updateLastLoggedIn } = actions;
  useEffect(() => {
    const status = { StatusId: 1 };
    getAirports(token, status);
    getairportTypeList(token, status);
    const params = { userId: userData.userId, lastLoggedInTime };
    updateLastLoggedIn(token, params);
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const handleOpen = (messageData) => {
    setError(messageData);
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <Loader />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
      <Terms />
      <CssBaseline />
      <Header onMobileNavOpen={() => setMobileNavOpen(true)} />
      <SideBar onMobileClose={() => setMobileNavOpen(false)} openMobile={isMobileNavOpen} user={props.userInfo} />
      {airportListLoaded && aircraftListLoaded ? (
        <main className={classes.content}>
          <Container className={classes.container} minWidth="lg">
            <div className={classes.wrapper}>
              <Grid container direction="column" justify="flex-start" spacing={4} alignItems="flex-start">
                <Grid item>
                  <ScheduleCheckTopbar name="Single Check" />
                </Grid>
                <Paper className={classes.paper}>
                  <Grid item>
                    <CssBaseline />
                    <ScheduleCheckForm
                      airportList={airportList}
                      airportTypeList={airportTypeList}
                      actions={actions}
                      userData={userData}
                      handleOpen={handleOpen}
                    />
                  </Grid>
                </Paper>
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
ScheduleCheck.propTypes = {
  airportList: PropTypes.array,
  airportTypeList: PropTypes.array,
  aircraftListLoaded: PropTypes.bool,
  airportListLoaded: PropTypes.bool,
  actions: PropTypes.object,
  userDetails: PropTypes.object,
};
export default ScheduleCheck;
