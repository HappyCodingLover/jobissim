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

import {getBusinessById} from 'api';
import {Divider, FilterIcon, HeaderBar, Select, Text} from 'components';
import {colors, env} from 'config';
import {useModal} from 'hooks';
import {TBusiness, TMainStackParamList} from 'types';
import {businessF, getInitial, normalize} from 'utils';

import {FollowButton, FollowerUserModal, FollowingUserModal} from './atoms';

const filterData = [
  {label: 'Tout', value: '0'},
  {label: 'Publications', value: '1'},
  {label: 'Intéractions', value: '2'},
];

const BusinessProfile: FC = () => {
  const followerUserModal = useModal();
  const followingUserModal = useModal();
  const {params} =
    useRoute<RouteProp<TMainStackParamList, 'businessProfile'>>();

  const [business, setBusiness] = useState<TBusiness | null>(null);

  useEffect(() => {
    const initData = async () => {
      try {
        const res = await getBusinessById(params.id);

        setBusiness(businessF(res.data));
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
                business?.cover
                  ? {uri: `${env.uploadFileUrl}/couvertures/${business?.cover}`}
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
                uri: `${env.uploadFileUrl}/avatars/${
                  business?.creator.avatar || ''
                }`,
              }}>
              {getInitial(`${business?.creator.fullName || ''}`)}
            </Avatar>
          </ZStack>
          <Text fontSize={normalize(22)} fontWeight="bold" textAlign="center">
            {`${business?.creator.fullName || ''}`}
          </Text>
          <HStack>
            <FollowButton
              count={business?.creator.countFollowing || 0}
              flex={1}
              title="Abonnements"
              onPress={handleOpenFollowerUser}
            />
            <Divider h="12" orientation="vertical" />
            <FollowButton
              count={business?.creator.countFollowers || 0}
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
      <FollowerUserModal
        userId={business?.creator.id || -1}
        {...followerUserModal}
      />
      <FollowingUserModal
        userId={business?.creator.id || -1}
        {...followingUserModal}
      />
    </Box>
  );
};

export default BusinessProfile;
