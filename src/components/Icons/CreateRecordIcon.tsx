import React, {FC} from 'react';
import {
  ClipPath,
  Defs,
  G,
  LinearGradient,
  Path,
  Rect,
  Stop,
  Svg,
} from 'react-native-svg';

type TProps = {
  h?: number;
  w?: number;
};

const CreateRecordIcon: FC<TProps> = ({h = 30.001, w = 40.346}) => {
  return (
    <Svg
      id="Groupe_52361"
      data-name="Groupe 52361"
      width={w}
      height={h}
      viewBox="0 0 40.346 30.001">
      <Defs>
        <LinearGradient
          id="linear-gradient"
          y1="0.5"
          x2="1"
          y2="0.597"
          gradientUnits="objectBoundingBox">
          <Stop offset="0" stop-color="#5287ef" />
          <Stop offset="1" stop-color="#e296f2" />
        </LinearGradient>
        <ClipPath id="clip-path">
          <Rect
            id="Rectangle_18724"
            data-name="Rectangle 18724"
            width="40.346"
            height="30.001"
            fill="url(#linear-gradient)"
          />
        </ClipPath>
      </Defs>
      <G id="Groupe_52360" data-name="Groupe 52360" clip-path="url(#clip-path)">
        <Path
          id="Tracé_27427"
          data-name="Tracé 27427"
          d="M39.787,5.876a3.6,3.6,0,0,0-4.966-1.2L30,7.655A7.794,7.794,0,0,0,22.242,0H7.759A7.775,7.775,0,0,0,0,7.759V22.242A7.762,7.762,0,0,0,7.759,30H22.242A7.776,7.776,0,0,0,30,22.366l4.821,2.959a3.624,3.624,0,0,0,5.524-3.083V7.759a3.772,3.772,0,0,0-.559-1.883M26.9,22.242A4.662,4.662,0,0,1,22.242,26.9H7.759A4.649,4.649,0,0,1,3.1,22.242V7.759A4.649,4.649,0,0,1,7.759,3.1H22.242A4.662,4.662,0,0,1,26.9,7.759Zm10.345,0a.554.554,0,0,1-.807.455L30,18.7V11.3l6.435-3.972a.492.492,0,0,1,.393-.062.6.6,0,0,1,.331.228.674.674,0,0,1,.083.269Z"
          fill="url(#linear-gradient)"
        />
        <Path
          id="Tracé_27428"
          data-name="Tracé 27428"
          d="M14.311,9.655a1.55,1.55,0,0,1-1.552,1.552H11.207v1.552a1.552,1.552,0,0,1-3.1,0V11.207H6.552a1.552,1.552,0,0,1,0-3.1H8.1V6.552a1.552,1.552,0,0,1,3.1,0V8.1h1.552a1.563,1.563,0,0,1,1.552,1.552"
          transform="translate(5.345 5.345)"
          fill="url(#linear-gradient)"
        />
      </G>
    </Svg>
  );
};

export default CreateRecordIcon;
