import {Avatar, HStack} from 'native-base';
import React, {FC} from 'react';

import {Button, Text} from 'components';
import {colors, env} from 'config';
import {TFollowUser} from 'types';
import {getInitial, normalize} from 'utils';

type TProps = {
  followUser: TFollowUser;
};

const FollowerListItem: FC<TProps> = ({followUser}) => {
  return (
    <HStack alignItems="center" justifyContent="space-between" my={1} w="full">
      <HStack alignItems="center" space="2">
        <Avatar
          bgColor="transparent"
          borderColor="white"
          borderWidth="2"
          source={{
            uri: `${env.uploadFileUrl}/avatars/${followUser.avatar}`,
          }}>
          {getInitial(followUser.username)}
        </Avatar>
        <Text color="white">
          {followUser.username.length > 20
            ? `${followUser.username.slice(0, 20)}...`
            : followUser.username}
        </Text>
      </HStack>
      <Button
        borderColor={colors.blueCornFlower}
        borderWidth="2"
        fontSize={normalize(16)}
        title="contacter"
        w={normalize(100)}
      />
    </HStack>
  );
};

export default FollowerListItem;
