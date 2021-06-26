import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { displaySnackbar } from 'utils';
import { REQUEST_STATUS, ROLES } from 'strings';
import { SuggestionsService } from '../services';

const getDefaultState = () => ({
  usersByRole: Object.keys(ROLES).reduce(
    (roles, role) => ({
      ...roles,
      [role]: { data: [], status: REQUEST_STATUS.IDLE },
    }),
    {},
  ),
  patients: [],
  patientsStatus: REQUEST_STATUS.IDLE,
});

const SuggestionsContext = React.createContext(getDefaultState());

const SuggestionsContextProvider = ({ children }) => {
  const [state, setState] = useState(getDefaultState());

  const updateRoleSuggestions = async role => {
    setState(pastState => ({
      ...pastState,
      usersByRole: {
        ...state.usersByRole,
        [role]: {
          data: [],
          status: REQUEST_STATUS.LOADING,
        },
      },
    }));

    const users = await SuggestionsService.getUsersByRole(role);
    if (users.data)
      setState(pastState => ({
        ...pastState,
        usersByRole: {
          ...state.usersByRole,
          [role]: {
            data: users.data.suggestions,
            status: REQUEST_STATUS.SUCCESS,
          },
        },
      }));
    else displaySnackbar('error', "Couldn't get the doctors list"); //eslint-disable-line
  };

  const updatePatientsSuggestions = async () => {
    setState(pastState => ({
      ...pastState,
      patientsStatus: REQUEST_STATUS.LOADING,
      patients: [],
    }));
    const { data: patients } = await SuggestionsService.getPatients();
    if (patients?.suggestions)
      setState(pastState => ({
        ...pastState,
        patients: patients.suggestions,
        patientsStatus: REQUEST_STATUS.SUCCESS,
      }));
    else displaySnackbar('error', "Couldn't get the patients list"); //eslint-disable-line
  };

  return (
    <SuggestionsContext.Provider
      value={{ ...state, updateRoleSuggestions, updatePatientsSuggestions }}>
      {children}
    </SuggestionsContext.Provider>
  );
};

export { SuggestionsContextProvider, SuggestionsContext };
