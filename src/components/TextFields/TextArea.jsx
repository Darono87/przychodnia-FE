import { Input } from 'antd';
import { Field } from 'formik';
import React from 'react';
import './TextFields.less';

const { TextArea: BaseTextArea } = Input;

const TextArea = ({ name, placeholder, ...props }) => (
  <Field name={name}>
    {({ field, meta }) => (
      <div className="textfield_parent">
        <BaseTextArea
          {...field}
          {...props}
          size="large"
          placeholder={placeholder}
          className={meta.touched && meta.error ? 'field_error_soft' : ''}
        />
        {meta.touched && meta.error && (
          <div className="error_msg">{meta.error}</div>
        )}
      </div>
    )}
  </Field>
);

export default TextArea;
