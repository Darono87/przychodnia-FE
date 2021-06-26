import { notification } from 'antd';
import moment from 'moment';
import { REQUEST_STATUS } from 'strings';

export const displaySnackbar = (type, message) => {
  notification[type]({
    message,
  });
};

export const calculateIsLoading = flag =>
  flag === REQUEST_STATUS.IDLE || flag === REQUEST_STATUS.LOADING;

export const formatDatetime = datetime =>
  moment(datetime).format('DD.MM.YYYY HH:MM');

export const putEmptyValues = datesheet =>
  Object.entries(datesheet).reduce(
    (conv, [key, value]) => ({ ...conv, [key]: value === null ? '--' : value }),
    {},
  );
