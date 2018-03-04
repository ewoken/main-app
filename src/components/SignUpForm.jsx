import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Form, Icon } from 'antd';
import { Field, reduxForm } from 'redux-form';
import wrapDisplayName from 'recompose/wrapDisplayName';

import validator from 'validator';

const FormItem = Form.Item;
const SIGN_UP_FORM = 'SIGN_UP_FORM';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 5,
    },
  },
};

// TODO utils
function wrapInput(InputComponent) {
  function WrappedInputComponent(props) {
    const { input, meta, label, required, ...otherProps } = props;
    return (
      <FormItem
        label={label}
        help={meta.touched && meta.error}
        required={required}
        validateStatus={meta.valid || !meta.touched ? 'success' : 'error'}
        {...formItemLayout}
      >
        <Input {...input} {...otherProps} />
      </FormItem>
    );
  }
  WrappedInputComponent.defaultProps = { label: undefined, required: false };

  WrappedInputComponent.propTypes = {
    input: PropTypes.shape({
      value: PropTypes.any,
      onChange: PropTypes.func,
    }).isRequired,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      valid: PropTypes.bool,
      error: PropTypes.string,
    }).isRequired,
    label: PropTypes.string,
    required: PropTypes.bool,
  };
  WrappedInputComponent.displayName = wrapDisplayName(
    InputComponent,
    'Wrapped',
  );
  return WrappedInputComponent;
}
const WrappedInput = wrapInput(Input);

function SignUpComponent(props) {
  const { handleSubmit } = props;
  return (
    <Form className="SignUpComponent">
      <Field
        className="SignUpComponent__email"
        label="Email"
        name="email"
        component={WrappedInput}
        type="text"
        prefix={<Icon type="user" className="SignUpComponent__emailIcon" />}
        placeholder="email"
        required
      />
      <Field
        className="SignUpComponent__password"
        label="Password"
        name="password"
        component={WrappedInput}
        type="password"
        prefix={<Icon type="lock" className="SignUpComponent__passwordIcon" />}
        placeholder="password"
        required
      />
      <Field
        className="SignUpComponent__passwordConfirmation"
        label="Confirm Password"
        name="passwordConfirmation"
        component={WrappedInput}
        type="password"
        prefix={<Icon type="lock" className="SignUpComponent__passwordIcon" />}
        placeholder="confirm password"
        required
      />
      <FormItem {...tailFormItemLayout}>
        <Button type="primary" onClick={handleSubmit}>
          Sign Up
        </Button>
      </FormItem>
    </Form>
  );
}
SignUpComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

function validate(user) {
  const errors = {};

  if (!user.email) {
    errors.email = 'Required';
  } else if (!validator.isEmail(user.email)) {
    errors.email = 'Should be a valid email';
  }

  if (!user.password) {
    errors.password = 'Required';
  } else if (user.password.length < 6) {
    errors.password = 'Should have 6 characters at least';
  }

  if (!user.passwordConfirmation) {
    errors.passwordConfirmation = 'Required';
  } else if (user.passwordConfirmation !== user.password) {
    errors.passwordConfirmation = 'Does not match the password';
  }

  return errors;
}

const SignUpForm = reduxForm({
  form: SIGN_UP_FORM,
  validate,
})(SignUpComponent);

export default SignUpForm;
