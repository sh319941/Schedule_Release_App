import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Container, CssBaseline } from '@material-ui/core';
import * as Excel from 'exceljs';
import moment from 'moment';
import Header from '../common/Header';
import ReportForm from './ReportForm';
import SuccessPage from './SuccessPage';
import LoadingPage from './LoadingPage';
import SideBar from '../common/userLayout/SideBar';
import SideBarsupe from '../common/supervisorLayout/SideBar';
import { useStyles } from './ReportStyle';
import { getToken } from '../../utils';
import Topbar from '../common/userLayout/Topbar/topBar/ReportTopbar';
import { exportWorkBook } from '../../Services/FileService';
import constants from '../../constants';
import Loader from '../loader';

const ReportScreen = (props) => {
  const { userDetails: { role: { roleName } } = {}, userDetails, sitesList, actions } = props;
  const { getReport, getSites } = actions;
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [reportStatus, setReportStatus] = useState('form');
  const token = getToken();
  const workbookExcel = new Excel.Workbook();

  const setReportPage = () => {
    setReportStatus('form');
  };
  const exportReport = async (reportData) => {
    const worksheet = workbookExcel.addWorksheet('Flight_Schedule_Report');
    worksheet.columns = [
      { header: 'Username', key: 'name', width: 20 },
      { header: 'Date of submission(UTC)', key: 'DOS', width: 22 },
      { header: 'Site of submission', key: 'SIS', width: 16 },
      { header: 'Aircraft Registration Number', key: 'airReg', width: 25 },
      { header: 'Aircraft Type', key: 'airType', width: 12 },
      { header: 'Origin', key: 'airOrigin', width: 8 },
      { header: 'Next Destination', key: 'airFinal', width: 17 },
      { header: 'Final Destination', key: 'airDes', width: 17 },
      { header: 'Status', key: 'action', width: 20 },
      { header: 'Application ID', key: 'appId', width: 50 },
    ];

    worksheet.getRow(1).font = { size: 11, bold: true };
    if (reportData && reportData.length && reportData.length > 0) {
      reportData.map((item) => {
        worksheet.addRow({
          appId: item.requestId,
          name: item.userEmail,
          DOS: moment(item.dateTimeSubmitted).format('DD MMM YYYY HH:MM:SS'),
          SIS: item.siteName,
          airReg: item.aircraftRegNumber === 'N/A' ? '' : item.aircraftRegNumber,
          airType: item.aircraftTypeId === 'N/A' ? '' : item.aircraftTypeId,
          airOrigin: item.orgAirport === 'N/A' ? '' : item.orgAirport,
          airFinal: item.interiumAirport ? item.interiumAirport : '',
          airDes: item.destAirport === 'N/A' ? '' : item.destAirport,
          action: item.action === 'N/A' ? '' : item.action,
        });
        return true;
      });
    }

    setReportStatus('success');
    const buffer = await workbookExcel.xlsx.writeBuffer();
    const filename = `Schedule_Release_${moment(new Date()).format('DDMMYYhhmmss')}`;
    exportWorkBook(filename, buffer);
  };
  const report = async (reportParams) => {
    const processedReport = await getReport(token, reportParams);
    if (processedReport.status === 200) {
      exportReport(processedReport.data);
    } else {
      setReportStatus('form');
    }
  };
  useEffect(() => {
    if (roleName === 'Business Owner') {
      getSites(token, { StatusId: 1 });
    }
  }, []);

  const showSideBar = () => {
    if (roleName === constants.supervisor) {
      return (
        <SideBarsupe
          reportStatus={setReportPage}
          onMobileClose={() => setMobileNavOpen(false)}
          openMobile={isMobileNavOpen}
          user={userDetails}
        />
      );
    }
    return (
      <SideBar
        reportStatus={setReportPage}
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
        user={userDetails}
      />
    );
  };

  return (
    <Grid className={classes.root}>
      <Loader />
      <CssBaseline />
      <Header onMobileNavOpen={() => setMobileNavOpen(true)} />
      {showSideBar()}
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <div className={classes.wrapper}>
            <Grid direction="column" justify="flex-start" alignItems="flex-start" container spacing={2}>
              <Grid item>
                <Topbar name="Report" />
              </Grid>
              <Paper className={classes.paper}>
                <Grid item>
                  {reportStatus === 'form' && (
                    <ReportForm
                      userDetails={userDetails}
                      sitesList={sitesList}
                      user={props}
                      reportStatus={setReportStatus}
                      report={report}
                    />
                  )}
                  {reportStatus === 'loading' && <LoadingPage reportStatus={setReportStatus} />}
                  {reportStatus === 'success' && <SuccessPage setReportPage={setReportPage} />}
                </Grid>
              </Paper>
            </Grid>
          </div>
        </Container>
      </main>
    </Grid>
  );
};

ReportScreen.propTypes = {
  actions: PropTypes.object,
  sitesList: PropTypes.array,
  userDetails: PropTypes.object.isRequired,
};
export default ReportScreen;
