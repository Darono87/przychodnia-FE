import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { displaySnackbar } from 'utils';
import { ROLES } from 'strings';
import { SuggestionsService } from '../services';

const getDefaultState = () => ({
  usersByRole: [],
});

const SuggestionsContext = React.createContext(getDefaultState());

const SuggestionsContextProvider = ({ children }) => {
  const [state, setState] = useState(getDefaultState());
  useEffect(() => {
    const fetchData = async () => {
      const users = await SuggestionsService.getUsersByRole(ROLES.Doctor);
      setState({ usersByRole: users.data.suggestions });
    };
    fetchData();
  }, []);
  return (
    <SuggestionsContext.Provider value={{ ...state }}>
      {children}
    </SuggestionsContext.Provider>
  );
};

export { SuggestionsContextProvider, SuggestionsContext };
