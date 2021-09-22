import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import policyControl from '../../redux/PolicyControl';
import PrefixListComponent from './PrefixListComponent';
import countries from '../../redux/countries';
import prefixList from '../../redux/prefixList';

const { getCountries } = countries.actions;
const { getPrefixList, insertPrefix, updatePrefix } = prefixList.actions;

const mapStateToProps = (state) => ({
  userDetails: state[policyControl.name].userDetails,
  countries: state[countries.name].countries,
  prefixList: state[prefixList.name].prefixList,
  countryLoaded: state[countries.name].countries,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      getCountries,
      getPrefixList,
      insertPrefix,
      updatePrefix,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrefixListComponent);
