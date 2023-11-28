import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Box, Icon, Stack, StatusBar} from 'native-base';
import React, {FC, useCallback} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  ChangePasswordIcon,
  DisconnectionIcon,
  HeaderBar,
  PersonalInfoIcon,
} from 'components';
import {colors} from 'config';
import {useModal} from 'hooks';
import {TRootStackParamList} from 'types';
import {normalize} from 'utils';

import {DeleteUserModal, SettingItem, SignOutModal} from './atoms';

const Settings: FC = () => {
  const deleteUserModal = useModal();
  const signOutModal = useModal();
  const {navigate} = useNavigation<NavigationProp<TRootStackParamList>>();

  const handleGoBlockUser = useCallback(() => {
    navigate('main', {screen: 'blockUser'});
  }, [navigate]);

  const handleGoChangePassword = useCallback(() => {
    navigate('main', {screen: 'changePassword'});
  }, [navigate]);

  const handleGoDeleteUser = useCallback(() => {
    deleteUserModal.setIsOpen(true);
  }, []);

  const handleGoPersonalInfo = useCallback(() => {
    navigate('main', {screen: 'personalInfo'});
  }, [navigate]);

  const handleGoSignOut = useCallback(() => {
    signOutModal.setIsOpen(true);
  }, []);

  return (
    <Box bg={colors.shark} h="full" safeAreaTop w="full">
      <StatusBar backgroundColor="transparent" translucent />
      <HeaderBar />
      <Stack flex={1} px="5" py="5" space="4">
        <SettingItem
          icon={<PersonalInfoIcon />}
          title="Informations personnelles"
          onPress={handleGoPersonalInfo}
        />
        <SettingItem
          icon={<ChangePasswordIcon />}
          title="Changer le mot de passe"
          onPress={handleGoChangePassword}
        />
        <SettingItem
          icon={
            <Icon
              as={MaterialIcons}
              color="white"
              name="block"
              size={normalize(20)}
            />
          }
          title="Utilisateurs bloqués"
          onPress={handleGoBlockUser}
        />
        <SettingItem
          color={colors.redMonza}
          icon={
            <Icon
              as={FontAwesome5}
              color={colors.redMonza}
              name="user-slash"
              size={normalize(20)}
            />
          }
          title="Supprimer mon compte"
          onPress={handleGoDeleteUser}
        />
        <SettingItem
          icon={<DisconnectionIcon />}
          title="Déconnexion"
          onPress={handleGoSignOut}
        />
      </Stack>
      <DeleteUserModal {...deleteUserModal} />
      <SignOutModal {...signOutModal} />
    </Box>
  );
};

export default Settings;
