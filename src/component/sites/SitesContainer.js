import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import policyControl from '../../redux/PolicyControl';
import sites from '../../redux/sites';
import SitesComponent from './SitesComponent';

const { getSites, updateSites, insertSites, getAirports } = sites.actions;

function getFilterSites(data) {
  const siteList = [];
  data.map((val) => {
    const allSites = {
      siteName: val.siteName,
      airportId: val.airportId,
      airportName: `${val.airport}, ${val.country}`,
      siteId: val.siteId,
      operatingCompany: val.operatingCompany,
      active: val.active,
    };
    siteList.push(allSites);
  });
  return siteList;
}

function mapStateToProps(state) {
  return {
    userDetails: state[policyControl.name].userDetails,
    sitesList: getFilterSites(state[sites.name].sites),
    airportsLists: state[sites.name].airportsList,
    airportListLoaded: state[sites.name].airportListLoaded,
    siteListLoaded: state[sites.name].siteListLoaded,
    airportsList: state[sites.name].airports,
    siteUpdated: state[sites.name].siteUpdated,
  };
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      getSites,
      getAirports,
      updateSites,
      insertSites,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(SitesComponent);
