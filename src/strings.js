export const API_BASE_URL = 'https://localhost:5001/api';

const USER_CONTROLLER = 'users';
const PATIENT_CONTROLLER = 'patients';
const APPOINTMENT_CONTROLLER = 'appointments';
const EXAMINATION_CODE_CONTROLLER = 'examinationCodes';
const PHYSICAL_EXAMINATION_CONTROLLER = 'physicalExaminations';

const createURL = (controller, endpoint) =>
  `${API_BASE_URL}/${controller}${endpoint ? `/${endpoint}` : ''}`;

export const ENDPOINT = {
  authenticate: createURL(USER_CONTROLLER, 'authenticate'),
  refresh: createURL(USER_CONTROLLER, 'refresh'),
  addEmployee: createURL(USER_CONTROLLER),
  addPatient: createURL(PATIENT_CONTROLLER),
  getUsersByRoleSuggestions: createURL(USER_CONTROLLER, 'suggestions'),
  getPatientsSuggestions: createURL(PATIENT_CONTROLLER, 'suggestions'),
  scheduleAppointment: createURL(APPOINTMENT_CONTROLLER),
  getAppointments: createURL(APPOINTMENT_CONTROLLER),
  cancelAppointment: createURL(APPOINTMENT_CONTROLLER, 'cancel'),
  getAppointmentsSuggestions: createURL(APPOINTMENT_CONTROLLER, 'suggestions'),
  getExaminationCodesSuggestions: createURL(
    EXAMINATION_CODE_CONTROLLER,
    'suggestions',
  ),
  addPhysicalExamination: createURL(PHYSICAL_EXAMINATION_CONTROLLER),
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
  ScheduleAppointment: 'Schedule Appointment',
  ListAppointments: 'Appointments',
  AddPhysicalExamination: 'Add Physical Examination',
};

export const APPOINTMENT_STATUS = [
  { name: 'Scheduled', color: '#5bc9d9' },
  { name: 'Finished', color: '#67c44d' },
  { name: 'Cancelled', color: '#e0e055' },
];
