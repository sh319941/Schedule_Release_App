import React, { useState, useRef } from 'react';
import { TextField, Snackbar, Select, MenuItem } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import GridTable from '../common/GridTable';
import Alert from '../common/Utilities/Alert';
import update from '../../assets/images/aircraft.png';
import { alphaNumericwithoutsapce as alphaNumeric, ToUpperCaseLetter } from '../common/Utilities/AlphaNumeric';
import { msgData } from './AircraftMessage';
import { useStyles } from '../../assets/js/common';

const AircraftTypesList = (props) => {
  const classes = useStyles();
  const aircraftType = useRef();
  const aircraftTypeName = useRef();
  const aircraftConfig = useRef();
  const activeref = useRef();
  const iataCode = useRef();
  const icaoCode = useRef();
  const { userInfo, aircraftTypes, actions } = props;
  const { getAircraftTypes, insertAircraft, updateAircraft } = actions;
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const userData = userInfo;
  const token = localStorage.getItem('access_token');
  const [error, setError] = useState();
  const [serverity, setServerity] = useState();
  const validate = (check) => {
    if (check.aircraftTypeId === '') {
      aircraftType.current.focus();
      setError('Please enter Aircraft Type.');
      setOpen(true);
      setServerity('error');
      return false;
    }
    if (check.aircraftConfig === '') {
      aircraftConfig.current.focus();
      setError('Please select Aircraft Configuration.');
      setOpen(true);
      setServerity('error');
      return false;
    }
    return true;
  };

  let reponse = '';
  const addNewUser = async (param, method) => {
    let msg = '';
    if (method === 'add') {
      const addData = {};
      if (userData != null) {
        addData.createdBy = userData.userId;
      }
      addData.aircraftTypeId = aircraftType.current.value;
      addData.aircraftTypeName = aircraftTypeName.current.value;
      addData.aircraftConfig = aircraftConfig.current.value;
      addData.aircraftTypeIATA = iataCode.current.value;
      addData.aircraftTypeICAO = icaoCode.current.value;
      addData.active = activeref.current.value;
      const rsvalidate = await validate(addData);
      if (rsvalidate === false) {
        return false;
      }
      reponse = await insertAircraft(token, addData);
      msg = 'Aircraft Type created successfully.';
    } else if (method === 'edit' || method === 'editValidate') {
      const editData = {};
      if (userData != null) {
        editData.modifiedBy = userData.userId;
      }
      editData.id = param.id;
      editData.aircraftTypeId = aircraftType.current.value;
      editData.aircraftTypeName = aircraftTypeName.current.value;
      editData.aircraftConfig = aircraftConfig.current.value;
      editData.active = activeref.current.value;
      editData.aircraftTypeIATA = iataCode.current.value;
      editData.aircraftTypeICAO = icaoCode.current.value;
      const rsvalidate = await validate(editData);
      if (rsvalidate === false) {
        return false;
      }
      if (method !== 'editValidate') {
        reponse = await updateAircraft(token, editData);
        msg = 'Aircraft Type updated successfully.';
      }
    } else if (method === 'deactivate') {
      const deactivateaircraft = {};
      Object.assign(deactivateaircraft, param);
      deactivateaircraft.active = false;
      if (userData != null) {
        deactivateaircraft.modifiedBy = userData.userId;
      }
      reponse = await updateAircraft(token, deactivateaircraft);
      msg = 'Aircraft Type deactivated successfully.';
    } else if (method === 'activate') {
      const activateaircraft = {};
      Object.assign(activateaircraft, param);
      activateaircraft.active = true;
      if (userData != null) {
        activateaircraft.modifiedBy = userData.userId;
      }
      reponse = await updateAircraft(token, activateaircraft);
      msg = 'Aircraft Type activated successfully.';
    }
    if (reponse.status === 201 || reponse.status === 204) {
      setError(msg);
      setOpen(true);
      setServerity('success');
      getAircraftTypes(token);
      return true;
    }
    if (reponse.status === 400) {
      return false;
    }
    return true;
  };
  const [columns, setColumns] = useState([
    {
      title: 'Aircraft Type',
      field: 'aircraftTypeId',
      width: '30%',
      editComponent: (props) => (
        <TextField
          onKeyPress={(e) => alphaNumeric(e)}
          inputProps={{ maxLength: 15 }}
          onInput={(e) => ToUpperCaseLetter(e)}
          inputRef={aircraftType}
          autoComplete="off"
          defaultValue={props.value ? props.value : ''}
        />
      ),
    },
    {
      title: 'Aircraft Type IATA',
      field: 'aircraftTypeIATA',
      width: '30%',
      editComponent: (props) => (
        <TextField
          onKeyPress={(e) => {
            alphaNumeric(e);
          }}
          inputProps={{ maxLength: 15 }}
          onInput={(e) => ToUpperCaseLetter(e)}
          inputRef={iataCode}
          id="iataCode"
          autoComplete="off"
          defaultValue={props.value ? props.value : ''}
        />
      ),
    },
    {
      title: 'Aircraft Type ICAO',
      field: 'aircraftTypeICAO',
      width: '30%',
      editComponent: (props) => (
        <TextField
          onKeyPress={(e) => alphaNumeric(e)}
          onInput={(e) => ToUpperCaseLetter(e)}
          inputProps={{ maxLength: 15 }}
          inputRef={icaoCode}
          id="icaoCode"
          autoComplete="off"
          defaultValue={props.value ? props.value : ''}
        />
      ),
    },
    {
      title: 'Aircraft Type Name',
      field: 'aircraftTypeName',
      width: '30%',
      editComponent: (props) => (
        <TextField
          inputProps={{ maxLength: 99 }}
          autoComplete="off"
          inputRef={aircraftTypeName}
          defaultValue={props.value ? props.value : ''}
        />
      ),
    },
    {
      title: 'Aircraft Configuration',
      width: '40%',
      field: 'aircraftConfig',
      editComponent: (props) => {
        const aircraftConfigList = [{ name: 'Commercial' }, { name: 'GA' }];
        return (
          <Autocomplete
            options={aircraftConfigList.map((option) => option.name)}
            defaultValue={props.value ? props.value : ''}
            renderInput={(params) => (
              <TextField id="aircraftConfig" inputRef={aircraftConfig} label="" value={props.value} {...params} />
            )}
          />
        );
      },
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
          <Select defaultValue={active} fullWidth className="Select" inputRef={activeref}>
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
        list={aircraftTypes}
        error={error}
        title="Aircraft Type"
        message={msgData}
        updateIcon={update}
      />
    </div>
  );
};
AircraftTypesList.propTypes = {
  actions: PropTypes.object,
  aircraftTypes: PropTypes.array,
  userInfo: PropTypes.object.isRequired,
};
export default AircraftTypesList;
