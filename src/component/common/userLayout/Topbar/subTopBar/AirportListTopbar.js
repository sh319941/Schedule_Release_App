import React from 'react';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { useLocation, Link } from 'react-router-dom';
import { useStyles } from '../../../../../assets/js/common';

const AirportListTopbar = () => {
  const classes = useStyles();
  const location = useLocation();
  const path = location.pathname;

  return (
    <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
      <Link to="/Airports" style={{ textDecoration: 'none' }}>
        <Grid item className={classes.contentHeading}>
          Airport
          <hr className={path === '/Airports' ? classes.dividerSubSelect : classes.dividerSubUnselect} />
        </Grid>
      </Link>
      <Grid item>
        {' '}
        <Divider />
      </Grid>
      <Link to="/Country" style={{ textDecoration: 'none' }}>
        <Grid item className={classes.contentHeading}>
          Country
          <hr className={path === '/Country' ? classes.dividerSubSelect : classes.dividerSubUnselect} />
        </Grid>
      </Link>
    </Grid>
  );
};

export default AirportListTopbar;
