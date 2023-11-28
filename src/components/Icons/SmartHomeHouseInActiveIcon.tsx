import React, {FC} from 'react';
import {ClipPath, Defs, G, Path, Rect, Svg} from 'react-native-svg';

type TProps = {
  color?: string;
  h?: number;
  w?: number;
};

const SmartHomeHouseInActiveIcon: FC<TProps> = ({
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
            id="Rectangle_18904"
            data-name="Rectangle 18904"
            width="19.5"
            height="19.5"
            fill="none"
          />
        </ClipPath>
      </Defs>
      <Path id="Tracé_3" data-name="Tracé 3" d="M0,0H24V24H0Z" fill="none" />
      <G
        id="Groupe_58821"
        data-name="Groupe 58821"
        transform="translate(2.25 2.25)">
        <G
          id="Groupe_58812"
          data-name="Groupe 58812"
          clip-path="url(#clip-path)">
          <Path
            id="Tracé_27636"
            data-name="Tracé 27636"
            d="M9.75,1.5a1.741,1.741,0,0,1,1.075.369l6.5,5.056A1.739,1.739,0,0,1,18,8.306V16.25A1.752,1.752,0,0,1,16.25,18h-13A1.753,1.753,0,0,1,1.5,16.25V8.306a1.738,1.738,0,0,1,.675-1.381l6.5-5.056A1.735,1.735,0,0,1,9.75,1.5m0-1.5a3.24,3.24,0,0,0-2,.685l-6.5,5.056A3.249,3.249,0,0,0,0,8.306V16.25A3.251,3.251,0,0,0,3.25,19.5h13a3.25,3.25,0,0,0,3.25-3.25V8.306a3.248,3.248,0,0,0-1.256-2.565L11.745.685A3.244,3.244,0,0,0,9.75,0"
            fill={color}
          />
          <Path
            id="Tracé_27637"
            data-name="Tracé 27637"
            d="M9.75,14.545A4.971,4.971,0,0,1,6.237,13.1a.75.75,0,1,1,1.081-1.038,3.486,3.486,0,0,0,4.9-.041.75.75,0,0,1,1.061,1.061,4.97,4.97,0,0,1-3.53,1.46"
            fill={color}
          />
        </G>
      </G>
    </Svg>
  );
};

export default SmartHomeHouseInActiveIcon;
