import React, {FC} from 'react';
import {G, Path, Svg} from 'react-native-svg';

type TProps = {
  color?: string;
  h?: number;
  w?: number;
};

const ApplyIcon: FC<TProps> = ({color = 'white', h = 22.691, w = 22.692}) => {
  return (
    <Svg width={w} height={h} viewBox="0 0 22.692 22.691">
      <G
        id="Groupe_53999"
        data-name="Groupe 53999"
        transform="translate(-2.25 -2.25)">
        <Path
          id="Tracé_11981"
          data-name="Tracé 11981"
          d="M14.752,24.941H8.974A6.731,6.731,0,0,1,2.25,18.219V8.974A6.724,6.724,0,0,1,8.974,2.25h9.245a6.731,6.731,0,0,1,6.724,6.724v5.778a.945.945,0,1,1-1.89,0V8.974A4.839,4.839,0,0,0,18.219,4.14H8.974A4.833,4.833,0,0,0,4.14,8.974v9.245a4.839,4.839,0,0,0,4.833,4.832h5.778a.945.945,0,1,1,0,1.89Z"
          transform="translate(0)"
          fill={color}
        />
        <Path
          id="Tracé_11982"
          data-name="Tracé 11982"
          d="M16.757,11.14H9.2a.945.945,0,0,1,0-1.89h7.562a.945.945,0,0,1,0,1.89Z"
          transform="translate(0.62 1.037)"
          fill={color}
        />
        <Path
          id="Tracé_11983"
          data-name="Tracé 11983"
          d="M16.757,15.14H9.2a.945.945,0,1,1,0-1.89h7.562a.945.945,0,0,1,0,1.89Z"
          transform="translate(0.62 1.765)"
          fill={color}
        />
        <Path
          id="Tracé_11984"
          data-name="Tracé 11984"
          d="M18.086,21.291a.942.942,0,0,1-.668-.277l-1.89-1.89a.945.945,0,0,1,1.337-1.337l1.222,1.222,2.482-2.482A.945.945,0,1,1,21.9,17.864l-3.151,3.151A.942.942,0,0,1,18.086,21.291Z"
          transform="translate(1.876 2.154)"
          fill={color}
        />
      </G>
    </Svg>
  );
};

export default ApplyIcon;
