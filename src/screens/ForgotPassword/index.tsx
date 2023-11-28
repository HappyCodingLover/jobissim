import {useFormik} from 'formik';
import {Box, Stack, StatusBar} from 'native-base';
import React, {FC, useCallback} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';

import {Button, HeaderBar, Input} from 'components';
import {colors} from 'config';
import {useAuth} from 'hooks';
import {normalize} from 'utils';

const initialValues = {
  email: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email').required('Required'),
});

const ForgotPassword: FC = () => {
  const {handleVerifyEmail} = useAuth();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      handleVerifyEmail(values);
    },
  });

  const handleSubmit = useCallback(() => {
    formik.handleSubmit();
  }, []);

  return (
    <Box bg={colors.shark} h="full" safeAreaTop w="full">
      <StatusBar backgroundColor="transparent" translucent />
      <HeaderBar title="Mot de passe oublié" />
      <KeyboardAwareScrollView enableOnAndroid>
        <Stack px={normalize(28)} py={normalize(36)} space="8">
          <Input
            error={formik.touched.email && formik.errors.email}
            placeholder="Adresse e-mail"
            inputProps={{
              onChangeText: formik.handleChange('email'),
            }}
          />
          <Button title="Se connecter" onPress={handleSubmit} />
        </Stack>
      </KeyboardAwareScrollView>
    </Box>
  );
};

export default ForgotPassword;
