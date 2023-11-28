import React, {FC} from 'react';
import {Path, Svg} from 'react-native-svg';

type TProps = {
  color?: string;
  h?: number;
  w?: number;
};

const ColorEffectIcon: FC<TProps> = ({color = 'white', h = 36, w = 36}) => {
  return (
    <Svg id="auto_fix_high_black_24dp" width={w} height={h} viewBox="0 0 36 36">
      <Path
        id="Tracé_27190"
        data-name="Tracé 27190"
        d="M0,0H36V36H0Z"
        fill="none"
      />
      <Path
        id="Tracé_27191"
        data-name="Tracé 27191"
        d="M10.751,7.4,14.5,9.5,12.4,5.75,14.5,2l-3.75,2.1L7,2,9.1,5.75,7,9.5Zm18,14.7L25,20l2.1,3.75L25,27.5l3.75-2.1,3.75,2.1-2.1-3.75L32.5,20ZM32.5,2l-3.75,2.1L25,2l2.1,3.75L25,9.5l3.75-2.1L32.5,9.5,30.4,5.75ZM21.056,9.935a1.494,1.494,0,0,0-2.115,0l-17.5,17.5a1.494,1.494,0,0,0,0,2.115l3.51,3.51a1.494,1.494,0,0,0,2.115,0l17.49-17.49a1.494,1.494,0,0,0,0-2.115L21.056,9.935ZM19.511,18.17l-3.18-3.18,3.66-3.66,3.18,3.18-3.66,3.66Z"
        transform="translate(0.499 1)"
        fill={color}
      />
    </Svg>
  );
};

export default ColorEffectIcon;
