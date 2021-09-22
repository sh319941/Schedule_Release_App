import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import policyControl from '../../redux/PolicyControl';
import Terms from './Terms';

const mapStateToProps = (state) => ({
  userDetails: state[policyControl.name].userDetails,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({}, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Terms);
