import {createStackNavigator} from '@react-navigation/stack';
import React, {FC} from 'react';

import {
  EnterPassword,
  ForgotPassword,
  SetPassword,
  SignIn,
  SignUp,
  SignUpStep,
} from 'screens';
import {TAuthStackParamList} from 'types';

const Stack = createStackNavigator<TAuthStackParamList>();

const AuthStack: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="signIn"
      screenOptions={{headerShown: false}}>
      <Stack.Screen component={EnterPassword} name="enterPassword" />
      <Stack.Screen component={ForgotPassword} name="forgotPassword" />
      <Stack.Screen component={SetPassword} name="setPassword" />
      <Stack.Screen component={SignIn} name="signIn" />
      <Stack.Screen component={SignUp} name="signUp" />
      <Stack.Screen component={SignUpStep} name="signUpStep" />
    </Stack.Navigator>
  );
};

export default AuthStack;
