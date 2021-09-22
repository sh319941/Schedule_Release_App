import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { AppBar, Box, Hidden, IconButton, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import { useStyles } from '../../assets/css/headerCss';

const TncHeader = () => {
  const classes = useStyles();

  return (
    <AppBar className={clsx(classes.root)} elevation={0} color="transparent">
      <Toolbar>
        <Grid container direction="row" spacing={1} justify="flex-start" alignItems="center">
          <Grid item>
            <Box flexGrow={1} />
            <Hidden lgUp>
              <IconButton color="inherit">
                <MenuIcon />
              </IconButton>
            </Hidden>
          </Grid>

          <Grid item>
            <IconButton edge="start" color="inherit" aria-label="open drawer" className="shellIcon" />
          </Grid>
          <Grid item className="topbarHeader">
            Shell Aviation
          </Grid>
          <Grid item className="topbarSubHeader">
            Schedule Release
          </Grid>
        </Grid>
        <div className={classes.grow} />
      </Toolbar>
    </AppBar>
  );
};

TncHeader.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
};

export default TncHeader;
