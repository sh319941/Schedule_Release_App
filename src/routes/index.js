import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Constants from '../constants';
import Users from '../component/users';
import Site from '../component/sites';
import Airports from '../component/airports';
import Countries from '../component/countries';
import ScheduleCheck from '../component/scheduleCheck';
import BulkCheck from '../component/bulkCheck';
import ReportScreen from '../component/reports';
import ShellListScreen from '../component/shellList';
import PrefixScreen from '../component/prefixList';
import Login from '../component/Login/Login';
import { history } from './history';
import { PrivateRoute } from './PrivateRoute';
import AircraftTypes from '../component/aircraftTypes';
import { getToken as loggedIn } from '../utils';

const Routes = () => {
  const isLoggedIn = loggedIn();

  return (
    <Router history={history}>
      <Switch>
        {isLoggedIn ? <PrivateRoute exact path="/" component={Login} /> : <Route exact path="/" component={Login} />}
        <PrivateRoute exact path="/User" component={Users} />
        <PrivateRoute exact path={`/${Constants.site}`} component={Site} />
        <PrivateRoute exact path="/ScheduleCheck" component={ScheduleCheck} />
        <PrivateRoute exact path="/Country" component={Countries} />
        <PrivateRoute exact path="/Airports" component={Airports} />
        <PrivateRoute exact path="/Report" component={ReportScreen} />
        <PrivateRoute exact path="/BulkCheck" component={BulkCheck} />
        <PrivateRoute exact path="/ShellList" component={ShellListScreen} />
        <PrivateRoute exact path="/PrefixList" component={PrefixScreen} />
        <PrivateRoute exact path="/AircraftTypes" component={AircraftTypes} />
      </Switch>
    </Router>
  );
};

export default Routes;
