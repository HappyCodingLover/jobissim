import React, {FC} from 'react';
import {Path, Svg} from 'react-native-svg';

type TProps = {
  color?: string;
  h?: number;
  w?: number;
};

const SuitcaseIcon: FC<TProps> = ({color = 'white', h = 16, w = 16}) => {
  return (
    <Svg width={w} height={h} viewBox="0 0 16 16">
      <Path
        data-name="Tracé 27449"
        d="M13.744,3.282H11.9V2.256A2.26,2.26,0,0,0,9.641,0H6.359A2.255,2.255,0,0,0,4.1,2.256V3.282H2.256A2.246,2.246,0,0,0,.008,5.415C.008,5.456,0,5.5,0,5.538V12.1A3.9,3.9,0,0,0,3.9,16H12.1A3.906,3.906,0,0,0,16,12.1V5.538a2.26,2.26,0,0,0-2.256-2.256M5.333,2.256A1.026,1.026,0,0,1,6.359,1.231H9.641a1.026,1.026,0,0,1,1.026,1.026V3.282H5.333ZM2.256,4.513H13.744a1.026,1.026,0,0,1,1.026,1.026,2.266,2.266,0,0,1-2.256,2.256H10.256V7.4a.842.842,0,0,0-.845-.837H6.581a.84.84,0,0,0-.837.837v.394H3.487A2.26,2.26,0,0,1,1.231,5.538,1.026,1.026,0,0,1,2.256,4.513M9.026,9.026H6.974V7.795H9.026ZM14.769,12.1A2.672,2.672,0,0,1,12.1,14.769H3.9A2.667,2.667,0,0,1,1.231,12.1V8.189a3.432,3.432,0,0,0,2.256.837H5.744v.386a.842.842,0,0,0,.837.845H9.411a.844.844,0,0,0,.845-.845V9.026h2.256a3.475,3.475,0,0,0,2.256-.837Z"
        fill={color}
      />
    </Svg>
  );
};

export default SuitcaseIcon;
