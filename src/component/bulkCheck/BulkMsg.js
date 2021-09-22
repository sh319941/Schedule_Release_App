import React from 'react';
import { bulkCheckFileLength } from '../config/language/language';

export const uploadmessage = () => (
  <div>
    <p>Please make sure the file is .xls or .xlsx format.It should contain the following fields – Origin,</p>
    <p>Next Destination, Final Destination, Aircraft Registration Number, Aircraft Type.</p>
    <p>Please make sure you enter all mandatory fields</p>
  </div>
);
export const uploadErrmessage = () => (
  <div style={{ color: 'red' }}>
    <p>The uploaded file is not .xls or .xlsx format.</p>
    <p>Please upload the correct format of the file.</p>
  </div>
);

export const HeaderErrmessage = () => (
  <div style={{ color: 'red' }}>
    <p>The template you have uploaded contains invalid headers.</p>
    <p>Please verify the file and upload again</p>
  </div>
);
export const Progressmessage = () => (
  <div>
    <p>Status Check is in progress.</p>
  </div>
);

export const Sucessfulmessage = () => (
  <div>
    <p>Check completed!</p>
    <p>Your file with the result will be automatically downloaded.</p>
  </div>
);

export const FileSizeMsg = () => (
  <div style={{ color: 'red' }}>
    <p>Record limit has crossed {bulkCheckFileLength} records, please correct and submit.</p>
  </div>
);
export const NoDataMsg = () => (
  <div style={{ color: 'red' }}>
    <p>No data was found in the file. Please enter the relevant data and upload again.</p>
  </div>
);
export const IataMsg = 'Please enter valid IATA/ICAO code';
export const MandatoryMsg = 'Please enter mandatory fields with valid values';
export const AircraftRegMandatoryMsg = 'Please enter valid Aircraft Registration Number';
export const AircraftTypeIdMandatoryMsg = 'Please enter valid Aircraft Type ID';
