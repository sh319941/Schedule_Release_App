import React from 'react';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useLocation, Link } from 'react-router-dom';
import siteIcon from '../../../../../assets/images/selectedIcon/siteIcon.png';
import accountIcon from '../../../../../assets/images/selectedIcon/accountIcon.png';
import nonsiteIcon from '../../../../../assets/images/unselectedIcon/siteIcon.png';
import nonaccountIcon from '../../../../../assets/images/unselectedIcon/accountIcon.png';
import { useStyles } from '../../../../../assets/js/common';

const MasterTopbar = () => {
  const location = useLocation();
  const classes = useStyles();
  const path = location.pathname;
  let userSelect = classes.dividerUnSelect;
  let siteSelect = classes.dividerUnSelect;
  let userIcon = accountIcon;
  if (path === '/User') {
    userSelect = <Divider className={classes.dividerSelect} />;

    userIcon = nonaccountIcon;
  }
  let siteIconLogo = siteIcon;
  if (path === '/Site') {
    siteSelect = <Divider className={classes.dividerSelect} />;
    siteIconLogo = nonsiteIcon;
  }

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
      <Grid item xs={6} md={6} lg={6}>
        <Link to="/User">
          <Paper className={fixedHeightPaper}>
            <Grid
              container
              style={{ paddingTop: '8%' }}
              direction="row"
              justify="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                <img src={userIcon} alt="User" />
              </Grid>
              <Grid item className="contentHeading">
                User
                {userSelect}
              </Grid>
            </Grid>
          </Paper>
        </Link>
      </Grid>
      <Grid item xs={6} md={6} lg={6}>
        <Link to="/Site">
          <Paper className={fixedHeightPaper}>
            <Grid
              container
              direction="row"
              style={{ paddingTop: '8%' }}
              justify="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                <img src={siteIconLogo} alt="Site" />
              </Grid>
              <Grid item className="contentHeading">
                Site
                {siteSelect}
              </Grid>
            </Grid>
          </Paper>
        </Link>
      </Grid>
    </Grid>
  );
};

export default MasterTopbar;
