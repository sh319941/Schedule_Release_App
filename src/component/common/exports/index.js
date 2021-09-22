import React from 'react';
import PropTypes from 'prop-types';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';
import download from '../../../assets/images/export.png';

export const ExportCSV = (props) => {
  const { exportData, fileName } = props;
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  const exportToCSV = (csvData, file) => {
    const ws = XLSX.utils.json_to_sheet(csvData);

    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    const data = new Blob([excelBuffer], { type: fileType });

    FileSaver.saveAs(data, file + fileExtension);
  };

  return (
    <Link
      role="button"
      className="customExportButton"
      onClick={() => exportToCSV(exportData, fileName)}
      title="Export View"
    >
      <img src={download} alt="Export View" width="25" height="25" />
      <span className="customExportButton-text">Export View</span>
    </Link>
  );
};

export const exportXLS = (cols, csvData, file) => {
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

  const fileExtension = '.xlsx';
  const ws = XLSX.utils.json_to_sheet(csvData);

  const wb = { Sheets: { data: ws }, SheetNames: ['data'] };

  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

  const data = new Blob([excelBuffer], { type: fileType });

  FileSaver.saveAs(data, file + fileExtension);
};

ExportCSV.propTypes = {
  exportData: PropTypes.array,
  fileName: PropTypes.string,
};
