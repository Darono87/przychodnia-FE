import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import React, { useContext } from 'react';
import { Footer, Navbar } from 'components';
import { PATHS } from 'strings';
import { Redirect } from 'react-router';
import { AuthContext } from '../../store';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

const Login = () => {
  const { accessToken } = useContext(AuthContext);
  if (!accessToken) {
    return <Redirect to={PATHS.HOMEPAGE} />;
  }
  return (
    <Layout style={{ height: '100vh' }}>
      <Navbar />
      <Layout>
        <Sider width={200} style={{ overflow: 'auto' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ minHeight: '100%' }}>
            <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
              <Menu.Item key="1">option1</Menu.Item>
              <Menu.Item key="2">option2</Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
              <Menu.Item key="5">option5</Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              icon={<NotificationOutlined />}
              title="subnav 3">
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Content>Content</Content>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Login;
