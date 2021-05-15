import { Image, Divider, Layout, Typography, Carousel } from 'antd';
import { Footer, Navbar } from 'components';
import React from 'react';
import './home.less';
// @ts-ignore
import businessPhoto1 from 'assets/przychodnia1.jpg';
// @ts-ignore
import businessPhoto2 from 'assets/przychodnia2.jpg';
// @ts-ignore
import businessPhoto3 from 'assets/przychodnia3.jpg';

const { Content } = Layout;

const Home = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar />
      <Content className="home-content">
        <Typography.Title level={3}>Przychodnia "Pod AEiI"</Typography.Title>
        <Divider orientation="left">Nasza oferta</Divider>
        <Carousel
          autoplay
          style={{
            height: '100%',
            borderTop: '5px solid #006db3',
            borderBottom: '20px solid #006db3',
            marginBottom: '20px',
          }}>
          <Image
            width="100%"
            style={{ objectFit: 'cover' }}
            preview={false}
            src={businessPhoto1}
          />
          <Image
            width="100%"
            preview={false}
            style={{ objectFit: 'cover' }}
            src={businessPhoto2}
          />
          <Image
            width="100%"
            preview={false}
            style={{ objectFit: 'cover' }}
            src={businessPhoto3}
          />
        </Carousel>
        <Typography.Title level={5}>
          Rejestracja przez Internet
        </Typography.Title>
        <Typography.Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dapibus
          dui eu ex iaculis luctus. Etiam viverra leo ac enim consequat
          hendrerit. Morbi posuere ligula sit amet sapien laoreet gravida. In
          sit amet eleifend nisl. Aliquam efficitur massa quis neque molestie
          vestibulum. Maecenas molestie consequat mi, quis pulvinar lorem
          consectetur in."
        </Typography.Paragraph>
      </Content>
      <Footer />
    </Layout>
  );
};

export default Home;
