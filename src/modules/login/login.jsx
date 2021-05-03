import { Card, Col, Layout, Row } from 'antd';
import { Footer, Navbar } from 'components';
import React from 'react';
import LoginForm from './LoginForm';
import './login.less';

const { Content } = Layout;

const Login = () => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Navbar />
      <Content>
        <Row align="middle" justify="center" style={{ height: '100%' }}>
          <Col span={8}>
            <Card className="login-card" title="Login">
              <LoginForm />
            </Card>
          </Col>
        </Row>
      </Content>
      <Footer />
    </Layout>
  );
};

export default Login;
