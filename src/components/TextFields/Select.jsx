import { Select as BaseSelect } from 'antd';
import { Field } from 'formik';
import React from 'react';
import './TextFields.less';

const { Option } = BaseSelect;

const Select = ({ name, placeholder, options, ...props }) => (
  <Field name={name}>
    {({ field, meta, form }) => (
      <BaseSelect
        {...field}
        {...props}
        onSelect={option => form.setFieldValue(name, option)}
        size="large"
        placeholder={placeholder}
        className={meta.touched && meta.error ? 'field_error_soft' : ''}>
        {options.map((option, index) => (
          <Option key={`option-${option}-${index}`} value={option}>
            {option}
          </Option>
        ))}
      </BaseSelect>
    )}
  </Field>
);

export default Select;
