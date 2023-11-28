import api from './api';

type TRegisterDeviceParams = {
  name?: string;
  token?: string | null;
};

export const registerDevice = (params: TRegisterDeviceParams) => {
  return api.post(`/register_device`, params);
};
