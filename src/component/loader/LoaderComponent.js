import React from 'react';
import PropTypes from 'prop-types';

const LoaderComponent = (props) => {
  const { isLoader } = props;
  return <>{!!isLoader && <div className="load" />}</>;
};

LoaderComponent.propTypes = {
  isLoader: PropTypes.bool,
};
export default LoaderComponent;
