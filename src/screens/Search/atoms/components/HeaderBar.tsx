import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HStack, IconButton, Text, ZStack} from 'native-base';
import React, {FC} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {FilterIcon, Link} from 'components';
import {colors} from 'config';
import {TRootStackParamList} from 'types';

type TProps = {
  currentTab: string;
};

const HeaderBar: FC<TProps> = ({currentTab}) => {
  const {goBack} = useNavigation<NavigationProp<TRootStackParamList>>();

  return (
    <ZStack alignItems="center" h="12" justifyContent="center" w="full">
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
        {currentTab === 'cv' && (
          <Link
            fontSize="sm"
            leftIcon={<FilterIcon color={colors.blueCornFlower} />}
            title="Filtre"
          />
        )}
      </HStack>
      <Text color="white">Recherche</Text>
    </ZStack>
  );
};

export default HeaderBar;
