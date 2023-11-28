import React, {FC} from 'react';
import {ClipPath, Defs, G, Path, Rect, Svg} from 'react-native-svg';

type TProps = {
  color?: string;
  h?: number;
  w?: number;
};

const SmartHomeMessageInActiveIcon: FC<TProps> = ({
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
            id="Rectangle_18905"
            data-name="Rectangle 18905"
            width="20.645"
            height="19.5"
            fill="none"
          />
        </ClipPath>
      </Defs>
      <Path id="Tracé_3" data-name="Tracé 3" d="M0,0H24V24H0Z" fill="none" />
      <G
        id="Groupe_58825"
        data-name="Groupe 58825"
        transform="translate(1.678 2.25)">
        <G
          id="Groupe_58813"
          data-name="Groupe 58813"
          transform="translate(0 0)"
          clip-path="url(#clip-path)">
          <Path
            id="Tracé_27638"
            data-name="Tracé 27638"
            d="M12.656,1.536a6.46,6.46,0,0,1,6.453,6.453v.083a6.46,6.46,0,0,1-6.453,6.453H11.482A1.563,1.563,0,0,0,9.93,16.077v1.4l-4.709-2.6A7.111,7.111,0,0,1,8.648,1.536Zm0-1.536H8.648A8.647,8.647,0,0,0,4.48,16.224L10.237,19.4a.827.827,0,0,0,.4.1h0a.831.831,0,0,0,.831-.829V16.077a.016.016,0,0,1,.015-.015h1.174a7.989,7.989,0,0,0,7.989-7.989V7.989A7.989,7.989,0,0,0,12.656,0M8.648,0h0Zm0,0h0Z"
            transform="translate(0 0)"
            fill={color}
          />
          <Path
            id="Tracé_27639"
            data-name="Tracé 27639"
            d="M13.615,7.5H6.735a.768.768,0,0,1,0-1.536h6.88a.768.768,0,1,1,0,1.536"
            transform="translate(0.145 0.144)"
            fill={color}
          />
          <Path
            id="Tracé_27640"
            data-name="Tracé 27640"
            d="M9.487,10.862H6.735a.768.768,0,1,1,0-1.536H9.487a.768.768,0,0,1,0,1.536"
            transform="translate(0.145 0.226)"
            fill={color}
          />
        </G>
      </G>
    </Svg>
  );
};

export default SmartHomeMessageInActiveIcon;
