import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import policyControl from '../../redux/PolicyControl';
import users from '../../redux/users';
import UsersComponent from './UsersComponent';

const { getRoles, getUsers, updateLastLoggedIn, insertUsers, updateUsers, getSites } = users.actions;

const mapStateToProps = (state) => ({
  userDetails: state[policyControl.name].userDetails,
  roles: state[users.name].roles,
  users: state[users.name].users,
  userListLoaded: state[users.name].userListLoaded,
  roleListLoaded: state[users.name].roleListLoaded,
  siteListLoaded: state[users.name].siteListLoaded,
  sitesList: state[users.name].sites,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      getRoles,
      getSites,
      getUsers,
      updateLastLoggedIn,
      insertUsers,
      updateUsers,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersComponent);
