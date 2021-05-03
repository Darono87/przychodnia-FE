import React, { useCallback, useState } from 'react';
import { AuthService } from '../services';

const DEFAULT_STATE = { accessToken: null, refreshToken: null, role: null };

const AuthContext = React.createContext(DEFAULT_STATE);

const AuthContextProvider = ({ children }) => {
  const [state, setState] = useState(DEFAULT_STATE);
  const signIn = useCallback(async ({ login, password }) => {
    const result = await AuthService.signIn(login, password);
    if (result.data) {
      setState(result.data);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ ...state, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
