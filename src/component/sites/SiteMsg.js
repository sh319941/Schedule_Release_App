import React from 'react';
import Grid from '@material-ui/core/Grid';

const deactiveMsg = () => (
  <Grid container direction="column" className="login-user-type" justify="center" alignItems="center" spacing={0}>
    <Grid item>Are you sure you want to deactivate this site?</Grid>
    <Grid item>The site and all its users will be deactivated.</Grid>
  </Grid>
);
const activeMsg = 'Are you sure you want to activate this site?';
const updatMsg = 'Are you sure you want to make changes to this site?';
const deactivate = deactiveMsg();
export const msg = { activate: activeMsg, deactivate, update: updatMsg, title: 'Sites' };
