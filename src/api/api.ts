import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import {env} from 'config';

const api = axios.create({
  baseURL: `${env.apiBase}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

api.interceptors.request.use(async config => {
  const bearerToken = await AsyncStorage.getItem('token');
  config.headers.Authorization = `Bearer ${bearerToken || ''}`;
  return config;
});

export default api;
