import React, { useCallback, useState } from 'react';
import { REQUEST_STATUS } from 'strings';
import { displaySnackbar } from 'utils';
import { PatientsService } from '../services';

const getDefaultState = () => ({
  patients: [],
  patientsStatus: REQUEST_STATUS.IDLE,
  patientsCount: 0,
  patientDetails: null,
});

const PatientContext = React.createContext(getDefaultState());

const PatientContextProvider = ({ children }) => {
  const [state, setState] = useState(getDefaultState());

  const getPatients = useCallback(async props => {
    setState(pastState => ({
      ...pastState,
      patients: [],
      patientsStatus: REQUEST_STATUS.LOADING,
      patientsCount: 0,
    }));
    const result = await PatientsService.get(props);
    if (result.data) {
      setState(pastState => ({
        ...pastState,
        patients: result.data.items.map(patient => patient),
        patientsCount: result.data.count,
        patientsStatus: REQUEST_STATUS.SUCCESS,
      }));
      return;
    }
    setState(pastState => ({
      ...pastState,
      patientsStatus: REQUEST_STATUS.ERROR,
    }));
    displaySnackbar('error', 'Patients could not be loaded.');
  }, []);

  const getPatientDetails = useCallback(async props => {
    setState(pastState => ({
      ...pastState,
      patientsStatus: REQUEST_STATUS.LOADING,
      patientDetails: null,
    }));
    const result = await PatientsService.getDetails(props);
    if (result.data) {
      setState(pastState => ({
        ...pastState,
        patientDetails: result.data,
        patientsStatus: REQUEST_STATUS.SUCCESS,
      }));
      return;
    }
    setState(pastState => ({
      ...pastState,
      patientsStatus: REQUEST_STATUS.ERROR,
    }));
    displaySnackbar('error', 'The details of patient could not be loaded.');
  }, []);

  return (
    <PatientContext.Provider
      value={{
        ...state,
        getPatients,
        getPatientDetails,
      }}>
      {children}
    </PatientContext.Provider>
  );
};

export { PatientContext, PatientContextProvider };
