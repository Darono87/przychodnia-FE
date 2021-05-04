import React, { useContext } from 'react';
import { Button, Layout } from 'antd';
import './navbar.less';
import { AuthContext } from '../../store';

const { Header } = Layout;

const Navbar = () => {
  const { accessToken, signOut } = useContext(AuthContext);
  return (
    <Header className="navbar-main">
      <div>Przychodnia "Pod AEiI"</div>
      {accessToken && <Button onClick={signOut}> Log Out </Button>}
    </Header>
  );
};

export default Navbar;
