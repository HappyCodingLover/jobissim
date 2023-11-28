import {Box, IBoxProps, ISelectProps, Select as NBSelect} from 'native-base';
import React, {FC, MutableRefObject} from 'react';

import {colors} from 'config';
import {normalize} from 'utils';

import Text from '../Text';

import {SelectItem} from './atoms';

type TData = {
  label: string;
  value: string;
};

type TProps = IBoxProps & {
  data?: Array<TData>;
  error?: string | boolean;
  placeholder?: string;
  selectRef?: MutableRefObject<any>;
  selectProps?: ISelectProps;
};

const Select: FC<TProps> = ({
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
  ...props
}) => {
  return (
    <Box {...props}>
      <NBSelect
        borderColor={error ? colors.redMonza : colors.grayFrench}
        color={color}
        fontSize={fontSize}
        h={h}
        placeholder={placeholder}
        px={px}
        ref={selectRef}
        rounded={rounded}
        {...selectProps}>
        {data.map((item, index) => (
          <SelectItem key={index} label={item.label} value={item.value} />
        ))}
      </NBSelect>
      {error && (
        <Text color="red.500" fontSize={normalize(18)} mx="1">
          {error}
        </Text>
      )}
    </Box>
  );
};

export default Select;
