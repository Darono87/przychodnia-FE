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
import EmailForm from './EmailForm';
import { Map } from './Map';
import { OpenHours } from './OpenHours';

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
        <Typography.Paragraph>
          Przychodnia pod AEI to przychodnia z tradycjami. Istnieje od 1964 roku
          i trzyma się zasady „Jesteśmy Przychodnią przyjazną dla wszystkich”.
          Zapraszamy pacjentów do korzystania z naszej ofert medycznej. <br />
          Nasza przychodnia oferuje kompleksowe usługi medyczne. Posiadamy
          szereg poradni, świadczących bardzo szeroki wachlarz usług. Wysoko
          wykwalifikowani lekarze i specjaliści zapewniają najwyższy poziom
          świadczonych usług.
        </Typography.Paragraph>
        <OpenHours />
        <Map />
        <Typography.Title level={5}>Skontaktuj się z nami</Typography.Title>
        <EmailForm />
      </Content>
      <Footer />
    </Layout>
  );
};

export default Home;
