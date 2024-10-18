/* eslint-disable prettier/prettier */
import * as React from "react";
import Svg, {Path} from "react-native-svg";
export const TabHome = ({color, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={34}
    height={34}
    fill= "none"
    {...props}
  >
    <Path
      stroke= {color}
      strokeWidth={2}
      d="M1 14 16.407 2 33 14v19H21.74V21.5h-8.888V33H1V14Z"
    />
  </Svg>
);
