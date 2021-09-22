import React from 'react';
import Grid from '@material-ui/core/Grid';

export const ErrorMsg401 = () => (
  <Grid container direction="column" justify="center" alignItems="center" spacing={0}>
    <Grid item>You do not have access to the application.</Grid>
    <Grid item>Please contact the administrator at DS-schedulerelease@shell.com</Grid>
  </Grid>
);

export const ErrorMsg500 = () => (
  <Grid container direction="column" justify="center" alignItems="center" spacing={0}>
    <Grid item>There has been an unexpected error.</Grid>
    <Grid item>Please try again after some time. If the error persists, please contact support.</Grid>
  </Grid>
);
