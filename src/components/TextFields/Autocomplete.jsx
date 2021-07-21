import { AutoComplete, Spin } from 'antd';
import { Field, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import './TextFields.less';

const Autocomplete = ({
  name,
  placeholder,
  options,
  isLoading,
  reset,
  ...props
}) => {
  const { values } = useFormikContext();
  const [label, setLabel] = useState(undefined);
  const [rebounceFlag, setRebounceFlag] = useState(false);
  const [initFlag, setInitFlag] = useState(false);

  useEffect(() => {
    if (!initFlag && values.appointmentId && options) {
      setInitFlag(true);
      console.log(options);
      setLabel(
        options.find(option => option.value === values.appointmentId)?.label,
      );
    }
  }, [values.appointmentId]);

  if (isLoading === true)
    return (
      <div style={{ textAlign: 'center' }}>
        {placeholder}: <Spin />
      </div>
    );
  if (reset === true) setLabel(undefined);

  return (
    <Field name={name}>
      {({ field, meta, form }) => (
        <div className="textfield_parent">
          <AutoComplete
            {...field}
            {...props}
            onChange={to => {
              setLabel(to);
              if (!rebounceFlag) form.setFieldValue(name, undefined);
              else setRebounceFlag(false);
            }}
            value={label}
            onSelect={(to, option) => {
              form.setFieldValue(name, to);
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
