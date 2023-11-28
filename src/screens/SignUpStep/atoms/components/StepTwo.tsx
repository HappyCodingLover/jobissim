import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import {Checkbox, HStack, Stack, Text as NBText} from 'native-base';
import React, {FC, useCallback, useRef, useState} from 'react';
import {TextInput} from 'react-native';
import * as Yup from 'yup';

import {Button, Input, Link, Select, Text} from 'components';
import {useAuth} from 'hooks';
import {TRootStackParamList} from 'types';
import {normalize} from 'utils';

const initialValues = {
  city: '',
  country: '',
  zipCode: '',
};

const validationSchema = Yup.object().shape({
  city: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
  zipCode: Yup.string().required('Required'),
});

type TProps = {
  handlePrevStep: () => void;
  handleSubmit: () => void;
};

const StepTwo: FC<TProps> = ({handlePrevStep, handleSubmit}) => {
  const {profile, setProfile} = useAuth();
  const {navigate} = useNavigation<NavigationProp<TRootStackParamList>>();
  const cityInput = useRef<TextInput>(null);
  const zipCodeInput = useRef<TextInput>(null);

  const [isAccept, setIsAccept] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      if (profile && isAccept) {
        setProfile({...profile, ...values});
        handleSubmit();
      }
    },
  });

  const handleGoPolicy = useCallback(() => {
    navigate('main', {
      params: {url: 'https://jobissim.com/ppdp'},
      screen: 'terms',
    });
  }, [navigate]);

  const handleGoTerms = useCallback(() => {
    navigate('main', {
      params: {url: 'https://jobissim.com/conditions'},
      screen: 'terms',
    });
  }, [navigate]);

  const handleFormikSubmit = useCallback(() => {
    formik.handleSubmit();
  }, []);

  return (
    <Stack mt="10" space="10">
      <Stack space="5">
        <Text color="white" fontSize={normalize(18)} textAlign="center">
          Aidez-nous à mieux situer votre recherche afin d’améliorer le service
          de Matching.
        </Text>
        <Select
          data={[{label: 'France', value: 'fr'}]}
          error={formik.touched.country && formik.errors.country}
          placeholder="Pays"
          selectProps={{
            onValueChange: formik.handleChange('country'),
          }}
        />
        <Input
          error={formik.touched.zipCode && formik.errors.zipCode}
          inputRef={zipCodeInput}
          placeholder="Code postal"
          inputProps={{
            inputMode: 'numeric',
            maxLength: 5,
            returnKeyType: 'next',
            onChangeText: formik.handleChange('zipCode'),
            onSubmitEditing: () => {
              cityInput.current?.focus();
            },
          }}
        />
        <Input
          error={formik.touched.city && formik.errors.city}
          inputRef={cityInput}
          placeholder="Ville"
          inputProps={{
            onChangeText: formik.handleChange('city'),
          }}
        />
        <HStack space="2">
          <Checkbox
            aria-label="accept"
            borderWidth="0"
            value="access"
            onChange={setIsAccept}
          />
          <NBText color="white" fontSize={normalize(18)} mt={-1}>
            En cochant cette case, vous acceptez les{' '}
            <Link
              fontSize={normalize(18)}
              mb={-1}
              title="conditions d’utilisations"
              titleProps={{lineHeight: normalize(18)}}
              onPress={handleGoTerms}
            />{' '}
            et la{' '}
            <Link
              fontSize={normalize(18)}
              mb={-1}
              title="Politique de confidentialité"
              onPress={handleGoPolicy}
            />{' '}
            de Jobissim.
          </NBText>
        </HStack>
      </Stack>
      <HStack justifyContent="space-between">
        <Button
          title="Retour"
          type="outline"
          w="47%"
          onPress={handlePrevStep}
        />
        <Button title="Suivant" w="47%" onPress={handleFormikSubmit} />
      </HStack>
    </Stack>
  );
};

export default StepTwo;
