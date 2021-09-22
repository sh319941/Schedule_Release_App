import React, { useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { useLocation, Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import masterDataIcon from '../../../assets/images/selectedIcon/masterData.png';
import reportIcon from '../../../assets/images/sidebarImage/reportIcon.png';
import nonreportIcon from '../../../assets/images/sidebarImage/nonreportIcon.png';
import accountIcon from '../../../assets/images/selectedIcon/accountIcon.png';
import nonmasterDataIcon from '../../../assets/images/unselectedIcon/masterDataIcon.png';
import nonaccountIcon from '../../../assets/images/unselectedIcon/accountIcon.png';
import { useStyles } from '../../../assets/css/sidebarCss';
import NestedMenuItem from '../../../NestedMenuItem';
import siteSub from '../../../assets/images/BoIcon/site.png';
import accountSub from '../../../assets/images/BoIcon/account.png';
import nonsiteSub from '../../../assets/images/BoIcon/nonsite.png';
import nonaccountSub from '../../../assets/images/BoIcon/nonaccount.png';
import reportSub from '../../../assets/images/BoIcon/report.png';
import nonreportSub from '../../../assets/images/BoIcon/nonreport.png';
import aircraftSub from '../../../assets/images/BoIcon/aircraft.png';
import nonaircraftSub from '../../../assets/images/BoIcon/nonaircraft.png';
import airportListSub from '../../../assets/images/BoIcon/airportList.png';
import nonairportListSub from '../../../assets/images/BoIcon/nonairportList.png';
import aircraftRegSub from '../../../assets/images/BoIcon/aircraftReg.png';
import nonaircraftRegSub from '../../../assets/images/BoIcon/nonaircraftReg.png';

const SideBar = () => {
  const classes = useStyles();
  const location = useLocation();
  const path = location.pathname;
  const menuPos = { y: 0 };
  return (
    <div
      style={{
        top: 64,
      }}
      className={classes.rootPaper}
    >
      <Paper className={classes.paper}>
        <NestedMenuItem
          label={
            <Link to="/User" className={classes.linkStyle}>
              <img
                src={path === '/Site' || path === '/User' ? accountIcon : nonaccountIcon}
                alt="Account"
                className={classes.accsideImg}
              />
            </Link>
          }
          parentMenuOpen={!!menuPos}
        >
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader className={classes.sideBarHeading} component="div" id="nested-list-subheader">
                Account
              </ListSubheader>
            }
            disablePadding
          >
            <Link to="/User" className={classes.linkStyle}>
              <ListItem button className={classes.item}>
                <img src={path === '/User' ? accountSub : nonaccountSub} alt="User" />
                <ListItemText primary={<Typography className={classes.sideBarContent}>User</Typography>} />
              </ListItem>
            </Link>
            <Link to="/Site" className={classes.linkStyle}>
              <ListItem button classes={{ root: classes.item }}>
                <img src={path === '/Site' ? siteSub : nonsiteSub} alt="Site" />
                <ListItemText primary={<Typography className={classes.sideBarContent}>Site</Typography>} />
              </ListItem>
            </Link>
          </List>
        </NestedMenuItem>
        <NestedMenuItem
          label={
            <Link to="/Report" className={classes.linkStyle}>
              <img
                src={path === '/Report' ? reportIcon : nonreportIcon}
                alt="Account"
                style={{}}
                className={classes.sideImg}
              />
            </Link>
          }
          parentMenuOpen={!!menuPos}
        >
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader className={classes.sideBarHeading} component="div" id="nested-list-subheader">
                Report
              </ListSubheader>
            }
            className={classes.root}
            disablePadding
          >
            <Link to="/Report" className={classes.linkStyle}>
              <ListItem button classes={{ root: classes.item }}>
                <img src={path === '/Report' ? reportSub : nonreportSub} alt="Account" />
                <ListItemText
                  primary={
                    <Typography backgroundColor="transparent" className={classes.sideBarContent}>
                      Report
                    </Typography>
                  }
                />
              </ListItem>
            </Link>
          </List>
        </NestedMenuItem>
        <NestedMenuItem
          label={
            <Link to="/Airports" className={classes.linkStyle}>
              <img
                src={path !== '/Report' && path !== '/User' && path !== '/Site' ? masterDataIcon : nonmasterDataIcon}
                alt="Account"
                className={classes.sideImg}
              />
            </Link>
          }
          parentMenuOpen={!!menuPos}
        >
          <List
            component="div"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader className={classes.sideBarHeading} component="div" id="nested-list-subheader">
                Master Data
              </ListSubheader>
            }
          >
            <Link to="/Airports" className={classes.linkStyle}>
              <List component="div" disablePadding alignItem="left">
                <ListItem button classes={{ root: classes.item }}>
                  <img
                    src={path === '/Airports' || path === '/Country' ? airportListSub : nonairportListSub}
                    alt="Aircraft List"
                  />
                  <ListItemText primary={<Typography className={classes.sideBarContent}>Airports</Typography>} />
                </ListItem>
              </List>
            </Link>

            <Link to="/AircraftTypes" className={classes.linkStyle}>
              <ListItem button classes={{ root: classes.item }}>
                <img src={path === '/AircraftTypes' ? aircraftSub : nonaircraftSub} alt="Aircraft Craft" />
                <ListItemText primary={<Typography className={classes.sideBarContent}>Aircraft Types</Typography>} />
              </ListItem>
            </Link>
            <Link to="/ShellList" className={classes.linkStyle}>
              <ListItem button classes={{ root: classes.item }}>
                <img
                  src={path === '/ShellList' || path === '/PrefixList' ? aircraftRegSub : nonaircraftRegSub}
                  alt="Aircraft Registration"
                />
                <ListItemText
                  primary={<Typography className={classes.sideBarContent}>Aircraft Registration Number</Typography>}
                />
              </ListItem>
            </Link>
          </List>
        </NestedMenuItem>
      </Paper>
    </div>
  );
};

export default SideBar;
