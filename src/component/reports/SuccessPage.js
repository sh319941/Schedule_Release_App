import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import success from '../../assets/images/success.png';
import stylesData from './ReportScreenStyle';

const SuccessPage = (props) => (
  <div style={stylesData.loadingPage}>
    <img src={success} style={stylesData.reportsIcon} alt="Report" />
    <p style={stylesData.reportdownloadSubText}>
      Report request successful. Your report will be downloaded automatically
    </p>
    <Link style={stylesData.reportnewDownload} onClick={(e) => props.setReportPage()}>
      {' '}
      Click here to generate new Report{' '}
    </Link>
  </div>
);
SuccessPage.propTypes = {
  setReportPage: PropTypes.func,
};
export default SuccessPage;
