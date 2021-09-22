import React, { useState, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import GridTable from './BulkGrid';
import Alert from '../common/Utilities/Alert';
import { alphaNumericwithoutsapce as alphaNumeric } from '../common/Utilities/AlphaNumeric';
import { ListValidate } from './Icon';
import { IataMsg, MandatoryMsg, AircraftRegMandatoryMsg, AircraftTypeIdMandatoryMsg } from './BulkMsg';
import { labelConstant } from './BulkCheckContants';

const BulKCheckList = (parentprops) => {
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const [error, setError] = useState();
  const [serverity, setServerity] = useState();
  const origin = useRef('');
  const desigination = useRef('');
  const finalDesigination = useRef('');
  const aircraftReg = useRef('');
  const aircraftType = useRef('');
  const addNewUser = async (param) => {
    param.orgAirport = origin.current.value;
    param.interimDestAirport = desigination.current.value;
    param.destAirport = finalDesigination.current.value;
    if (param.destAirport.length < 3) {
      setError(MandatoryMsg);
      setOpen(true);
      setServerity('error');
      return false;
    }
    param.aircraftRegNumber = aircraftReg.current.value;
    if (param.aircraftRegNumber === '') {
      setError(MandatoryMsg);
      setOpen(true);
      setServerity('error');
      return false;
    }
    param.aircraftTypeId = aircraftType.current.value;
    if (param.aircraftTypeId === '') {
      setError(MandatoryMsg);
      setOpen(true);
      setServerity('error');
      return false;
    }
    return true;
  };
  const [columns, setColumns] = useState([
    {
      title: labelConstant.origin,
      field: 'orgAirport',
      width: '100%',
      editComponent: (props) => (
        <TextField
          inputRef={origin}
          id="Origin (IATA / ICAO)"
          onKeyPress={(e) => alphaNumeric(e)}
          inputProps={{ maxLength: 4, minLength: 3 }}
          defaultValue={props.value ? props.value : ''}
        />
      ),
      render: (rowData) => {
        if (rowData.orgAirport !== '') {
          if (rowData.orgAirport.length < 3 || rowData.orgAirport.length > 4) {
            return ListValidate(rowData.orgAirport, IataMsg);
          }
        }
        return <p>{rowData.orgAirport}</p>;
      },
    },
    {
      title: labelConstant.nextDestination,
      width: '100%',
      field: 'interimDestAirport',
      editComponent: (props) => (
        <TextField
          inputRef={desigination}
          onKeyPress={(e) => alphaNumeric(e)}
          inputProps={{ maxLength: 4 }}
          id="operatingCompany"
          defaultValue={props.value ? props.value : ''}
        />
      ),
      render: (rowData) => {
        if (rowData.interimDestAirport !== '') {
          if (rowData.interimDestAirport.length < 3 || rowData.interimDestAirport.length > 4) {
            return ListValidate(rowData.interimDestAirport, IataMsg);
          }
        }
        return <p>{rowData.interimDestAirport}</p>;
      },
    },
    {
      title: labelConstant.finalDestination,
      width: '100%',
      field: 'destAirport',
      editComponent: (props) => (
        <TextField
          inputRef={finalDesigination}
          onKeyPress={(e) => alphaNumeric(e)}
          inputProps={{ maxLength: 4 }}
          id="operatingCompany"
          defaultValue={props.value ? props.value : ''}
        />
      ),
      render: (rowData) => {
        if (rowData.destAirport === '') {
          return ListValidate(rowData.destAirport, MandatoryMsg);
        }
        if (rowData.destAirport.length < 3 || rowData.destAirport.length > 4) {
          return ListValidate(rowData.destAirport, IataMsg);
        }
        return <p>{rowData.destAirport}</p>;
      },
    },
    {
      title: labelConstant.aircraftRegisterNumber,
      width: '100%',
      field: 'aircraftRegNumber',
      editComponent: (props) => (
        <TextField
          inputRef={aircraftReg}
          onKeyPress={(e) => alphaNumeric(e)}
          inputProps={{ maxLength: 30 }}
          id="operatingCompany"
          defaultValue={props.value ? props.value : ''}
        />
      ),
      render: (rowData) => {
        if (rowData.aircraftRegNumber === '') {
          return ListValidate(rowData.aircraftRegNumber, MandatoryMsg);
        }
        if (rowData.aircraftRegNumber.length > 30) {
          return ListValidate(rowData.aircraftRegNumber, AircraftRegMandatoryMsg);
        }
        return <p>{rowData.aircraftRegNumber}</p>;
      },
    },
    {
      title: labelConstant.aircraftTypeId,
      width: '40%',
      field: 'aircraftTypeId',
      editComponent: (props) => (
        <TextField
          inputRef={aircraftType}
          onKeyPress={(e) => alphaNumeric(e)}
          inputProps={{ maxLength: 30 }}
          id="operatingCompany"
          defaultValue={props.value ? props.value : ''}
        />
      ),
      render: (rowData) => {
        if (rowData.aircraftTypeId === '') {
          return ListValidate(rowData.aircraftTypeId, MandatoryMsg);
        }
        if (rowData.aircraftTypeId.length > 30) {
          return ListValidate(rowData.aircraftTypeId, AircraftTypeIdMandatoryMsg);
        }
        return <p>{rowData.aircraftTypeId}</p>;
      },
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
        list={parentprops.checklist}
        error={error}
        submit={parentprops.submit}
        onCancel={parentprops.onCancel}
        handleSubmit={parentprops.handleSubmit}
      />
    </div>
  );
};

export default BulKCheckList;
