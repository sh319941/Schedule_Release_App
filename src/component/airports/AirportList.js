import React, { useState, useRef } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Snackbar from '@material-ui/core/Snackbar';
import PropTypes from 'prop-types';
import GridTable from '../common/GridTable';
import Alert from '../common/Utilities/Alert';
import update from '../../assets/images/aircraft.png';
import { alphaNumeric, ToUpperCaseLetter } from '../common/Utilities/AlphaNumeric';
import { msgData } from './AirportMessage';
import { useStyles } from '../../assets/js/common';

const AirportList = (parentprops) => {
  const { actions, userDetails: userData, countryDetails } = parentprops;
  const classes = useStyles();
  const token = localStorage.getItem('access_token');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();
  const [serverity, setServerity] = useState();
  const iataCode = useRef();
  const icaoCode = useRef();
  const countryCode = useRef();
  const airportName = useRef();
  const countryFocus = useRef();
  const { getAirports, insertAirports, updateAirports } = actions;
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const validate = (check, method) => {
    if (check.iataCode.length !== 3) {
      iataCode.current.focus();
      setError('Please enter valid IATA Code.');
      setOpen(true);
      setServerity('error');
      return false;
    }
    if (check.icaoCode.length !== 4) {
      icaoCode.current.focus();
      setError('Please enter valid ICAO Code.');
      setOpen(true);
      setServerity('error');
      return false;
    }
    if (check.airportName === '') {
      airportName.current.focus();
      setError('Please enter Airport Name.');
      setOpen(true);
      setServerity('error');
      return false;
    }
    if (check.countryCode === '') {
      countryFocus.current.focus();
      setError('Please select Country.');
      setOpen(true);
      setServerity('error');
      return false;
    }
    return true;
  };
  const addNewUser = async (param, method) => {
    let msg = '';
    let reponse = '';
    if (method === 'add') {
      const addData = {};
      if (userData != null) {
        addData.createdBy = userData.userId;
      }
      addData.iataCode = iataCode.current.value;
      addData.countryCode = countryCode.current.value;
      addData.icaoCode = icaoCode.current.value;
      addData.airportName = airportName.current.value;
      const rsvalidate = await validate(addData, 'add');
      if (rsvalidate === false) {
        return false;
      }
      reponse = await insertAirports(token, addData);
      msg = 'Airport created successfully';
    } else if (method === 'edit' || method === 'editValidate') {
      const editData = {};
      if (userData != null) {
        editData.modifiedBy = userData.userId;
      }
      editData.id = param.id;
      editData.iataCode = iataCode.current.value;
      editData.countryCode = countryCode.current.value;
      editData.icaoCode = icaoCode.current.value;
      editData.airportName = airportName.current.value;
      if (document.getElementById('status').innerHTML === 'Active') {
        editData.active = true;
      } else {
        editData.active = false;
      }
      const rsvalidate = await validate(editData, 'edit');
      if (rsvalidate === false) {
        return false;
      }
      if (method !== 'editValidate') {
        reponse = await updateAirports(token, editData);
        msg = 'Airport details updated successfully.';
      }
    } else if (method === 'deactivate') {
      const deactivateairport = {};
      Object.assign(deactivateairport, param);
      deactivateairport.active = false;
      if (userData != null) {
        deactivateairport.modifiedBy = userData.userId;
      }
      reponse = await updateAirports(token, deactivateairport);
      msg = 'Airport deactivated successfully.';
    } else if (method === 'activate') {
      const activateairport = {};
      Object.assign(activateairport, param);
      activateairport.active = true;
      if (userData != null) {
        activateairport.modifiedBy = userData.userId;
      }
      reponse = await updateAirports(token, activateairport);
      msg = 'Airport activated successfully.';
    }
    if (reponse.status === 201 || reponse.status === 204) {
      setError(msg);
      setOpen(true);
      setServerity('success');
      getAirports(token);
      return true;
    }
    if (reponse.status === 400) {
      return false;
    }
    return true;
  };
  const [columns, setColumns] = useState([
    {
      title: 'IATA Code',
      field: 'iataCode',
      width: '30%',
      editComponent: (props) => (
        <TextField
          label=""
          inputProps={{ maxLength: 3 }}
          onInput={(e) => ToUpperCaseLetter(e)}
          inputRef={iataCode}
          id="iataCode"
          autoComplete="off"
          defaultValue={props.value ? props.value : ''}
        />
      ),
    },
    {
      title: 'ICAO Code',
      field: 'icaoCode',
      width: '30%',
      editComponent: (props) => (
        <TextField
          label=""
          inputProps={{ maxLength: 4 }}
          onInput={(e) => ToUpperCaseLetter(e)}
          inputRef={icaoCode}
          id="icaoCode"
          autoComplete="off"
          defaultValue={props.value ? props.value : ''}
        />
      ),
    },
    {
      title: 'Airport Name',
      field: 'airportName',
      width: '30%',
      editComponent: (props) => (
        <TextField
          label=""
          onKeyPress={(e) => alphaNumeric(e)}
          inputProps={{ maxLength: 30 }}
          inputRef={airportName}
          id="airportName"
          autoComplete="off"
          defaultValue={props.value ? props.value : ''}
        />
      ),
    },
    {
      title: 'Country',
      width: '50%',
      field: 'countryName',
      editComponent: (props) => (
        <Autocomplete
          id="countryId"
          options={countryDetails.map((option) => option.countryName)}
          defaultValue={props.value ? props.value : ''}
          onChange={(event, newValue) => {
            if (newValue !== null) {
              const countryData = countryDetails.find((val) => val.countryName === newValue);
              const data = { ...props.rowData };
              data.countryCode = countryData.countryCode;
              data.embargoType = countryData.embargoType;
              props.onRowDataChange(data);
            } else {
              const data = { ...props.rowData };
              data.countryCode = '';
              data.embargoType = '';
              props.onRowDataChange(data);
            }
          }}
          renderInput={(params) => (
            <TextField id="countryId" label="" inputRef={countryFocus} value={props.value} {...params} />
          )}
        />
      ),
    },
    {
      title: 'Country Code',
      field: 'countryCode',
      width: '10%',
      editComponent: (props) => (
        <div>
          {props.value}
          <TextField type="hidden" inputRef={countryCode} value={props.value} />
        </div>
      ),
    },
    {
      title: 'Embargo Type',
      field: 'embargoType',
      width: '10%',
      editComponent: (props) => <div>{props.value}</div>,
    },
    {
      title: 'Status',
      width: '10%',
      field: 'active',
      editComponent: (props) => {
        let active = props.value;
        if (props.value === undefined) {
          active = true;
        }
        return (
          <Select
            labelId="status-select-label"
            id="status"
            name="active"
            label="Status"
            defaultValue={active}
            fullWidth
            className="Select"
          >
            <MenuItem className="Select" key="1" value>
              Active
            </MenuItem>
            <MenuItem className="Select" key="2" value={false}>
              Inactive
            </MenuItem>
          </Select>
        );
      },
      render: (rowData) =>
        rowData.active === true ? (
          <p className={classes.activeClass}>Active</p>
        ) : (
          <p className={classes.inActiveClass}>Inactive</p>
        ),
    },
  ]);
  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={serverity}>
          {error}
        </Alert>
      </Snackbar>
      <GridTable
        columns={columns}
        addNewUser={addNewUser}
        list={parentprops.airportDetails}
        message={msgData}
        title="Airport"
        updateIcon={update}
      />
    </div>
  );
};

AirportList.propTypes = {
  actions: PropTypes.object,
  countryDetails: PropTypes.array,
  userDetails: PropTypes.object.isRequired,
};
export default AirportList;
