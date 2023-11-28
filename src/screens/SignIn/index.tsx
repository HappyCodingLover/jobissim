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
import {normalize} from 'utils';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email').required('Required'),
  password: Yup.string().required('Required'),
});

const SignIn: FC = () => {
  const {handleAppleAuth, handleGoogleAuth, handleLinkedinAuth, handleSignIn} =
    useAuth();
  const linkedinAuthenticationModal = useModal();
  const {navigate} = useNavigation<NavigationProp<TRootStackParamList>>();
  const passwordInput = useRef<TextInput>(null);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      handleSignIn(values);
    },
  });

  const handleGoForgot = useCallback(() => {
    navigate('auth', {screen: 'forgotPassword'});
  }, [navigate]);

  const handleGoSignUp = useCallback(() => {
    navigate('auth', {screen: 'signUp'});
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
        <Stack px={normalize(28)} py={normalize(48)} space="8">
          <Stack>
            <Text
              color="white"
              fontSize={normalize(28)}
              fontWeight="bold"
              textAlign="center">
              Connectez-vous à Jobissim
            </Text>
            <Text color="white" fontSize={normalize(20)} textAlign="center">
              Le réseau social de l'emploi en vidéo
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
              onChange={formik.handleChange('password')}
            />
            <Link title="Mot de passe oublié ?" onPress={handleGoForgot} />
            <Button title="Se connecter" onPress={handleSubmit} />
          </Stack>
          <Divider title="Ou" />
          <Stack space="4">
            <Button
              leftIcon={
                <Icon
                  as={FontAwesome}
                  color="white"
                  left="4"
                  name="linkedin"
                  position="absolute"
                  size="lg"
                />
              }
              title="Se connecter avec Linkedin"
              type="outline"
              onPress={handleLinkedinAuthenticationModal}
            />
            <Button
              leftIcon={
                <Icon
                  as={FontAwesome}
                  color="white"
                  left="4"
                  name="google"
                  position="absolute"
                  size="lg"
                />
              }
              title="Se connecter avec Google"
              type="outline"
              onPress={() => handleGoogleAuth('signIn')}
            />
            {Platform.OS === 'ios' && (
              <Button
                leftIcon={
                  <Icon
                    as={FontAwesome}
                    color="white"
                    left="4"
                    name="apple"
                    position="absolute"
                    size="lg"
                  />
                }
                title="Se connecter avec Apple"
                type="outline"
                onPress={() => handleAppleAuth('signIn')}
              />
            )}
          </Stack>
          <Stack>
            <Text
              color={colors.grayDusty}
              fontSize={normalize(20)}
              textAlign="center">
              Vous n'avez pas encore de compte ?
            </Text>
            <Link
              title="Inscrivez-vous"
              linkProps={{justifyContent: 'center'}}
              onPress={handleGoSignUp}
            />
          </Stack>
        </Stack>
      </KeyboardAwareScrollView>
      <LinkedinAuthenticationModal
        {...linkedinAuthenticationModal}
        onSuccess={token => handleLinkedinAuth(token, 'signIn')}
      />
    </Box>
  );
};

export default SignIn;
