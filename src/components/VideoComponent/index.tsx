import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  Avatar,
  Box,
  HStack,
  IBoxProps,
  Icon,
  Pressable,
  Stack,
} from 'native-base';
import React, {FC, useCallback, useState} from 'react';
import {Platform} from 'react-native';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import Toast from 'react-native-toast-message';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNFetchBlob from 'rn-fetch-blob';

import {findMessage} from 'api';
import {
  ApplyIcon,
  BlockVideoButton,
  CommentVideoButton,
  FollowVideoButton,
  LikeVideoButton,
  ShareVideoButton,
  Text,
  Video,
} from 'components';
import {env} from 'config';
import {useAppDispatch, useAppSelector, useModal} from 'hooks';
import {ApplyModal} from 'modals';
import {getAuthState, setIsLoading} from 'store';
import {TRootStackParamList, TVideo} from 'types';
import {
  convertMovToMp4,
  getInitial,
  getS3ImageUrl,
  getS3VideoUrl,
  normalize,
} from 'utils';

type TProps = IBoxProps & {
  currentIndex: number;
  currentSubCategory: number;
  itemIndex: number;
  video: TVideo;
};

const VideoComponent: FC<TProps> = ({
  currentIndex,
  currentSubCategory,
  itemIndex,
  video,
  ...rest
}) => {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(getAuthState);
  const applyModal = useModal();
  const {navigate} = useNavigation<NavigationProp<TRootStackParamList>>();

  const [showMoreDescription, setShowMoreDescription] = useState(false);

  const handleDownloadVideo = useCallback(async () => {
    try {
      await requestMultiple([
        PERMISSIONS.IOS.MEDIA_LIBRARY,
        PERMISSIONS.IOS.PHOTO_LIBRARY,
      ]);
      dispatch(setIsLoading(true));
      const dir =
        Platform.OS === 'ios'
          ? RNFetchBlob.fs.dirs.DocumentDir
          : RNFetchBlob.fs.dirs.DownloadDir;
      const res = await RNFetchBlob.config({
        fileCache: true,
      }).fetch('GET', getS3VideoUrl(video.video));
      const fileName = `${new Date().getTime()}.mp4`;
      await convertMovToMp4(res.path(), `${dir}/${fileName}`);
      await CameraRoll.save(`${dir}/${fileName}`, {type: 'video'});
      dispatch(setIsLoading(false));
    } catch (error) {
      Toast.show({text1: JSON.stringify(error), type: 'error'});
    }
  }, [video, dispatch]);

  const handleGoChatRoom = useCallback(async () => {
    try {
      const formData = new FormData();
      formData.append('recipient', video.user.id);

      const res = await findMessage(formData);
      navigate('main', {
        params: {
          avatar: video.user.avatar,
          fullName: `${video.user.firstName} ${video.user.lastName}`,
          id: res.data.id,
        },
        screen: 'chatRoom',
      });
    } catch (error) {
      Toast.show({text1: JSON.stringify(error), type: 'error'});
    }
  }, [navigate]);

  const handleGoUserProfile = useCallback(() => {
    if (video.user.id === user?.id) {
      navigate('main', {params: {screen: 'profile'}, screen: 'tab'});
    } else {
      navigate('main', {params: {id: video.user.id}, screen: 'userProfile'});
    }
  }, [user, video, navigate]);

  const handleShowApplyModal = useCallback(() => {
    applyModal.setIsOpen(true);
  }, []);

  return (
    <Box alignItems="flex-end" safeAreaTop {...rest}>
      <Video
        image={getS3ImageUrl(video.image)}
        isPlay={currentIndex === itemIndex}
        video={getS3VideoUrl(video.video)}
      />
      <Stack
        alignItems="flex-end"
        bottom="0"
        flex={1}
        h="full"
        justifyContent="center"
        position="absolute"
        px="5">
        <Stack space="3">
          <LikeVideoButton video={video} />
          <CommentVideoButton video={video} />
          <ShareVideoButton video={video} />
          {video.user.id !== user?.id &&
            (currentSubCategory !== 2 ? (
              <Pressable _pressed={{opacity: 70}} onPress={handleGoChatRoom}>
                <Stack alignItems="center">
                  <Icon
                    as={Ionicons}
                    color="white"
                    name="chatbox-ellipses-outline"
                    size={normalize(30)}
                  />
                  <Text color="white">Contacter</Text>
                </Stack>
              </Pressable>
            ) : (
              <Pressable
                _pressed={{opacity: 70}}
                onPress={handleShowApplyModal}>
                <Stack alignItems="center">
                  <ApplyIcon />
                  <Text color="white">Postuler</Text>
                </Stack>
              </Pressable>
            ))}
          {user.id === video.user.id && (
            <Pressable _pressed={{opacity: 70}} onPress={handleDownloadVideo}>
              <Stack alignItems="center">
                <Icon
                  as={FontAwesome}
                  color="white"
                  name="cloud-download"
                  size={normalize(30)}
                />
                <Text color="white">Postuler</Text>
              </Stack>
            </Pressable>
          )}
          <BlockVideoButton video={video} />
        </Stack>
      </Stack>
      <Stack
        bgColor={showMoreDescription ? '#000000c0' : 'transparent'}
        bottom="0"
        position="absolute"
        pt="5"
        px="5"
        w="full">
        <HStack alignItems="center" space="2">
          <Pressable _pressed={{opacity: 0.5}} onPress={handleGoUserProfile}>
            <Avatar
              bgColor="transparent"
              borderColor="white"
              borderWidth="2"
              source={{
                uri: `${env.uploadFileUrl}/avatars/${video.user.avatar}`,
              }}>
              {getInitial(`${video.user.firstName} ${video.user.lastName}`)}
            </Avatar>
          </Pressable>
          <Stack alignItems="flex-start" justifyContent="center">
            <Text color="white" fontSize={normalize(18)}>
              {video.user.firstName} {video.user.lastName}
            </Text>
            <FollowVideoButton video={video} />
          </Stack>
        </HStack>
        <Stack mt={normalize(12)} space="1">
          <Text color="white" fontSize={normalize(18)}>
            {video.title}
          </Text>
          <Text
            color="white"
            fontSize={normalize(16)}
            numberOfLines={2}
            setShowMoreDescription={setShowMoreDescription}>
            {video.description}
          </Text>
        </Stack>
      </Stack>
      <ApplyModal videoId={video.id} {...applyModal} />
    </Box>
  );
};

export default VideoComponent;
