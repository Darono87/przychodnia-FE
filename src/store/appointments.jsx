import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { displaySnackbar, formatDatetime, putEmptyValues } from 'utils';
import { APPOINTMENT_STATUS, REQUEST_STATUS } from 'strings';
import { AppointmentsService } from '../services';

const getDefaultState = () => ({
  appointments: [],
  appointmentsStatus: REQUEST_STATUS.IDLE,
  appointmentsCount: 0,
});

const DESC_LENGTH = 20;

const AppointmentContext = React.createContext(getDefaultState());

const AppointmentContextProvider = ({ children }) => {
  const [state, setState] = useState(getDefaultState());

  const scheduleAppointment = useCallback(async formValues => {
    const result = await AppointmentsService.create(formValues);
    if (result.data) {
      return displaySnackbar('success', 'Appointment has been created!');
    }
    return displaySnackbar(
      'error',
      'Something went wrong with creating the appointment.',
    );
  }, []);

  const cancelAppointment = useCallback(async id => {
    const { status } = await AppointmentsService.cancel(id);
    if (status === REQUEST_STATUS.SUCCESS) {
      return displaySnackbar('success', 'Appointment has been canceled.');
    }
    return displaySnackbar('error', 'The appointment could not be cancelled.');
  }, []);

  const getAppointments = useCallback(async props => {
    setState({
      appointments: [],
      appointmentsStatus: REQUEST_STATUS.LOADING,
      appointmentsCount: 0,
    });
    const result = await AppointmentsService.get(props);
    if (result.data) {
      setState({
        appointments: result.data.items.map(appointment => {
          const secureAppointment = putEmptyValues(appointment);
          return {
            ...putEmptyValues(appointment),
            status: APPOINTMENT_STATUS[appointment.status],
            description: `${appointment.description.substring(
              0,
              DESC_LENGTH,
            )}...`,
            registrationDate: formatDatetime(appointment.registrationDate),
            scheduledDate: formatDatetime(appointment.scheduledDate),
            finishDate: appointment.finishDate
              ? formatDatetime(appointment.finishDate)
              : secureAppointment.finishDate,
          };
        }),
        appointmentsCount: result.data.count,
        appointmentsStatus: REQUEST_STATUS.SUCCESS,
      });
      return;
    }
    setState({
      appointments: [],
      appointmentsCount: 0,
      appointmentsStatus: REQUEST_STATUS.ERROR,
    });
    displaySnackbar('error', 'Appointments could not be loaded.');
  }, []);

  return (
    <AppointmentContext.Provider
      value={{
        ...state,
        scheduleAppointment,
        getAppointments,
        cancelAppointment,
      }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export { AppointmentContext, AppointmentContextProvider };
