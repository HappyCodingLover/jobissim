import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Avatar, HStack, Pressable} from 'native-base';
import React, {FC, useCallback} from 'react';

import {Text} from 'components';
import {env} from 'config';
import {TPredictSearchUser, TRootStackParamList} from 'types';
import {getInitial} from 'utils';

type TProps = {
  user: TPredictSearchUser;
};

const PredictUser: FC<TProps> = ({user}) => {
  const {navigate} = useNavigation<NavigationProp<TRootStackParamList>>();

  const handleGoUserProfile = useCallback(() => {
    navigate('main', {params: {id: user.id}, screen: 'userProfile'});
  }, [user, navigate]);

  return (
    <Pressable my="1" _pressed={{opacity: 0.5}} onPress={handleGoUserProfile}>
      <HStack alignItems="center" space="2">
        <Avatar
          bgColor="transparent"
          borderColor="white"
          borderWidth="2"
          source={{
            uri: `${env.uploadFileUrl}/avatars/${user.avatar}`,
          }}>
          {getInitial(`${user.firstName} ${user.lastName}`)}
        </Avatar>
        <Text>{`${user.firstName} ${user.lastName}`}</Text>
      </HStack>
    </Pressable>
  );
};

export default PredictUser;
