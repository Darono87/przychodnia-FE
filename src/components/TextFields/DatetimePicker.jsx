import { DatePicker } from 'antd';
import { Field } from 'formik';
import moment from 'moment';
import React from 'react';
import './TextFields.less';

const disabledDate = current => {
  // Can not select days before today
  return current && current < moment().endOf('day');
};

const DatetimePicker = ({
  name,
  placeholder,
  onlyFuture = false,
  ...props
}) => (
  <Field name={name}>
    {({ field, meta, form }) => (
      <div className="textfield_parent">
        <DatePicker
          showTime={{ format: 'HH:mm', minuteStep: 5 }}
          showNow={!onlyFuture}
          disabledDate={onlyFuture && disabledDate}
          {...field}
          {...props}
          onOk={() => null}
          onChange={date => form.setFieldValue(name, date)}
          size="large"
          placeholder={placeholder}
          className={meta.touched && meta.error ? 'field_error_soft' : ''}
          format="YYYY-MM-DD HH:mm"
        />
        {meta.touched && meta.error && (
          <div className="error_msg">{meta.error}</div>
        )}
      </div>
    )}
  </Field>
);

export default DatetimePicker;
