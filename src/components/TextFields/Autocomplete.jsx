import { AutoComplete, Spin } from 'antd';
import { Field } from 'formik';
import React, { useState } from 'react';
import './TextFields.less';

const Autocomplete = ({ name, placeholder, options, isLoading, ...props }) => {
  const [label, setLabel] = useState(undefined);
  const [rebounceFlag, setRebounceFlag] = useState(false);

  if (isLoading === true)
    return (
      <div style={{ textAlign: 'center' }}>
        {placeholder}: <Spin />
      </div>
    );

  return (
    <Field name={name}>
      {({ field, meta, form }) => (
        <div className="textfield_parent">
          <AutoComplete
            {...field}
            {...props}
            onChange={value => {
              setLabel(value);
              if (!rebounceFlag) form.setFieldValue(name, null);
              else setRebounceFlag(false);
            }}
            value={label}
            onSelect={(value, option) => {
              form.setFieldValue(name, value);
              setLabel(option.label);
              setRebounceFlag(true);
            }}
            onBlur={() => {
              if (!field.value) setLabel(null);
              form.setFieldTouched(name);
            }}
            options={options}
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
};

export default Autocomplete;
