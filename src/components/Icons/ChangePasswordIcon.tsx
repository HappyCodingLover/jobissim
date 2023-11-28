import React, {FC} from 'react';
import {ClipPath, Defs, G, Path, Rect, Svg} from 'react-native-svg';

type TProps = {
  color?: string;
  h?: number;
  w?: number;
};

const ChangePasswordIcon: FC<TProps> = ({
  color = 'white',
  h = 16,
  w = 15.132,
}) => {
  return (
    <Svg width={w} height={h} viewBox="0 0 15.132 16">
      <Defs>
        <ClipPath id="clip-path">
          <Rect
            id="Rectangle_18797"
            data-name="Rectangle 18797"
            width="15.132"
            height="16"
            fill={color}
          />
        </ClipPath>
      </Defs>
      <G id="Groupe_58283" data-name="Groupe 58283" transform="translate(0 0)">
        <G
          id="Groupe_58283-2"
          data-name="Groupe 58283"
          transform="translate(0 0)"
          clip-path="url(#clip-path)">
          <Path
            id="Tracé_27553"
            data-name="Tracé 27553"
            d="M7.565,16a2.808,2.808,0,0,1-1.276-.305C3.94,14.5,0,11.973,0,8.452V3.739a1.528,1.528,0,0,1,1.358-1.5A9.205,9.205,0,0,0,6.123.48a2.409,2.409,0,0,1,2.889,0,9.18,9.18,0,0,0,4.741,1.752,1.533,1.533,0,0,1,1.379,1.5V8.452c0,3.52-3.94,6.048-6.287,7.241A2.817,2.817,0,0,1,7.565,16m0-14.7a1.12,1.12,0,0,0-.671.224,10.5,10.5,0,0,1-5.416,2,.225.225,0,0,0-.181.22v4.7c0,2.934,3.9,5.234,5.581,6.086a1.52,1.52,0,0,0,1.379,0c1.678-.853,5.578-3.151,5.578-6.085V3.739a.223.223,0,0,0-.2-.213,10.469,10.469,0,0,1-5.391-2A1.135,1.135,0,0,0,7.564,1.3"
            transform="translate(0 0)"
            fill={color}
          />
          <Path
            id="Tracé_27554"
            data-name="Tracé 27554"
            d="M8.087,10.53a.643.643,0,0,1-.458-.19L6.59,9.3a.649.649,0,0,1,.917-.918l.58.579,1.269-1.27a.648.648,0,1,1,.917.917L8.546,10.34a.647.647,0,0,1-.459.19"
            transform="translate(-0.866 -1.016)"
            fill={color}
          />
        </G>
      </G>
    </Svg>
  );
};

export default ChangePasswordIcon;
