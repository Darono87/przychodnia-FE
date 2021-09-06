import React, { useCallback, useState } from 'react';
import { displaySnackbar, putEmptyValues, formatDatetime } from 'utils';
import { ENDPOINT, REQUEST_STATUS } from 'strings';

import { PhysicalExaminationsService } from '../services';

const getDefaultState = () => ({
  physicalExaminations: [],
  physicalExaminationsStatus: REQUEST_STATUS.IDLE,
  physicalExaminationsCount: 0,
});

const DESC_LENGTH = 20;

const PhysicalExaminationContext = React.createContext(getDefaultState());

const PhysicalExaminationContextProvider = ({ children }) => {
  const [state, setState] = useState(getDefaultState());

  const createPhysicalExamination = useCallback(async formValues => {
    const result = await PhysicalExaminationsService.create(formValues);
    if (result.data) {
      displaySnackbar('success', 'Physical Examination has been created!');
      return true;
    }
    displaySnackbar(
      'error',
      'Something went wrong with creating the physical examination.',
    );
    return false;
  }, []);

  const getPhysicalExaminations = useCallback(async props => {
    setState(pastState => ({
      ...pastState,
      physicalExaminations: [],
      physicalExaminationsStatus: REQUEST_STATUS.LOADING,
      physicalExaminationsCount: 0,
    }));

    const { data } = await PhysicalExaminationsService.get(props);
    if (data) {
      setState(pastState => ({
        ...pastState,
        physicalExaminations: data.items.map(physicalExamination => {
          const secureExamination = putEmptyValues(physicalExamination);
          return {
            ...secureExamination,
            examinationCode: `${physicalExamination.examinationCode.abbreviation}: ${physicalExamination.examinationCode.name}`,
            result: physicalExamination.result
              ? `${physicalExamination.result.substring(0, DESC_LENGTH)}...`
              : secureExamination.result,
            appointment: physicalExamination.appointment.scheduledDate
              ? formatDatetime(physicalExamination.appointment.scheduledDate)
              : formatDatetime(secureExamination.appointment.scheduledDate),
            patient: physicalExamination.appointment.patient
              ? `${physicalExamination.appointment.patient.firstName} ${physicalExamination.appointment.patient.lastName}`
              : '',
          };
        }),
        physicalExaminationsCount: data.count,
        physicalExaminationsStatus: REQUEST_STATUS.SUCCESS,
      }));
      return;
    }
    setState(pastState => ({
      ...pastState,
      physicalExaminationsStatus: REQUEST_STATUS.ERROR,
    }));
    displaySnackbar('error', 'Lab examinations could not be loaded.');
  }, []);

  return (
    <PhysicalExaminationContext.Provider
      value={{
        ...state,
        createPhysicalExamination,
        getPhysicalExaminations,
      }}>
      {children}
    </PhysicalExaminationContext.Provider>
  );
};

export { PhysicalExaminationContext, PhysicalExaminationContextProvider };
