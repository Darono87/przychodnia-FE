import axios from 'axios';
import { ENDPOINT, REQUEST_STATUS } from 'strings';

class LabExaminationService {
  static async create(formValues) {
    try {
      const { data } = await axios.post(ENDPOINT.addLabExamination, formValues);
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }

  static async get(params) {
    try {
      const { data } = await axios.get(ENDPOINT.getLabExaminations, {
        params,
      });
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }

  static async confirm(params) {
    try {
      const { data } = await axios.put(ENDPOINT.confirmLabExamination, params);
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }

  static async finalize(params) {
    try {
      const { data } = await axios.put(ENDPOINT.finalizeLabExamination, params);
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }
}

export default LabExaminationService;
