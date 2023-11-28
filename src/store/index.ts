import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'reduxjs-toolkit-persist';

import {app, auth, video} from './slices';

const persistConfig = {
  blacklist: ['auth', 'video'],
  key: 'root',
  storage: AsyncStorage,
};

const reducers = combineReducers({app, auth, video});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export {persistor, store};

export * from './slices';
