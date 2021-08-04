import React, { useState } from 'react';
import { displaySnackbar, formatDatetime } from 'utils';
import { EXAMINATION_TYPES, REQUEST_STATUS, ROLES } from 'strings';
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
  appointments: [],
  appointmentsStatus: REQUEST_STATUS.IDLE,
  examinationCodes: [],
  examinationCodesStatus: REQUEST_STATUS.IDLE,
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

  const updateAppointmentsSuggestions = async () => {
    setState(pastState => ({
      ...pastState,
      appointmentsStatus: REQUEST_STATUS.LOADING,
      appointments: [],
    }));
    const { data } = await SuggestionsService.getAppointments();
    if (data?.suggestions)
      setState(pastState => ({
        ...pastState,
        appointments: data.suggestions.map(suggestion => {
          const splitted = suggestion.label.split(',');
          return {
            ...suggestion,
            label: `${formatDatetime(splitted[0])}, ${splitted[1]}`,
          };
        }),
        appointmentsStatus: REQUEST_STATUS.SUCCESS,
      }));
    else displaySnackbar('error', "Couldn't get the appointments list"); //eslint-disable-line
  };

  const updateExaminationCodesSuggestions = async () => {
    setState(pastState => ({
      ...pastState,
      examinationCodesStatus: REQUEST_STATUS.LOADING,
      examinationCodes: [],
    }));
    const { data: examinationCodes } =
      await SuggestionsService.getExaminationCodes(EXAMINATION_TYPES.Physical);
    if (examinationCodes?.suggestions)
      setState(pastState => ({
        ...pastState,
        examinationCodes: examinationCodes.suggestions,
        examinationCodesStatus: REQUEST_STATUS.SUCCESS,
      }));
    else displaySnackbar('error', "Couldn't get examination codes"); //eslint-disable-line
  };

  return (
    <SuggestionsContext.Provider
      value={{
        ...state,
        updateRoleSuggestions,
        updatePatientsSuggestions,
        updateAppointmentsSuggestions,
        updateExaminationCodesSuggestions,
      }}>
      {children}
    </SuggestionsContext.Provider>
  );
};

export { SuggestionsContextProvider, SuggestionsContext };
