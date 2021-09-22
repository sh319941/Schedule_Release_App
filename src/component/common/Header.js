import React, { useState, useRef } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { AppBar, Box, Hidden, Icon, IconButton, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux';
import { useStyles } from '../../assets/css/headerCss';
import { logout, profile } from './Utilities/Logout';
import { getLoginType } from '../../utils';
import SessionTimeOut from '../../middleware/SessionTimeOut';
import profileIcon from '../../assets/images/H_User_Icn-36px.png';

const Header = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  const loginType = getLoginType();
  let Name = '';
  let profilemenu = '';
  const {
    policyControl: { userDetails: userInfo },
  } = rest;

  if (userInfo !== null) {
    let firstName = '';
    let lastName = '';
    if (userInfo.firstName != null) {
      firstName = userInfo.firstName;
    }
    if (userInfo.lastName != null) {
      lastName = userInfo.lastName;
    }
    Name = `${firstName} ${lastName}`;
    if (loginType === 'Janrain') {
      profilemenu = (
        <MenuItem onClick={(e) => profile()}>
          <ListItemIcon />
          <ListItemText primary="My Account" />
        </MenuItem>
      );
    }
  }

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  return (
    <AppBar className={clsx(classes.root, className, 'topbar-image')} elevation={0} {...rest} color="transparent">
      <SessionTimeOut />
      <Toolbar>
        <Grid container direction="row" spacing={1} justify="flex-start" alignItems="center">
          <Grid item>
            <Box flexGrow={1} />
            <Hidden lgUp>
              ,{' '}
              <IconButton color="inherit" onClick={onMobileNavOpen}>
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
        <Grid container direction="row" justify="flex-end" alignItems="center" spacing={1}>
          {/* <Grid item>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              className="langIcon"
              size="medium"
            >
            </IconButton>
          </Grid>
          <Grid item>
            <Select
              labelId="lang-select-label"
              id="lang-select"
              disableUnderline
              onChange={(e) => changeLanguage(e.target.value)}
              className="langSelect"
              value={lang}
            >
              {
                languageList.map((lang_list, index) =>
                  <MenuItem className="langSelect" key={index} value={lang_list}>{lang_list}</MenuItem>
                )
              }
            </Select>
          </Grid> */}
          <Grid item>
            <ListItemIcon
              style={{ fontSize: 10 }}
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              onClick={handleToggle}
            >
              <img src={profileIcon} alt="Profile" height="20%" />
            </ListItemIcon>
          </Grid>
          <Grid item>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                        <MenuItem onClick={handleClose}>
                          <ListItemIcon />
                          <ListItemText primary={Name} />
                        </MenuItem>
                        {profilemenu}

                        <MenuItem onClick={(e) => logout()}>
                          <ListItemIcon>
                            <Icon color="inherit" className="logout" />
                          </ListItemIcon>
                          <ListItemText primary="Logout" />
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
};

const mapStateToProps = (state) => state;
const matchDispatchToProps = {};
export default connect(mapStateToProps, matchDispatchToProps)(Header);
