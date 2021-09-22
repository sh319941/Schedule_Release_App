import React from 'react';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { useStyles, styleData } from './ScheduleCheckStyles';

const ScheduleCheckData = (props) => {
  const { image, action, message } = props;
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        direction="column"
        spacing={2}
        className={classes.contentHeading}
        justify="center"
        alignItems="center"
      >
        <Grid itam>{image}</Grid>
        <Grid item>{action}</Grid>
        <Grid item className={action === 'Refuelling Rejected' ? classes.msgDeclineContent : classes.msgContent}>
          <Typography variant="body1" style={styleData}>
            {' '}
            {message}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};
ScheduleCheckData.propTypes = {
  action: PropTypes.string,
  message: PropTypes.string,
  image: PropTypes.string,
};
export default ScheduleCheckData;
