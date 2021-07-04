import React, { useCallback, useState } from 'react';
import { displaySnackbar } from 'utils';
import { PhysicalExaminationsService } from '../services';

const getDefaultState = () => ({});

const PhysicalExaminationContext = React.createContext(getDefaultState());

const PhysicalExaminationContextProvider = ({ children }) => {
  const [state, setState] = useState(getDefaultState());

  const createPhysicalExamination = useCallback(async formValues => {
    const result = await PhysicalExaminationsService.create(formValues);
    if (result.data) {
      return displaySnackbar(
        'success',
        'Physical Examination has been created!',
      );
    }
    return displaySnackbar(
      'error',
      'Something went wrong with creating the physical examination.',
    );
  }, []);

  return (
    <PhysicalExaminationContext.Provider
      value={{
        ...state,
        createPhysicalExamination,
      }}>
      {children}
    </PhysicalExaminationContext.Provider>
  );
};

export { PhysicalExaminationContext, PhysicalExaminationContextProvider };
