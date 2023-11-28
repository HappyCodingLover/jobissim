import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  Avatar,
  Box,
  HStack,
  IconButton,
  Image,
  Pressable,
  Progress,
  ScrollView,
  Stack,
  StatusBar,
  ZStack,
} from 'native-base';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {moveFile} from 'react-native-fs';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  getUnreadNotificationCount,
  getUserVideosById,
  uploadAvatar,
  uploadCover,
  uploadVideo,
} from 'api';
import {
  CandidacyIcon,
  CreateEnterpriseIcon,
  Divider,
  FilterIcon,
  Select,
  Text,
  Video,
} from 'components';
import {colors, env} from 'config';
import {useAppDispatch, useAppSelector, useModal} from 'hooks';
import {getAuthState, setIsLoading} from 'store';
import {TRootStackParamList, TVideo} from 'types';
import {
  convertMovToMp4,
  getInitial,
  makeDirectory,
  normalize,
  reduceString,
  videoF,
  withoutExtension,
} from 'utils';

import {
  FollowButton,
  FollowerUserModal,
  FollowingUserModal,
  ManageButton,
  SelectPictureModal,
  VideoComponent,
} from './atoms';

const filterData = [
  {label: 'Tout', value: 'all'},
  {label: 'Publications', value: 'publications'},
  {label: 'Intéractions', value: 'interactions'},
];

