import React from 'react';
import Grid from '@material-ui/core/Grid';

const deactiveMsg = () => (
  <Grid container direction="column" className="login-user-type" justify="center" alignItems="center" spacing={0}>
    <Grid item>Are you sure you want to deactivate this Registration Prefix?</Grid>
  </Grid>
);
const activeMsg = 'Are you sure you want to activate this Registration Prefix ?';
const updatMsg = 'Are you sure you want to make changes to this Registration Prefix ?';
const deactivate = deactiveMsg();
export const msgData = {
  activate: activeMsg,
  deactivate,
  update: updatMsg,
  title: 'Registration Prefixes',
};
