import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';
import { Field } from 'formik';
import React from 'react';
import './TextFields.less';

const PasswordField = ({ name, placeholder, ...props }) => (
  <Field name={name}>
    {({ field, meta }) => (
      <Input.Password
        {...props}
        {...field}
        size="large"
        placeholder={placeholder}
        iconRender={visible =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        className={meta.touched && meta.error ? 'field_error_soft' : ''}
      />
    )}
  </Field>
);

export default PasswordField;
