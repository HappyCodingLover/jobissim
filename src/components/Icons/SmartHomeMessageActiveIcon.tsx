import React, {FC} from 'react';
import {ClipPath, Defs, G, Path, Rect, Svg} from 'react-native-svg';

import {colors} from 'config';

type TProps = {
  color?: string;
  h?: number;
  w?: number;
};

const SmartHomeMessageActiveIcon: FC<TProps> = ({
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
            id="Rectangle_18900"
            data-name="Rectangle 18900"
            width="20.637"
            height="19.5"
            fill={color}
          />
        </ClipPath>
      </Defs>
      <Path id="Tracé_3" data-name="Tracé 3" d="M0,0H24V24H0Z" fill="none" />
      <G
        id="Groupe_58824"
        data-name="Groupe 58824"
        transform="translate(1.682 2.25)">
        <G
          id="Groupe_58804"
          data-name="Groupe 58804"
          transform="translate(0 0)"
          clip-path="url(#clip-path)">
          <Path
            id="Tracé_27627"
            data-name="Tracé 27627"
            d="M12.648,0h-4A8.648,8.648,0,0,0,4.476,16.223L10.231,19.4a.774.774,0,0,0,.4.1.826.826,0,0,0,.83-.83V16.079a.022.022,0,0,1,.02-.02h1.168A7.986,7.986,0,0,0,20.637,8.07V7.988A7.992,7.992,0,0,0,12.648,0M9.627,11.092H6.872a.768.768,0,1,1,0-1.536H9.627a.768.768,0,0,1,0,1.536M13.754,7.65H6.872a.768.768,0,1,1,0-1.536h6.882a.768.768,0,0,1,0,1.536"
            transform="translate(0 0)"
            fill={color}
          />
        </G>
      </G>
    </Svg>
  );
};

export default SmartHomeMessageActiveIcon;
