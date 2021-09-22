import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import errorHandler from '../../redux/errorHandler';
import ErrorHandlerComponent from './ErrorHandlerComponent';

const { removeErrorFromQueue, isPageAccess } = errorHandler.actions;

const mapStateToProps = (state) => ({
  errors: state[errorHandler.name].errors,
  isErrorModalOpen: state[errorHandler.name].isErrorModalOpen,
  isAccessPageOpen: state[errorHandler.name].isAccessPageOpen,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      removeErrorFromQueue,
      isPageAccess,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandlerComponent);
