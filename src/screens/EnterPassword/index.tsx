import {useFormik} from 'formik';
import {Box, Stack, StatusBar} from 'native-base';
import React, {FC, useCallback} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';

import {Button, HeaderBar, PasswordInput} from 'components';
import {colors} from 'config';
import {useAuth} from 'hooks';
import {normalize} from 'utils';

const initialValues = {
  password: '',
};

const validationSchema = Yup.object().shape({
  password: Yup.string().required('Required'),
});

const EnterPassword: FC = () => {
  const {profile, handleSignIn} = useAuth();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      handleSignIn({email: profile?.email || '', password: values.password});
    },
  });

  const handleSubmit = useCallback(() => {
    formik.handleSubmit();
  }, []);

  return (
    <Box bg={colors.shark} h="full" safeAreaTop w="full">
      <StatusBar backgroundColor="transparent" translucent />
      <HeaderBar />
      <KeyboardAwareScrollView enableOnAndroid>
        <Stack px={normalize(28)} py={normalize(36)} space="8">
          <PasswordInput
            error={formik.touched.password && formik.errors.password}
            placeholder="Mot de passe"
            onChange={formik.handleChange('password')}
          />
          <Button title="Se connecter" onPress={handleSubmit} />
        </Stack>
      </KeyboardAwareScrollView>
    </Box>
  );
};

export default EnterPassword;
