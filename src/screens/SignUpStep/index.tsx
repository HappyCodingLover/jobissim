import ProgressSteps, {
  Content,
  Title,
} from '@joaosousa/react-native-progress-steps';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Box, Stack, StatusBar} from 'native-base';
import React, {FC, useCallback, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Text} from 'components';
import {colors} from 'config';
import {useAuth} from 'hooks';
import {TRootStackParamList} from 'types';
import {normalize} from 'utils';

import {StepOne, StepTwo} from './atoms';

const SignUpStep: FC = () => {
  const {profile, handleSignUp} = useAuth();
  const {goBack, navigate} =
    useNavigation<NavigationProp<TRootStackParamList>>();

  const [step, setStep] = useState(0);

  const handleNextStep = useCallback(() => {
    setStep(_step => _step + 1);
  }, []);

  const handlePrev = useCallback(() => {
    goBack();
  }, [navigate]);

  const handlePrevStep = useCallback(() => {
    setStep(_step => _step - 1);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!profile) return;

    handleSignUp({
      accountType: '',
      city: profile.city,
      country: profile.country,
      email: profile.email,
      firstName: profile.firstName,
      lastName: profile.lastName,
      password: profile.password,
      roles: ['ROLE_USER'],
      zipCode: profile.zipCode,
    });
  }, [profile]);

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
          <ProgressSteps
            colors={{
              title: {
                text: {
                  active: colors.blueCornFlower,
                  completed: colors.grayDusty,
                  normal: colors.grayDusty,
                },
              },
              marker: {
                line: {
                  active: colors.blueCornFlower,
                  completed: colors.blueCornFlower,
                  normal: colors.grayDusty,
                },
                text: {
                  active: 'white',
                  completed: 'white',
                  normal: 'white',
                },
              },
            }}
            currentStep={step}
            orientation="horizontal"
            steps={[
              {
                content: (
                  <Content>
                    <StepOne
                      handleNextStep={handleNextStep}
                      handlePrev={handlePrev}
                    />
                  </Content>
                ),
                id: 0,
                title: <Title>Etape 1</Title>,
              },
              {
                content: (
                  <Content>
                    <StepTwo
                      handlePrevStep={handlePrevStep}
                      handleSubmit={handleSubmit}
                    />
                  </Content>
                ),
                id: 1,
                title: <Title>Etape 2</Title>,
              },
            ]}
          />
        </Stack>
      </KeyboardAwareScrollView>
    </Box>
  );
};

export default SignUpStep;
