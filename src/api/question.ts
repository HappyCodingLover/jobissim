import {TQuestion} from 'types';

import api from './api';

type TCreateQuestionParams = {
  businessId: number;
  title: string;
  userId: number;
};

export const createQuestion = (params: TCreateQuestionParams) => {
  return api.post('/question/create', params);
};

export const getQuestions = () => {
  return api.get<TQuestion[]>('/questions');
};
