import { Col, Row, Button } from 'antd';
import { Autocomplete, TextArea } from 'components';
import { Formik } from 'formik';
import React, { useContext, useEffect } from 'react';
import { PhysicalExaminationContext, SuggestionsContext } from 'store';
import { calculateIsLoading } from 'utils';
import { object, number, string } from 'yup';
import './Forms.less';

const getInitialValues = appointmentId => ({
  appointmentId,
  examinationCodeId: undefined,
  result: undefined,
});

const validationSchema = object().shape({
  appointmentId: number().required('Please fill the selection'),
  examinationCodeId: number().required('Please enter the examination code'),
  result: string().required('Please enter the result of the examination'),
});

const AddPhysicalExaminationForm = ({ modeId, setModeId }) => {
  const {
    updateAppointmentsSuggestions,
    updateExaminationCodesSuggestions,
    appointments,
    appointmentsStatus,
    examinationCodes,
    examinationCodesStatus,
  } = useContext(SuggestionsContext);
  const { createPhysicalExamination } = useContext(PhysicalExaminationContext);

  useEffect(() => {
    updateAppointmentsSuggestions();
    updateExaminationCodesSuggestions();

    return () => {
      setModeId(-1);
    };
  }, []);

  return (
    <Formik
      initialValues={getInitialValues(modeId === -1 ? undefined : modeId)}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        if (createPhysicalExamination(values))
          actions.resetForm({
            values: getInitialValues(modeId === -1 ? undefined : modeId),
          });
      }}>
      {({ submitForm }) => (
        <Row gutter={16} style={{ height: '100%' }}>
          <Col
            className="mode-form-col"
            span={12}
            style={{ borderRight: '1px solid #f0f0f0' }}>
            <Autocomplete
              placeholder="Appointments"
              name="appointmentId"
              options={appointments}
              isLoading={calculateIsLoading(appointmentsStatus)}
            />
            <Autocomplete
              placeholder="Examination Code"
              name="examinationCodeId"
              options={examinationCodes}
              isLoading={calculateIsLoading(examinationCodesStatus)}
            />
          </Col>
          <Col className="mode-form-col" span={12}>
            <TextArea
              rows={6}
              name="result"
              placeholder="Physical Examination Result"
            />
            <Button
              style={{ width: 300 }}
              onClick={submitForm}
              size="large"
              type="primary">
              Add Physical Examination
            </Button>
          </Col>
        </Row>
      )}
    </Formik>
  );
};

export default AddPhysicalExaminationForm;
