import {HStack, IPressableProps, Icon, Pressable} from 'native-base';
import React, {FC, useCallback, useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {colors} from 'config';
import {normalize} from 'utils';

import Text from '../Text';

type TProps = IPressableProps & {
  placeholder?: string;
  value?: string;
  onChange: (date: Date) => void;
};

const DatePicker: FC<TProps> = ({
  borderColor = 'white',
  borderWidth = '1',
  h = normalize(60),
  placeholder,
  px = normalize(16),
  rounded = normalize(8),
  value,
  onChange,
  ...rest
}) => {
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);

  const handleCancel = useCallback(() => {
    setIsShowDatePicker(false);
  }, []);

  const handleConfirm = useCallback(
    (date: Date) => {
      onChange(date);
      setIsShowDatePicker(false);
    },
    [onChange],
  );

  const handleShowDatePicker = useCallback(() => {
    setIsShowDatePicker(true);
  }, []);

  return (
    <Pressable
      borderColor={borderColor}
      borderWidth={borderWidth}
      h={h}
      px={px}
      rounded={rounded}
      _pressed={{opacity: 0.5}}
      onPress={handleShowDatePicker}
      {...rest}>
      <HStack
        alignItems="center"
        h="full"
        justifyContent="space-between"
        w="full">
        {value ? (
          <Text fontSize={normalize(20)}>{value}</Text>
        ) : (
          <Text color={colors.grayDusty} fontSize={normalize(20)}>
            {placeholder}
          </Text>
        )}
        <Icon
          as={AntDesign}
          color="white"
          name="calendar"
          size={normalize(30)}
        />
      </HStack>
      <DateTimePickerModal
        isVisible={isShowDatePicker}
        mode="date"
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </Pressable>
  );
};

export default DatePicker;
