import {Box, Divider as NBDivider, IDividerProps} from 'native-base';
import React, {FC} from 'react';

import {colors} from 'config';
import {normalize} from 'utils';

import Text from '../Text';

type TProps = IDividerProps & {
  h?: string;
  title?: string;
};

const Divider: FC<TProps> = ({
  bg = colors.shark,
  h = 'auto',
  title = '',
  ...props
}) => {
  return (
    <Box alignItems="center" h={h} justifyContent="center">
      <NBDivider {...props} />
      {title && (
        <Box bg={bg} position="absolute" px={normalize(28)} py={normalize(4)}>
          <Text color="white" fontSize={normalize(20)}>
            {title}
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default Divider;
