import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class ErrorHandler extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.log('Error', error, errorInfo); // eslint-disable-line no-console
    this.props.onError(error, errorInfo);
  }

  render() {
    return this.props.children;
  }
}

ErrorHandler.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
  onError: PropTypes.func.isRequired,
};

export default connect(null, {
  onError: () => push('/error'),
})(ErrorHandler);
