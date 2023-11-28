import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useFormik} from 'formik';
import {Box, Stack, StatusBar} from 'native-base';
import React, {FC, useCallback, useRef} from 'react';
import {TextInput} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';

import {Button, HeaderBar, PasswordInput} from 'components';
import {colors} from 'config';
import {useAuth} from 'hooks';
import {TAuthStackParamList, TRootStackParamList} from 'types';
import {initialUser, normalize} from 'utils';

const initialValues = {
  confirmPassword: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  confirmPassword: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
  password: Yup.string().required('Required'),
});

const SetPassword: FC = () => {
  const {profile, handleResetPassword, setProfile} = useAuth();
  const {navigate} = useNavigation<NavigationProp<TRootStackParamList>>();
  const confirmPasswordInput = useRef<TextInput>(null);
  const {params} = useRoute<RouteProp<TAuthStackParamList, 'setPassword'>>();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      if (params.from === 'forgot') {
        handleResetPassword({
          token: params.token || '',
          password: values.password,
        });
      } else {
        setProfile({...(profile || initialUser), password: values.password});
        navigate('auth', {screen: 'signUpStep'});
      }
    },
  });

  const handleSubmit = useCallback(() => {
    formik.handleSubmit();
  }, []);

  return (
    <Box bg={colors.shark} h="full" safeAreaTop w="full">
      <StatusBar backgroundColor="transparent" translucent />
      <HeaderBar
        title={
          params.from === 'forgot'
            ? 'Mot de passe oublié'
            : 'Définir le mot de passe'
        }
      />
      <KeyboardAwareScrollView enableOnAndroid>
        <Stack px={normalize(28)} py={normalize(36)} space="8">
          <PasswordInput
            error={formik.touched.password && formik.errors.password}
            placeholder="Mot de passe"
            inputProps={{
              returnKeyType: 'next',
              onSubmitEditing: () => {
                confirmPasswordInput.current?.focus();
              },
            }}
            onChange={formik.handleChange('password')}
          />
          <PasswordInput
            error={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            inputRef={confirmPasswordInput}
            placeholder="Confirmer mot de passe"
            onChange={formik.handleChange('confirmPassword')}
          />
          <Button
            title={params.from === 'forgot' ? 'Réinitialiser' : 'Continuer'}
            onPress={handleSubmit}
          />
        </Stack>
      </KeyboardAwareScrollView>
    </Box>
  );
};

export default SetPassword;
