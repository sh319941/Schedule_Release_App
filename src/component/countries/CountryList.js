import React, { useState, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import GridTable from '../common/GridTable';
import Alert from '../common/Utilities/Alert';
import update from '../../assets/images/Country.png';
import { alphaNumeric, ToUpperCaseLetter } from '../common/Utilities/AlphaNumeric';
import { msgData } from './CountryMessage';

const CountryList = (props) => {
  const country = useRef();
  const countryCode = useRef();
  const embargoType = useRef();
  const { actions, userInfo, countries } = props;
  const { getCountries, insertCountry, updateCountry } = actions;
  const userData = userInfo;
  const token = localStorage.getItem('access_token');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();
  const [serverity, setServerity] = useState();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleChange = (e) => {};
  const validate = (check, method) => {
    if (check.countryName === '') {
      country.current.focus();
      setError('Please enter Country Name.');
      setOpen(true);
      setServerity('error');
      return false;
    }

    if (check.countryCode.length !== 2) {
      countryCode.current.focus();
      setError('Please enter valid Country Code.');
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
        addData.modifiedBy = userData.userId;
      }
      addData.countryName = country.current.value;
      addData.countryCode = countryCode.current.value;
      addData.embargoType = embargoType.current.value;
      const rsvalidate = await validate(addData, 'add');
      if (rsvalidate === false) {
        return false;
      }
      reponse = await insertCountry(token, addData);
      msg = 'Country created successfully.';
    } else if (method === 'edit' || method === 'editValidate') {
      const editData = {};
      if (userData != null) {
        editData.createdBy = userData.userId;
        editData.modifiedBy = userData.userId;
      }
      editData.countryName = country.current.value;
      editData.countryCode = param.countryCode;
      editData.embargoType = embargoType.current.value;
      const rsvalidate = await validate(editData, 'edit');
      if (rsvalidate === false) {
        return false;
      }
      if (method !== 'editValidate') {
        reponse = await updateCountry(token, editData);
        msg = 'Country details updated successfully.';
      }
    }
    if (reponse.status === 201 || reponse.status === 204) {
      setError(msg);
      setOpen(true);
      setServerity('success');
      getCountries(token);
      return true;
    }
    if (reponse.status === 400) {
      return false;
    }
    return true;
  };

  const [columns, setColumns] = useState([
    {
      title: 'Country Name',
      field: 'countryName',
      width: '100%',
      editComponent: (props) => (
        <TextField
          onKeyPress={(e) => alphaNumeric(e)}
          inputProps={{ maxLength: 30 }}
          autoComplete="off"
          inputRef={country}
          onChange={handleChange}
          defaultValue={props.value ? props.value : ''}
        />
      ),
    },

    {
      title: 'Country Code',
      field: 'countryCode',
      editable: 'onAdd',
      width: '100%',
      editComponent: (props) => (
        <TextField
          inputProps={{ maxLength: 2 }}
          onInput={(e) => ToUpperCaseLetter(e)}
          inputRef={countryCode}
          autoComplete="off"
          defaultValue={props.value ? props.value : ''}
        />
      ),
    },
    {
      title: 'Embargo Type',
      width: '100%',
      field: 'embargoType',
      editComponent: (props) => {
        const embargoTypeList = [{ name: 'GEC' }, { name: 'HRC' }];
        return (
          <Autocomplete
            id="airport"
            options={embargoTypeList.map((option) => option.name)}
            defaultValue={props.value ? props.value : ''}
            renderInput={(params) => (
              <TextField required id="embargoType" inputRef={embargoType} value={props.value} {...params} />
            )}
          />
        );
      },
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
        list={countries}
        error={error}
        title="Country"
        message={msgData}
        updateIcon={update}
      />
    </>
  );
};
CountryList.propTypes = {
  actions: PropTypes.object,
  countries: PropTypes.array,
  userInfo: PropTypes.object.isRequired,
};
export default CountryList;
