import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Avatar, HStack, Pressable} from 'native-base';
import React, {FC, useCallback} from 'react';

import {Text} from 'components';
import {env} from 'config';
import {TPredictSearchBusiness, TRootStackParamList} from 'types';
import {getInitial} from 'utils';

type TProps = {
  business: TPredictSearchBusiness;
};

const PredictBusiness: FC<TProps> = ({business}) => {
  const {navigate} = useNavigation<NavigationProp<TRootStackParamList>>();

  const handleGoBusinessProfile = useCallback(() => {
    navigate('main', {params: {id: business.id}, screen: 'businessProfile'});
  }, [business, navigate]);

  return (
    <Pressable
      my="1"
      _pressed={{opacity: 0.5}}
      onPress={handleGoBusinessProfile}>
      <HStack alignItems="center" space="2">
        <Avatar
          bgColor="transparent"
          borderColor="white"
          borderWidth="2"
          source={{
            uri: `${env.uploadFileUrl}/avatars/${business.logo}`,
          }}>
          {getInitial(business.title)}
        </Avatar>
        <Text>{business.title}</Text>
      </HStack>
    </Pressable>
  );
};

export default PredictBusiness;
