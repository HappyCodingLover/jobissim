import React, {FC} from 'react';
import {Path, Svg} from 'react-native-svg';

type TProps = {
  color?: string;
  h?: number;
  w?: number;
};

const FluentVideoClipMultipleIcon: FC<TProps> = ({
  color = 'white',
  h = 18,
  w = 20.571,
}) => {
  return (
    <Svg width={w} height={h} viewBox="0 0 20.571 18">
      <Path
        d="M8.428,13.609V7.828a.964.964,0,0,1,1.506-.8l4.642,3.152a.643.643,0,0,1,0,1.063l-4.642,3.16A.964.964,0,0,1,8.428,13.609ZM2,6.214A3.214,3.214,0,0,1,5.214,3H16.786A3.214,3.214,0,0,1,20,6.214v9a3.214,3.214,0,0,1-3.214,3.214H5.214A3.214,3.214,0,0,1,2,15.214ZM5.214,4.286A1.929,1.929,0,0,0,3.286,6.214v9a1.929,1.929,0,0,0,1.929,1.929H16.786a1.929,1.929,0,0,0,1.929-1.929v-9a1.929,1.929,0,0,0-1.929-1.929Zm0,15.429A3.209,3.209,0,0,0,7.786,21h9.643a5.143,5.143,0,0,0,5.143-5.143V8.786a3.209,3.209,0,0,0-1.286-2.572v9.643a3.857,3.857,0,0,1-3.857,3.857Z"
        transform="translate(-2 -3)"
        fill={color}
      />
    </Svg>
  );
};

export default FluentVideoClipMultipleIcon;
