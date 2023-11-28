import React, {FC} from 'react';
import {ClipPath, Defs, G, Path, Rect, Svg} from 'react-native-svg';

type TProps = {
  color?: string;
  h?: number;
  w?: number;
};

const ImportPictureIcon: FC<TProps> = ({
  color = 'white',
  h = 16,
  w = 15.992,
}) => {
  return (
    <Svg
      id="Groupe_58238"
      data-name="Groupe 58238"
      width={w}
      height={h}
      viewBox="0 0 15.992 16">
      <Defs>
        <ClipPath id="clip-path">
          <Rect
            id="Rectangle_18782"
            data-name="Rectangle 18782"
            width="15.992"
            height="16"
            fill={color}
          />
        </ClipPath>
      </Defs>
      <G
        id="Groupe_58235"
        data-name="Groupe 58235"
        transform="translate(0 0)"
        clip-path="url(#clip-path)">
        <Path
          id="Tracé_27540"
          data-name="Tracé 27540"
          d="M15.377,5.754a.619.619,0,0,0-.615.615v5.738a.891.891,0,0,1-.008.148L12.287,9.787a2.628,2.628,0,0,0-3.664,0l-.631.631-3.1-3.1a2.589,2.589,0,0,0-1.82-.754H3.066a2.548,2.548,0,0,0-1.828.77l-.008.008V3.9a2.634,2.634,0,0,1,.779-1.885A2.609,2.609,0,0,1,3.885,1.23H8.8A.615.615,0,1,0,8.8,0H3.885A3.89,3.89,0,0,0,0,3.9v8.2a3.9,3.9,0,0,0,3.787,3.893A.5.5,0,0,0,3.9,16h8.2a3.9,3.9,0,0,0,3.893-3.893V6.369a.619.619,0,0,0-.615-.615m-11.713,9A2.667,2.667,0,0,1,1.229,12.1V9.09L2.115,8.2l.049-.049a1.3,1.3,0,0,1,.9-.352,1.352,1.352,0,0,1,.959.393l3.1,3.1Zm8.434.016H5.385l4.107-4.107a.262.262,0,0,0,.049-.057,1.377,1.377,0,0,1,1.869.041l2.91,2.918a2.625,2.625,0,0,1-2.221,1.2"
          transform="translate(0 0)"
          fill={color}
        />
        <Path
          id="Tracé_27541"
          data-name="Tracé 27541"
          d="M17.658,3.118a.613.613,0,0,1-.869,0l-1-1V4.733a.615.615,0,1,1-1.23,0V2.118l-1,1a.613.613,0,0,1-.869,0,.618.618,0,0,1,0-.869L14.74.2a.636.636,0,0,1,.2-.131.6.6,0,0,1,.475,0,.636.636,0,0,1,.2.131L17.658,2.25a.618.618,0,0,1,0,.869"
          transform="translate(-2.256 -0.004)"
          fill={color}
        />
      </G>
    </Svg>
  );
};

export default ImportPictureIcon;
