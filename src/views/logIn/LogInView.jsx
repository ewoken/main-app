import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

import LogInForm from './LogInForm';

function LogInView(props) {
  return (
    <div className="LogInView">
      <LogInForm t={props.t} />
    </div>
  );
}

LogInView.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('LoginView')(LogInForm);
