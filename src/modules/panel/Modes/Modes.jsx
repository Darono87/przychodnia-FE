import { Empty } from 'antd';
import React from 'react';
import { MODES } from 'strings';
import AddEmployeeForm from './AddEmployeeForm.jsx';
import AddPatientForm from './AddPatientForm.jsx';
import AppointmentsList from './AppointmentsList.jsx';
import ScheduleAppointmentForm from './ScheduleAppointmentForm.jsx';

const Modes = ({ mode }) => {
  switch (mode) {
    case MODES.AddEmployee:
      return <AddEmployeeForm />;
    case MODES.AddPatient:
      return <AddPatientForm />;
    case MODES.ScheduleAppointment:
      return <ScheduleAppointmentForm />;
    case MODES.ListAppointments:
      return <AppointmentsList />;
    default:
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="You've picked an unknown option"
        />
      );
  }
};

export default Modes;
