import React from 'react';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { useLocation, Link } from 'react-router-dom';
import { useStyles } from '../../../../../assets/js/common';

const AircraftRegTopbar = () => {
  const classes = useStyles();
  const location = useLocation();
  const path = location.pathname;

  return (
    <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
      <Link to="/ShellList" style={{ textDecoration: 'none' }}>
        <Grid item className={classes.contentHeading}>
          Shell List
          <hr className={path === '/ShellList' ? classes.dividerSubSelect : classes.dividerSubUnselect} />
        </Grid>
      </Link>
      <Grid item>
        {' '}
        <Divider />
      </Grid>
      <Link to="/PrefixList" style={{ textDecoration: 'none' }}>
        <Grid item className={classes.contentHeading}>
          Prefix List
          <hr className={path === '/PrefixList' ? classes.dividerSubSelect : classes.dividerSubUnselect} />
        </Grid>
      </Link>
    </Grid>
  );
};

export default AircraftRegTopbar;
