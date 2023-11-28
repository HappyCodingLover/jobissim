import React, {FC} from 'react';
import {ClipPath, Defs, G, Path, Rect, Svg} from 'react-native-svg';

type TProps = {
  color?: string;
  h?: number;
  w?: number;
};

const TakePictureIcon: FC<TProps> = ({color = 'white', h = 16, w = 15.996}) => {
  return (
    <Svg width={w} height={h} viewBox="0 0 15.996 16">
      <Defs>
        <ClipPath id="clip-path">
          <Rect
            id="Rectangle_18781"
            data-name="Rectangle 18781"
            width="15.996"
            height="16"
            fill={color}
          />
        </ClipPath>
      </Defs>
      <G id="Groupe_58237" data-name="Groupe 58237" transform="translate(0 0)">
        <G
          id="Groupe_58233"
          data-name="Groupe 58233"
          transform="translate(0 0)"
          clip-path="url(#clip-path)">
          <Path
            id="Tracé_27537"
            data-name="Tracé 27537"
            d="M10.729,16.221H4.487A4.492,4.492,0,0,1,0,11.734V5.492A4.492,4.492,0,0,1,4.487,1h3.9a.585.585,0,0,1,0,1.17h-3.9A3.32,3.32,0,0,0,1.17,5.492v6.242A3.32,3.32,0,0,0,4.487,15.05h6.242a3.319,3.319,0,0,0,3.316-3.316v-3.9a.585.585,0,0,1,1.17,0v3.9a4.491,4.491,0,0,1-4.487,4.487"
            transform="translate(0 -0.22)"
            fill={color}
          />
          <Path
            id="Tracé_27538"
            data-name="Tracé 27538"
            d="M8.795,13.191a3.394,3.394,0,1,1,2.4-5.793h0a3.393,3.393,0,0,1-2.4,5.793m0-5.615a2.222,2.222,0,1,0,1.573.65,2.216,2.216,0,0,0-1.573-.65"
            transform="translate(-1.187 -1.407)"
            fill={color}
          />
          <Path
            id="Tracé_27539"
            data-name="Tracé 27539"
            d="M19.072,2.536a.584.584,0,0,1-.585.585H17.121V4.487a.585.585,0,1,1-1.17,0V3.121H14.585a.585.585,0,0,1,0-1.17h1.366V.585a.585.585,0,1,1,1.17,0V1.951h1.366a.589.589,0,0,1,.585.585"
            transform="translate(-3.076 0)"
            fill={color}
          />
        </G>
      </G>
    </Svg>
  );
};

export default TakePictureIcon;
