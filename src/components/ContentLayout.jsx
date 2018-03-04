import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'antd';

const mainColumn = {
  xs: { offset: 1, span: 22 },
  md: { offset: 6, span: 12 },
};

function ContentLayout(props) {
  const { children } = props;
  return (
    <Row className="ContentLayout">
      <Col {...mainColumn}>{children}</Col>
    </Row>
  );
}

ContentLayout.defaultProps = {
  children: [],
};

ContentLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
};

export default ContentLayout;
