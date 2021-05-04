import { Space, Button } from 'antd';
import { Formik } from 'formik';
import { object, string } from 'yup';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { PATHS } from 'strings';
import { AuthContext } from '../../../store';
import { PasswordField, TextField } from '../../../components';

const initialValues = { login: '', password: '' };

const validationSchema = object().shape({
  login: string().required(),
  password: string().required(),
});

const LoginForm = () => {
  const { signIn } = useContext(AuthContext);
  const history = useHistory();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async values => {
        if (await signIn(values)) {
          history.push(PATHS.PANEL);
        }
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
