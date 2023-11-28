import {IPressableProps, Pressable} from 'native-base';
import React, {FC} from 'react';

import {Text} from 'components';
import {normalize} from 'utils';

type TProps = IPressableProps & {
  count: number;
  title: string;
};

const FollowButton: FC<TProps> = ({count, title, ...rest}) => {
  return (
    <Pressable _pressed={{opacity: 0.5}} {...rest}>
      <Text fontSize={normalize(20)} textAlign="center">
        {count}
      </Text>
      <Text fontSize={normalize(18)} textAlign="center">
        {title}
      </Text>
    </Pressable>
  );
};

export default FollowButton;
