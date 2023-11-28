import {appleAuth} from '@invertase/react-native-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {getDeviceId} from 'react-native-device-info';
import Toast from 'react-native-toast-message';

import {
  getLinkedinProfileBasic,
  getLinkedinProfileEmail,
  getProfile,
  isUserExisted,
  registerDevice,
  resetPassword,
  signIn,
  signUp,
  verifyEmail,
} from 'api';
import {useAppDispatch} from 'hooks';
import {setIsLoading, setUser} from 'store';
import {
  TLinkedinToken,
  TRootStackParamList,
  TSignInForm,
  TSignUpForm,
  TUser,
} from 'types';
import {getFcmToken, initialUser, linkedinTokenB, signUpB, userF} from 'utils';

type TAuthContext = {
  profile: TUser | null;
  handleAppleAuth: ((type: string) => Promise<void>) | null;
  handleAuthNavigation:
    | ((email: string, type: string, authType: string) => Promise<void>)
    | null;
  handleGoogleAuth: ((type: string) => Promise<void>) | null;
  handleLinkedinAuth:
    | ((token: TLinkedinToken, type: string) => Promise<void>)
    | null;
  handleResetPassword:
    | ((params: {token: string; password: string}) => Promise<void>)
    | null;
  handleSignIn: ((params: TSignInForm) => Promise<void>) | null;
  handleSignOut: (() => Promise<void>) | null;
  handleSignUp: ((params: TSignUpForm) => Promise<void>) | null;
  handleVerifyEmail: ((params: {email: string}) => Promise<void>) | null;
  setProfile: Dispatch<SetStateAction<TUser | null>> | null;
};

export const AuthContext = createContext<TAuthContext>({
  profile: null,
  handleAppleAuth: null,
  handleAuthNavigation: null,
  handleGoogleAuth: null,
  handleLinkedinAuth: null,
  handleResetPassword: null,
  handleSignIn: null,
  handleSignOut: null,
  handleSignUp: null,
  handleVerifyEmail: null,
  setProfile: null,
});

type TProps = PropsWithChildren & {};

