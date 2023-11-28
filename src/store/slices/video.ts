import {createSlice} from '@reduxjs/toolkit';
import {some} from 'lodash';

import {TVideoState, TRootState} from 'types';

const initialState: TVideoState = {
  music: null,
  questionList: [],
  subVideos: [],
  theme: null,
};

const video = createSlice({
  initialState,
  name: 'video',
  reducers: {
    addSubTitle: (state, action) => {
      state.subVideos = some(state.subVideos, {id: action.payload.id})
        ? state.subVideos.map(video =>
            video.id === action.payload.id ? action.payload : video,
          )
        : [...state.subVideos, action.payload];
    },
    addSubVideo: (state, action) => {
      state.subVideos = some(state.subVideos, {id: action.payload.id})
        ? state.subVideos.map(video =>
            video.id === action.payload.id
              ? {
                  ...video,
                  needTranspose: action.payload.needTranspose,
                  path: action.payload.path,
                  transposePath: action.payload.transposePath,
                }
              : video,
          )
        : [...state.subVideos, action.payload];
    },
    removeQuestion: (state, action) => {
      state.subVideos = state.subVideos.filter(
        video => video.id !== action.payload,
      );
    },
    setMusic: (state, action) => {
      state.music = action.payload;
    },
    setQuestionList: (state, action) => {
      state.questionList = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export default video.reducer;

export const {
  addSubTitle,
  addSubVideo,
  removeQuestion,
  setMusic,
  setQuestionList,
  setTheme,
} = video.actions;

export const getVideoState = (state: TRootState) => state.video;
