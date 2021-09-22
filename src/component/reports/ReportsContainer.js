import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import policyControl from '../../redux/PolicyControl';
import ReportsComponent from './ReportsComponent';
import report from '../../redux/report';

const mapStateToProps = (state) => ({
  userDetails: state[policyControl.name].userDetails,
  sitesList: state[report.name].sitesList,
});
const { getSites, getReport } = report.actions;
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      getSites,
      getReport,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportsComponent);
