import React from 'react';
import loading from '../../assets/images/loading.png';
import stylesData from './ReportScreenStyle';

function LoadingPage() {
  return (
    <div style={stylesData.loadingPage}>
      <img src={loading} style={stylesData.reportsIcon} alt="Report" />
      <p style={stylesData.reportSubText}>We are generating your report.</p>
      <p style={stylesData.waitSubText}>Please wait…</p>
    </div>
  );
}
export default LoadingPage;
