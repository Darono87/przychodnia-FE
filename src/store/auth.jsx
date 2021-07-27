import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { displaySnackbar } from 'utils';
import { ENDPOINT, PATHS, REQUEST_STATUS } from 'strings';
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
    const token = state.accessToken;
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refresh = useCallback(async () => {
    const result = await AuthService.refresh(
      localStorage.getItem('accessToken'),
      localStorage.getItem('refreshToken'),
    );

    if (result.status === REQUEST_STATUS.SUCCESS) {
      const newState = { ...getDefaultState() };
      newState.accessToken = result.data.accessToken;
      newState.refreshToken = result.data.refreshToken;

      setState(newState);
      localStorage.setItem('accessToken', result.data.accessToken);
      localStorage.setItem('refreshToken', result.data.refreshToken);

      return true;
    }

    return false;
  }, []);

  // eslint-disable-next-line no-unused-vars
  const interceptor = useMemo(() => {
    axios.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;

        if (
          error.response.status === 401 &&
          originalRequest?.url?.includes(ENDPOINT.refresh)
        ) {
          signOut();
          return;
        }

        if (error.response.status === 401) {
          const result = await refresh();

          if (result) {
            originalRequest.headers.Authorization = `Bearer ${localStorage.getItem(
              'accessToken',
            )}`;
            axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem(
              'accessToken',
            )}`;
            // eslint-disable-next-line consistent-return
            return axios(originalRequest);
          }
        }

        throw error;
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
