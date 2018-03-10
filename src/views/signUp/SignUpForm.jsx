import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Form, Icon, Alert } from 'antd';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import validator from 'validator';
import { omit } from 'ramda';
import { push } from 'react-router-redux';

import wrapInput, { tailFormItemLayout } from '../../utils/wrapInput';
import { signUp } from '../../api/user-store';
import { handleApiError } from '../../utils/errors';

const FormItem = Form.Item;
const SIGN_UP_FORM = 'SIGN_UP_FORM';
const WrappedInput = wrapInput(Input);

function SignUpComponent(props) {
  const { handleSubmit, submitting, t, error } = props;
  return (
    <Form className="SignUpComponent">
      {error && ( // TODO factor + trad
        <FormItem>
          <Alert message="Warning" type="warning" description={error} />
        </FormItem>
      )}
      <Field
        className="SignUpComponent__email"
        label={t('Email')}
        name="email"
        component={WrappedInput}
        type="email"
        prefix={<Icon type="user" className="SignUpComponent__emailIcon" />}
        placeholder={t('email')}
        required
      />
      <Field
        className="SignUpComponent__password"
        label={t('Password')}
        name="password"
        component={WrappedInput}
        type="password"
        prefix={<Icon type="lock" className="SignUpComponent__passwordIcon" />}
        placeholder={t('password')}
        required
      />
      <Field
        className="SignUpComponent__passwordConfirmation"
        label={t('confirmPassword')}
        name="passwordConfirmation"
        component={WrappedInput}
        type="password"
        prefix={<Icon type="lock" className="SignUpComponent__passwordIcon" />}
        placeholder={t('password')}
        required
      />
      <FormItem {...tailFormItemLayout}>
        <Button type="primary" loading={submitting} onClick={handleSubmit}>
          {t('signUp')}
        </Button>
      </FormItem>
    </Form>
  );
}

SignUpComponent.defaultProps = {
  error: null,
};

SignUpComponent.propTypes = {
  t: PropTypes.func.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

function validate(user, { t }) {
  const errors = {};

  if (!user.email) {
    errors.email = t('Required');
  } else if (!validator.isEmail(user.email)) {
    errors.email = t('Should be a valid email');
  }

  if (!user.password) {
    errors.password = t('Required');
  } else if (user.password.length < 6) {
    errors.password = t('Should have 6 characters at least');
  }

  if (!user.passwordConfirmation) {
    errors.passwordConfirmation = t('Required');
  } else if (user.passwordConfirmation !== user.password) {
    errors.passwordConfirmation = t('Does not match the password');
  }

  return errors;
}

const SignUpForm = reduxForm({
  form: SIGN_UP_FORM,
  validate,
  // asyncChangeFields: ['email'], TODO
  onSubmit(user) {
    const userInput = omit(['passwordConfirmation'], user);
    return signUp(userInput).catch(
      handleApiError(error => {
        throw new SubmissionError({ _error: error.message });
      }),
    );
  },
  onSubmitSuccess(result, dispatch) {
    dispatch(push('/signedUp'));
  },
})(SignUpComponent);

export default SignUpForm;
