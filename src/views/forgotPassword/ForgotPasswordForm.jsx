import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Form, Icon, Alert } from 'antd';
import { Field, reduxForm } from 'redux-form';
import validator from 'validator';

import wrapInput, { tailFormItemLayout } from '../../utils/wrapInput';
import { sendResetPasswordEmail } from '../../api/user-store';
import { handleSubmitError } from '../../utils/errors';

const FormItem = Form.Item;
const FORGOT_PASSWORD_FORM = 'FORGOT_PASSWORD_FORM';
const WrappedInput = wrapInput(Input);

function ForgotPasswordComponent(props) {
  const { handleSubmit, submitting, t, error, submitSucceeded } = props;
  return (
    <Form className="ForgotPasswordComponent">
      {error && (
        <FormItem>
          <Alert {...error} />
        </FormItem>
      )}
      <Field
        className="ForgotPasswordComponent__email"
        label={t('Email')}
        name="email"
        component={WrappedInput}
        type="email"
        prefix={
          <Icon type="user" className="ForgotPasswordComponent__emailIcon" />
        }
        placeholder={t('email')}
        required
      />
      <FormItem {...tailFormItemLayout}>
        <Button
          type="primary"
          loading={submitting}
          onClick={handleSubmit}
          disabled={submitSucceeded}
        >
          {submitSucceeded ? t('Email sent') : t('Send email')}
        </Button>
      </FormItem>
    </Form>
  );
}

ForgotPasswordComponent.defaultProps = {
  error: null,
};

ForgotPasswordComponent.propTypes = {
  t: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.oneOf(['warning', 'error']),
  }),
  submitSucceeded: PropTypes.bool.isRequired,
};

function validate(user, { t, error }) {
  const errors = { _error: error };

  if (!user.email) {
    errors.email = t('Required');
  } else if (!validator.isEmail(user.email)) {
    errors.email = t('Should be a valid email');
  }

  return errors;
}

const ForgotPasswordForm = reduxForm({
  form: FORGOT_PASSWORD_FORM,
  validate,
  persistentSubmitErrors: true,
  onSubmit(input, dispatch, { t }) {
    return sendResetPasswordEmail(input).catch(handleSubmitError(t));
  },
  /* onSubmitSuccess(user, dispatch) {
    // TODO email sent
  }, */
})(ForgotPasswordComponent);

export default ForgotPasswordForm;
