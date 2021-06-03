import { Col, Row } from 'antd';
import { Autocomplete } from 'components';
import { Formik } from 'formik';
import React, { useContext } from 'react';
import { SuggestionsContext } from 'store';
import { number, object } from 'yup';
import './Forms.less';

const initialValues = {
  doctorId: null,
};

const validationSchema = object().shape({
  doctorId: number().required('Please fill the selection'),
});

const ScheduleAppointmentForm = () => {
  const suggestions = useContext(SuggestionsContext);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async values => {}}>
      {({ submitForm, values }) => (
        <Row gutter={16} style={{ height: '100%' }}>
          <Col
            className="mode-form-col"
            span={12}
            style={{ borderRight: '1px solid #f0f0f0' }}>
            <Autocomplete
              placeholder="Doctor"
              name="doctorId"
              options={suggestions.usersByRole}
            />
          </Col>
          <Col className="mode-form-col" span={12}>
            {values.doctorId}
          </Col>
        </Row>
      )}
    </Formik>
  );
};

export default ScheduleAppointmentForm;
