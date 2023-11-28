import {HStack, Stack} from 'native-base';
import React, {FC} from 'react';

import {
  CVIcon,
  FluentVideoClipMultipleIcon,
  SuitcaseIcon,
  Text,
} from 'components';
import {useAppSelector} from 'hooks';
import {getAppState} from 'store';
import {TSubCategory} from 'types';
import {normalize} from 'utils';

import TabBarItem from './TabBarItem';

const titleList = [
  {id: 4, title: 'actualités'},
  {id: 2, title: 'emplois'},
  {id: 3, title: 'CVs'},
];

type TProps = {
  step: number;
  onChange: (selected: number) => void;
};

const TabBar: FC<TProps> = ({step, onChange}) => {
  const {subCategories} = useAppSelector(getAppState);

  return (
    <Stack space="2">
      <Text color="white" fontSize={normalize(20)} textAlign="center">
        Les {titleList.find(item => item.id === step)?.title} de la semaine
      </Text>
      <HStack
        borderColor="white"
        borderWidth="1"
        overflow="hidden"
        rounded="md">
        <TabBarItem
          icon={<FluentVideoClipMultipleIcon />}
          step={step}
          tabId={
            subCategories.find(
              (item: TSubCategory) => item.name === 'Actualité',
            )?.id || 0
          }
          title="Actualité"
          onPress={() =>
            onChange(
              subCategories.find(
                (item: TSubCategory) => item.name === 'Actualité',
              )?.id || 0,
            )
          }
        />
        <TabBarItem
          borderColor="white"
          borderLeftWidth="1"
          borderRightWidth="1"
          icon={<SuitcaseIcon />}
          step={step}
          tabId={
            subCategories.find((item: TSubCategory) => item.name === 'Emploi')
              ?.id || 0
          }
          title="Emploi"
          onPress={() =>
            onChange(
              subCategories.find((item: TSubCategory) => item.name === 'Emploi')
                ?.id || 0,
            )
          }
        />
        <TabBarItem
          icon={<CVIcon />}
          step={step}
          tabId={
            subCategories.find((item: TSubCategory) => item.name === 'CV')
              ?.id || 0
          }
          title="CV"
          onPress={() =>
            onChange(
              subCategories.find((item: TSubCategory) => item.name === 'CV')
                ?.id || 0,
            )
          }
        />
      </HStack>
    </Stack>
  );
};

export default TabBar;
