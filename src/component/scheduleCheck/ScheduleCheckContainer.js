import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import scheduleCheck from '../../redux/scheduleCheck';
import policyControl from '../../redux/PolicyControl';
import users from '../../redux/users';
import ScheduleCheckComponent from './ScheduleCheckComponent';

const { getAirports, getairportTypeList, getSingleCheck } = scheduleCheck.actions;
const { updateLastLoggedIn } = users.actions;
const { getUserDetails } = policyControl.actions;

const mapStateToProps = (state) => ({
  userDetails: state[policyControl.name].userDetails,
  airportList: state[scheduleCheck.name].getAirports,
  airportTypeList: state[scheduleCheck.name].getairportTypeList,
  airportListLoaded: state[scheduleCheck.name].airportListLoaded,
  aircraftListLoaded: state[scheduleCheck.name].aircraftListLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      getAirports,
      getairportTypeList,
      getUserDetails,
      getSingleCheck,
      updateLastLoggedIn,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleCheckComponent);
