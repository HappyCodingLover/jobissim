import axios from 'axios';

import {env} from 'config';

const ml = axios.create({
  baseURL: `${env.mlBase}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

export default ml;
