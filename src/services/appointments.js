import axios from 'axios';
import { ENDPOINT, REQUEST_STATUS } from 'strings';

class AppointmentService {
  static async create(formValues) {
    try {
      const { data } = await axios.post(
        ENDPOINT.scheduleAppointment,
        formValues,
      );
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }

  static async get(params) {
    try {
      const { data } = await axios.get(ENDPOINT.getAppointments, {
        params,
      });
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }

  static async cancel(id) {
    try {
      await axios.patch(ENDPOINT.cancelAppointment, { id });
      return { status: REQUEST_STATUS.SUCCESS };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR };
    }
  }

  static async finish(id) {
    try {
      await axios.patch(ENDPOINT.finishAppointment(id));
      return { status: REQUEST_STATUS.SUCCESS };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR };
    }
  }
}

export default AppointmentService;
