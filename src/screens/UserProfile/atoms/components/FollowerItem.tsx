import {Avatar, HStack} from 'native-base';
import React, {Dispatch, FC, SetStateAction} from 'react';

import {Text} from 'components';
import {env} from 'config';
import {TFollowUser} from 'types';
import {getInitial, reduceString} from 'utils';

type TProps = {
  user: TFollowUser;
  setIsRefresh: Dispatch<SetStateAction<boolean>>;
};

const FollowerItem: FC<TProps> = ({user, setIsRefresh}) => {
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

export default FollowerItem;
