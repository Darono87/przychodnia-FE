export const API_BASE_URL = 'https://localhost:5001/api';

const USER_CONTROLLER = 'user';

const createURL = (controller, endpoint) =>
  `${API_BASE_URL}/${controller}/${endpoint}`;

export const ENDPOINT = {
  authenticate: createURL(USER_CONTROLLER, 'authenticate'),
  refresh: createURL(USER_CONTROLLER, 'refresh'),
  addEmployee: createURL(USER_CONTROLLER, 'create'),
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
  Registrator: 'Registrator',
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
