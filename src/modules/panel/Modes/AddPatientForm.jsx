import { Button, Col, Row, Typography } from 'antd';
import { TextField } from 'components';
import { Formik } from 'formik';
import React from 'react';
import PatientService from 'services/patients';
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

const AddPatientForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async values => {
        const { status, error } = await PatientService.create(values);
        if (status === REQUEST_STATUS.ERROR)
          displaySnackbar('error', `Request has failed: ${error.message}`);
        else displaySnackbar('success', 'Patient has been added');
      }}>
      {({ submitForm }) => (
        <Row gutter={16} style={{ height: '100%' }}>
          <Col
            className="add-employee-form-col"
            span={12}
            style={{ borderRight: '1px solid #f0f0f0' }}>
            <Title level={4}> Personal Data </Title>
            <TextField name="firstName" placeholder="First Name" />
            <TextField name="lastName" placeholder="Last Name" />
            <TextField name="peselNumber" placeholder="PESEL Number" />
          </Col>
          <Col className="add-employee-form-col" span={12}>
            <Title level={4}> Address </Title>
            <TextField name="country" placeholder="Country" />
            <TextField name="postalCode" placeholder="Postal Code" />
            <TextField name="city" placeholder="City" />
            <TextField name="street" placeholder="Street" />
            <TextField name="buildingNumber" placeholder="Building Number" />
            <Button onClick={submitForm} size="large" type="primary">
              Add Patient
            </Button>
          </Col>
        </Row>
      )}
    </Formik>
  );
};

export default AddPatientForm;
