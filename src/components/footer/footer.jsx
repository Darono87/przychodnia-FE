import React from 'react';
import { Layout } from 'antd';
import './footer.less';

const { Footer: BaseFooter } = Layout;

const Footer = () => {
  return <BaseFooter className="footer-main">© 2021 by super devs</BaseFooter>;
};

export default Footer;
