import {store} from 'store';

import {
  TCategory,
  TMusic,
  TQuestion,
  TSubCategory,
  TSubVideo,
  TTheme,
  TUser,
} from './api';

export type TAppDispatch = typeof store.dispatch;
export type TAppState = {
  categories: TCategory[];
  subCategories: TSubCategory[];
  video: string;
};
export type TAuthState = {
  isLoading: boolean;
  user: TUser | null;
};
export type TRootState = ReturnType<typeof store.getState>;
export type TVideoState = {
  music: TMusic | null;
  questionList: TQuestion[];
  subVideos: TSubVideo[];
  theme: TTheme | null;
};
