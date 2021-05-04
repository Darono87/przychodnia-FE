import React, { useCallback, useState } from 'react';
import { notification } from 'antd';
import { AuthService } from '../services';

const getDefaultState = () => ({
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  role: localStorage.getItem('role'),
});

const AuthContext = React.createContext(getDefaultState());

const openNotificationWithIcon = (type, message) => {
  notification[type]({
    message,
  });
};

const AuthContextProvider = ({ children }) => {
  const [state, setState] = useState(getDefaultState());
  const signIn = useCallback(async ({ login, password }) => {
    const result = await AuthService.signIn(login, password);
    if (result.data) {
      localStorage.setItem('accessToken', result.data.accessToken);
      localStorage.setItem('refreshToken', result.data.refreshToken);
      localStorage.setItem('role', result.data.role);
      // @ts-ignore
      setState(result.data);
      openNotificationWithIcon('success', 'Login successful!');
      return true;
    }
    openNotificationWithIcon('error', 'Login unsuccessful!');
    return false;
  }, []);
  const signOut = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
    setState(getDefaultState());
    openNotificationWithIcon('success', 'Successfully logged out');
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
