/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {NativeBaseProvider} from 'native-base';
import React, {FC, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Toast, {
  ErrorToast,
  SuccessToast,
  ToastConfigParams,
} from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {PersistGate} from 'reduxjs-toolkit-persist/integration/react';

import {colors} from 'config';
import Navigation from 'navigation';
import {persistor, store} from 'store';
import {requestUserPermission} from 'utils';

const toastConfig = {
  error: (props: ToastConfigParams<any>) => (
    <ErrorToast
      {...props}
      style={{borderLeftColor: colors.redMonza}}
      text1Style={{fontSize: 16}}
    />
  ),
  success: (props: ToastConfigParams<any>) => (
    <SuccessToast {...props} text1Style={{fontSize: 16}} />
  ),
};

const App: FC = () => {
  useEffect(() => {
    const initData = async () => {
      try {
        await requestUserPermission();
      } catch (error) {}
    };

    initData();
    SplashScreen.hide();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });

      await notifee.displayNotification({
        android: {
          channelId,
          sound: 'default',
        },
        body: remoteMessage.notification?.body,
        data: remoteMessage.data,
        title: remoteMessage.notification?.title,
      });
    });
    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>
          <Navigation />
          <Toast config={toastConfig} />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
