import {
  HStack,
  IBoxProps,
  ISelectProps,
  Select as NBSelect,
  Stack,
} from 'native-base';
import React, {
  FC,
  MutableRefObject,
  useCallback,
  useEffect,
  useState,
} from 'react';

import {colors} from 'config';
import {normalize} from 'utils';

import Text from '../Text';

import {SelectedItem, SelectItem} from './atoms';

type TData = {
  label: string;
  value: string;
};

type TProps = IBoxProps & {
  data?: Array<TData>;
  error?: boolean | string | string[];
  placeholder?: string;
  selectRef?: MutableRefObject<any>;
  selectProps?: ISelectProps;
  onValueChange: (selected: string[]) => void;
};

const MultiSelect: FC<TProps> = ({
  color = 'white',
  data = [],
  error,
  fontSize = normalize(20),
  h = normalize(60),
  placeholder = '',
  px = normalize(16),
  rounded = normalize(8),
  selectRef,
  selectProps,
  onValueChange,
  ...props
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    onValueChange(selectedItems);
  }, [selectedItems, onValueChange]);

  const handleRemoveSelected = useCallback((value: string) => {
    setSelectedItems(_prevSelectedItems =>
      _prevSelectedItems.filter(item => item !== value),
    );
  }, []);

  const handleValueChange = useCallback((value: string) => {
    setSelectedItems(_prevSelectedItems => [..._prevSelectedItems, value]);
  }, []);

  return (
    <Stack space="1" {...props}>
      <NBSelect
        borderColor={error ? colors.redMonza : colors.grayFrench}
        color={color}
        fontSize={fontSize}
        h={h}
        placeholder={placeholder}
        px={px}
        ref={selectRef}
        rounded={rounded}
        selectedValue=""
        onValueChange={handleValueChange}
        {...selectProps}>
        {data
          .filter(item => !selectedItems.includes(item.value))
          .map((item, index) => (
            <SelectItem key={index} label={item.label} value={item.value} />
          ))}
      </NBSelect>
      <HStack flexWrap="wrap" space="1">
        {selectedItems
          .map(selected => data.filter(item => item.value === selected))
          .flat()
          .map((selected, index) => (
            <SelectedItem
              key={index}
              label={selected.label}
              value={selected.value}
              onPress={() => handleRemoveSelected(selected.value)}
            />
          ))}
      </HStack>
      {error && (
        <Text color="red.500" fontSize={normalize(18)} mx="1">
          {error}
        </Text>
      )}
    </Stack>
  );
};

export default MultiSelect;
