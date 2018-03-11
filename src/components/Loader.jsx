import React from 'react';
import PropTypes from 'prop-types';

import { Spin, Alert } from 'antd';

class Loader extends React.Component {
  componentWillMount() {
    this.props.load();
  }

  render() {
    const { props } = this;
    const { isLoaded, error, spinSize } = props;
    const minHeight = { undefined: '30px', small: '20px', large: '50px' }[
      spinSize
    ];
    if (isLoaded && !error) {
      return this.props.children;
    } else if (error) {
      return <Alert type="error" {...error} />;
    }
    return (
      <Spin spinning={!this.props.isLoaded} size={spinSize}>
        <div style={{ width: '100%', height: '100%', minHeight }} />
      </Spin>
    );
  }
}

Loader.defaultProps = {
  error: null,
  spinSize: undefined,
};

Loader.propTypes = {
  load: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
    description: PropTypes.string,
  }),
  spinSize: PropTypes.oneOf([undefined, 'small', 'large']),
  children: PropTypes.element.isRequired,
};

export default Loader;
