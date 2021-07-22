import { Empty } from 'antd';
import React from 'react';
import { MODES } from 'strings';
import AddEmployeeForm from './AddEmployeeForm.jsx';
import AddPatientForm from './AddPatientForm.jsx';
import AppointmentsList from './AppointmentsList.jsx';
import ScheduleAppointmentForm from './ScheduleAppointmentForm.jsx';
import AddPhysicalExaminationForm from './AddPhysicalExaminationForm.jsx';
import AddLabExaminationForm from './AddLabExaminationForm.jsx';
import PatientsList from './PatientsList.jsx';
import LabExaminationsList from './LabExaminationsList.jsx';

const Modes = ({ mode, setMode, modeId, setModeId }) => {
  switch (mode) {
    case MODES.AddEmployee:
      return <AddEmployeeForm />;
    case MODES.AddPatient:
      return <AddPatientForm modeId={modeId} setModeId={setModeId} />;
    case MODES.ScheduleAppointment:
      return <ScheduleAppointmentForm />;
    case MODES.ListAppointments:
      return <AppointmentsList setModeId={setModeId} setMode={setMode} />;
    case MODES.AddPhysicalExamination:
      return (
        <AddPhysicalExaminationForm modeId={modeId} setModeId={setModeId} />
      );
    case MODES.ListPatients:
      return <PatientsList setModeId={setModeId} setMode={setMode} />;
    case MODES.AddLabExamination:
      return <AddLabExaminationForm modeId={modeId} setModeId={setModeId} />;
    case MODES.GetLabExaminations:
      return <LabExaminationsList />;
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
