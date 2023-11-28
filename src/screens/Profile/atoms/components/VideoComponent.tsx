import {Avatar, HStack, Icon, IconButton, Stack} from 'native-base';
import React, {FC} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  CommentVideoButton,
  Divider,
  FollowVideoButton,
  LikeVideoButton,
  Link,
  ShareVideoButton,
  Text,
  Video,
} from 'components';
import {colors, env} from 'config';
import {TVideo} from 'types';
import {getInitial, getS3ImageUrl, getS3VideoUrl, normalize} from 'utils';

type TProps = {
  video: TVideo;
};

const VideoComponent: FC<TProps> = ({video}) => {
  return (
    <Stack
      bgColor={colors.sharkDark}
      my="2"
      p={normalize(16)}
      rounded="xl"
      space={normalize(10)}>
      <Video
        image={getS3ImageUrl(video.image)}
        isPlay={false}
        video={getS3VideoUrl(video.video)}
        h={normalize(250)}
      />
      <HStack alignItems="flex-start" justifyContent="space-between">
        <HStack space={normalize(10)}>
          <Avatar
            bgColor="transparent"
            borderColor="white"
            borderWidth="2"
            source={{
              uri: `${env.uploadFileUrl}/avatars/${video.user.avatar}`,
            }}>
            {getInitial(`${video.user.firstName} ${video.user.lastName}`)}
          </Avatar>
          <Stack>
            <Text color="white" fontWeight="bold">
              {video.user.firstName} {video.user.lastName}
            </Text>
            <Text color={colors.grayFrench} fontSize={normalize(14)}>
              {video.user.firstName} {video.user.lastName}
            </Text>
            <HStack space={normalize(20)}>
              <FollowVideoButton video={video} />
              {video.subCategory.name.toLowerCase() === 'cv' ? (
                <Link
                  fontSize={normalize(18)}
                  leftIcon={
                    <Icon
                      as={Ionicons}
                      color={colors.blueCornFlower}
                      name="chatbox-ellipses-outline"
                      size="xs"
                    />
                  }
                  title="CONTACTER"
                />
              ) : (
                <Link
                  fontSize={normalize(18)}
                  leftIcon={
                    <Icon
                      as={AntDesign}
                      color={colors.blueCornFlower}
                      name="filetext1"
                      size="xs"
                    />
                  }
                  title="POSTULER"
                />
              )}
            </HStack>
          </Stack>
        </HStack>
        <IconButton
          p="0"
          variant="unstyled"
          _icon={{
            as: Entypo,
            color: 'white',
            name: 'dots-three-vertical',
          }}
          _pressed={{
            opacity: 0.5,
          }}
        />
      </HStack>
      <Stack>
        <Text color="white" fontSize={normalize(18)} fontWeight="bold">
          {video.title}
        </Text>
        <Text
          color={colors.grayFrench}
          fontSize={normalize(16)}
          numberOfLines={5}>
          {video.description}
        </Text>
      </Stack>
      <Divider color={colors.grayCharade} />
      <HStack alignItems="center" justifyContent="space-between">
        <Stack w="33%">
          <LikeVideoButton direction="row" video={video} />
        </Stack>
        <Divider color={colors.grayCharade} h="8" orientation="vertical" />
        <Stack w="33%">
          <CommentVideoButton direction="row" video={video} />
        </Stack>
        <Divider color={colors.grayCharade} h="8" orientation="vertical" />
        <Stack w="33%">
          <ShareVideoButton direction="row" video={video} />
        </Stack>
      </HStack>
    </Stack>
  );
};

export default VideoComponent;
