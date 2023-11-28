import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import {Box, Icon, Stack, StatusBar} from 'native-base';
import React, {FC, useCallback, useRef} from 'react';
import {Platform, TextInput} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Yup from 'yup';

import {Button, Divider, Input, Link, PasswordInput, Text} from 'components';
import {colors} from 'config';
import {useAuth, useModal} from 'hooks';
import {LinkedinAuthenticationModal} from 'modals';
import {TRootStackParamList} from 'types';
import {initialUser, normalize} from 'utils';

const initialValues = {
  confirmPassword: '',
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  confirmPassword: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
  email: Yup.string().email('Invalid Email').required('Required'),
  password: Yup.string().required('Required'),
});

const SignUp: FC = () => {
  const {
    handleAppleAuth,
    handleAuthNavigation,
    handleGoogleAuth,
    handleLinkedinAuth,
    setProfile,
  } = useAuth();
  const linkedinAuthenticationModal = useModal();
  const {navigate} = useNavigation<NavigationProp<TRootStackParamList>>();
  const confirmPasswordInput = useRef<TextInput>(null);
  const passwordInput = useRef<TextInput>(null);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async values => {
      await handleAuthNavigation(values.email, 'signUp', 'email');
      setProfile({
        ...initialUser,
        email: values.email,
        password: values.password,
      });
    },
  });

  const handleGoSignIn = useCallback(() => {
    navigate('auth', {screen: 'signIn'});
  }, [navigate]);

  const handleLinkedinAuthenticationModal = useCallback(() => {
    linkedinAuthenticationModal.setIsOpen(true);
  }, [linkedinAuthenticationModal]);

  const handleSubmit = useCallback(() => {
    formik.handleSubmit();
  }, []);

  return (
    <Box bg={colors.shark} h="full" safeAreaTop w="full">
      <StatusBar backgroundColor="transparent" translucent />
      <KeyboardAwareScrollView enableOnAndroid>
        <Stack px={normalize(28)} py={normalize(48)} space="10">
          <Stack>
            <Text color="white" fontSize={normalize(20)} textAlign="center">
              Inscription
            </Text>
            <Text
              color="white"
              fontSize={normalize(28)}
              fontWeight="bold"
              textAlign="center">
              Jobissim c'est simplissime.
            </Text>
          </Stack>
          <Stack space="5">
            <Input
              error={formik.touched.email && formik.errors.email}
              placeholder="Adresse e-mail"
              inputProps={{
                returnKeyType: 'next',
                onChangeText: formik.handleChange('email'),
                onSubmitEditing: () => {
                  passwordInput.current?.focus();
                },
              }}
            />
            <PasswordInput
              error={formik.touched.password && formik.errors.password}
              inputRef={passwordInput}
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
          </Stack>
          <Button title="S'inscrire" onPress={handleSubmit} />
          <Divider title="Ou" />
          <Stack space="4">
            <Button
              leftIcon={
                <Icon
                  as={FontAwesome}
                  color="white"
                  name="linkedin"
                  size="lg"
                />
              }
              title="S'inscrire avec LinkedIn"
              type="outline"
              onPress={handleLinkedinAuthenticationModal}
            />
            <Button
              leftIcon={
                <Icon as={FontAwesome} color="white" name="google" size="lg" />
              }
              title="S'inscrire avec Google"
              type="outline"
              onPress={() => handleGoogleAuth('signUp')}
            />
            {Platform.OS === 'ios' && (
              <Button
                leftIcon={
                  <Icon as={FontAwesome} color="white" name="apple" size="lg" />
                }
                title="S'inscrire avec Apple"
                type="outline"
                onPress={() => handleAppleAuth('signUp')}
              />
            )}
          </Stack>
          <Stack>
            <Text
              color={colors.grayDusty}
              fontSize={normalize(20)}
              textAlign="center">
              Vous avez déjà un compte ?
            </Text>
            <Link
              title="Connectez-vous"
              linkProps={{justifyContent: 'center'}}
              onPress={handleGoSignIn}
            />
          </Stack>
        </Stack>
      </KeyboardAwareScrollView>
      <LinkedinAuthenticationModal
        {...linkedinAuthenticationModal}
        onSuccess={token => handleLinkedinAuth(token, 'signUp')}
      />
    </Box>
  );
};

export default SignUp;
