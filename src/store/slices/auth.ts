import {createSlice} from '@reduxjs/toolkit';

import {TAuthState, TRootState} from 'types';

const initialState: TAuthState = {
  isLoading: false,
  user: null,
};

const auth = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export default auth.reducer;

export const {setIsLoading, setUser} = auth.actions;

export const getAuthState = (state: TRootState) => state.auth;
