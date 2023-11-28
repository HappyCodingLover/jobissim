import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Box, IconButton, Stack, StatusBar} from 'native-base';
import React, {FC} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import WebView from 'react-native-webview';

import {colors} from 'config';
import {TMainStackParamList} from 'types';
import {normalize} from 'utils';

const TermsAndPolicy: FC = () => {
  const {goBack} = useNavigation();
  const {params} = useRoute<RouteProp<TMainStackParamList, 'terms'>>();

  return (
    <Box bg={colors.shark} h="full" safeAreaTop w="full">
      <StatusBar backgroundColor="transparent" translucent />
      <Stack flex={1}>
        <WebView source={{uri: params.url}} />
        <IconButton
          position="absolute"
          right="0"
          variant="unstyled"
          _icon={{
            as: AntDesign,
            color: 'white',
            name: 'close',
            size: normalize(30),
          }}
          _pressed={{
            opacity: 0.5,
          }}
          onPress={goBack}
        />
      </Stack>
    </Box>
  );
};

export default TermsAndPolicy;
