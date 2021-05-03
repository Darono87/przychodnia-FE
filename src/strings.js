export const API_BASE_URL = 'https://localhost:5001/api';

const USER_CONTROLLER = 'user';

const createURL = (controller, endpoint) =>
  `${API_BASE_URL}/${controller}/${endpoint}`;

export const ENDPOINT = {
  authenticate: createURL(USER_CONTROLLER, 'authenticate'),
  refresh: createURL(USER_CONTROLLER, 'refresh'),
};

export const REQUEST_STATUS = {
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
};
