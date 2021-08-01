import { Space, Button } from 'antd';
import { Form, Formik } from 'formik';
import { object, string } from 'yup';
import React from 'react';
import { REQUEST_STATUS } from 'strings';
import { displaySnackbar } from 'utils';
import EmailService from 'services/email';
import { TextField, TextArea } from '../../../components';

const initialValues = { mail: '', message: '' };

const validationSchema = object().shape({
  mail: string().required().email(),
  message: string().required(),
});

const EmailForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async values => {
        const { status, error } = await EmailService.send(values);
        if (status === REQUEST_STATUS.ERROR)
          displaySnackbar('error', `Request has failed: ${error.message}`);
        else displaySnackbar('success', 'Email has been sent');
      }}>
      {({ submitForm }) => (
        <Form>
          <Space
            size="large"
            direction="vertical"
            style={{ width: '60%', marginLeft: '20%' }}>
            <TextField name="mail" placeholder="Your email" />
            <TextArea name="message" placeholder="Message" />
            <Button onClick={submitForm} size="large" type="primary">
              Send Email
            </Button>
          </Space>
        </Form>
      )}
    </Formik>
  );
};

export default EmailForm;
