import React, {FC} from 'react';
import {ClipPath, Defs, G, Path, Rect, Svg} from 'react-native-svg';

type TProps = {
  color?: string;
  h?: number;
  w?: number;
};

const SignalingIcon: FC<TProps> = ({
  color = 'white',
  h = 15.501,
  w = 21.456,
}) => {
  return (
    <Svg width={w} height={h} viewBox="0 0 21.456 15.501">
      <Defs>
        <ClipPath id="clip-path">
          <Rect
            id="Rectangle_18897"
            data-name="Rectangle 18897"
            width="21.456"
            height="15.501"
            transform="translate(0 0)"
            fill={color}
          />
        </ClipPath>
      </Defs>
      <G
        id="Groupe_58796"
        data-name="Groupe 58796"
        transform="translate(0 0.001)">
        <G
          id="Groupe_58796-2"
          data-name="Groupe 58796"
          clip-path="url(#clip-path)">
          <Path
            id="Tracé_27621"
            data-name="Tracé 27621"
            d="M10.728,15a7.25,7.25,0,1,1,7.25-7.25A7.258,7.258,0,0,1,10.728,15m0-13a5.75,5.75,0,1,0,5.75,5.75A5.757,5.757,0,0,0,10.728,2"
            fill={color}
          />
          <Path
            id="Tracé_27622"
            data-name="Tracé 27622"
            d="M10.728,8.25a.75.75,0,0,1-.75-.75V5.25a.75.75,0,0,1,1.5,0V7.5a.75.75,0,0,1-.75.75"
            fill={color}
          />
          <Path
            id="Tracé_27623"
            data-name="Tracé 27623"
            d="M10.728,11a.8.8,0,1,1,.8-.8.839.839,0,0,1-.8.8"
            fill={color}
          />
          <Path
            id="Tracé_27624"
            data-name="Tracé 27624"
            d="M17.868,15.5a.75.75,0,0,1-.535-1.275,9.3,9.3,0,0,0,0-12.95A.75.75,0,1,1,18.4.225a10.8,10.8,0,0,1,0,15.051.745.745,0,0,1-.535.225"
            fill={color}
          />
          <Path
            id="Tracé_27625"
            data-name="Tracé 27625"
            d="M3.589,15.5a.745.745,0,0,1-.535-.225,10.8,10.8,0,0,1,0-15.051.75.75,0,1,1,1.07,1.051,9.3,9.3,0,0,0,0,12.95A.75.75,0,0,1,3.589,15.5"
            fill={color}
          />
        </G>
      </G>
    </Svg>
  );
};

export default SignalingIcon;
