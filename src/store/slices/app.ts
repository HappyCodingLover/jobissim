import {createSlice} from '@reduxjs/toolkit';

import {TAppState, TRootState} from 'types';

const initialState: TAppState = {
  categories: [],
  subCategories: [],
  video: '',
};

const app = createSlice({
  initialState,
  name: 'app',
  reducers: {
    addVideo: (state, action) => {
      state.video = action.payload;
    },
    clearVideo: (state, action) => {
      state.video = state.video === action.payload ? '' : state.video;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSubCategories: (state, action) => {
      state.subCategories = action.payload;
    },
  },
});

export default app.reducer;

export const {
  addVideo,
  clearVideo,
  setCategories,
  setSubCategories,
} = app.actions;

export const getAppState = (state: TRootState) => state.app;
