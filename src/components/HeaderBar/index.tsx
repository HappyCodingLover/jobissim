import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HStack, IconButton, Text, ZStack} from 'native-base';
import React, {FC} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {TRootStackParamList} from 'types';

type TProps = {
  title?: string;
};

const HeaderBar: FC<TProps> = ({title = 'Recherche'}) => {
  const {goBack} = useNavigation<NavigationProp<TRootStackParamList>>();

  return (
    <ZStack alignItems="center" h="12" justifyContent="center" px="5" w="full">
      <HStack alignItems="center" justifyContent="space-between" w="full">
        <IconButton
          p="0"
          variant="unstyled"
          _icon={{
            as: Ionicons,
            color: 'white',
            name: 'chevron-back',
          }}
          _pressed={{
            opacity: 0.5,
          }}
          onPress={goBack}
        />
      </HStack>
      <Text color="white">{title}</Text>
    </ZStack>
  );
};

export default HeaderBar;
