import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import policyControl from '../../redux/PolicyControl';
import AirportsComponent from './AirportsComponent';
import airports from '../../redux/airports';
import sites from '../../redux/sites';

const { getAirports, getCountries, insertAirports, updateAirports } = airports.actions;
const { getSites } = sites.actions;
const mapStateToProps = (state) => ({
  userDetails: state[policyControl.name].userDetails,
  airports: state[airports.name].airports,
  countries: state[airports.name].countries,
  sites: state[sites.name].sites,
  countryListLoaded: state[airports.name].countryListLoaded,
  airportListLoaded: state[airports.name].airportListLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      getAirports,
      getCountries,
      getSites,
      insertAirports,
      updateAirports,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(AirportsComponent);
