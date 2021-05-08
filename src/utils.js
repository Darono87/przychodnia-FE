import { notification } from 'antd';

export const displaySnackbar = (type, message) => {
  notification[type]({
    message,
  });
};
