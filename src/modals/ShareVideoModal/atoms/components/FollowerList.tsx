import {Avatar, HStack} from 'native-base';
import React, {FC, useCallback, useState} from 'react';
import Toast from 'react-native-toast-message';

import {createMessage, findMessage} from 'api';
import {Button, Text} from 'components';
import {colors, env} from 'config';
import {useAppSelector} from 'hooks';
import {getAuthState} from 'store';
import {TFollowUser, TVideo} from 'types';
import {getInitial, normalize} from 'utils';

type TProps = {
  follower: TFollowUser;
  video: TVideo;
};

const FollowerList: FC<TProps> = ({follower, video}) => {
  const {user} = useAppSelector(getAuthState);
  const [isShared, setIsShared] = useState(false);

  const handleShare = useCallback(async () => {
    if (isShared) return;

    try {
      const connectForm = new FormData();
      connectForm.append('recipient', user?.id || -1);

      const connectRes = await findMessage(connectForm);

      const createForm = new FormData();
      createForm.append(
        'content',
        `///***partage***///${video.user.firstName} ${video.user.lastName}//${video.video}//${video.id}`,
      );
      createForm.append('messagingId', connectRes.data.id || 0);

      await createMessage(createForm);
      setIsShared(true);
    } catch (error) {
      Toast.show({
        text1: JSON.stringify(error),
        type: 'error',
      });
    }
  }, [isShared, user]);

  return (
    <HStack alignItems="center" justifyContent="space-between" my={1} w="full">
      <HStack alignItems="center" space="2">
        <Avatar
          bgColor="transparent"
          borderColor="white"
          borderWidth="2"
          source={{
            uri: `${env.uploadFileUrl}/avatars/${follower.avatar}`,
          }}>
          {getInitial(follower.username)}
        </Avatar>
        <Text color="white">
          {follower.username.length > 20
            ? `${follower.username.slice(0, 20)}...`
            : follower.username}
        </Text>
      </HStack>
      <Button
        borderColor={colors.blueCornFlower}
        borderWidth="2"
        fontSize={normalize(16)}
        title={isShared ? 'Envoyé' : 'Envoyer'}
        type={isShared ? 'outline' : 'solid'}
        w={normalize(100)}
        onPress={handleShare}
      />
    </HStack>
  );
};

export default FollowerList;
