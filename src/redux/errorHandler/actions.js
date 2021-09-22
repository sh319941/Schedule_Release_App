import types from './types';

function addErrorToQueue(error) {
  return {
    type: types.PUSH_ERROR,
    error,
  };
}

function removeErrorFromQueue() {
  return {
    type: types.REMOVE_ERROR,
  };
}

function isPageAccess(value) {
  return {
    type: types.IS_PAGE_ACCESS,
    value,
  };
}

export default {
  addErrorToQueue,
  removeErrorFromQueue,
  isPageAccess,
};
