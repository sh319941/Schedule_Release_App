import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import policyControl from '../../redux/PolicyControl';
import BulkCheckComponent from './BulkCheckComponent';
import bulkCheck from '../../redux/bulkCheck';
import scheduleCheck from '../../redux/scheduleCheck';

const { getBulkCheck } = bulkCheck.actions;
const { getairportTypeList } = scheduleCheck.actions;
const mapStateToProps = (state) => ({
  userDetails: state[policyControl.name].userDetails,
  airportTypeList: state[scheduleCheck.name].getairportTypeList,
  aircraftListLoaded: state[scheduleCheck.name].aircraftListLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ getBulkCheck, getairportTypeList }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BulkCheckComponent);
