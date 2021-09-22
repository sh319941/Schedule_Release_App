import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import policyControl from '../../redux/PolicyControl';
import CountryComponent from './CountryComponent';
import countries from '../../redux/countries';

const { getCountries, insertCountry, updateCountry } = countries.actions;

const mapStateToProps = (state) => ({
  userDetails: state[policyControl.name].userDetails,
  countries: state[countries.name].countries,
  countryListLoaded: state[countries.name].countryListLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      getCountries,
      insertCountry,
      updateCountry,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(CountryComponent);
