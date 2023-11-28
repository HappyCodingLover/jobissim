import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Box, Image, Pressable} from 'native-base';
import React, {FC, useCallback} from 'react';
import {useWindowDimensions} from 'react-native';

import {TRootStackParamList, TTendencyPost} from 'types';
import {getS3ImageUrl, normalize} from 'utils';

type TProps = {
  post: TTendencyPost;
};

const TendencyItem: FC<TProps> = ({post}) => {
  const {navigate} = useNavigation<NavigationProp<TRootStackParamList>>();
  const {width} = useWindowDimensions();

  const handleGoVideoView = useCallback(() => {
    navigate('main', {params: {id: post.id}, screen: 'videoView'});
  }, [post.id, navigate]);

  return (
    <Pressable _pressed={{opacity: 0.5}} onPress={handleGoVideoView}>
      <Box
        h={normalize((width / 3 - 8) * 1.2)}
        rounded="md"
        mx="2"
        my="2"
        w={normalize(width / 3 - 8)}>
        <Image
          alt="post"
          h={normalize((width / 3 - 8) * 1.2)}
          rounded="md"
          source={{uri: getS3ImageUrl(post.image)}}
          w={normalize(width / 3 - 8)}
        />
      </Box>
    </Pressable>
  );
};

export default TendencyItem;