const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(getAuthState);
  const followerUserModal = useModal();
  const followingUserModal = useModal();
  const selectAvatarModal = useModal();
  const selectCoverModal = useModal();
  const {navigate} = useNavigation<NavigationProp<TRootStackParamList>>();

  const [notificationCount, setNotificationCount] = useState(0);
  const [search, setSearch] = useState('all');
  const [videos, setVideos] = useState<TVideo[]>([]);

  useEffect(() => {
    const initData = async () => {
      try {
        const res = await getUnreadNotificationCount();

        setNotificationCount(res.data.count);
      } catch (error) {
        Toast.show({
          text1: JSON.stringify(error),
          type: 'error',
        });
      }
    };

    initData();
  }, []);

  useEffect(() => {
    const initData = async () => {
      dispatch(setIsLoading(true));
      try {
        const res = await getUserVideosById({id: user?.id || -1, search});

        if (!res.data) return;

        setVideos(res.data.map(videoF));
      } catch (error) {
        Toast.show({
          text1: JSON.stringify(error),
          type: 'error',
        });
      }
      dispatch(setIsLoading(false));
    };

    search && user && initData();
  }, [search, user]);

  const handleChangeAvatar = useCallback(
    async (image: Asset) => {
      try {
        const formData = new FormData();
        formData.append('file', {
          name: image.fileName,
          type: image.type,
          uri: image.uri,
        });
        await uploadAvatar({data: formData, id: user?.id || -1});
      } catch (error) {
        Toast.show({
          text1: JSON.stringify(error),
          type: 'error',
        });
      }
    },
    [user],
  );

  const handleChangeCover = useCallback(
    async (image: Asset) => {
      try {
        const formData = new FormData();
        formData.append('file', {
          name: image.fileName,
          type: image.type,
          uri: image.uri,
        });
        await uploadCover({data: formData, id: user?.id || -1});
      } catch (error) {
        Toast.show({
          text1: JSON.stringify(error),
          type: 'error',
        });
      }
    },
    [user],
  );

  const handleGoNotification = useCallback(() => {
    navigate('main', {screen: 'notification'});
  }, [navigate]);

  const handleGoSettings = useCallback(() => {
    navigate('main', {screen: 'settings'});
  }, [navigate]);

  const handleImportVideo = useCallback(async () => {
    try {
      const res = await launchImageLibrary({
        includeBase64: true,
        mediaType: 'video',
      });

      if (res && res.assets) {
        await makeDirectory(env.recordVideoFilePath);

        const video = res.assets[0];
        const videoNameList = (video.fileName || '').split('/');
        const fileName = videoNameList[videoNameList.length - 1];
        const match = withoutExtension.exec(fileName);

        let videoName = '';

        if (match) {
          videoName = `.${match[1]}.mp4`;
          const extension = match[0].substring(match[1].length + 1);
          if (extension === 'mov') {
            await convertMovToMp4(
              fileName,
              `${env.recordVideoFilePath}/${videoName}`,
            );
          }
        } else {
          videoName = `.${fileName}.mp4`;
          await moveFile(fileName, `${env.recordVideoFilePath}/${videoName}`);
        }

        const formData = new FormData();
        formData.append('file', video);

        await uploadVideo({data: formData, id: user?.id || -1});
      }
    } catch (error) {
      Toast.show({
        text1: JSON.stringify(error),
        type: 'error',
      });
    }
  }, []);

  const handleOpenAvatar = useCallback(() => {
    selectAvatarModal.setIsOpen(true);
  }, []);

  const handleOpenCover = useCallback(() => {
    selectCoverModal.setIsOpen(true);
  }, []);

  const handleOpenFollowerUser = useCallback(() => {
    followerUserModal.setIsOpen(true);
  }, []);

  const handleOpenFollowingUser = useCallback(() => {
    followingUserModal.setIsOpen(true);
  }, []);

  return (
    <Box bg={colors.shark} h="full" safeAreaTop w="full">
      <StatusBar backgroundColor="transparent" translucent />
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
            <HStack bottom="0" justifyContent="space-between" px="10" w="full">
              <ZStack>
                <IconButton
                  bgColor={colors.grayCharade}
                  p="2.5"
                  rounded="full"
                  variant="unstyled"
                  _icon={{
                    as: MaterialCommunityIcons,
                    color: 'white',
                    name: 'bell-outline',
                  }}
                  _pressed={{
                    opacity: 0.5,
                  }}
                  onPress={handleGoNotification}
                />
                {notificationCount > 0 && (
                  <Box
                    alignItems="center"
                    bgColor={colors.redMonza}
                    color="white"
                    h="4"
                    justifyContent="center"
                    p="0"
                    right={normalize(-50)}
                    rounded="full"
                    w="4">
                    <Text fontSize={normalize(10)}>{notificationCount}</Text>
                  </Box>
                )}
              </ZStack>
              <IconButton
                bgColor={colors.grayCharade}
                p="2.5"
                rounded="full"
                variant="unstyled"
                _icon={{
                  as: Ionicons,
                  color: 'white',
                  name: 'settings-outline',
                }}
                _pressed={{
                  opacity: 0.5,
                }}
                onPress={handleGoSettings}
              />
            </HStack>
            <ZStack bottom="0" h={normalize(140)} w={normalize(140)}>
              <Avatar
                bgColor="transparent"
                borderColor="white"
                borderWidth="2"
                size="2xl"
                source={{
                  uri: `${env.uploadFileUrl}/avatars/${user?.avatar || ''}`,
                }}>
                {getInitial(`${user?.firstName || ''} ${user?.lastName || ''}`)}
              </Avatar>
              <IconButton
                bottom={normalize(-10)}
                bgColor="white"
                p="1"
                position="absolute"
                right="3"
                rounded="full"
                variant="unstyled"
                _icon={{
                  as: MaterialIcons,
                  color: 'black',
                  name: 'edit',
                  size: 'sm',
                }}
                _pressed={{
                  opacity: 0.5,
                }}
                onPress={handleOpenAvatar}
              />
            </ZStack>
            <IconButton
              top="2"
              bgColor="white"
              p="1"
              position="absolute"
              right="2"
              rounded="full"
              variant="unstyled"
              _icon={{
                as: MaterialIcons,
                color: 'black',
                name: 'edit',
                size: 'sm',
              }}
              _pressed={{
                opacity: 0.5,
              }}
              onPress={handleOpenCover}
            />
          </ZStack>
          <Text fontSize={normalize(22)} fontWeight="bold" textAlign="center">
            {`${user?.firstName || ''} ${user?.lastName || ''}`}
          </Text>
          <HStack
            alignItems="center"
            justifyContent="center"
            px="8"
            space="2"
            w="full">
            <Progress
              color={colors.blueCornFlower}
              value={user?.progress || 0}
              w="full"
            />
            <Text>{user?.progress || 0}%</Text>
          </HStack>
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
          {/* <ManageButton
            icon={<CreateEnterpriseIcon />}
            title="Gérer mes entreprises"
          />
          <ManageButton
            icon={<CandidacyIcon />}
            title="Gérer mes candidatures reçues"
          /> */}
          <HStack space="2">
            <Pressable
              alignItems="center"
              borderColor={colors.grayCharade}
              borderStyle="dashed"
              borderWidth="1"
              h={normalize(100)}
              justifyContent="center"
              rounded="md"
              w={normalize(150)}
              _pressed={{opacity: 0.5}}>
              {user?.video ? (
                <Video
                  image=""
                  rounded="xl"
                  video={`${env.uploadFileUrl}/videos/${user?.video}`}
                />
              ) : (
                <IconButton
                  p="0"
                  variant="unstyled"
                  _icon={{
                    as: AntDesign,
                    color: colors.grayCharade,
                    name: 'pluscircle',
                  }}
                  _pressed={{
                    opacity: 0.5,
                  }}
                  onPress={handleImportVideo}
                />
              )}
            </Pressable>
            <Pressable
              borderColor={colors.grayCharade}
              borderWidth="1"
              flex={1}
              h="full"
              p="2"
              rounded="xl"
              _pressed={{opacity: 0.5}}>
              <Text color={colors.grayDusty} fontSize={normalize(20)}>
                {user?.biography
                  ? reduceString(user.biography, 40)
                  : 'Aucune biographie...'}
              </Text>
            </Pressable>
          </HStack>
          <Stack space="1">
            <Text color={colors.blueCadet} fontSize={normalize(20)}>
              Activités
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
                defaultValue: 'all',
                onValueChange: setSearch,
              }}
            />
          </HStack>
          <Stack space="5">
            {videos.map((video, index) => (
              <VideoComponent key={index} video={video} />
            ))}
          </Stack>
        </Stack>
      </ScrollView>
      <FollowerUserModal {...followerUserModal} />
      <FollowingUserModal {...followingUserModal} />
      <SelectPictureModal
        {...selectAvatarModal}
        onChange={handleChangeAvatar}
      />
      <SelectPictureModal {...selectCoverModal} onChange={handleChangeCover} />
    </Box>
  );
};

export default Profile;
