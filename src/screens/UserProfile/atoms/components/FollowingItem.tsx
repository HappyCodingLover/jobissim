import {Avatar, HStack} from 'native-base';
import React, {FC} from 'react';

import {Text} from 'components';
import {env} from 'config';
import {TFollowUser} from 'types';
import {getInitial, reduceString} from 'utils';

type TProps = {user: TFollowUser};

const FollowingItem: FC<TProps> = ({user}) => {
  return (
    <HStack alignItems="center" my="1" space="3">
      <Avatar
        bgColor="transparent"
        borderColor="white"
        borderWidth="2"
        source={{
          uri: `${env.uploadFileUrl}/avatars/${user.avatar}`,
        }}>
        {getInitial(user?.username || '')}
      </Avatar>
      <Text>{reduceString(user?.username || '', 15)}</Text>
    </HStack>
  );
};

export default FollowingItem;
