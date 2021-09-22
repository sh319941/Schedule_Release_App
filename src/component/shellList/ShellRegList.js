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
import { alphaNumericwithoutsapce as alphaNumeric, ToUpperCaseLetter } from '../common/Utilities/AlphaNumeric';
import { getToken } from '../../utils';
import { msgData } from './ShellListMessage';
import { useStyles } from '../../assets/js/common';

const ShellRegList = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();
  const [serverity, setServerity] = useState();
  const registration = useRef();
  const company = useRef();
  const embargoType = useRef();
  const gecHRCNexus = useRef();
  const token = getToken();

  const { countries, shellList, userData, actions } = props;
  const { insertShellReg, updateShellReg, getShellList } = actions;
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const validate = (check, method) => {
    if (check.registration === '') {
      registration.current.focus();
      setError('Please enter Aircraft Registration Number.');
      setOpen(true);
      setServerity('error');
      return false;
    }
    if (check.company === '') {
      company.current.focus();
      setError('Please select Company.');
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
        const selectedCountry = countries.find((val) => val.countryName === gecHRCNexus.current.value);
        selectedCountrycode = selectedCountry.countryCode;
      }
      const addData = {};
      if (userData != null) {
        addData.createdBy = userData.userId;
        addData.modifiedBy = userData.userId;
        addData.registration = registration.current.value;
        addData.company = company.current.value;
        addData.countryCode = selectedCountrycode;
        addData.embargoType = embargoType.current.value;
        if (document.getElementById('status').innerHTML === 'Active') {
          addData.active = true;
        } else {
          addData.active = false;
        }
      }
      const rsvalidate = await validate(addData, 'add');
      if (rsvalidate === false) {
        return false;
      }
      reponse = await insertShellReg(token, addData);
      msg = 'Aircraft Registration Number created successfully.';
    } else if (method === 'edit' || method === 'editValidate') {
      let selectedCountrycode = '';
      if (gecHRCNexus.current.value) {
        const selectedCountry = countries.find((val) => val.countryName === gecHRCNexus.current.value);
        selectedCountrycode = selectedCountry.countryCode;
      }

      const editData = {};
      if (userData != null) {
        editData.modifiedBy = userData.userId;
      }
      editData.id = param.id;
      editData.registration = registration.current.value;
      editData.company = company.current.value;
      editData.countryCode = selectedCountrycode;
      editData.embargoType = embargoType.current.value;
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
        reponse = await updateShellReg(token, editData);
        msg = 'Aircraft Registration Number updated successfully.';
      }
    } else if (method === 'deactivate') {
      if (userData != null) {
        param.modifiedBy = userData.userId;
      }
      const deactivatedata = {};
      Object.assign(deactivatedata, param);
      deactivatedata.active = false;
      reponse = await updateShellReg(token, deactivatedata);
      msg = 'Aircraft Registration Number deactivated successfully.';
    } else if (method === 'activate') {
      if (userData != null) {
        param.modifiedBy = userData.userId;
      }

      const activatedata = {};
      Object.assign(activatedata, param);
      activatedata.active = true;
      reponse = await updateShellReg(token, activatedata);
      msg = 'Aircraft Registration Number activated successfully.';
    }
    if (reponse.status === 201 || reponse.status === 204) {
      setError(msg);
      setOpen(true);
      setServerity('success');
      getShellList(token);
      return true;
    }
    if (reponse.status === 400) {
      return false;
    }
    return true;
  };

  const [columns, setColumns] = useState([
    {
      title: 'Aircraft Reg Number',
      field: 'registration',
      width: '30%',
      editComponent: (props) => (
        <TextField
          onKeyPress={(e) => alphaNumeric(e)}
          inputProps={{ maxLength: 10 }}
          inputRef={registration}
          onInput={(e) => ToUpperCaseLetter(e)}
          id="registration"
          autoComplete="off"
          defaultValue={props.value ? props.value : ''}
        />
      ),
    },
    {
      title: 'Company',
      field: 'company',
      width: '30%',
      editComponent: (props) => (
        <TextField
          inputProps={{ maxLength: 30 }}
          inputRef={company}
          id="company"
          autoComplete="off"
          defaultValue={props.value ? props.value : ''}
        />
      ),
    },
    {
      title: 'GEC / HRC Nexus',
      field: 'country[countryName]',
      width: '30%',
      editComponent: (props) => {
        let selectedCountry = '';
        if (props.value !== undefined) {
          selectedCountry = countries.find((val) => val.countryName === props.value);
        }
        return (
          <Autocomplete
            id="gecHRCNexus"
            options={countries}
            getOptionLabel={(option) => option.countryName}
            defaultValue={selectedCountry}
            renderInput={(params) => (
              <TextField id="gecHRCNexus" inputRef={gecHRCNexus} value={props.value} {...params} />
            )}
          />
        );
      },
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
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={serverity}>
          {error}
        </Alert>
      </Snackbar>
      <GridTable
        columns={columns}
        addNewUser={addNewUser}
        list={shellList}
        message={msgData}
        title="Reg Number"
        updateIcon={update}
      />
    </div>
  );
};
ShellRegList.propTypes = {
  actions: PropTypes.object,
  countries: PropTypes.array,
  shellList: PropTypes.array,
  userData: PropTypes.object.isRequired,
};
export default ShellRegList;
