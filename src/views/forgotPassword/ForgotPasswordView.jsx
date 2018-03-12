import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

import ForgotPasswordForm from './ForgotPasswordForm';

function ForgotPasswordView(props) {
  return (
    <div className="ForgotPasswordView">
      <ForgotPasswordForm t={props.t} />
    </div>
  );
}

ForgotPasswordView.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('ForgotPasswordView')(ForgotPasswordForm);
