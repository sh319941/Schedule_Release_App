import React from 'react';
import Grid from '@material-ui/core/Grid';

export const deactiveMsg = () => (
  <Grid container direction="column" className="login-user-type" justify="center" alignItems="center" spacing={0}>
    <Grid item>Are you sure you want to deactivate this airport?</Grid>
    <Grid item>This airport and all the sites and users associated to it will be deactivated.</Grid>
  </Grid>
);
export const activeMsg = 'Are you sure you want to activate this airport ?';
export const updatMsg = 'Are you sure you want to make changes to this airport ?';
export const deactivate = deactiveMsg();
export const msgData = { activate: activeMsg, deactivate, update: updatMsg, title: 'Aiports' };
