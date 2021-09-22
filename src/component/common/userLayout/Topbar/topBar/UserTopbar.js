import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PropTypes from 'prop-types';
import { useStyles } from './topBarStyles';

const UserTopbar = (props) => {
  const classes = useStyles();
  const { name } = props;
  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
      <Typography className={classes.contentHeading} color="textPrimary">
        Account
      </Typography>
      <Typography className={classes.content} color="textPrimary">
        {name}
      </Typography>
    </Breadcrumbs>
  );
};
UserTopbar.propTypes = {
  name: PropTypes.string,
};
export default UserTopbar;
