import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Image, Pressable} from 'native-base';
import React, {FC, useCallback} from 'react';

import {TRootStackParamList, TTendencyPost} from 'types';
import {getS3ImageUrl, normalize} from 'utils';

type TProps = {
  post: TTendencyPost;
};

const TendencyPostItem: FC<TProps> = ({post}) => {
  const {navigate} = useNavigation<NavigationProp<TRootStackParamList>>();

  const handleGoVideoView = useCallback(() => {
    navigate('main', {params: {id: post.id}, screen: 'videoView'});
  }, [post.id, navigate]);

  return (
    <Pressable _pressed={{opacity: 0.5}} onPress={handleGoVideoView}>
      <Image
        alt="post"
        h={normalize(120)}
        rounded="lg"
        source={{uri: getS3ImageUrl(post.image)}}
        w={normalize(100)}
      />
    </Pressable>
  );
};

export default TendencyPostItem;
