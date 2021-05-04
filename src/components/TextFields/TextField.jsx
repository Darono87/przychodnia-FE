import { Input } from 'antd';
import { Field } from 'formik';
import React from 'react';
import './TextFields.less';

const TextField = ({ name, placeholder, ...props }) => (
  <Field name={name}>
    {({ field, meta }) => (
      <Input
        {...field}
        {...props}
        size="large"
        placeholder={placeholder}
        className={meta.touched && meta.error ? 'field_error_soft' : ''}
      />
    )}
  </Field>
);

export default TextField;