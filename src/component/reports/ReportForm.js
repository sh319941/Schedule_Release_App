import React, { useEffect, useState } from 'react';
import styles from './ReportScreenStyle';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Snackbar, FormControl, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import calanderIcon from '../../assets/images/calIcon.png';
import reportIcon from '../../assets/images/reportIcon.png';
import Alert from '../common/Utilities/Alert';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
function ReportForm(props) {
  const { role, site } = props.userDetails;
  const { reportStatus, report } = props;
  const today = new Date();
  const defFromDate = new Date();
  defFromDate.setDate(today.getDate() - 30);
  const [status, setStatus] = useState('0');
  const classes = useStyles();
  const [siteName, setSiteName] = useState('All');
  const [fromDate, setFromDate] = useState(defFromDate);
  const [toDate, setToDate] = useState(today);
  const minFromDate = new Date();
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  minFromDate.setDate(minFromDate.getDate() - 365);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  useEffect(() => {
    if (fromDate !== null) {
      new Date().setTime(fromDate.getTime() + 180 * 24 * 60 * 60 * 1000);
    }
  }, [fromDate]);
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const from = moment(fromDate).format('MM-DD-YYYY');
  const to = moment(toDate).format('MM-DD-YYYY');
  const validator = () => {
    let siteIdval = '';

    if (!fromDate) {
      setOpen(true);
      setErrorMsg('Please select From Date.');
      return false;
    }
    if (!toDate) {
      setOpen(true);
      setErrorMsg('Please select To Date.');
      return false;
    }
    if ((toDate.getTime() - fromDate.getTime()) / (24 * 60 * 60 * 1000) > 180) {
      setOpen(true);
      setErrorMsg('Date range should not be greater than 6 months.');
      return false;
    }
    if (role.roleName !== 'Supervisor' && siteName === '') {
      setOpen(true);
      setErrorMsg('Please select Site.');
      return false;
    }
    if (role.roleName !== 'Supervisor' && siteName !== '') {
      const siteData = props.sitesList.find((val) => val.siteName === siteName);
      if (siteData !== undefined) {
        siteIdval = siteData.siteId;
      } else {
        siteIdval = 0;
      }
    } else {
      siteIdval = site.siteId;
    }
    reportStatus('loading');
    const reportParams =
      siteIdval !== 'All'
        ? {
            siteIds: siteIdval,
            startDate: from,
            endDate: to,
            statusId: parseInt(status),
          }
        : {
            startDate: from,
            endDate: to,
            statusId: parseInt(status),
          };
    report(reportParams);
    return true;
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
      <Grid item>
        <img src={reportIcon} alt="Report" />
      </Grid>
      <Grid item style={styles.title}>
        Please select the required values to download your report
      </Grid>
      <Grid item>
        <div style={styles.fieldContainer}>
          <div style={styles.lineItem}>
            <p style={styles.fieldName}>Date</p>
            <div style={styles.calendarContainer}>
              <sup style={styles.superText}>From</sup>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  autoOk
                  style={styles.datePicker}
                  disableToolbar
                  minDate={minFromDate}
                  maxDate={toDate || null}
                  variant="inline"
                  format="dd MMM, yyyy"
                  margin="normal"
                  id="from-date"
                  value={fromDate}
                  onChange={(date) => {
                    setErrorMsg('');
                    setFromDate(date);
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  keyboardIcon={<img style={styles.calendar} src={calanderIcon} alt="Calender Icon" />}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div style={styles.calendarContainer}>
              <sup style={styles.superText}>To</sup>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  autoOk
                  style={styles.datePicker}
                  disableToolbar
                  minDate={fromDate || null}
                  variant="inline"
                  format="dd MMM, yyyy"
                  margin="normal"
                  id="to-date"
                  value={toDate}
                  onChange={(date) => {
                    setErrorMsg('');
                    setToDate(date);
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  keyboardIcon={<img style={styles.calendar} src={calanderIcon} alt="Calender Icon" />}
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>
          <div style={styles.lineItem}>
            <p style={styles.fieldName}>Site</p>
            {role.roleName === 'Supervisor' ? (
              <input style={styles.siteValue} type="text" placeholder={site.siteName} disabled />
            ) : (
              <Autocomplete
                style={styles.siteList}
                options={props.sitesList.map((option) => option.siteName)}
                id="site"
                defaultValue={siteName}
                fullWidth
                className={classes.selectEmpty}
                onChange={(event, newValue) => {
                  setSiteName('');
                  if (newValue !== '' && newValue !== null) {
                    setSiteName(newValue);
                  }
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            )}
          </div>
          <div style={styles.lineItem}>
            <p style={styles.fieldName}>Status</p>
            <FormControl component="fieldset">
              <RadioGroup
                style={styles.radioGroup}
                aria-label="gender"
                name="gender1"
                value={status}
                onChange={handleStatusChange}
              >
                <FormControlLabel
                  style={styles.formControlLabel}
                  value="0"
                  control={<Radio style={styles.radioButton} size="small" />}
                  label={<span style={styles.radioFont}>All</span>}
                />
                <FormControlLabel
                  style={styles.formControlLabel}
                  value="1"
                  control={<Radio style={styles.radioButton} size="small" />}
                  label={<span style={styles.radioFont}>Approved</span>}
                />
                <FormControlLabel
                  style={styles.formControlLabel}
                  value="3"
                  control={<Radio style={styles.radioButton} size="small" />}
                  label={<span style={styles.radioFont}>Rejected</span>}
                />
                <FormControlLabel
                  style={styles.formControlLabel}
                  value="2"
                  control={<Radio style={styles.radioButton} size="small" />}
                  label={<span style={styles.radioFont}>Ask for verification</span>}
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
      </Grid>
      <Grid item>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {errorMsg}
          </Alert>
        </Snackbar>
      </Grid>
      <Grid item>
        <Button style={styles.reportButton} onClick={validator} color="primary">
          Generate Report
        </Button>
      </Grid>
    </Grid>
  );
}

export default ReportForm;
