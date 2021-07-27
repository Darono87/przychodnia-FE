import { Button, Col, Row, Spin, Typography } from 'antd';
import { TextField } from 'components';
import { Formik } from 'formik';
import React, { useContext, useEffect } from 'react';
import PatientService from 'services/patients';
import { PatientContext } from 'store';
import { REQUEST_STATUS } from 'strings';
import { displaySnackbar } from 'utils';
import { object, string } from 'yup';

const regexpPesel = /^\d{11}$/;
const regexpPostalCode = /^[0-9]{2}-[0-9]{3}$/;

const { Title } = Typography;

const initialValues = {
  firstName: '',
  lastName: '',
  peselNumber: '',
  country: '',
  postalCode: '',
  city: '',
  street: '',
  buildingName: '',
};

const extractInitialValues = backendData => ({
  ...backendData.address,
  ...backendData,
  address: undefined,
});

const validationSchema = object().shape({
  firstName: string().required(),
  lastName: string().required(),
  peselNumber: string()
    .required()
    .matches(regexpPesel, 'Pesel should be 11 numbers'),
  country: string().required(),
  postalCode: string()
    .required()
    .matches(regexpPostalCode, 'Postal Code should be: XX-XXX'),
  city: string().required(),
  street: string().required(),
  buildingNumber: string().required(),
});

const AddPatientForm = ({ modeId, setModeId }) => {
  const { getPatientDetails, patientDetails, patientsStatus } = useContext(
    PatientContext,
  );

  useEffect(() => {
    if (modeId !== -1) getPatientDetails({ id: modeId });

    return () => {
      setModeId(-1);
    };
  }, [modeId]);

  if (
    (modeId !== -1 &&
      patientsStatus === REQUEST_STATUS.SUCCESS &&
      patientDetails) ||
    modeId === -1
  )
    return (
      <Formik
        initialValues={
          modeId === -1 ? initialValues : extractInitialValues(patientDetails)
        }
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          const { status, error } = await PatientService[
            modeId !== -1 ? 'update' : 'create'
          ](values);
          if (status === REQUEST_STATUS.ERROR)
            displaySnackbar('error', `Request has failed: ${error.message}`);
          else
          {
            displaySnackbar(
              'success',
              `Patient has been ${modeId !== -1 ? 'updated' : 'added'}`,
            );
            actions.resetForm({ values: initialValues });
          }
        }}
        {({ submitForm }) => (
          <Row gutter={16} style={{ height: '100%' }}>
            <Col
              className="mode-form-col"
              span={12}
              style={{ borderRight: '1px solid #f0f0f0' }}>
              <Title level={4}> Personal Data </Title>
              <TextField name="firstName" placeholder="First Name" />
              <TextField name="lastName" placeholder="Last Name" />
              <TextField name="peselNumber" placeholder="PESEL Number" />
            </Col>
            <Col className="mode-form-col" span={12}>
              <Title level={4}> Address </Title>
              <TextField name="country" placeholder="Country" />
              <TextField name="postalCode" placeholder="Postal Code" />
              <TextField name="city" placeholder="City" />
              <TextField name="street" placeholder="Street" />
              <TextField name="buildingNumber" placeholder="Building Number" />
              <Button onClick={submitForm} size="large" type="primary">
                {modeId === -1 ? 'Add Patient' : 'Update Patient'}
              </Button>
            </Col>
          </Row>
        )}
      </Formik>
    );

  return <Spin size="large" />;
};

export default AddPatientForm;
