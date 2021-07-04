import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { displaySnackbar } from 'utils';
import { PATHS } from 'strings';
import { useHistory } from 'react-router';
import { AuthService } from '../services';

const getDefaultState = () => ({
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  role: localStorage.getItem('role'),
});

const AuthContext = React.createContext(getDefaultState());

const AuthContextProvider = ({ children }) => {
  const [state, setState] = useState(getDefaultState());
  const history = useHistory();

  useEffect(() => {
    axios.interceptors.request.use(function (config) {
      const token = state.accessToken;
      config.headers.Authorization = `Bearer ${token}`;

      return config;
    });
  }, [state.accessToken]);

  const signIn = useCallback(async ({ login, password }) => {
    const result = await AuthService.signIn(login, password);
    if (result.data) {
      localStorage.setItem('accessToken', result.data.accessToken);
      localStorage.setItem('refreshToken', result.data.refreshToken);
      localStorage.setItem('role', result.data.role);
      // @ts-ignore
      setState(result.data);
      displaySnackbar('success', 'Login successful!');
      return true;
    }
    displaySnackbar('error', 'Login unsuccessful!');
    return false;
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
    axios.defaults.headers.common.Authorization = undefined;
    history.push(PATHS.LOGIN);
    setState(getDefaultState());
    displaySnackbar('success', 'Successfully logged out');
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
