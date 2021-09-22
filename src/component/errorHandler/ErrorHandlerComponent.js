import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '../common/Utilities/Alert';
import constants from '../../constants';
import { ErrorDialog } from '../common/modals';
import { logout } from '../common/Utilities/Logout';

const ErrorStack = (props) => {
  const { isErrorModalOpen, actions, errors, isAccessPageOpen } = props;
  const getStatusCodes = () => {
    if (isErrorModalOpen) {
      const statusCode = errors && errors.map((e) => e.response && e.response.status);
      return [...new Set(statusCode)];
    }
    return [];
  };
  const statusCodes = getStatusCodes();
  const getErrorStack = () => {
    const errorStack = [];
    const { errorHandler } = constants;
    if (statusCodes && statusCodes.includes(204)) {
      errorStack.push(errorHandler.statusCode401);
    }
    if (statusCodes && statusCodes.includes(400)) {
      const statusData = errors && errors.map((e) => e.response && e.response.data);
      errorStack.push({ header: '', message: statusData });
    }
    if (statusCodes && statusCodes.includes(401)) {
      actions.isPageAccess(true);
      errorStack.push(errorHandler.statusCode401);
    }
    if (statusCodes && statusCodes.includes(404)) {
      errorStack.push(errorHandler.statusCode404);
    }
    if (statusCodes && statusCodes.includes(500)) {
      actions.isPageAccess(true);
      errorStack.push(errorHandler.statusCode500);
    }

    return errorStack;
  };

  const handleClose = () => {
    actions.removeErrorFromQueue();
  };

  const handlerCloseDialog = () => {
    actions.isPageAccess(false);
    logout();
  };
  const handler500CloseDialog = () => {
    actions.isPageAccess(false);
    actions.removeErrorFromQueue();
  };

  const errorsInfo = () => {
    const errs = getErrorStack();
    return errs.map((e) => (
      <>
        <div>{e.header}</div>
        <div>{e.message}</div>
      </>
    ));
  };
  return (
    <>
      {isErrorModalOpen && !isAccessPageOpen && (statusCodes !== undefined || statusCodes !== '') && (
        <Snackbar
          open={isErrorModalOpen}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={
            statusCodes && statusCodes.includes(400)
              ? {
                  vertical: 'bottom',
                  horizontal: 'center',
                }
              : {
                  vertical: 'top',
                  horizontal: 'center',
                }
          }
        >
          <Alert onClose={handleClose} severity={statusCodes === 204 ? 'success' : 'error'}>
            {errorsInfo()}
          </Alert>
        </Snackbar>
      )}
      <ErrorDialog
        open={isAccessPageOpen}
        message={errorsInfo()}
        handlerCloseDialog={statusCodes && statusCodes.includes(401) ? handlerCloseDialog : handler500CloseDialog}
      />
    </>
  );
};

ErrorStack.propTypes = {
  isErrorModalOpen: PropTypes.bool,
  errors: PropTypes.array,
  actions: PropTypes.object,
  isAccessPageOpen: PropTypes.bool,
};
export default ErrorStack;
