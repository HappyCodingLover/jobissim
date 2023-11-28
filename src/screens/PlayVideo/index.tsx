import {RouteProp, useRoute} from '@react-navigation/native';
import {Box, StatusBar} from 'native-base';
import React, {FC} from 'react';

import {HeaderBar, Video} from 'components';
import {colors} from 'config';
import {TMainStackParamList} from 'types';

const PlayVideo: FC = () => {
  const {params} = useRoute<RouteProp<TMainStackParamList, 'playVideo'>>();

  return (
    <Box bg={colors.shark} h="full" safeAreaTop w="full">
      <StatusBar backgroundColor="transparent" translucent />
      <HeaderBar />
      <Video image="" isFullScreen video={params.url} />
    </Box>
  );
};

export default PlayVideo;
