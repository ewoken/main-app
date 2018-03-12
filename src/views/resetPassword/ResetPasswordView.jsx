import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

import ResetPasswordForm from './ResetPasswordForm';

function ResetPasswordView(props) {
  return (
    <div className="ResetPasswordView">
      <ResetPasswordForm t={props.t} />
    </div>
  );
}

ResetPasswordView.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('ResetPasswordView')(ResetPasswordForm);
