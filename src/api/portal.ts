import api from './api';

export const getPortals = () => {
  return api.get('/getPortals');
};
