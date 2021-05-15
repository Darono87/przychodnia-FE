export const API_BASE_URL = 'https://localhost:5001/api';

const USER_CONTROLLER = 'users';
const PATIENT_CONTROLLER = 'patients';

const createURL = (controller, endpoint) =>
  `${API_BASE_URL}/${controller}${endpoint ? `/${endpoint}` : ''}`;

export const ENDPOINT = {
  authenticate: createURL(USER_CONTROLLER, 'authenticate'),
  refresh: createURL(USER_CONTROLLER, 'refresh'),
  addEmployee: createURL(USER_CONTROLLER),
  addPatient: createURL(PATIENT_CONTROLLER),
};

export const REQUEST_STATUS = {
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
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
  CancelAppointment: 'Cancel Appointment',
};
