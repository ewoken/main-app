import React from 'react';
import PropTypes from 'prop-types';
import { omit } from 'ramda';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import SignUpForm from '../components/SignUpForm';
import { signUp } from '../api/user-store';

function SignUpView(props) {
  return (
    <div className="SignUpView">
      <SignUpForm onSubmit={props.onSignUpFormSubmit} />
    </div>
  );
}

SignUpView.propTypes = {
  onSignUpFormSubmit: PropTypes.func.isRequired,
};

export default connect(null, dispatch => ({
  onSignUpFormSubmit: user => {
    const userInput = omit(['passwordConfirmation'], user);
    signUp(userInput).then(res => {
      console.log('res', res);
      dispatch(push('/signedUp'));
    });
  },
}))(SignUpView);
