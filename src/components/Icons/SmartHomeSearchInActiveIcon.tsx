import React, {FC} from 'react';
import {ClipPath, Defs, G, Path, Rect, Svg} from 'react-native-svg';

type TProps = {
  color?: string;
  h?: number;
  w?: number;
};

const SmartHomeSearchInActiveIcon: FC<TProps> = ({
  color = '#484d59',
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
            id="Rectangle_18906"
            data-name="Rectangle 18906"
            width="19.505"
            height="19.5"
            fill="none"
          />
        </ClipPath>
      </Defs>
      <Path id="Tracé_3" data-name="Tracé 3" d="M0,0H24V24H0Z" fill="none" />
      <G
        id="Groupe_58823"
        data-name="Groupe 58823"
        transform="translate(2.247 2.25)">
        <G
          id="Groupe_58815"
          data-name="Groupe 58815"
          transform="translate(0 0)"
          clip-path="url(#clip-path)">
          <Path
            id="Tracé_27641"
            data-name="Tracé 27641"
            d="M4.93,5.738a.773.773,0,0,1-.778-.771V4.956a.777.777,0,0,1,.225-.547,5.572,5.572,0,0,1,7.87-.031.75.75,0,0,1,.1,1.072.806.806,0,0,1-1.117.1.98.98,0,0,1-.107-.1,4.007,4.007,0,0,0-5.607.022.774.774,0,0,1-.585.267"
            transform="translate(0.152 0.101)"
            fill={color}
          />
          <Path
            id="Tracé_27642"
            data-name="Tracé 27642"
            d="M19.272,18.173,14.99,13.881A8.471,8.471,0,1,0,0,8.459v.01a8.473,8.473,0,0,0,8.47,8.47h.01a8.421,8.421,0,0,0,5.411-1.959l4.281,4.292a.769.769,0,0,0,.549.228.736.736,0,0,0,.549-.228.764.764,0,0,0,0-1.1M8.47,15.384a6.92,6.92,0,1,1,4.9-2.032,6.929,6.929,0,0,1-4.9,2.032"
            transform="translate(0 0)"
            fill={color}
          />
        </G>
      </G>
    </Svg>
  );
};

export default SmartHomeSearchInActiveIcon;
