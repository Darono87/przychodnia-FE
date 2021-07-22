import React, { useCallback, useState } from 'react';
import { LAB_EXAMINATION_STATUS, REQUEST_STATUS } from 'strings';
import { displaySnackbar, formatDatetime, putEmptyValues } from 'utils';
import { LabExaminationsService } from '../services';

const getDefaultState = () => ({
  labExaminations: [],
  labExaminationsStatus: REQUEST_STATUS.IDLE,
  labExaminationsCount: 0,
});

const DESC_LENGTH = 20;

const LabExaminationContext = React.createContext(getDefaultState());

const LabExaminationContextProvider = ({ children }) => {
  const [state, setState] = useState(getDefaultState());

  const getLabExaminations = useCallback(async props => {
    setState(pastState => ({
      ...pastState,
      labExaminations: [],
      labExaminationsStatus: REQUEST_STATUS.LOADING,
      labExaminationsCount: 0,
    }));
    const result = await LabExaminationsService.get(props);
    if (result.data) {
      setState(pastState => ({
        ...pastState,
        labExaminations: result.data.items.map(labExamination => {
          const secureExamination = putEmptyValues(labExamination);
          return {
            ...secureExamination,
            examinationCode: `${labExamination.examinationCode.abbreviation}: ${labExamination.examinationCode.name}`,
            status: LAB_EXAMINATION_STATUS[labExamination.status],
            doctorRemarks: labExamination.doctorRemarks
              ? `${labExamination.doctorRemarks.substring(0, DESC_LENGTH)}...`
              : secureExamination.doctorRemarks,
            issueDate: formatDatetime(labExamination.issueDate),
            confirmationDate: labExamination.confirmationDate
              ? formatDatetime(labExamination.confirmationDate)
              : secureExamination.confirmationDate,
            finishDate: labExamination.finishDate
              ? formatDatetime(labExamination.finishDate)
              : secureExamination.finishDate,
          };
        }),
        labExaminationsCount: result.data.count,
        labExaminationsStatus: REQUEST_STATUS.SUCCESS,
      }));
      return;
    }
    setState(pastState => ({
      ...pastState,
      labExaminationsStatus: REQUEST_STATUS.ERROR,
    }));
    displaySnackbar('error', 'Lab examinations could not be loaded.');
  }, []);

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
        getLabExaminations,
      }}>
      {children}
    </LabExaminationContext.Provider>
  );
};

export { LabExaminationContext, LabExaminationContextProvider };
