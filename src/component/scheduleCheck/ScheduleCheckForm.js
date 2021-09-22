import React, { useState, useRef } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { alphaNumericwithoutsapce as alphaNumeric } from '../common/Utilities/AlphaNumeric';
import { useStyles } from './ScheduleCheckStyles';
import activate from '../../assets/images/sidebarImage/activate.png';
import deactivate from '../../assets/images/sidebarImage/deactivate.png';
import refueling from '../../assets/images/sidebarImage/refueling.png';
import { getToken } from '../../utils';
import ScheduleCheckData from './ScheduleCheckData';
import SchedulecheckButton from './SchedulecheckButton';

const ScheduleCheckForm = (props) => {
  const [origin, setOrgin] = useState(null);
  const [desigination, setDesigination] = useState(null);
  const [finalDesigination, setFinalDesigination] = useState(null);
  const [aircraftReg, setAircraftReg] = useState('');
  const [aircraftType, setAircraftType] = useState(null);
  const finalDesFocus = useRef();
  const regNumFocus = useRef();
  const aircraftTypeFocus = useRef();
  const orginFocus = useRef();
  const nextDesFocus = useRef();
  const [highlight, setHighlight] = useState([]);
  const [action, setAction] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const token = getToken();
  const { airportList, airportTypeList, actions, userData, handleOpen } = props;
  const { getSingleCheck } = actions;
  const classes = useStyles();
  const handleChange = (value) => {
    setAircraftReg(value);
  };
  const validate = async () => {
    if (finalDesigination === null) {
      finalDesFocus.current.focus();
      handleOpen('Please select Final Destination.');
      return false;
    }
    if (aircraftReg === '') {
      regNumFocus.current.focus();
      handleOpen('Please enter Aircraft Registration Number.');
      return false;
    }
    if (aircraftType === null) {
      aircraftTypeFocus.current.focus();
      handleOpen('Please select Aircraft Type.');
      return false;
    }
    let orgAirport = '';
    if (origin !== null) {
      orgAirport = origin.iataCode;
    }
    let desiginationAirport = '';
    if (desigination !== null) {
      desiginationAirport = desigination.iataCode;
    }
    const inputdata = {
      userId: userData.userId,
      flightDetails: {
        orgAirport,
        interimDestAirport: desiginationAirport,
        destAirport: finalDesigination.iataCode,
        aircraftRegNumber: aircraftReg,
        aircraftTypeId: aircraftType.aircraftTypeId,
      },
    };
    await getSingleCheck(token, inputdata).then((res) => {
      if (res !== undefined) {
        if (res.status === 200) {
          const msgdata = res.data.action;
          const selectedData = [];
          Object.keys(res.data).filter((k) => res.data[k] === 1 && selectedData.push(k));
          setHighlight(selectedData);
          setAction(msgdata);
          if (msgdata === 'Refuelling Approved') {
            setImage(<img src={activate} alt="Refuelling Approved" />);
          }
          if (msgdata === 'Refuelling Rejected') {
            setImage(<img src={deactivate} alt="Refuelling Rejected" />);
          }
          if (msgdata === 'Ask for Verification') {
            setImage(<img src={refueling} alt="Ask for Verification" />);
          }
          let resmsg = res.data.message;
          if (resmsg === 'N/A') {
            resmsg = '';
          }
          setMessage(resmsg);
        }
      }
    });
    return true;
  };

  const onCancel = () => {
    setOrgin(null);
    setAircraftReg('');
    setFinalDesigination(null);
    setDesigination(null);
    setAircraftType(null);
    setMessage('');
    setImage('');
    setAction('');
    setHighlight([]);
  };
  return (
    <>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={6} sm={6} md={6}>
          <Grid container direction="column" spacing={0} justify="center" alignItems="center">
            <Grid item>
              <Grid container spacing={3} direction="row" justify="center" alignItems="center">
                <Grid item xs={10}>
                  <Autocomplete
                    id="airport"
                    options={airportList}
                    getOptionLabel={(option) =>
                      `${option.iataCode}/${
                        option.icaoCode
                      }, ${option.airportName.trim()} (${option.countryName.trim()})`
                    }
                    value={origin}
                    onChange={(event, newValue) => {
                      setOrgin(null);
                      if (newValue !== '' && newValue !== null) {
                        setOrgin(newValue);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField id="orgAirport" inputRef={orginFocus} label="Origin (IATA/ICAO/Airport)" {...params} />
                    )}
                  />
                </Grid>
                <Grid item xs={10}>
                  <Autocomplete
                    id="airport"
                    options={airportList}
                    getOptionLabel={(option) =>
                      `${option.iataCode}/${
                        option.icaoCode
                      }, ${option.airportName.trim()} (${option.countryName.trim()})`
                    }
                    value={desigination}
                    onChange={(event, newValue) => {
                      setDesigination(null);
                      if (newValue !== '' && newValue !== null) {
                        setDesigination(newValue);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        id="interimDestAirport"
                        inputRef={nextDesFocus}
                        className={highlight.includes('intDestHighlight') && classes.rootLabel}
                        label="Next Destination (IATA/ICAO/Airport) "
                        {...params}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={10}>
                  <Autocomplete
                    id="airport"
                    options={airportList}
                    getOptionLabel={(option) =>
                      `${option.iataCode}/${
                        option.icaoCode
                      }, ${option.airportName.trim()} (${option.countryName.trim()})`
                    }
                    value={finalDesigination}
                    onChange={(event, newValue) => {
                      setFinalDesigination(null);
                      if (newValue !== '' && newValue !== null) {
                        setFinalDesigination(newValue);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        required
                        id="destAirport"
                        inputRef={finalDesFocus}
                        className={highlight.includes('finalDestHighlight') && classes.rootLabel}
                        label="Final Destination (IATA/ICAO/Airport)"
                        {...params}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    required
                    inputRef={regNumFocus}
                    label="Aircraft Registration Number"
                    placeholder="Do not enter any dashes or space. Eg: AB123"
                    value={aircraftReg}
                    onKeyPress={(e) => alphaNumeric(e)}
                    inputProps={{ maxLength: 10 }}
                    autoComplete="off"
                    className={highlight.includes('aircraftRegNumberHighlight') && classes.rootLabel}
                    fullWidth
                    onChange={(e) => handleChange(e.target.value)}
                  />
                </Grid>
                <Grid item xs={10}>
                  <Autocomplete
                    id="airport"
                    options={airportTypeList.filter((listtype) => listtype.active === true)}
                    getOptionLabel={(option) => {
                      if (option.aircraftTypeName !== '') {
                        return `${option.aircraftTypeId}, ${option.aircraftTypeName}`;
                      }
                      return option.aircraftTypeId;
                    }}
                    value={aircraftType}
                    onChange={(event, newValue) => {
                      setAircraftType(null);
                      if (newValue !== '' && newValue !== null) {
                        setAircraftType(newValue);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        required
                        id="aircraftTypeId"
                        name="aircraftTypeId"
                        inputRef={aircraftTypeFocus}
                        label="Aircraft Type"
                        className={highlight.includes('aircraftTypeIdHighlight') && classes.rootLabel}
                        {...params}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} sm={6} md={6}>
          <ScheduleCheckData image={image} action={action} message={message} />
        </Grid>
      </Grid>
      <Grid item className={classes.btnPadding}>
        <SchedulecheckButton onCancel={onCancel} validate={validate} />
      </Grid>
    </>
  );
};
ScheduleCheckForm.propTypes = {
  airportList: PropTypes.array,
  airportTypeList: PropTypes.array,
  actions: PropTypes.object,
  userData: PropTypes.object,
  handleOpen: PropTypes.func,
};
export default ScheduleCheckForm;
