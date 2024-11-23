/* eslint-disable prettier/prettier */
import * as React from "react";
import { Svg, Path } from "react-native-svg";
export const ConfigChangeToLightMode = ({color, ...props}) => (
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
      d="M24 2v4m0 36v4M8.44 8.44l2.84 2.84m25.44 25.44 2.84 2.84M2 24h4m36 0h4M8.44 39.56l2.84-2.84m25.44-25.44 2.84-2.84M34 24c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10Z"
    />
  </Svg>
);
