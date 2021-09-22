import React from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useStyles } from '../../../assets/css/gridCss';
import constants from '../../../constants';

const ModalDailog = (props) => {
  const { open, handleClose, handleRefreshToken } = props;
  const classes = useStyles();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <CssBaseline />
          <Grid container direction="column" justify="center" alignItems="center" spacing={4}>
            <Grid item className="login-user-type">
              Session Time out
            </Grid>
            <Grid item>
              {`You will be logged out due to inactivity in ${constants.sessionTimeout.timeout} minute, Please select "continue" to keep you logged in`}
            </Grid>
          </Grid>
          <Grid
            container
            className={classes.btnPadding}
            direction="row"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Button
                fullWidth
                className={classes.updatebtn}
                onClick={(e) => handleRefreshToken()}
                variant="contained"
                width="80%"
              >
                <div className="submit">Continue</div>
              </Button>
            </Grid>
            <Grid item>
              <Button fullWidth variant="contained" onClick={(e) => handleClose()} className={classes.cancelBtn}>
                <div className="submit">Log Out</div>
              </Button>
            </Grid>
          </Grid>
        </div>
      </Fade>
    </Modal>
  );
};

export const ErrorDialog = (props) => {
  const classes = useStyles();
  const { open, message, handlerCloseDialog } = props;
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={open}
        closeAfterTransition
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <CssBaseline />
            <Grid className={classes.content}> {message}</Grid>
            <Grid
              container
              className={classes.modalBtnPadding}
              direction="row"
              justify="center"
              alignItems="center"
              spacing={1}
            >
              <Grid item>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handlerCloseDialog()}
                  className={classes.cancelBtn}
                >
                  <div className="submit">Ok</div>
                </Button>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

ModalDailog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleRefreshToken: PropTypes.func,
};

ErrorDialog.propTypes = {
  message: PropTypes.object,
  open: PropTypes.bool,
  handlerCloseDialog: PropTypes.func,
};

export default ModalDailog;
