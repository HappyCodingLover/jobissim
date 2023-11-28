import {Box, FlatList, Pressable} from 'native-base';
import React, {FC, useCallback} from 'react';

import {Text} from 'components';
import {colors} from 'config';
import {normalize} from 'utils';

const routes: TTabBarItem[] = [
  {label: 'Tous', value: 'all'},
  {label: 'Emplois', value: 'job'},
  {label: 'CV vidéos', value: 'cv'},
  {label: 'Entreprises', value: 'enterprise'},
  {label: 'Utilisateurs', value: 'user'},
];

type TTabBarItem = {label: string; value: string};

type TProps = {
  currentTab: string;
  onChange: (value: string) => void;
};

const TabBar: FC<TProps> = ({currentTab, onChange}) => {
  const renderItem = useCallback(
    ({item, index}: {item: TTabBarItem; index: number}) => {
      return (
        <Pressable
          key={index}
          px="1.5"
          py="2"
          _pressed={{opacity: 0.5}}
          onPress={() => onChange(item.value)}>
          <Text color={colors.grayFrench}>{item.label}</Text>
          {currentTab === item.value && (
            <Box
              bgColor={colors.blueCornFlower}
              borderBottomRadius="sm"
              h="4px"
            />
          )}
        </Pressable>
      );
    },
    [currentTab],
  );

  return (
    <FlatList
      data={routes}
      horizontal
      maxH={normalize(40)}
      renderItem={renderItem}
    />
  );
};

export default TabBar;
