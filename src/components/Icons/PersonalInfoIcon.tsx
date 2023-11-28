import React, {FC} from 'react';
import {ClipPath, Defs, G, Path, Rect, Svg} from 'react-native-svg';

type TProps = {
  color?: string;
  h?: number;
  w?: number;
};

const PersonalInfoIcon: FC<TProps> = ({color = 'white', h = 16, w = 15.22}) => {
  return (
    <Svg
      id="Groupe_58284"
      data-name="Groupe 58284"
      width={w}
      height={h}
      viewBox="0 0 15.22 16">
      <Defs>
        <ClipPath id="clip-path">
          <Rect
            id="Rectangle_18798"
            data-name="Rectangle 18798"
            width="15.22"
            height="16"
            fill={color}
          />
        </ClipPath>
      </Defs>
      <G
        id="Groupe_58284-2"
        data-name="Groupe 58284"
        clip-path="url(#clip-path)">
        <Path
          id="Tracé_27555"
          data-name="Tracé 27555"
          d="M13.4,18.3a3.9,3.9,0,1,1,3.9-3.9,3.907,3.907,0,0,1-3.9,3.9m0-6.634A2.732,2.732,0,1,0,16.134,14.4,2.735,2.735,0,0,0,13.4,11.671"
          transform="translate(-2.085 -2.305)"
          fill={color}
        />
        <Path
          id="Tracé_27556"
          data-name="Tracé 27556"
          d="M.585,17.073A.586.586,0,0,1,0,16.488v-.78A3.712,3.712,0,0,1,3.707,12H6.049a.585.585,0,1,1,0,1.171H3.707a2.54,2.54,0,0,0-2.537,2.537v.78a.586.586,0,0,1-.585.585"
          transform="translate(0 -2.634)"
          fill={color}
        />
        <Path
          id="Tracé_27557"
          data-name="Tracé 27557"
          d="M7.707,7.415a3.707,3.707,0,1,1,3.707-3.707A3.712,3.712,0,0,1,7.707,7.415m0-6.244a2.537,2.537,0,1,0,2.537,2.537A2.54,2.54,0,0,0,7.707,1.171"
          transform="translate(-0.878)"
          fill={color}
        />
        <Path
          id="Tracé_27558"
          data-name="Tracé 27558"
          d="M14.851,14.746H13.29a.585.585,0,1,1,0-1.171h1.561a.585.585,0,0,1,0,1.171"
          transform="translate(-2.789 -2.98)"
          fill={color}
        />
        <Path
          id="Tracé_27559"
          data-name="Tracé 27559"
          d="M14.851,17H13.29a.585.585,0,1,1,0-1.171h1.561a.585.585,0,0,1,0,1.171"
          transform="translate(-2.789 -3.474)"
          fill={color}
        />
      </G>
    </Svg>
  );
};

export default PersonalInfoIcon;
