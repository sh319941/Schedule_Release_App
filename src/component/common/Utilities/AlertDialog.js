import React from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { logout } from './Logout';
import { useStyles } from '../../../assets/css/gridCss';

export default function AlertDialog(props) {
  const classes = useStyles();
  const { open, message } = props;
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
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
                <Button fullWidth variant="contained" onClick={logout} className={classes.cancelBtn}>
                  <div className="submit">Ok</div>
                </Button>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
AlertDialog.propTypes = {
  message: PropTypes.bool,
  open: PropTypes.object,
};
