/* eslint-disable prettier/prettier */
import * as React from "react";
import { Svg, Path } from "react-native-svg";
export const ConfigChangeGender = ({ color, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={44}
    height={36}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1 2.87v11.25m0 0h11.25M1 14.12l8.7-8.174a16.875 16.875 0 0 1 27.844 6.3M42.25 32.87V21.62m0 0H31m11.25 0-8.7 8.175a16.875 16.875 0 0 1-27.844-6.3"
    />
  </Svg>
);
