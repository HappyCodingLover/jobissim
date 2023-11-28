import React, {FC} from 'react';
import {Circle, Path, Rect, Svg} from 'react-native-svg';

type TProps = {
  color?: string;
  h?: number;
  w?: number;
};

const UserCircleInActiveIcon: FC<TProps> = ({
  color = '#5b5f6b',
  h = 24,
  w = 24,
}) => {
  return (
    <Svg id="user-circle" width={w} height={h} viewBox="0 0 24 24">
      <Rect
        id="Rectangle_18730"
        data-name="Rectangle 18730"
        width="24"
        height="24"
        transform="translate(0 0)"
        fill="none"
      />
      <Circle
        id="Ellipse_23"
        data-name="Ellipse 23"
        cx="10"
        cy="10"
        r="10"
        transform="translate(2 2)"
        fill="none"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      />
      <Path
        id="Tracé_27467"
        data-name="Tracé 27467"
        d="M7.5,16.1a2.659,2.659,0,0,1,2.436-1.6h4.706a2.659,2.659,0,0,1,2.436,1.6"
        transform="translate(-0.289 0.161)"
        fill="none"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      />
      <Circle
        id="Ellipse_24"
        data-name="Ellipse 24"
        cx="2.661"
        cy="2.661"
        r="2.661"
        transform="translate(9.339 6.679)"
        fill="none"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      />
    </Svg>
  );
};

export default UserCircleInActiveIcon;
