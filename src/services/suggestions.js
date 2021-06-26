import axios from 'axios';
import { ENDPOINT, REQUEST_STATUS } from 'strings';

class SuggestionsService {
  static async getUsersByRole(role) {
    try {
      const { data } = await axios.get(ENDPOINT.getUsersByRoleSuggestions, {
        params: { role },
      });
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }

  static async getPatients() {
    try {
      const { data } = await axios.get(ENDPOINT.getPatientsSuggestions);
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }
}

export default SuggestionsService;
