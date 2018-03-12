import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

import SignUpForm from './SignUpForm';

function SignUpView(props) {
  return (
    <div className="SignUpView">
      <SignUpForm t={props.t} />
    </div>
  );
}

SignUpView.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('SignUpView')(SignUpForm);
