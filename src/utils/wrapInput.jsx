import React from 'react';
import PropTypes from 'prop-types';
import wrapDisplayName from 'recompose/wrapDisplayName';
import { Form } from 'antd';

const FormItem = Form.Item;

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 },
  },
};

export const tailFormItemLayout = {
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
        <InputComponent {...input} {...otherProps} />
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

export default wrapInput;
