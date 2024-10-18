/* eslint-disable prettier/prettier */
import * as React from "react";
import { Svg, Path, Circle } from "react-native-svg";

export const TabProfile = ({ color, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={31}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeWidth={2}
      d="M19 19.049c1.167-.334 3.9.9 5.5 8.5"
    />
    <Path
      stroke={color}
      strokeWidth={2}
      d="M31 15.5C31 23.478 24.314 30 16 30S1 23.478 1 15.5 7.686 1 16 1s15 6.522 15 14.5Z"
    />
    <Circle cx={16} cy={15} r={5} stroke={color} strokeWidth={2} />
    <Path stroke={color} strokeWidth={2} d="M13 19c-1.5 0-4.6 1.8-5 9" />
  </Svg>
);

