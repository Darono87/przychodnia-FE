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
}

export default LabExaminationService;
