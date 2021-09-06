// eslint-disable-next-line no-undef
export const API_BASE_URL =
  // eslint-disable-next-line no-undef
  process.env.REACT_APP_PRZYCHODNIA_BACKEND || 'https://localhost:5001/api';

const USER_CONTROLLER = 'users';
const PATIENT_CONTROLLER = 'patients';
const APPOINTMENT_CONTROLLER = 'appointments';
const EXAMINATION_CODE_CONTROLLER = 'examinationCodes';
const PHYSICAL_EXAMINATION_CONTROLLER = 'physicalExaminations';
const LAB_EXAMINATION_CONTROLLER = 'labExaminations';
const EMAIL_CONTROLLER = 'mails';

const createURL = (controller, endpoint) =>
  `${API_BASE_URL}/${controller}${endpoint ? `/${endpoint}` : ''}`;

export const ENDPOINT = {
  authenticate: createURL(USER_CONTROLLER, 'authenticate'),
  refresh: createURL(USER_CONTROLLER, 'refresh'),
  addEmployee: createURL(USER_CONTROLLER),
  addPatient: createURL(PATIENT_CONTROLLER),
  updatePatient: id => `${createURL(PATIENT_CONTROLLER)}/${id}`,
  getPatient: id => `${createURL(PATIENT_CONTROLLER)}/${id}`,
  getUsersByRoleSuggestions: createURL(USER_CONTROLLER, 'suggestions'),
  getPatientsSuggestions: createURL(PATIENT_CONTROLLER, 'suggestions'),
  scheduleAppointment: createURL(APPOINTMENT_CONTROLLER),
  sendEmail: createURL(EMAIL_CONTROLLER),
  getAppointments: createURL(APPOINTMENT_CONTROLLER),
  cancelAppointment: createURL(APPOINTMENT_CONTROLLER, 'cancel'),
  finishAppointment: id => createURL(APPOINTMENT_CONTROLLER, `finish/${id}`),
  getAppointmentsSuggestions: createURL(APPOINTMENT_CONTROLLER, 'suggestions'),
  getExaminationCodesSuggestions: createURL(
    EXAMINATION_CODE_CONTROLLER,
    'suggestions',
  ),
  addPhysicalExamination: createURL(PHYSICAL_EXAMINATION_CONTROLLER),
  getPatients: createURL(PATIENT_CONTROLLER),
  addLabExamination: createURL(LAB_EXAMINATION_CONTROLLER),
  getLabExaminations: createURL(LAB_EXAMINATION_CONTROLLER),
  getPhysicalExaminations: createURL(PHYSICAL_EXAMINATION_CONTROLLER),
  confirmLabExamination: createURL(LAB_EXAMINATION_CONTROLLER, 'confirm'),
  finalizeLabExamination: createURL(LAB_EXAMINATION_CONTROLLER, 'finalize'),
};

export const REQUEST_STATUS = {
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
  LOADING: 'LOADING',
  IDLE: 'IDLE',
};

export const PATHS = {
  HOMEPAGE: '/',
  LOGIN: '/login',
  PANEL: '/panel',
};

export const ROLES = {
  Admin: 'Admin',
  Registrar: 'Registrar',
  Doctor: 'Doctor',
  LabTechnician: 'LabTechnician',
  LabManager: 'LabManager',
};

export const MODES = {
  AddEmployee: 'Add Employee',
  AddPatient: 'Add Patient',
  EditPatient: 'Edit Patient',
  AddLabExamination: 'Add Lab Examination',
  ScheduleAppointment: 'Schedule Appointment',
  ListAppointments: 'Appointments',
  AddPhysicalExamination: 'Add Physical Examination',
  ListPatients: 'Patients',
  GetLabExaminations: 'Lab Examinations',
};

export const APPOINTMENT_STATUS = [
  { name: 'Scheduled', color: '#5bc9d9' },
  { name: 'Finished', color: '#67c44d' },
  { name: 'Cancelled', color: '#e0e055' },
];

export const EXAMINATION_TYPES = {
  Physical: 'Physical',
  Laboratory: 'Laboratory',
};

export const LAB_EXAMINATION_TYPE = {
  Scheduled: 'Scheduled',
  Finished: 'Finished',
  Cancelled: 'Cancelled',
  CancelledByManager: 'CancelledByManager',
  Accepted: 'Accepted',
};

export const LAB_EXAMINATION_STATUS = [
  { name: 'Scheduled', color: '#5bc9d9' },
  { name: 'Finished', color: '#c2ed4a' },
  { name: 'Cancelled', color: '#e0e055' },
  { name: 'CancelledByManager', color: '#e0e055' },
  { name: 'Accepted', color: '#67c44d' },
];
