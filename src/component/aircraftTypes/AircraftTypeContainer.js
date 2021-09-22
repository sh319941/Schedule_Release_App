import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import policyControl from '../../redux/PolicyControl';
import AircraftTypeComponent from './AircraftTypeComponent';
import aircraftTypes from '../../redux/aircraftTypes';

const { getAircraftTypes, insertAircraft, updateAircraft } = aircraftTypes.actions;

const mapStateToProps = (state) => ({
  userDetails: state[policyControl.name].userDetails,
  aircraftTypes: state[aircraftTypes.name].aircraftTypes,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      getAircraftTypes,
      insertAircraft,
      updateAircraft,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(AircraftTypeComponent);
