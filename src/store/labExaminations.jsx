import React, { useCallback, useState } from 'react';
import { displaySnackbar } from 'utils';
import { LabExaminationsService } from '../services';

const getDefaultState = () => ({});

const LabExaminationContext = React.createContext(getDefaultState());

const LabExaminationContextProvider = ({ children }) => {
  const [state, setState] = useState(getDefaultState());

  const createLabExamination = useCallback(async formValues => {
    const result = await LabExaminationsService.create(formValues);
    if (result.data) {
      return displaySnackbar('success', 'Lab Examination has been created!');
    }
    return displaySnackbar(
      'error',
      'Something went wrong with creating the lab examination.',
    );
  }, []);

  return (
    <LabExaminationContext.Provider
      value={{
        ...state,
        createLabExamination,
      }}>
      {children}
    </LabExaminationContext.Provider>
  );
};

export { LabExaminationContext, LabExaminationContextProvider };
