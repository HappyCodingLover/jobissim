import React, {FC} from 'react';
import {ClipPath, Defs, G, Path, Rect, Svg} from 'react-native-svg';

type TProps = {
  color?: string;
  h?: number;
  w?: number;
};

const DisconnectionIcon: FC<TProps> = ({
  color = 'white',
  h = 16.277,
  w = 16,
}) => {
  return (
    <Svg width={w} height={h} viewBox="0 0 16.277 16">
      <Defs>
        <ClipPath id="clip-path">
          <Rect
            id="Rectangle_18795"
            data-name="Rectangle 18795"
            width="16.277"
            height="16"
            fill={color}
          />
        </ClipPath>
      </Defs>
      <G id="Groupe_58281" data-name="Groupe 58281" transform="translate(0 0)">
        <G
          id="Groupe_58281-2"
          data-name="Groupe 58281"
          transform="translate(0 0)"
          clip-path="url(#clip-path)">
          <Path
            id="Tracé_27547"
            data-name="Tracé 27547"
            d="M17.434,8.467a.6.6,0,0,1-.05.242.648.648,0,0,1-.134.2l-4.174,4.174a.625.625,0,0,1-.885,0,.63.63,0,0,1,0-.885L15.3,9.093H7.626a.626.626,0,1,1,0-1.252H15.3L12.192,4.736a.626.626,0,0,1,.885-.885l4.174,4.174a.648.648,0,0,1,.134.2.6.6,0,0,1,.05.242"
            transform="translate(-1.157 -0.606)"
            fill={color}
          />
          <Path
            id="Tracé_27548"
            data-name="Tracé 27548"
            d="M6.469,16H4.522A4.527,4.527,0,0,1,0,11.478V4.522A4.527,4.527,0,0,1,4.522,0H6.469a.626.626,0,1,1,0,1.252H4.522a3.273,3.273,0,0,0-3.27,3.27v6.956a3.273,3.273,0,0,0,3.27,3.27H6.469a.626.626,0,1,1,0,1.252"
            transform="translate(0 0)"
            fill={color}
          />
        </G>
      </G>
    </Svg>
  );
};

export default DisconnectionIcon;
