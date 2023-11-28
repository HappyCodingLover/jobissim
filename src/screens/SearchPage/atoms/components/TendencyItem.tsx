import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Box, HStack, Icon, Pressable, Stack} from 'native-base';
import React, {FC, useCallback} from 'react';
import {useWindowDimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Feather from 'react-native-vector-icons/Feather';

import {Text} from 'components';
import {TRootStackParamList, TTendency, TTendencyPost} from 'types';
import {normalize} from 'utils';

import TendencyPostItem from './TendencyPostItem';

type TProps = {
  tendency: TTendency;
};

const TendencyItem: FC<TProps> = ({tendency}) => {
  const {navigate} = useNavigation<NavigationProp<TRootStackParamList>>();
  const {width} = useWindowDimensions();

  const handleGoTendencyView = useCallback(() => {
    navigate('main', {params: {id: tendency.id}, screen: 'tendencyView'});
  }, [tendency, navigate]);

  const renderItem = useCallback(
    ({item, index}: {item: TTendencyPost; index: number}) => {
      return <TendencyPostItem key={index} post={item} />;
    },
    [],
  );

  return (
    <Stack space="2">
      <HStack alignItems="center" justifyContent="space-between" w="full">
        <HStack alignItems="center" space="2">
          <Box
            alignItems="center"
            borderColor="white"
            borderWidth="2"
            h="10"
            justifyContent="center"
            rounded="full"
            w="10">
            <Text
              fontSize={normalize(24)}
              left={normalize(-1)}
              top={normalize(-1)}>
              #
            </Text>
          </Box>
          <Text fontSize={normalize(20)} fontWeight="bold">
            {tendency.name}
          </Text>
        </HStack>
        <Pressable _pressed={{opacity: 0.5}} onPress={handleGoTendencyView}>
          <HStack alignItems="center" space="1">
            <Text fontSize={normalize(17)}>{tendency.countPosts}</Text>
            <Icon
              as={Feather}
              color="white"
              name="chevron-right"
              size={normalize(18)}
            />
          </HStack>
        </Pressable>
      </HStack>
      <Carousel
        activeSlideAlignment="start"
        data={tendency.posts}
        inactiveSlideScale={1}
        itemWidth={100}
        sliderWidth={width - 40}
        renderItem={renderItem}
      />
    </Stack>
  );
};

export default TendencyItem;