export const AuthProvider: FC<TProps> = ({children}) => {
  const dispatch = useAppDispatch();
  const {navigate} = useNavigation<NavigationProp<TRootStackParamList>>();

  const [profile, setProfile] = useState<TUser | null>(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    const initSetting = async () => {
      GoogleSignin.configure({
        iosClientId:
          '788237935442-9n3hg7r8uhemkqt1c9nbjueqmgem86kt.apps.googleusercontent.com',
        webClientId:
          '788237935442-jlu52hk4oqo52ljs23vgl56h2redcin1.apps.googleusercontent.com',
      });

      const token = await AsyncStorage.getItem('token');
      setToken(token || '');
    };

    initSetting();
  }, []);

  useEffect(() => {
    const getProfile = async () => {
      if (!token) return;

      await handleProfile();
    };

    getProfile();
  }, [token]);

  const handleAppleAuth = useCallback(
    async (type: string) => {
      dispatch(setIsLoading(true));
      try {
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });

        if (!appleAuthRequestResponse.identityToken) {
          Toast.show({
            text1: 'Apple Sign-In failed - no identify token returned',
            type: 'error',
          });
          return;
        }

        const {identityToken, nonce} = appleAuthRequestResponse;
        const appleCredential = auth.AppleAuthProvider.credential(
          identityToken,
          nonce,
        );

        const {user} = await auth().signInWithCredential(appleCredential);
        const email = user.email || '';
        const lastName = appleAuthRequestResponse.fullName?.familyName || '';
        const firstName = appleAuthRequestResponse.fullName?.givenName || '';

        setProfile({...initialUser, email, firstName, lastName});

        handleAuthNavigation(email, type, 'apple');
      } catch (error) {
        Toast.show({
          text1: JSON.stringify(error),
          type: 'error',
        });
      }
      dispatch(setIsLoading(false));
    },
    [navigate],
  );

  const handleAuthNavigation = useCallback(
    async (email: string, type: string, authType: string) => {
      dispatch(setIsLoading(true));
      try {
        if (type === 'signIn') {
          navigate('auth', {screen: 'enterPassword'});
        } else {
          const res = await isUserExisted({email});
          if (!res.data.isExisted) {
            if (authType === 'email') navigate('auth', {screen: 'signUpStep'});
            else
              navigate('auth', {
                params: {from: 'social'},
                screen: 'setPassword',
              });
          } else {
            Toast.show({
              text1: 'Current email is existed',
              type: 'error',
            });
          }
        }
      } catch (error) {
        Toast.show({
          text1: JSON.stringify(error),
          type: 'error',
        });
      }
      dispatch(setIsLoading(false));
    },
    [navigate],
  );

  const handleGoogleAuth = useCallback(
    async (type: string) => {
      dispatch(setIsLoading(true));
      try {
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });
        const {user} = await GoogleSignin.signIn();

        setProfile({
          ...initialUser,
          email: user.email,
          firstName: user.familyName || '',
          lastName: user.givenName || '',
        });

        handleAuthNavigation(user.email, type, 'google');
      } catch (error) {
        Toast.show({
          text1: JSON.stringify(error),
          type: 'error',
        });
      }
      dispatch(setIsLoading(false));
    },
    [navigate],
  );

  const handleLinkedinAuth = useCallback(
    async (token: TLinkedinToken, type: string) => {
      dispatch(setIsLoading(true));
      try {
        const resBasic = await getLinkedinProfileBasic(linkedinTokenB(token));
        const resEmail = await getLinkedinProfileEmail(linkedinTokenB(token));
        const email = resEmail.data.elements[0]['handle~'].emailAddress;
        const firstName = resBasic.data.firstName.localized.fr_FR;
        const lastName = resBasic.data.lastName.localized.fr_FR;

        setProfile({...initialUser, email, firstName, lastName});

        handleAuthNavigation(email, type, 'linkedin');
      } catch (error) {
        Toast.show({
          text1: JSON.stringify(error),
          type: 'error',
        });
      }
      dispatch(setIsLoading(false));
    },
    [navigate],
  );

  const handleProfile = useCallback(async () => {
    dispatch(setIsLoading(true));
    try {
      const res = await getProfile();
      setProfile(userF(res.data));
      dispatch(setUser(userF(res.data)));
      navigate('main', {params: {screen: 'home'}, screen: 'tab'});
    } catch (error) {
      Toast.show({
        text1: JSON.stringify(error),
        type: 'error',
      });
      navigate('auth', {screen: 'signIn'});
    }
    dispatch(setIsLoading(false));
  }, [dispatch, navigate]);

  const handleResetPassword = useCallback(
    async (params: {token: string; password: string}) => {
      dispatch(setIsLoading(true));
      try {
        await resetPassword(params);
      } catch (error) {
        Toast.show({
          text1: JSON.stringify(error),
          type: 'error',
        });
      }
      dispatch(setIsLoading(false));
    },
    [navigate],
  );

  const handleSignIn = useCallback(async (params: TSignInForm) => {
    dispatch(setIsLoading(true));
    try {
      const res = await signIn(params);
      await AsyncStorage.setItem('token', res.data?.token || '');
      const fcmToken = await getFcmToken();
      await registerDevice({name: getDeviceId(), token: fcmToken});
      setToken(res.data?.token || '');
    } catch (error) {
      Toast.show({
        text1: JSON.stringify(error),
        type: 'error',
      });
    }
    dispatch(setIsLoading(false));
  }, []);

  const handleSignOut = useCallback(async () => {
    dispatch(setIsLoading(true));
    try {
      await AsyncStorage.removeItem('token');
      setProfile(null);
      setToken('');
      navigate('auth', {screen: 'signIn'});
    } catch (error) {
      Toast.show({
        text1: JSON.stringify(error),
        type: 'error',
      });
    }
    dispatch(setIsLoading(false));
  }, [navigate]);

  const handleSignUp = useCallback(
    async (params: TSignUpForm) => {
      dispatch(setIsLoading(true));
      try {
        const res = await signUp(signUpB(params));
        await AsyncStorage.setItem('token', res.data?.token || '');
        const fcmToken = await getFcmToken();
        await registerDevice({name: getDeviceId(), token: fcmToken});
        navigate('main', {params: {screen: 'home'}, screen: 'tab'});
      } catch (error) {
        Toast.show({
          text1: JSON.stringify(error),
          type: 'error',
        });
      }
      dispatch(setIsLoading(false));
    },
    [navigate],
  );

  const handleVerifyEmail = useCallback(
    async (params: {email: string}) => {
      dispatch(setIsLoading(true));
      try {
        const res = await verifyEmail(params);
        navigate('auth', {
          params: {from: 'forgot', token: res.data.token},
          screen: 'setPassword',
        });
      } catch (error) {
        Toast.show({
          text1: JSON.stringify(error),
          type: 'error',
        });
      }
      dispatch(setIsLoading(false));
    },
    [navigate],
  );

  return (
    <AuthContext.Provider
      value={{
        profile,
        handleAppleAuth,
        handleAuthNavigation,
        handleGoogleAuth,
        handleLinkedinAuth,
        handleResetPassword,
        handleSignIn,
        handleSignOut,
        handleSignUp,
        handleVerifyEmail,
        setProfile,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
