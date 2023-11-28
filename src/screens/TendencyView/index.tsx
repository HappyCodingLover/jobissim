import {RouteProp, useRoute} from '@react-navigation/native';
import {Box, FlatList, StatusBar} from 'native-base';
import React, {FC, useCallback, useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';

import {getTendencyById} from 'api';
import {HeaderBar} from 'components';
import {colors} from 'config';
import {TMainStackParamList, TTendency, TTendencyPost} from 'types';

import {TendencyItem} from './atoms';

const TendencyView: FC = () => {
  const {params} = useRoute<RouteProp<TMainStackParamList, 'tendencyView'>>();

  const [tendency, setTendency] = useState<TTendency | null>(null);

  useEffect(() => {
    const initData = async () => {
      try {
        const res = await getTendencyById(params.id);

        setTendency(res.data);
      } catch (error) {
        Toast.show({
          text1: JSON.stringify(error),
          type: 'error',
        });
      }
    };

    initData();
  }, [params.id]);

  const renderItem = useCallback(
    ({item, index}: {item: TTendencyPost; index: number}) => {
      return <TendencyItem key={index} post={item} />;
    },
    [],
  );

  return (
    <Box bg={colors.shark} h="full" safeAreaTop w="full">
      <StatusBar backgroundColor="transparent" translucent />
      <HeaderBar />
      <FlatList
        contentContainerStyle={{alignItems: 'center'}}
        data={tendency?.posts}
        flex={1}
        numColumns={3}
        renderItem={renderItem}
      />
    </Box>
  );
};

export default TendencyView;
