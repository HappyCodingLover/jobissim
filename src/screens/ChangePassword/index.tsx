import {useFormik} from 'formik';
import {Box, Stack, StatusBar} from 'native-base';
import React, {FC, useCallback, useRef} from 'react';
import {TextInput} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';

import {changePassword} from 'api';
import {Button, HeaderBar, PasswordInput} from 'components';
import {colors} from 'config';

const initialValues = {
  confirmPassword: '',
  oldPassword: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  confirmPassword: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
  oldPassword: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const ChangePassword: FC = () => {
  const passwordInput = useRef<TextInput>(null);
  const confirmPasswordInput = useRef<TextInput>(null);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async values => {
      try {
        const formData = new FormData();
        formData.append('confirmPassword', values.confirmPassword);
        formData.append('oldPassword', values.oldPassword);
        formData.append('password', values.password);

        const res = await changePassword(formData);

        Toast.show({text1: res.data.message, type: 'success'});
      } catch (error) {
        Toast.show({text1: JSON.stringify(error), type: 'error'});
      }
    },
  });

  const handleSubmit = useCallback(() => {
    formik.handleSubmit();
  }, []);

  return (
    <Box bg={colors.shark} h="full" safeAreaTop w="full">
      <StatusBar backgroundColor="transparent" translucent />
      <HeaderBar />
      <Stack px="5" py="5">
        <KeyboardAwareScrollView enableOnAndroid>
          <Stack space="5">
            <PasswordInput
              error={formik.touched.oldPassword && formik.errors.oldPassword}
              placeholder="Ancien mot de passe"
              inputProps={{
                returnKeyType: 'next',
                onSubmitEditing: () => {
                  passwordInput.current?.focus();
                },
              }}
              onChange={formik.handleChange('oldPassword')}
            />
            <PasswordInput
              error={formik.touched.password && formik.errors.password}
              inputRef={passwordInput}
              placeholder="Nouveau mot de passe"
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
              placeholder="Confirmer le nouveau mot de passe"
              onChange={formik.handleChange('confirmPassword')}
            />
            <Button title="Sauvegarder" onPress={handleSubmit} />
          </Stack>
        </KeyboardAwareScrollView>
      </Stack>
    </Box>
  );
};

export default ChangePassword;
