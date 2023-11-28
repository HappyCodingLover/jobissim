import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {FC, useEffect} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-toast-message';

import {getCategories, getSubCategories} from 'api';
import {AuthProvider} from 'contexts';
import {useAppDispatch, useAppSelector} from 'hooks';
import {getAuthState, setCategories, setSubCategories} from 'store';
import {TRootStackParamList} from 'types';

import AuthStack from './AuthStack';
import MainStack from './MainStack';

const Stack = createStackNavigator<TRootStackParamList>();

const Navigation: FC = () => {
  const dispatch = useAppDispatch();
  const {isLoading} = useAppSelector(getAuthState);

  useEffect(() => {
    const initialData = async () => {
      try {
        const categoryRes = await getCategories();
        dispatch(setCategories(categoryRes.data));
        const subCategoryRes = await getSubCategories();
        dispatch(setSubCategories(subCategoryRes.data));
      } catch (error) {
        Toast.show({text1: JSON.stringify(error), type: 'error'});
      }
    };

    initialData();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator
          initialRouteName="auth"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="auth" component={AuthStack} />
          <Stack.Screen name="main" component={MainStack} />
        </Stack.Navigator>
      </AuthProvider>
      <Spinner visible={isLoading} />
    </NavigationContainer>
  );
};

export default Navigation;
