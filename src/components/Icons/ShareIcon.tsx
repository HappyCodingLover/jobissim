import React, {FC} from 'react';
import {Path, Svg} from 'react-native-svg';

type TProps = {
  color?: string;
  h?: number;
  w?: number;
};

const ShareIcon: FC<TProps> = ({color = 'white', h = 18, w = 20.638}) => {
  return (
    <Svg width={w} height={h} viewBox="0 0 20.638 18">
      <Path
        id="Tracé_27469"
        data-name="Tracé 27469"
        d="M3.485,21.425l18.509-7.934a1.061,1.061,0,0,0,0-1.952L3.485,3.605a1.053,1.053,0,0,0-1.474.965L2,9.46a1.055,1.055,0,0,0,.923,1.05l14.987,2L2.923,14.509A1.073,1.073,0,0,0,2,15.57l.011,4.89A1.053,1.053,0,0,0,3.485,21.425Z"
        transform="translate(-2 -3.515)"
        fill={color}
      />
    </Svg>
  );
};

export default ShareIcon;
