import {IPressableProps, Pressable, Stack} from 'native-base';
import React, {FC} from 'react';

import {Text} from 'components';
import {colors} from 'config';
import {normalize} from 'utils';

type TProps = IPressableProps & {
  icon: JSX.Element;
  step: number;
  tabId: number;
  title: string;
};

const TabBarItem: FC<TProps> = ({icon, step, tabId, title, ...props}) => {
  return (
    <Pressable
      bg={tabId === step ? `${colors.blueCornFlower}4D` : 'transparent'}
      w="1/3"
      {...props}>
      <Stack alignItems="center" py="2">
        {icon}
        <Text color="white" fontSize={normalize(16)}>
          {title}
        </Text>
      </Stack>
    </Pressable>
  );
};

export default TabBarItem;
