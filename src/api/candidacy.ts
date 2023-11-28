import api from './api';

type TCreateCandidacyParams = {
  data: FormData;
  id: number;
};

export const createCandidacy = (params: TCreateCandidacyParams) => {
  return api.post(`/candidacies/new/${params.id}`, params.data, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
};
