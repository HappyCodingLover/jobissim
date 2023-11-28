import {useFormik} from 'formik';
import {HStack, Stack} from 'native-base';
import React, {FC, useCallback, useEffect, useRef} from 'react';
import {TextInput} from 'react-native';
import * as Yup from 'yup';

import {Button, Input} from 'components';
import {useAuth} from 'hooks';

const initialValues = {
  firstName: '',
  lastName: '',
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Ce champ ne doit être pas vide.'),
  lastName: Yup.string().required('Ce champ ne doit être pas vide.'),
});

type TProps = {
  handleNextStep: () => void;
  handlePrev: () => void;
};

const StepOne: FC<TProps> = ({handleNextStep, handlePrev}) => {
  const {profile, setProfile} = useAuth();
  const lastNameInput = useRef<TextInput>(null);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      if (profile) {
        setProfile({...profile, ...values});
        handleNextStep();
      }
    },
  });

  useEffect(() => {
    formik.setFieldValue('firstName', profile?.firstName || '');
    formik.setFieldValue('lastName', profile?.lastName || '');
  }, [profile]);

  const handleSubmit = useCallback(() => {
    formik.handleSubmit();
  }, []);

  return (
    <Stack mt="10" space="10">
      <Stack space="5">
        <Input
          error={formik.touched.firstName && formik.errors.firstName}
          placeholder="Prénom"
          inputProps={{
            defaultValue: profile?.firstName,
            returnKeyType: 'next',
            textContentType: 'familyName',
            onChangeText: formik.handleChange('firstName'),
            onSubmitEditing: () => {
              lastNameInput.current?.focus();
            },
          }}
        />
        <Input
          error={formik.touched.lastName && formik.errors.lastName}
          inputRef={lastNameInput}
          placeholder="Nom"
          inputProps={{
            defaultValue: profile?.lastName,
            textContentType: 'givenName',
            onChangeText: formik.handleChange('lastName'),
          }}
        />
      </Stack>
      <HStack justifyContent="space-between" space="2">
        <Button flex={1} title="Retour" type="outline" onPress={handlePrev} />
        <Button flex={1} title="Suivant" onPress={handleSubmit} />
      </HStack>
    </Stack>
  );
};

export default StepOne;
