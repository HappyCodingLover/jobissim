import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from 'react-native';

export const getFcmToken = async () => {
  try {
    const fcmToken = await AsyncStorage.getItem('jobissim-fcm-token');
    if (!fcmToken) {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      if (token) {
        await AsyncStorage.setItem('jobissim-fcm-token', token);
        return token;
      }
    }
    return fcmToken;
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};

export const requestUserPermission = async () => {
  try {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
      }
    }
  } catch (error) {}
};
