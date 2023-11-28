import {Box, Stack, StatusBar} from 'native-base';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {Platform, useWindowDimensions} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Toast from 'react-native-toast-message';

import {getVideos} from 'api';
import {VideoComponent} from 'components';
import {colors} from 'config';
import {useAppDispatch, useAppSelector, useModal} from 'hooks';
import {DraftVideoModal} from 'modals';
import {getAppState, setIsLoading} from 'store';
import {TVideo} from 'types';
import {normalize, videoF} from 'utils';

import {TabBar} from './atoms';

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const {video} = useAppSelector(getAppState);
  const draftVideoModal = useModal();
  const {height} = useWindowDimensions();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSubCategory, setCurrentSubCategory] = useState(4);
  const [page, setPage] = useState(1);
  const [videos, setVideos] = useState<TVideo[]>([]);

  useEffect(() => {
    if (!video) return;

    draftVideoModal.setIsOpen(true);
  }, [video]);

  useEffect(() => {
    const initData = async () => {
      dispatch(setIsLoading(true));
      try {
        const res = await getVideos({
          page: page,
          subCategoryId: currentSubCategory,
        });
        if (page > 1) {
          setVideos(_videos => [_videos, res.data.map(videoF) || []].flat());
        } else {
          setVideos(res.data.map(videoF));
        }
      } catch (error) {
        Toast.show({text1: JSON.stringify(error), type: 'error'});
      }
      dispatch(setIsLoading(false));
    };

    initData();
  }, [currentSubCategory, page, dispatch]);

  const renderItem = useCallback(
    ({item, index}: {item: TVideo; index: number}) => {
      return (
        <VideoComponent
          currentIndex={currentIndex}
          currentSubCategory={currentSubCategory}
          h={`${height - 80}px`}
          itemIndex={index}
          key={index}
          video={item}
        />
      );
    },
    [currentIndex, currentSubCategory, height],
  );

  const handleChangeCurrentSubCategory = useCallback((value: number) => {
    setCurrentSubCategory(value);
    setPage(1);
  }, []);

  const handleChangeIndex = useCallback(
    ({index, prevIndex}: {index: number; prevIndex: number}) => {
      setCurrentIndex(index);
    },
    [],
  );

  const handleOnEndReached = useCallback(() => {
    setPage(_page => _page + 1);
  }, []);

  return (
    <Box bg={colors.shark} h="full" w="full">
      <StatusBar backgroundColor="transparent" translucent />
      <Box h="full">
        <SwiperFlatList
          data={videos}
          vertical
          renderItem={renderItem}
          onChangeIndex={handleChangeIndex}
          onEndReached={handleOnEndReached}
        />
        <Stack position="absolute" px={normalize(28)} py={normalize(80)}>
          <TabBar
            step={currentSubCategory}
            onChange={handleChangeCurrentSubCategory}
          />
        </Stack>
      </Box>
      <DraftVideoModal {...draftVideoModal} />
    </Box>
  );
};

export default Home;
