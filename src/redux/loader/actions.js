import types from './types';

function isLoder(value) {
  return {
    type: types.IS_LOADER,
    value,
  };
}

export default {
  isLoder,
};
