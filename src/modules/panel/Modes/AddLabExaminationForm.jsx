import { Col, Row, Button } from 'antd';
import { Autocomplete, TextArea } from 'components';
import { Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { LabExaminationContext, SuggestionsContext } from 'store';
import { calculateIsLoading } from 'utils';
import { object, number, string } from 'yup';
import { PATHS } from 'strings';
import './Forms.less';

const getInitialValues = appointmentId => ({
  appointmentId,
  examinationCodeId: undefined,
  doctorRemarks: undefined,
});

const validationSchema = object().shape({
  appointmentId: number().required('Please fill the selection'),
  examinationCodeId: number().required('Please enter the examination code'),
  doctorRemarks: string().optional(),
});

const AddLabExaminationForm = ({ modeId, setModeId }) => {
  const {
    updateAppointmentsSuggestions,
    updateExaminationCodesLabSuggestions,
    appointments,
    appointmentsStatus,
    examinationCodes,
    examinationCodesStatus,
  } = useContext(SuggestionsContext);
  const { createLabExamination } = useContext(LabExaminationContext);

  useEffect(() => {
    updateAppointmentsSuggestions();
    updateExaminationCodesLabSuggestions();
    return () => {
      setModeId(-1);
    };
  }, []);

  return (
    <Formik
      initialValues={getInitialValues(modeId === -1 ? undefined : modeId)}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        if (await createLabExamination(values)) {
          actions.resetForm({
            values: getInitialValues(modeId === -1 ? undefined : modeId),
          });
        }
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
              name="doctorRemarks"
              placeholder="Your Remarks"
            />
            <Button
              style={{ width: 300 }}
              onClick={submitForm}
              size="large"
              type="primary">
              Add Lab Examination
            </Button>
          </Col>
        </Row>
      )}
    </Formik>
  );
};

export default AddLabExaminationForm;
