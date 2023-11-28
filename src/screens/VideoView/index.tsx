import {RouteProp, useRoute} from '@react-navigation/native';
import {Box, StatusBar} from 'native-base';
import React, {FC, useEffect, useState} from 'react';
import {useWindowDimensions} from 'react-native';
import Toast from 'react-native-toast-message';

import {getSubCategoryByIdentifier, getVideoById} from 'api';
import {HeaderBar, VideoComponent} from 'components';
import {colors} from 'config';
import {useAppDispatch} from 'hooks';
import {setIsLoading} from 'store';
import {TMainStackParamList, TSubCategory, TVideo} from 'types';
import {normalize, videoF} from 'utils';

const VideoView: FC = () => {
  const dispatch = useAppDispatch();
  const {params} = useRoute<RouteProp<TMainStackParamList, 'videoView'>>();
  const {height} = useWindowDimensions();

  const [subCategory, setSubCategory] = useState<TSubCategory | null>(null);
  const [video, setVideo] = useState<TVideo | null>(null);

  useEffect(() => {
    const initData = async () => {
      dispatch(setIsLoading(true));
      try {
        const res = await getVideoById(params.id);

        setVideo(videoF(res.data));
      } catch (error) {
        Toast.show({text1: JSON.stringify(error), type: 'error'});
      }
      dispatch(setIsLoading(false));
    };

    initData();
  }, [params.id, dispatch]);

  useEffect(() => {
    const initData = async () => {
      try {
        const res = await getSubCategoryByIdentifier(
          video?.subCategory.name || '',
        );

        setSubCategory(res.data);
      } catch (error) {
        Toast.show({text1: JSON.stringify(error), type: 'error'});
      }
    };

    video && initData();
  }, [video]);

  return (
    <Box bg={colors.shark} h="full" safeAreaTop w="full">
      <StatusBar backgroundColor="transparent" translucent />
      <HeaderBar title="" />
      {subCategory && video && (
        <VideoComponent
          currentIndex={0}
          currentSubCategory={subCategory.id}
          h={`${height - 80}px`}
          itemIndex={0}
          video={video}
        />
      )}
    </Box>
  );
};

export default VideoView;
