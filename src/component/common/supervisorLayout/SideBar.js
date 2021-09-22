import React, { useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { useLocation, Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import reportIcon from '../../../assets/images/sidebarImage/reportIcon.png';
import nonreportIcon from '../../../assets/images/sidebarImage/nonreportIcon.png';
import { useStyles } from '../../../assets/css/sidebarCss';
import NestedMenuItem from '../../../NestedMenuItem';
import singlecheck from '../../../assets/images/SupervisorIcon/singlecheck.png';
import bulkcheckIcon from '../../../assets/images/SupervisorIcon/bulkcheckIcon.png';
import nonbulkcheckIcon from '../../../assets/images/SupervisorIcon/nonbulkcheckIcon.png';
import nonsinglecheck from '../../../assets/images/SupervisorIcon/nonsinglecheck.png';
import reportSub from '../../../assets/images/BoIcon/report.png';
import nonreportSub from '../../../assets/images/BoIcon/nonreport.png';
import scheduleCheck from '../../../assets/images/sidebarImage/scheduleCheck.png';
import nonScheduleCheck from '../../../assets/images/sidebarImage/noScheduleChecK.png';

const SideBar = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    if (props.openMobile && props.onMobileClose) {
      props.onMobileClose();
    }
  }, [path]);

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
            <Link to="/ScheduleCheck" className={classes.linkStyle}>
              <img
                src={path === '/ScheduleCheck' || path === '/BulkCheck' ? scheduleCheck : nonScheduleCheck}
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
                Schedule check
              </ListSubheader>
            }
            className={classes.root}
            disablePadding
          >
            <Link to="/ScheduleCheck" className={classes.linkStyle}>
              <ListItem button classes={{ root: classes.item }}>
                <img src={path === '/ScheduleCheck' ? singlecheck : nonsinglecheck} alt="User" />
                <ListItemText primary={<Typography className={classes.sideBarContent}>Single Check</Typography>} />
              </ListItem>
            </Link>

            <Link to="/BulkCheck" className={classes.linkStyle}>
              <ListItem button classes={{ root: classes.item }}>
                <img src={path === '/BulkCheck' ? bulkcheckIcon : nonbulkcheckIcon} alt="Site" />
                <ListItemText primary={<Typography className={classes.sideBarContent}>Bulk Check</Typography>} />
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
                <ListItemText primary={<Typography className={classes.sideBarContent}>Report</Typography>} />
              </ListItem>
            </Link>
          </List>
        </NestedMenuItem>
      </Paper>
    </div>
  );
};

export default SideBar;
