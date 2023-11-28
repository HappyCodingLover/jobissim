import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HStack, Image, Pressable} from 'native-base';
import React, {FC, useCallback} from 'react';

import {Text} from 'components';
import {TPredictSearchVideo, TRootStackParamList} from 'types';
import {getS3ImageUrl} from 'utils';

type TProps = {
  video: TPredictSearchVideo;
};

const PredictVideo: FC<TProps> = ({video}) => {
  const {navigate} = useNavigation<NavigationProp<TRootStackParamList>>();

  const handleGoVideoView = useCallback(() => {
    navigate('main', {params: {id: video.id}, screen: 'videoView'});
  }, [video, navigate]);

  return (
    <Pressable my="1" _pressed={{opacity: 0.5}} onPress={handleGoVideoView}>
      <HStack alignItems="center" space="2">
        <Image
          alt="image"
          h="12"
          rounded="lg"
          source={{uri: getS3ImageUrl(video.image)}}
          w="12"
        />
        <Text>{video.title}</Text>
      </HStack>
    </Pressable>
  );
};

export default PredictVideo;
