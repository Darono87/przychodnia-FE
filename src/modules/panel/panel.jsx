import { Card, Empty, Layout, Menu } from 'antd';
import React, { useContext, useState } from 'react';
import { Footer, Navbar } from 'components';
import { PATHS } from 'strings';
import { Redirect } from 'react-router';
import { AuthContext } from '../../store';
import { modes } from './panel.utils.jsx';
import './panel.less';
import Modes from './Modes';

const { Content, Sider } = Layout;

const Panel = () => {
  const { accessToken, role } = useContext(AuthContext);
  const [selectedMode, setSelectedMode] = useState(null);
  if (!accessToken) {
    return <Redirect to={PATHS.HOMEPAGE} />;
  }
  return (
    <Layout style={{ height: '100vh' }}>
      <Navbar />
      <Layout>
        <Sider width={250} style={{ overflow: 'auto' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ minHeight: '100%' }}>
            {modes
              .filter(({ roles }) => roles.includes(role))
              .map(({ name, icon }, index) => (
                <Menu.Item
                  onClick={() => setSelectedMode(name)}
                  key={`menu-item-${index}`}
                  icon={icon}>
                  {name}
                </Menu.Item>
              ))}
          </Menu>
        </Sider>
        <Layout>
          <Content>
            <Card title={selectedMode || ''} className="panel-main-card">
              {selectedMode ? (
                <Modes mode={selectedMode} />
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="Pick the option from the drawer on the left hand side."
                />
              )}
            </Card>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Panel;
