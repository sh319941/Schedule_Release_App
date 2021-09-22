import MuiAlert from '@material-ui/lab/Alert';
import React from 'react';
 const Alert= (props) => {

    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  export default Alert;