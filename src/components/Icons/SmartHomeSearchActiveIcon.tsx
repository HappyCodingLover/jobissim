import React, {FC} from 'react';
import {ClipPath, Defs, G, Path, Rect, Svg} from 'react-native-svg';

import {colors} from 'config';

type TProps = {
  color?: string;
  h?: number;
  w?: number;
};

const SmartHomeSearchActiveIcon: FC<TProps> = ({
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
            id="Rectangle_18907"
            data-name="Rectangle 18907"
            width="19.505"
            height="19.5"
            fill={color}
          />
        </ClipPath>
      </Defs>
      <Path id="Tracé_3" data-name="Tracé 3" d="M0,0H24V24H0Z" fill="none" />
      <G
        id="Groupe_58822"
        data-name="Groupe 58822"
        transform="translate(2.247 2.25)">
        <G
          id="Groupe_58817"
          data-name="Groupe 58817"
          transform="translate(0 0)"
          clip-path="url(#clip-path)">
          <Path
            id="Tracé_27643"
            data-name="Tracé 27643"
            d="M19.272,18.173,14.99,13.881A8.471,8.471,0,1,0,0,8.459v.01a8.473,8.473,0,0,0,8.47,8.47h.01a8.421,8.421,0,0,0,5.411-1.959l4.281,4.292a.769.769,0,0,0,.549.228.736.736,0,0,0,.549-.228.764.764,0,0,0,0-1.1M12.5,5.546a.8.8,0,0,1-1.12.1.491.491,0,0,1-.1-.1,4.012,4.012,0,0,0-5.608.021.779.779,0,0,1-1.368-.5v-.01A.777.777,0,0,1,4.53,4.51,5.566,5.566,0,0,1,12.4,4.478a.757.757,0,0,1,.1,1.068"
            transform="translate(0 0)"
            fill={color}
          />
        </G>
      </G>
    </Svg>
  );
};

export default SmartHomeSearchActiveIcon;
