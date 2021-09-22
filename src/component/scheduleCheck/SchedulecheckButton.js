import React from 'react';
import { Grid, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useStyles } from './ScheduleCheckStyles';

const SchedulecheckButton = (props) => {
  const { onCancel, validate } = props;
  const classes = useStyles();
  return (
    <>
      <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
        <Grid item>
          <Button fullWidth variant="contained" onClick={(e) => onCancel()} width="80%" className={classes.updatebtn}>
            <div className="SingleCheckBtn">Clear</div>{' '}
          </Button>
        </Grid>
        <Grid item>
          <Button fullWidth onClick={(e) => validate()} className={classes.cancelBtn}>
            <div className="SingleCheckBtn">Get Status</div>{' '}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
SchedulecheckButton.propTypes = {
  onCancel: PropTypes.func,
  validate: PropTypes.func,
};
export default SchedulecheckButton;
