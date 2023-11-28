import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Image, Pressable, Stack, ZStack} from 'native-base';
import React, {FC, useCallback, useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';

import {getBusinessById} from 'api';
import {Text} from 'components';
import {env} from 'config';
import {useAppSelector} from 'hooks';
import {getAuthState} from 'store';
import {TSubBusiness, TRootStackParamList, TBusiness} from 'types';
import {businessF, normalize} from 'utils';

type TProps = {
  business: TSubBusiness;
};

const BusinessItem: FC<TProps> = ({business}) => {
  const {user} = useAppSelector(getAuthState);
  const {navigate} = useNavigation<NavigationProp<TRootStackParamList>>();

  const [businessProfile, setBusinessProfile] = useState<TBusiness | null>(
    null,
  );

  useEffect(() => {
    const initData = async () => {
      try {
        const res = await getBusinessById(business.id);

        setBusinessProfile(businessF(res.data));
      } catch (error) {
        Toast.show({
          text1: JSON.stringify(error),
          type: 'error',
        });
      }
    };

    initData();
  }, [business]);

  const handleGoProfileView = useCallback(() => {
    if (businessProfile?.creator.id === user?.id) {
      navigate('main', {params: {screen: 'profile'}, screen: 'tab'});
    } else {
      navigate('main', {params: {id: business.id}, screen: 'businessProfile'});
    }
  }, [businessProfile, business, user, navigate]);

  return (
    <Pressable _pressed={{opacity: 0.5}} onPress={handleGoProfileView}>
      <ZStack alignItems="center" h={normalize(200)} px="1">
        <Image
          alt="cover"
          h={normalize(200)}
          resizeMode="contain"
          source={
            business.cover
              ? {uri: `${env.uploadFileUrl}/couvertures/${business.cover}`}
              : require('assets/images/cover.png')
          }
          w="full"
        />
        <Stack
          alignItems="center"
          bgColor="#00000070"
          h="full"
          justifyContent="center"
          px="2"
          py="2"
          space="2"
          w="full">
          <Text
            fontSize={normalize(22)}
            fontWeight="bold"
            lineHeight={normalize(22)}>
            {business.title}
          </Text>
          <Text fontSize={normalize(16)} lineHeight={normalize(16)}>
            {business.slug}
          </Text>
        </Stack>
      </ZStack>
    </Pressable>
  );
};

export default BusinessItem;
