import React, { useState, useRef } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Snackbar from '@material-ui/core/Snackbar';
import { Trans } from 'react-i18next';
import Alert from '../common/Utilities/Alert';
import update from '../../assets/images/sidebarImage/siteUpdate.png';
import { alphaNumeric } from '../common/Utilities/AlphaNumeric';
import GridTable from '../common/GridTable';
import { msg } from './SiteMsg';
import { useStyles } from '../../assets/js/common';

const SiteList = (parentprops) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const token = localStorage.getItem('access_token');
  const [error, setError] = useState();
  const [serverity, setServerity] = useState();
  const site = useRef();
  const airport = useRef();
  const operatingCompany = useRef();
  const status = useRef();
  const { actions, userDetails: userData, list } = parentprops;

  const validate = (check, method) => {
    if (check.siteName === '') {
      site.current.focus();
      setError('Please enter Site Name.');
      setOpen(true);
      setServerity('error');
      return false;
    }

    if (check.airport === '') {
      airport.current.focus();
      setError('Please select Airport.');
      setOpen(true);
      setServerity('error');
      return false;
    }

    if (check.airport !== '' && method === 'edit') {
      const airportData =
        parentprops.airportList.length > 0 &&
        parentprops.airportList.find((val) => `${val.iataCode}/${val.icaoCode}, ${val.countryName}` === check.airport);
      if (airportData === undefined) {
        airport.current.focus();
        setError('Please select Airport.');
        setOpen(true);
        setServerity('error');
        return false;
      }
    }
    if (check.operatingCompany === '') {
      operatingCompany.current.focus();
      setError('Please enter ITP Operating Company.');
      setOpen(true);
      setServerity('error');
      return false;
    }
    return true;
  };

  const addNewUser = async (param, method) => {
    let reponse = {};
    let message = '';
    if (method === 'add') {
      const addData = {};
      if (userData != null) {
        addData.createdBy = userData.userId;
      }
      addData.siteName = site.current.value;
      addData.airport = airport.current.value;
      addData.operatingCompany = operatingCompany.current.value;
      addData.active = status.current.value;
      const rsvalidate = await validate(addData, 'add');
      if (rsvalidate === false) {
        return false;
      }
      const airportsdata =
        parentprops.airportList.length > 0 &&
        parentprops.airportList.find(
          (val) => `${val.iataCode}/${val.icaoCode}, ${val.countryName}` === addData.airport
        );
      addData.airportId = airportsdata.id;
      reponse = await actions.insertSites(token, addData);
      message = 'Site created successfully';
    } else if (method === 'edit' || method === 'editValidate') {
      const editData = {};
      if (userData != null) {
        editData.modifiedBy = userData.userId;
      }
      editData.siteId = param.siteId;
      editData.siteName = site.current.value;
      editData.airport = airport.current.value;
      editData.operatingCompany = operatingCompany.current.value;
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
        const airportsdata =
          parentprops.airportList.length > 0 &&
          parentprops.airportList.find(
            (val) => `${val.iataCode}/${val.icaoCode}, ${val.countryName}` === editData.airport
          );
        editData.airportId = airportsdata.id;
        reponse = await actions.updateSites(token, editData);
        message = 'Site details updated successfully.';
      }
    } else if (method === 'deactivate') {
      if (userData != null) {
        param.modifiedBy = userData.userId;
      }
      const deactivateSite = {};
      Object.assign(deactivateSite, param);
      deactivateSite.active = false;
      reponse = await actions.updateSites(token, deactivateSite);
      message = 'Site deactivated successfully.';
    } else if (method === 'activate') {
      if (userData != null) {
        param.modifiedBy = userData.userId;
      }
      const activateSite = {};
      Object.assign(activateSite, param);
      activateSite.active = true;
      reponse = await actions.updateSites(token, activateSite);
      message = 'Site activated successfully.';
    }
    if (reponse.status === 204 || reponse.status === 201) {
      setError(message);
      setOpen(true);
      setServerity('success');
      return true;
    }
    if (reponse.status === 400) {
      return false;
    }
    return true;
  };

  const [columns, setColumns] = useState([
    {
      title: <Trans i18nKey="SiteList['Site Name']">Site Name</Trans>,
      field: 'siteName',
      width: '30%',
      editComponent: (props) => (
        <TextField
          label="Site Name"
          id="siteName"
          onKeyPress={(e) => alphaNumeric(e)}
          autoComplete="off"
          inputProps={{ maxLength: 30 }}
          inputRef={site}
          defaultValue={props.value ? props.value : ''}
        />
      ),
    },

    {
      title: <Trans i18nKey="SiteList['Airport']">Airport</Trans>,
      width: '50%',
      field: 'airportName',
      editComponent: (props) => (
        <Autocomplete
          id="airport"
          options={
            parentprops.airportList.length > 0 &&
            parentprops.airportList.map((option) => `${option.iataCode}/${option.icaoCode}, ${option.countryName}`)
          }
          defaultValue={props.value ? props.value : ''}
          onChange={(event, newValue) => {
            if (newValue !== '' && newValue !== null) {
              parentprops.airportList.length > 0 &&
                parentprops.airportList.find(
                  (val) => `${val.iataCode}/${val.icaoCode}, ${val.countryName}` === newValue
                );
            }
          }}
          renderInput={(params) => <TextField id="airportId" inputRef={airport} value={props.value} {...params} />}
        />
      ),
    },
    {
      title: <Trans i18nKey="SiteList['ITP Operating Company']">ITP Operating Company</Trans>,
      width: '40%',
      field: 'operatingCompany',
      editComponent: (props) => (
        <TextField
          onKeyPress={(e) => alphaNumeric(e)}
          inputProps={{ maxLength: 30 }}
          inputRef={operatingCompany}
          autoComplete="off"
          id="operatingCompany"
          defaultValue={props.value ? props.value : ''}
        />
      ),
    },

    {
      title: <Trans i18nKey="SiteList['Status']">Status</Trans>,
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
            defaultValue={active}
            fullWidth
            inputRef={status}
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
        list={list}
        error={error}
        title="Site"
        message={msg}
        updateIcon={update}
      />
    </div>
  );
};

export default SiteList;
