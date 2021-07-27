import { Card, Col, Layout, Row } from 'antd';
import { Footer, Navbar } from 'components';
import React, { useContext } from 'react';
import './login.less';
import { AuthContext } from 'store';
import { Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';

const { Content } = Layout;

const Login = () => {
  const { accessToken } = useContext(AuthContext);

  if (accessToken) {
    return <Redirect to="/panel" />;
  }

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
