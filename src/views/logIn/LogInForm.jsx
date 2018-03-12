import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Form, Icon, Alert } from 'antd';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import validator from 'validator';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import wrapInput, { tailFormItemLayout } from '../../utils/wrapInput';
import { logIn } from '../../api/user-store';
import { setLoggedUser } from '../../store/loggedUser';
import { handleSubmitError } from '../../utils/errors';
import { queryObjectSelector } from '../../store/selectors';

const FormItem = Form.Item;
const LOG_IN_FORM = 'LOG_IN_FORM';
const WrappedInput = wrapInput(Input);

function LogInComponent(props) {
  const { handleSubmit, submitting, t, error } = props;
  return (
    <Form className="LogInComponent">
      {error && (
        <FormItem>
          <Alert {...error} />
        </FormItem>
      )}
      <Field
        className="LogInComponent__email"
        label={t('Email')}
        name="email"
        component={WrappedInput}
        type="email"
        prefix={<Icon type="user" className="LogInComponent__emailIcon" />}
        placeholder={t('email')}
        required
      />
      <Field
        className="LogInComponent__password"
        label={t('Password')}
        name="password"
        component={WrappedInput}
        type="password"
        prefix={<Icon type="lock" className="LogInComponent__passwordIcon" />}
        placeholder={t('password')}
        required
      />
      <Link to="/forgotPassword" href="/#/forgotPassword">
        {/* TODO position in page */}
        Forgot Password
      </Link>
      <FormItem {...tailFormItemLayout}>
        <Button type="primary" loading={submitting} onClick={handleSubmit}>
          {t('logIn')}
        </Button>
      </FormItem>
    </Form>
  );
}

LogInComponent.defaultProps = {
  error: null,
};

LogInComponent.propTypes = {
  t: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.oneOf(['warning', 'error']),
  }),
};

function validate(user, { t, error }) {
  const errors = { _error: error };

  if (!user.email) {
    errors.email = t('Required');
  } else if (!validator.isEmail(user.email)) {
    errors.email = t('Should be a valid email');
  }

  if (!user.password) {
    errors.password = t('Required');
  }

  return errors;
}

const form = reduxForm({
  form: LOG_IN_FORM,
  validate,
  persistentSubmitErrors: true,
  onSubmit(credentials, dispatch, { t }) {
    return logIn(credentials).catch(
      handleSubmitError(t, domainError => {
        if (domainError.errorCode === logIn.BAD_CREDENTIALS) {
          throw new SubmissionError({
            _error: {
              type: 'warning',
              message: t('Bad credentials'),
              description: undefined,
            },
          });
        }
      }),
    );
  },
  onSubmitSuccess(user, dispatch) {
    dispatch(setLoggedUser(user));
    dispatch(push('/signedUp'));
  },
});

const connection = connect(state => ({
  initialValues: queryObjectSelector(state),
}));

const LogInForm = compose(connection, form)(LogInComponent);

export default LogInForm;
