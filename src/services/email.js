/*
user1
Abc Def
Qwerty1234 */

import axios from 'axios';
import { ENDPOINT, REQUEST_STATUS } from 'strings';

class EmailService {
  static async send(formValues) {
    try {
      const { data } = await axios.post(ENDPOINT.sendEmail, formValues);
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }
}

export default EmailService;
