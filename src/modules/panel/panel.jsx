import { Card, Empty, Layout, Menu } from 'antd';
import React, { useContext, useState } from 'react';
import { Footer, Navbar } from 'components';
import { PATHS } from 'strings';
import {
  AppointmentContextProvider,
  PhysicalExaminationContextProvider,
} from 'store';
import { Redirect } from 'react-router';
import { AuthContext } from '../../store';
import { modes } from './panel.utils.jsx';
import './panel.less';
import Modes from './Modes';

const { Content, Sider } = Layout;

const Panel = () => {
  const { accessToken, role } = useContext(AuthContext);
  const [selectedMode, setSelectedMode] = useState(null);
  const [modeId, setModeId] = useState(-1);
  if (!accessToken) {
    return <Redirect to={PATHS.HOMEPAGE} />;
  }
  return (
    <AppointmentContextProvider>
      <PhysicalExaminationContextProvider>
        <Layout style={{ height: '100vh' }}>
          <Navbar />
          <Layout>
            <Sider width={250} style={{ overflow: 'auto' }}>
              <Menu
                mode="inline"
                selectedKeys={[selectedMode]}
                style={{ minHeight: '100%' }}>
                {modes
                  .filter(({ roles }) => roles.includes(role))
                  .map(({ name, icon }, index) => (
                    <Menu.Item
                      onClick={() => setSelectedMode(name)}
                      key={name}
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
                    <Modes
                      mode={selectedMode}
                      setMode={setSelectedMode}
                      modeId={modeId}
                      setModeId={setModeId}
                    />
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
      </PhysicalExaminationContextProvider>
    </AppointmentContextProvider>
  );
};

export default Panel;
