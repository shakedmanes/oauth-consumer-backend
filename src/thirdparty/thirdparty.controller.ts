// thirdparty.controller

import axios from 'axios';
import { config } from '../config';

export class ThirdpartyController {

  static readonly axiosInstance = axios.create({ baseURL: config.apiRequests.apiBaseURL });

  static async getFolderContents(token: string) {
    const response =
      await ThirdpartyController.axiosInstance.get(
        config.apiRequests.apiResourcesRoute,
        { headers: { Authorization: `${token}` } },
      );

    // If request succeed
    if (response.status === 200) {
      return response.data;
    }

    return null;
  }

  static async getSpecificFile(token: string, filename: string) {
    const response =
      await ThirdpartyController.axiosInstance.get(
        `${config.apiRequests.apiResourcesRoute}/${filename}`,
        { headers: { Authorization: `${token}` } },
      );

    // If request succeed
    if (response.status === 200) {
      return response.data;
    }

    return null;
  }
}
