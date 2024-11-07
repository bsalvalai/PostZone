/* eslint-disable prettier/prettier */
import * as React from "react";
import { Svg, Path } from "react-native-svg";
export const ConfigLogOut = ({ color, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18 42h-8a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4h8m14 28 10-10m0 0L32 14m10 10H18"
    />
  </Svg>
)
