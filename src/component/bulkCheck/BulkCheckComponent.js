import React, { useState, useRef, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import * as XLSX from 'xlsx';
import { Input, InputLabel, Typography, ListItemIcon } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '../common/Utilities/Alert';
import Header from '../common/Header';
import SideBar from '../common/supervisorLayout/SideBar';
import { useStyles } from './ScheduleCheckStyles';
import ScheduleCheckTopbar from '../common/supervisorLayout/Topbar/topBar/ScheduleCheckTopbar';
import success from '../../assets/images/success.png';
import BulKCheckList from './BulkCheckList';
import bulkupload from '../../assets/images/bulkupload.png';
import download from '../../assets/images/download.png';
import loading from '../../assets/images/loading.png';
import { handleSubmit, exportReport, headerArray, exportAircraft } from './BulkCheckConverter';
import { labelConstant } from './BulkCheckContants';
import {
  uploadmessage,
  uploadErrmessage,
  HeaderErrmessage,
  Progressmessage,
  Sucessfulmessage,
  FileSizeMsg,
  NoDataMsg,
} from './BulkMsg';
import { bulkCheckFileLength } from '../config/language/language';
import Loader from '../loader';

const BulkCheck = (props) => {
  const token = localStorage.getItem('access_token');
  const classes = useStyles();
  const [showData, setShowData] = useState(false);
  const [label, setLabel] = useState(labelConstant.UploadFile);
  const [image, setImage] = useState(bulkupload);
  const [jsonData, setJsonData] = useState();
  const inputFileRef = useRef(null);
  const [msgData, setMsgDate] = useState(uploadmessage());
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const { userDetails, actions, airportTypeList, aircraftListLoaded } = props;
  const { getBulkCheck, getairportTypeList } = actions;
  useEffect(() => {
    const status = { StatusId: 1 };
    getairportTypeList(token, status);
  }, [jsonData]);
  const onSubmit = async (insertData) => {
    const optData = { userId: userDetails.userId, bulkFlightDetails: insertData };
    setImage(loading);
    setMsgDate(Progressmessage);
    setShowData(false);
    const processedBulkCheck = await getBulkCheck(token, optData);
    if (processedBulkCheck.status === 200) {
      setImage(success);
      exportReport(processedBulkCheck.data);
      setMsgDate(Sucessfulmessage);
      setLabel('Upload another file');
    } else {
      setImage(bulkupload);
      setLabel(labelConstant.UploadFile);
      setMsgDate(uploadmessage());
    }
  };
  /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
  const result = [];
  const convertToJson = (lines) => {
    const headers = lines[0];
    const array3 = headers.filter(function (obj) {
      return headerArray.indexOf(obj) === -1;
    });
    if (headers.length !== 5 || array3.length > 0) {
      setMsgDate(HeaderErrmessage);
      return false;
    }
    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentline = lines[i];
      if (lines[i].length !== 0) {
        for (let j = 0; j < headers.length; j++) {
          let columnHeader = headers[j];
          if (columnHeader === labelConstant.origin) {
            columnHeader = 'orgAirport';
          }
          if (columnHeader === labelConstant.nextDestination) {
            columnHeader = 'interimDestAirport';
          }
          if (columnHeader === labelConstant.finalDestination) {
            columnHeader = 'destAirport';
          }
          if (columnHeader === labelConstant.aircraftRegisterNumber) {
            columnHeader = 'aircraftRegNumber';
          }
          if (columnHeader === labelConstant.aircraftTypeId) {
            columnHeader = 'aircraftTypeId';
          }
          if (currentline[j] === undefined) {
            currentline[j] = '';
          }
          obj[columnHeader] = String(currentline[j]).replace(/[^A-Z0-9]+/gi, '');
        }
        result.push(obj);
      }
    }
    return true;
  };
  const handleClick = () => {
    inputFileRef.current.click();
  };
  const onFileChange = async (e) => {
    const f = e.target.files[0];
    const { name } = f;
    const fileType = name.split('.');
    const extension = fileType[fileType.length - 1];
    setMsgDate(uploadmessage);
    if (extension !== 'xlsx' && extension !== 'xls') {
      setMsgDate(uploadErrmessage);
      return false;
    }
    const reader = new FileReader();
    reader.onload = async (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1, blankRows: false });
      if (data.length > bulkCheckFileLength) {
        setMsgDate(FileSizeMsg);
        return false;
      }
      const optJson = await convertToJson(data);
      if (optJson) {
        if (result.length > 0) {
          const converted = await handleSubmit(result);
          setJsonData(converted.optdata);
          if (!converted.checkValue) {
            setError('Please enter mandatory fields with valid values');
            setOpen(true);
          }
          setShowData(true);
        } else {
          setMsgDate(NoDataMsg);
          return false;
        }
      }
    };
    reader.readAsBinaryString(f);
    return true;
  };
  const onCancel = () => {
    setLabel(labelConstant.UploadFile);
    setMsgDate(uploadmessage());
    setShowData(false);
  };
  return (
    <div className={classes.root}>
      <Loader />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
      <Header />
      <SideBar />
      <CssBaseline />
      {aircraftListLoaded ? (
        <main className={classes.content}>
          <Container className={classes.container}>
            <div className={classes.wrapper}>
              <Grid
                container
                direction="row"
                className={classes.content}
                justify="flex-start"
                spacing={2}
                alignItems="flex-start"
              >
                <Grid item>
                  <ScheduleCheckTopbar name="Bulk Check" />
                </Grid>
                {showData === false ? (
                  <Paper className={classes.paper}>
                    <Grid item>
                      <Grid direction="row" justify="center" alignItems="center" container spacing={6}>
                        <Grid item onClick={() => exportAircraft(airportTypeList)} xs={4.5}>
                          <ListItem button>
                            <ListItemIcon>
                              <img src={download} alt="Bulk Download" />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography className={classes.bulkDownload}> Download Aircraft Type List</Typography>
                              }
                            />
                          </ListItem>
                        </Grid>
                        <Grid item xs={4} />
                        <Grid item onClick={() => exportReport('Temp')} xs={3.5}>
                          <ListItem button>
                            <ListItemIcon>
                              <img src={download} alt="Bulk Download" />
                            </ListItemIcon>
                            <ListItemText
                              primary={<Typography className={classes.bulkDownload}> Download Template</Typography>}
                            />
                          </ListItem>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid direction="row" justify="center" alignItems="center" container spacing={4}>
                        <Grid item>
                          <Grid container spacing={2} direction="column" justify="center" alignItems="center">
                            <Grid item>
                              <img src={image} alt="Bulk Upload" />
                            </Grid>
                            {image !== loading && (
                              <Grid item>
                                <InputLabel htmlFor="contained-button-file">
                                  <Input
                                    accept="xsls/*"
                                    className={classes.input}
                                    id="contained-button-file"
                                    ref={inputFileRef}
                                    type="file"
                                    onChange={onFileChange}
                                    onClick={(e) => (e.target.value = null)}
                                  />
                                  <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={handleClick}
                                    width="80%"
                                    className={classes.fileBtn}
                                  >
                                    <div className={classes.bulkCheckBtn}>{label}</div>{' '}
                                  </Button>
                                </InputLabel>
                              </Grid>
                            )}
                            <Grid item className={classes.msgContent}>
                              {msgData}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                ) : (
                  <Grid item>
                    {' '}
                    <BulKCheckList submit={onSubmit} checklist={jsonData} onCancel={onCancel} />{' '}
                  </Grid>
                )}
              </Grid>
            </div>
          </Container>
        </main>
      ) : (
        <div className="load" />
      )}
    </div>
  );
};
export default BulkCheck;
