import {TBSubTitle} from 'types';

import ml from './ml';

type TGetSubTitleResponse = {
  transcriptions: TBSubTitle[];
};

export const getSubTitle = (params: FormData) => {
  return ml.post<TGetSubTitleResponse>('/speechToText', params, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
};
