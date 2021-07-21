import { Button, Col, Row } from 'antd';
import { PasswordField, Select, TextField } from 'components';
import { Formik } from 'formik';
import React from 'react';
import { AuthService } from 'services';
import { REQUEST_STATUS, ROLES } from 'strings';
import { displaySnackbar } from 'utils';
import { object, string } from 'yup';
import './Forms.less';

const initialValues = {
  login: '',
  password: '',
  firstName: '',
  lastName: '',
  role: null,
  permitNumber: '',
};

const validationSchema = object().shape({
  login: string().required(),
  password: string()
    .required()
    .min(8)
    .matches(
      /(?=.*[A-Z])(?=.*[0-9])/,
      'Password must contain a number and capital letter.',
    ),
  firstName: string().required(),
  lastName: string().required(),
  role: string().required(),
  permitNumber: string().when('role', {
    is: ROLES.Doctor,
    then: string().required(),
    otherwise: string().optional(),
  }),
});

const AddEmployeeForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        const { status, error } = await AuthService.create(values);
        if (status === REQUEST_STATUS.ERROR)
          displaySnackbar('error', `Request has failed: ${error.message}`);
        else {
          displaySnackbar('success', 'User has been added');
          actions.resetForm({ values: initialValues });
        }
      }}>
      {({ submitForm, values }) => (
        <Row gutter={16} style={{ height: '100%' }}>
          <Col
            className="mode-form-col"
            span={12}
            style={{ borderRight: '1px solid #f0f0f0' }}>
            <Select
              name="role"
              placeholder="Role"
              options={Object.values(ROLES)}
            />
            <TextField name="login" placeholder="Login" />
            <PasswordField name="password" placeholder="Password" />
          </Col>
          <Col className="mode-form-col" span={12}>
            <TextField name="firstName" placeholder="First Name" />
            <TextField name="lastName" placeholder="Last Name" />
            {values.role === ROLES.Doctor && (
              <TextField name="permitNumber" placeholder="Permit Number" />
            )}
            <Button onClick={submitForm} size="large" type="primary">
              Add Employee
            </Button>
          </Col>
        </Row>
      )}
    </Formik>
  );
};

export default AddEmployeeForm;
