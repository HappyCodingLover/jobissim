import {HStack, IPressableProps, Icon, Pressable} from 'native-base';
import {FC} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {colors} from 'config';
import {Text} from 'components';

type TProps = IPressableProps & {
  label: string;
  value: string;
};

const SelectedItem: FC<TProps> = ({label, value, ...rest}) => {
  return (
    <Pressable
      borderColor={colors.grayFrench}
      borderWidth="1"
      px="1"
      py="0.5"
      rounded="full"
      _pressed={{opacity: 0.5}}
      {...rest}>
      <HStack alignItems="center">
        <Icon
          as={Ionicons}
          color={colors.blueCornFlower}
          name="close-circle-sharp"
        />
        <Text>{label}</Text>
      </HStack>
    </Pressable>
  );
};

export default SelectedItem;
