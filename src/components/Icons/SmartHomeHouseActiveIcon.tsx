import React, {FC} from 'react';
import {ClipPath, Defs, G, Path, Rect, Svg} from 'react-native-svg';

import {colors} from 'config';

type TProps = {
  color?: string;
  h?: number;
  w?: number;
};

const SmartHomeHouseActiveIcon: FC<TProps> = ({
  color = colors.blueCornFlower,
  h = 24,
  w = 24,
}) => {
  return (
    <Svg
      id="Smart_Home_House"
      data-name="Smart Home, House"
      width={w}
      height={h}
      viewBox="0 0 24 24">
      <Defs>
        <ClipPath id="clip-path">
          <Rect
            id="Rectangle_18898"
            data-name="Rectangle 18898"
            width="19.5"
            height="19.5"
            fill={color}
          />
        </ClipPath>
      </Defs>
      <Path id="Tracé_3" data-name="Tracé 3" d="M0,0H24V24H0Z" fill="none" />
      <G
        id="Groupe_58820"
        data-name="Groupe 58820"
        transform="translate(2.25 2.25)">
        <G
          id="Groupe_58800"
          data-name="Groupe 58800"
          clip-path="url(#clip-path)">
          <Path
            id="Tracé_27623"
            data-name="Tracé 27623"
            d="M18.24,5.74,11.74.69a3.229,3.229,0,0,0-3.99,0L1.25,5.74A3.255,3.255,0,0,0,0,8.31v7.94A3.244,3.244,0,0,0,3.25,19.5h13a3.25,3.25,0,0,0,3.25-3.25V8.31a3.265,3.265,0,0,0-1.26-2.57m-4.96,7.35a5,5,0,0,1-7.06,0,.75.75,0,0,1,.53-1.28.732.732,0,0,1,.53.22,3.5,3.5,0,0,0,4.94,0,.737.737,0,0,1,1.06,0,.754.754,0,0,1,0,1.06"
            fill={color}
          />
        </G>
      </G>
    </Svg>
  );
};

export default SmartHomeHouseActiveIcon;
