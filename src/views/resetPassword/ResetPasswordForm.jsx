import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Form, Icon, Alert } from 'antd';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { push } from 'react-router-redux';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import wrapInput, { tailFormItemLayout } from '../../utils/wrapInput';
import { resetPassword } from '../../api/user-store';
import { handleSubmitError } from '../../utils/errors';
import { queryObjectSelector } from '../../store/selectors';

const FormItem = Form.Item;
const RESET_PASSWORD_FORM = 'RESET_PASSWORD_FORM';
const WrappedInput = wrapInput(Input);

function ResetPasswordComponent(props) {
  const { handleSubmit, submitting, t, error } = props;
  return (
    <Form className="ResetPasswordComponent">
      {error && (
        <FormItem>
          <Alert {...error} />
        </FormItem>
      )}
      <Field
        className="ResetPasswordComponent__password"
        label={t('Password')}
        name="password"
        component={WrappedInput}
        type="password"
        prefix={
          <Icon type="lock" className="ResetPasswordComponent__passwordIcon" />
        }
        placeholder={t('password')}
        required
      />
      <Field
        className="ResetPasswordComponent__passwordConfirmation"
        label={t('Confirm password')}
        name="passwordConfirmation"
        component={WrappedInput}
        type="password"
        prefix={
          <Icon type="lock" className="ResetPasswordComponent__passwordIcon" />
        }
        placeholder={t('password')}
        required
      />
      <FormItem {...tailFormItemLayout}>
        <Button type="primary" loading={submitting} onClick={handleSubmit}>
          {t('Reset password')}
        </Button>
      </FormItem>
    </Form>
  );
}

ResetPasswordComponent.defaultProps = {
  error: null,
};

ResetPasswordComponent.propTypes = {
  t: PropTypes.func.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.oneOf(['warning', 'error']),
  }),
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

function validate(user, { t }) {
  const errors = {};

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

const form = reduxForm({
  form: RESET_PASSWORD_FORM,
  validate,
  persistentSubmitErrors: true,
  onSubmit({ password }, dispatch, { t, resetPasswordToken }) {
    return resetPassword({ password, token: resetPasswordToken }).catch(
      handleSubmitError(t, domainError => {
        if (domainError.errorCode === resetPassword.INVALID_EXPIRED_TOKEN) {
          throw new SubmissionError({
            _error: {
              type: 'warning',
              message: domainError.message, // TODO
            },
          });
        }
      }),
    );
  },
  onSubmitSuccess(result, dispatch) {
    dispatch(push('/logIn'));
  },
});
const connection = connect(state => ({
  ...queryObjectSelector(state),
}));

const ResetPasswordForm = compose(connection, form)(ResetPasswordComponent);

export default ResetPasswordForm;
