import axios from 'axios';
import { env } from '../../config/env';
import {auth} from "../../config/firebase";


export const httpClient = axios.create({
  baseURL: env.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 10000,
});

httpClient.interceptors.request.use(async (config) => {
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken();

    // ensure body exists
    if (!config.data) {
      config.data = {};
    }

    // attach token into request body
    config.data.accessToken = token;
  }

  return config;
});
