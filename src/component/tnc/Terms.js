import React, { useEffect, useState } from 'react';
import { FormControl, TextField, FormControlLabel, RadioGroup } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Autocomplete } from '@material-ui/lab';
import Dialog from '@material-ui/core/Dialog';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { insertTnc } from '../config/api/masterScreen/InsertRecord';
import { useStyles } from './TncStyles';
import Alert from '../common/Utilities/Alert';
import { getToken } from '../../utils';
import { getTnc } from '../config/api/masterScreen/GetRecord';
import { logout } from '../common/Utilities/Logout';
import close from '../../assets/images/close.png';
import tick from '../../assets/images/tick.png';
import Header from '../common/TncHeader';
import { DialogContent, DialogTitle, DialogActions, GreenRadio } from './DialogCon';

const Terms = (props) => {
  const classes = useStyles();
  const [errorOpen, seterrorOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    seterrorOpen(false);
  };
  const tncUrl = process.env.REACT_APP_SERVER_URL;
  const token = getToken();
  const [countryList, setCountryList] = useState([]);
  const [countryName, setCountryName] = useState('');
  const [pdfLink, setPdfLink] = useState('');
  const [value, setvalue] = useState('');
  const [open, setOpen] = useState(false);
  const [opendrop, setOpenDrop] = useState(false);
  const { userDetails } = props;
  let Name = '';
  if (userDetails != null) {
    Name = userDetails.firstName;
  }
  const [region, setRegion] = useState('');
  const [error, setError] = useState();
  const getArea = (area) => (
    <Grid container direction="column" justify="flex-start" alignItems="flex-start" spacing="2">
      <Grid item className="ModalDropHeading">
        {region}
      </Grid>
      <Grid item>
        <RadioGroup row aria-label="position" name="position" value={value || ''}>
          {countryList.map((list, index) => {
            if (list.countryCode === countryName && list.area !== null) {
              return (
                <FormControlLabel
                  classes={{
                    label: classes.radioLabel,
                  }}
                  className="tncBtn"
                  value={list.termsConditionLink || ''}
                  control={<GreenRadio />}
                  label={list.area}
                  onChange={(event, newValue) => {
                    setvalue(event.target.value);
                    setPdfLink(event.target.value);
                  }}
                  labelPlacement="end"
                />
              );
            }
            return null;
          })}
        </RadioGroup>
      </Grid>
    </Grid>
  );
  const onmodalClick = () => {
    if (pdfLink === '') {
      setError('Please Country');
      seterrorOpen(true);
      return false;
    }
    setOpenDrop(false);
    setOpen(true);
    return true;
  };

  const uniq = (a, key) => {
    if (a !== null) {
      const seen = new Set();
      return a.filter((item) => {
        const k = key(item);
        return seen.has(k) ? false : seen.add(k);
      });
    }
    return null;
  };
  const acceptTnc = () => {
    const data = { userId: userDetails.userId, countryCode: countryName };
    insertTnc(token, data).then((response) => {
      if (response.data === 204) {
        localStorage.setItem('tnc', true);
      }
    });
    setOpenDrop(false);
    setOpen(false);
  };
  useEffect(() => {
    async function fetchData() {
      const tncresponse = getTnc(token, userDetails.userId);
      tncresponse.then((response) => {
        if (response.status === 200) {
          if (response.data.tcAccepted === false) {
            setOpenDrop(true);
          }
          setCountryList(response.data.tcList);
        }
      });
    }
    fetchData();
  }, []);
  return (
    <div>
      <Snackbar open={errorOpen} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
      <div style={{ overflow: 'hidden' }}>
        <Dialog onClose={handleClose} fullScreen aria-labelledby="customized-dialog-title" open={open}>
          <Header />
          <DialogContent
            overlayStyle={{ backgroundColor: 'transparent' }}
            style={{ paddingTop: '5%', overflow: 'hidden' }}
          >
            <Grid container justify="center" alignItems="center">
              <Grid item className="login-user-type">
                <main className={classes.content}>
                  <Container className={classes.container}>
                    <div className={classes.wrapper}>
                      <object
                        data={tncUrl + pdfLink}
                        type="application/pdf"
                        aria-label="Terms Pdf"
                        width="1200"
                        height="700"
                      />
                    </div>
                  </Container>
                </main>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Grid container direction="row" justify="flex-end" alignItems="center" spacing={4} className={classes.root}>
              <Grid item>
                <Button
                  variant="contained"
                  startIcon={<img src={close} alt="Decline" className={classes.btnImg} />}
                  onClick={(e) => logout()}
                  className={classes.cancelBtn}
                >
                  <div className="tncBtn">Decline</div>{' '}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  className={classes.updatebtn}
                  startIcon={<img src={tick} alt="Accept" className={classes.btnImg} />}
                  onClick={(e) => acceptTnc()}
                  variant="contained"
                  width="80%"
                >
                  <div className="tncBtn">Accept</div>{' '}
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
        <Dialog onClose={handleClose} className={classes.paperselect} open={opendrop}>
          <DialogContent>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              Hi {Name}
            </DialogTitle>
            <div className={classes.paper}>
              <CssBaseline />
              <FormControl>
                <Grid container direction="column" justify="center" alignItems="center" spacing="3">
                  <Grid item>
                    <Grid container direction="column" justify="flex-start" alignItems="flex-start" spacing="3">
                      <Grid item className="ModalDropHeading">
                        Please select the Country you are in:
                      </Grid>
                      <Grid item className="login-user-type">
                        <Autocomplete
                          id="auto-highlight"
                          autoHighlight
                          options={uniq(countryList, (it) => it.countryName)}
                          getOptionLabel={(option) => option.countryName}
                          style={{ width: 300 }}
                          onChange={(event, newValue) => {
                            setPdfLink('');
                            setCountryName('');
                            setvalue('');
                            setRegion('');
                            if (newValue != null) {
                              if (newValue.area !== null) {
                                setRegion('Select the region :');
                              }
                              setPdfLink(newValue.termsConditionLink);
                              setCountryName(newValue.countryCode);
                              setvalue(newValue.termsConditionLink);
                            }
                          }}
                          renderInput={(params) => <TextField {...params} label="Country" />}
                        />
                      </Grid>
                      <Grid item className="ModalDropHeading">
                        {countryName !== '' && getArea(countryName)}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" onClick={(e) => onmodalClick()} className={classes.btnSubmit}>
                      <div className="tncSubmit">Submit</div>{' '}
                    </Button>
                  </Grid>
                </Grid>
              </FormControl>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Terms;
