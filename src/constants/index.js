import React from 'react';
import Grid from '@material-ui/core/Grid';

const ErrorMsg401 = () => (
  <Grid container direction="column" justify="center" alignItems="center" spacing={0}>
    <Grid item className="errorMsgHeader">
      Unauthorized Access Denied
    </Grid>
    <Grid item>You do not have access to the application.</Grid>
    <Grid item>Please contact the administrator at DS-schedulerelease@shell.com.</Grid>
  </Grid>
);
const ErrorMsg500 = () => (
  <Grid container direction="column" justify="center" alignItems="center" spacing={0}>
    <Grid item className="errorMsgHeader">
      Internal Error
    </Grid>
    <Grid item>There has been an unexpected error. Please try again after some time.</Grid>
    <Grid item>If the error persists, please contact support at DS-schedulerelease@shell.com.</Grid>
  </Grid>
);
export default {
  home: '/',
  login: 'login',
  site: 'Site',
  scheduleCheck: 'ScheduleCheck',
  report: 'Report',
  bulkCheck: 'BulkCheck',
  user: 'User',
  airports: 'Airports',
  country: 'Country',
  supervisor: 'Supervisor',
  administrator: 'Administrator',
  businessOwner: 'Business Owner',
  ShellList: 'ShellList',
  PrefixList: 'PrefixList',
  AircraftTypes: 'AircraftTypes',
  exportName: 'Export As Excel',
  AircraftApi: '/AircraftType',
  FuturaMedium: 'Futura-Medium',
  FuturaBook: 'Futura-Book',
  UserHideRoleClass: '.MuiAutocomplete-fullWidth',
  sessionTimeout: {
    beforeSeconds: 240 * 1000,
    afterSeconds: 60 * 1000,
    timeout: 1,
    idleTimeMinutes: 60,
    timeInterval: 30000,
  },
  tokenRefresh: {
    minutesCount: 1800000,
    beforeSeconds: 60 * 90 * 1000,
  },

  RoleModifyMessage:
    'You cannot deactivate yourself. Please contact Administrator or Business Owner to complete this task',

  errorHandler: {
    statusCode401: {
      header: '',
      message: ErrorMsg401(),
    },

    statusCode404: {
      header: 'Internal Error',
      message: 'Something went wrong. Please contact support at DS-schedulerelease@shell.com to fix this.',
    },

    statusCode500: {
      header: '',
      message: ErrorMsg500(),
    },
  },
};
