import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import shellList from '../../redux/shellList';
import countries from '../../redux/countries';
import policyControl from '../../redux/PolicyControl';
import ShellListComponent from './ShellListComponent';

const { getShellList, insertShellReg, updateShellReg } = shellList.actions;
const { getCountries } = countries.actions;

const mapStateToProps = (state) => ({
  userDetails: state[policyControl.name].userDetails,
  shellList: state[shellList.name].shellList,
  countries: state[countries.name].countries,
  countryLoaded: state[countries.name].countries,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      getShellList,
      getCountries,
      insertShellReg,
      updateShellReg,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShellListComponent);
