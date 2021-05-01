import { Layout } from 'antd';
import React from 'react';
import './login.less';

const { Header, Content, Footer } = Layout;

const Login = () => {
  return (
    <Layout>
      <Header className="test">Header</Header>
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Layout>
  );
};

export default Login;
