import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '../common/Utilities/Alert';
import constants from '../../constants';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ hasError: false });
  };

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    const {
      errorHandler: { statusCode500 },
    } = constants;

    const errorsInfo = () => statusCode500.message;

    if (hasError) {
      return (
        <Snackbar
          open={hasError}
          autoHideDuration={6000}
          onClose={() => this.handleClose()}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => this.handleClose()} severity="error">
            {errorsInfo()}
          </Alert>
        </Snackbar>
      );
    }
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.object,
};
export default ErrorBoundary;
