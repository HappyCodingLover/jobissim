import React, {FC} from 'react';
import {Path, Svg} from 'react-native-svg';

type TProps = {
  color?: string;
  h?: number;
  w?: number;
};

const QuestionIcon: FC<TProps> = ({color = 'white', h = 24, w = 24}) => {
  return (
    <Svg
      id="contact_support_black_24dp"
      width={w}
      height={h}
      viewBox="0 0 24 24">
      <Path
        id="Tracé_27182"
        data-name="Tracé 27182"
        d="M0,0H24V24H0Z"
        fill="none"
      />
      <Path
        id="Tracé_27183"
        data-name="Tracé 27183"
        d="M11.5,2a8.5,8.5,0,0,0,0,17H12v3c4.86-2.34,8-7,8-11.5A8.506,8.506,0,0,0,11.5,2Zm1,14.5h-2v-2h2Zm0-3.5h-2c0-3.25,3-3,3-5a2,2,0,0,0-4,0h-2a4,4,0,0,1,8,0C15.5,10.5,12.5,10.75,12.5,13Z"
        fill={color}
      />
    </Svg>
  );
};

export default QuestionIcon;
