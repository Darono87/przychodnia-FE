import axios from 'axios';
import { ENDPOINT, REQUEST_STATUS } from 'strings';

class PatientService {
  static async create(formValues) {
    try {
      const { data } = await axios.post(ENDPOINT.addPatient, formValues);
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }

  static async get(params) {
    try {
      const { data } = await axios.get(ENDPOINT.getPatients, {
        params,
      });
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }

  static async getDetails({ id }) {
    try {
      const { data } = await axios.get(ENDPOINT.getPatient(id));
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }

  static async update(formValues) {
    try {
      const { data } = await axios.patch(
        ENDPOINT.updatePatient(formValues.id),
        formValues,
      );
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }
}

export default PatientService;
