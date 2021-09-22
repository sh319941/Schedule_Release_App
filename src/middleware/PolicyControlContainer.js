import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import getUserPermissions from './Permissions';
import PolicyControl from '../redux/PolicyControl';
import PolicyControlComponent from './PolicyControl';

const { getUserDetails } = PolicyControl.actions;

const mapStateToProps = (state) => {
  const { role } = state[PolicyControl.name].userDetails;
  if (role) {
    return {
      userPermissions: getUserPermissions(role.roleName),
    };
  }
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      getUserDetails,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(PolicyControlComponent);
