/* eslint-disable prettier/prettier */
import * as React from "react";
import { Svg, Path } from "react-native-svg";

export const ConfigDeleteAccount = ({ color, ...props }) => (
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
      d="M6 12h4m0 0h32m-32 0v28a4 4 0 0 0 4 4h20a4 4 0 0 0 4-4V12m-22 0V8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v4M20 22v12m8-12v12"
    />
  </Svg>
);
