/*
user1
Abc Def
Qwerty1234 */

import axios from 'axios';
import { ENDPOINT, REQUEST_STATUS } from 'strings';

class AuthService {
  static async signIn(login, password) {
    try {
      const { data } = await axios.post(ENDPOINT.authenticate, {
        login,
        password,
      });
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }

  static async create(formValues) {
    try {
      const { data } = await axios.post(ENDPOINT.addEmployee, formValues);
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }

  static async refresh(accessToken, refreshToken) {
    try {
      const { data } = await axios.post(ENDPOINT.refresh, {
        accessToken,
        refreshToken,
      });
      return { status: REQUEST_STATUS.SUCCESS, data };
    } catch (error) {
      return { status: REQUEST_STATUS.ERROR, error };
    }
  }
}

export default AuthService;
