import React, { useState, useRef } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Snackbar from '@material-ui/core/Snackbar';
import GridTable from '../common/GridTable';
import Alert from '../common/Utilities/Alert';
import update from '../../assets/images/aircraft.png';
import {
  alphaNumericwithoutsapce as alphaNumeric,
  restrictNumber,
  ToUpperCaseLetter,
} from '../common/Utilities/AlphaNumeric';
import { msgData } from './PrefixMessage';
import { useStyles } from '../../assets/js/common';

const PrefixList = (prefixProps) => {
  const classes = useStyles();
  const token = localStorage.getItem('access_token');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();
  const [serverity, setServerity] = useState();
  const registrationPrefix = useRef();
  const fromRange = useRef();
  const toRange = useRef();
  const embargoType = useRef();
  const gecHRCNexus = useRef();
  const { userInfo, actions } = prefixProps;
  const { insertPrefix, updatePrefix, getPrefixList } = actions;
  const userData = userInfo;
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const validate = (check, method) => {
    if (check.registrationPrefix === '') {
      registrationPrefix.current.focus();
      setError('Please enter Aircraft Registration Number.');
      setOpen(true);
      setServerity('error');
      return false;
    }
    if (check.countryCode === '') {
      gecHRCNexus.current.focus();
      setError('Please select Country Code.');
      setOpen(true);
      setServerity('error');
      return false;
    }
    if (
      check.fromRange >= check.toRange ||
      (Number.isNaN(check.fromRange) && !Number.isNaN(check.toRange)) ||
      (!Number.isNaN(check.fromRange) && Number.isNaN(check.toRange))
    ) {
      toRange.current.focus();
      setError('To Range should be greater than From Range.');
      setOpen(true);
      setServerity('error');
      return false;
    }
    if (check.embargoType === '') {
      embargoType.current.focus();
      setError('Please select Embargo Type.');
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
      let selectedCountrycode = '';
      if (gecHRCNexus.current.value) {
        const selectedCountry = prefixProps.countries.find((val) => val.countryName === gecHRCNexus.current.value);
        selectedCountrycode = selectedCountry.countryCode;
      }
      const addData = {};
      if (userData != null) {
        addData.registrationPrefix = registrationPrefix.current.value;
        addData.fromRange = parseInt(fromRange.current.value, 10);
        addData.toRange = parseInt(toRange.current.value, 10);
        addData.embargoType = embargoType.current.value;
        addData.countryCode = selectedCountrycode;
        addData.createdBy = userData.userId;
      }
      const rsvalidate = await validate(addData, 'add');
      if (rsvalidate === false) {
        return false;
      }
      reponse = await insertPrefix(token, addData);
      msg = 'Aircraft Registration Prefix created successfully.';
    } else if (method === 'edit' || method === 'editValidate') {
      let selectedCountrycode = '';
      if (gecHRCNexus.current.value) {
        const selectedCountry = prefixProps.countries.find((val) => val.countryName === gecHRCNexus.current.value);
        selectedCountrycode = selectedCountry.countryCode;
      }
      const editData = {};
      if (userData != null) {
        editData.modifiedBy = userData.userId;
      }

      editData.id = param.id;
      editData.registrationPrefix = registrationPrefix.current.value;
      editData.fromRange = parseInt(fromRange.current.value, 10);
      editData.toRange = parseInt(toRange.current.value, 10);
      editData.embargoType = embargoType.current.value;
      editData.countryCode = selectedCountrycode;
      editData.createdBy = userData.userId;
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
        reponse = await updatePrefix(token, editData);
        msg = 'Aircraft Registration Prefix updated successfully.';
      }
    } else if (method === 'deactivate') {
      if (userData != null) {
        param.modifiedBy = userData.userId;
      }
      const deactivatedata = {};
      Object.assign(deactivatedata, param);
      deactivatedata.active = false;
      reponse = await updatePrefix(token, deactivatedata);
      msg = 'Aircraft Registration Prefix deactivated successfully.';
    } else if (method === 'activate') {
      if (userData != null) {
        param.modifiedBy = userData.userId;
      }

      const activatedata = {};
      Object.assign(activatedata, param);
      activatedata.active = true;
      reponse = await updatePrefix(token, activatedata);
      msg = 'Aircraft Registration Prefix activated successfully.';
    }
    if (reponse.status === 201 || reponse.status === 204) {
      setError(msg);
      setOpen(true);
      setServerity('success');
      getPrefixList(token);
      return true;
    }
    if (reponse.status === 400) {
      return false;
    }
    return true;
  };

  const [columns, setColumns] = useState([
    {
      title: 'Registration Prefix',
      field: 'registrationPrefix',
      width: '30%',
      editComponent: (props) => (
        <TextField
          onKeyPress={(e) => alphaNumeric(e)}
          inputProps={{ maxLength: 5 }}
          inputRef={registrationPrefix}
          onInput={(e) => ToUpperCaseLetter(e)}
          autoComplete="off"
          id="registrationPrefix"
          defaultValue={props.value ? props.value : ''}
        />
      ),
    },
    {
      title: 'GEC / HRC Nexus',
      field: 'countryName',
      width: '100%',
      editComponent: (props) => {
        let selectedCountrydrop = '';
        if (props.value !== undefined) {
          selectedCountrydrop = prefixProps.countries.find((val) => val.countryName === props.value);
        }
        return (
          <Autocomplete
            id="gecHRCNexus"
            options={prefixProps.countries}
            getOptionLabel={(option) => option.countryName}
            defaultValue={selectedCountrydrop}
            renderInput={(params) => (
              <TextField id="gecHRCNexus" inputRef={gecHRCNexus} value={props.value} {...params} />
            )}
          />
        );
      },
    },
    {
      title: 'From Range',
      field: 'fromRange',
      width: '30%',
      editComponent: (props) => (
        <TextField
          inputProps={{ maxLength: 6 }}
          onKeyPress={(e) => restrictNumber(e)}
          type="number"
          inputRef={fromRange}
          autoComplete="off"
          id="fromRange"
          defaultValue={props.value ? props.value : ''}
        />
      ),
    },
    {
      title: 'To Range',
      field: 'toRange',
      width: '30%',
      editComponent: (props) => (
        <TextField
          inputProps={{ maxLength: 6 }}
          onKeyPress={(e) => restrictNumber(e)}
          type="number"
          inputRef={toRange}
          autoComplete="off"
          id="toRange"
          defaultValue={props.value ? props.value : ''}
        />
      ),
    },
    {
      title: 'Embargo Type',
      field: 'embargoType',
      width: '10%',
      editComponent: (props) => {
        const embargoTypeList = [{ name: 'GEC' }, { name: 'HRC' }];
        return (
          <Autocomplete
            id="embargoType"
            options={embargoTypeList.map((option) => option.name)}
            defaultValue={props.value ? props.value : ''}
            renderInput={(params) => (
              <TextField id="embargoType" inputRef={embargoType} value={props.value} {...params} />
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
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={serverity}>
          {error}
        </Alert>
      </Snackbar>
      <GridTable
        columns={columns}
        addNewUser={addNewUser}
        list={prefixProps.prefixList}
        message={msgData}
        title="Registration Prefix"
        updateIcon={update}
      />
    </>
  );
};

export default PrefixList;
