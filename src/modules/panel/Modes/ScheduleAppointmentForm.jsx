import { Button, Col, Row } from 'antd';
import { Autocomplete, DatetimePicker, TextArea } from 'components';
import { Formik } from 'formik';
import React, { useContext, useEffect } from 'react';
import { SuggestionsContext, AppointmentContext } from 'store';
import { REQUEST_STATUS, ROLES } from 'strings';
import { calculateIsLoading } from 'utils';
import { number, object, string } from 'yup';
import './Forms.less';

const initialValues = {
  doctorId: undefined,
  patientId: undefined,
  scheduledDate: undefined,
  description: '',
};

const validationSchema = object().shape({
  doctorId: number().required('Please fill the selection'),
  patientId: number().required('You have to select valid patient'),
  scheduledDate: string().required('You have to enter the appointment date'),
  description: string()
    .required('Please enter a short description min. 20 symbols')
    .min(20, 'Please add at least 20 symbols.'),
});

const ScheduleAppointmentForm = () => {
  const {
    usersByRole,
    patients,
    patientsStatus,
    updateRoleSuggestions,
    updatePatientsSuggestions,
  } = useContext(SuggestionsContext);

  useEffect(() => {
    updateRoleSuggestions(ROLES.Doctor);
    updatePatientsSuggestions();
  }, []);

  const { scheduleAppointment } = useContext(AppointmentContext);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        if (scheduleAppointment(values))
          actions.resetForm({ values: initialValues });
      }}>
      {({ submitForm, values }) => (
        <Row gutter={16} style={{ height: '100%' }}>
          <Col
            className="mode-form-col"
            span={12}
            style={{ borderRight: '1px solid #f0f0f0' }}>
            <Autocomplete
              placeholder="Doctor"
              name="doctorId"
              options={usersByRole[ROLES.Doctor].data}
              isLoading={calculateIsLoading(usersByRole[ROLES.Doctor].status)}
            />
            <Autocomplete
              placeholder="Patient"
              name="patientId"
              options={patients}
              isLoading={calculateIsLoading(patientsStatus)}
            />
            <DatetimePicker
              placeholder="Date of Appointment"
              name="scheduledDate"
              onlyFuture
            />
          </Col>
          <Col className="mode-form-col" span={12}>
            <TextArea
              rows={4}
              name="description"
              placeholder="Description of Appointment"
            />
            <Button
              style={{ minWidth: 240 }}
              onClick={submitForm}
              size="large"
              type="primary">
              Schedule the appointment
            </Button>
          </Col>
        </Row>
      )}
    </Formik>
  );
};

export default ScheduleAppointmentForm;
