import errorHandler from '../redux/errorHandler';

export default {
  addErrorToQueue: errorHandler.actions.addErrorToQueue,
  removeErrorFromQueue: errorHandler.actions.removeErrorFromQueue,
};
