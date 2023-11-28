import {RouteProp, useRoute} from '@react-navigation/native';
import {
  Avatar,
  Box,
  HStack,
  Image,
  ScrollView,
  Stack,
  StatusBar,
  ZStack,
} from 'native-base';
import React, {FC, useCallback, useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';

import {getUserById} from 'api';
import {Divider, FilterIcon, HeaderBar, Select, Text} from 'components';
import {colors, env} from 'config';
import {useModal} from 'hooks';
import {TMainStackParamList, TUser} from 'types';
import {getInitial, normalize, userF} from 'utils';

import {FollowButton, FollowerUserModal, FollowingUserModal} from './atoms';

const filterData = [
  {label: 'Tout', value: '0'},
  {label: 'Publications', value: '1'},
  {label: 'Intéractions', value: '2'},
];

const UserProfile: FC = () => {
  const followerUserModal = useModal();
  const followingUserModal = useModal();
  const {params} = useRoute<RouteProp<TMainStackParamList, 'userProfile'>>();

  const [user, setUser] = useState<TUser | null>(null);

  useEffect(() => {
    const initData = async () => {
      try {
        const res = await getUserById(params.id);

        setUser(userF(res.data));
      } catch (error) {
        Toast.show({
          text1: JSON.stringify(error),
          type: 'error',
        });
      }
    };

    initData();
  }, [params.id]);

  const handleOpenFollowerUser = useCallback(() => {
    followerUserModal.setIsOpen(true);
  }, []);

  const handleOpenFollowingUser = useCallback(() => {
    followingUserModal.setIsOpen(true);
  }, []);

  return (
    <Box bg={colors.shark} h="full" safeAreaTop w="full">
      <StatusBar backgroundColor="transparent" translucent />
      <HeaderBar />
      <ScrollView>
        <Stack p="5" space="5" w="full">
          <ZStack alignItems="center" h={normalize(310)}>
            <Image
              alt="cover"
              h={normalize(240)}
              resizeMode="stretch"
              source={
                user?.cover
                  ? {uri: `${env.uploadFileUrl}/couvertures/${user?.cover}`}
                  : require('assets/images/cover.png')
              }
              w="full"
            />
            <Avatar
              bgColor="transparent"
              borderColor="white"
              borderWidth="2"
              bottom="0"
              size="2xl"
              source={{
                uri: `${env.uploadFileUrl}/avatars/${user?.avatar || ''}`,
              }}>
              {getInitial(`${user?.firstName || ''} ${user?.lastName || ''}`)}
            </Avatar>
          </ZStack>
          <Text fontSize={normalize(22)} fontWeight="bold" textAlign="center">
            {`${user?.firstName || ''} ${user?.lastName || ''}`}
          </Text>
          <HStack>
            <FollowButton
              count={user?.countFollowing || 0}
              flex={1}
              title="Abonnements"
              onPress={handleOpenFollowerUser}
            />
            <Divider h="12" orientation="vertical" />
            <FollowButton
              count={user?.countFollowers || 0}
              flex={1}
              title="Abonnés"
              onPress={handleOpenFollowingUser}
            />
          </HStack>
          <Stack space="1">
            <Text color={colors.blueCadet} fontSize={normalize(20)}>
              Publications
            </Text>
            <Divider />
          </Stack>
          <HStack space="2">
            <HStack alignItems="center" space="1">
              <FilterIcon />
              <Text>Filtre d'affichages :</Text>
            </HStack>
            <Select
              data={filterData}
              flex={1}
              fontSize={normalize(16)}
              h={normalize(50)}
              selectProps={{
                defaultValue: '0',
              }}
            />
          </HStack>
        </Stack>
      </ScrollView>
      <FollowerUserModal userId={user?.id || -1} {...followerUserModal} />
      <FollowingUserModal userId={user?.id || -1} {...followingUserModal} />
    </Box>
  );
};

export default UserProfile;
