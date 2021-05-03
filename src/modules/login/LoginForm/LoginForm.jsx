import { Space, Button } from 'antd';
import { Formik } from 'formik';
import { object, string } from 'yup';
import React, { useContext } from 'react';
import { AuthContext } from '../../../store';
import { PasswordField, TextField } from '../../../components';

const initialValues = { login: '', password: '' };

const validationSchema = object().shape({
  login: string().required(),
  password: string().required(),
});

const LoginForm = () => {
  const { signIn } = useContext(AuthContext);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async values => {
        await signIn(values);
      }}>
      {({ submitForm }) => (
        <Space
          size="large"
          direction="vertical"
          style={{ width: '60%', marginLeft: '20%' }}>
          <TextField name="login" placeholder="Login" />
          <PasswordField name="password" placeholder="Password" />
          <Button onClick={submitForm} size="large" type="primary">
            Sign in
          </Button>
        </Space>
      )}
    </Formik>
  );
};

export default LoginForm;
