/* eslint-disable prettier/prettier */
import * as React from "react";
import { Svg, Path } from "react-native-svg";

export const ConfigChangePassword = ({ color, ...props }) => (
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
      d="M14 22v-8a10 10 0 0 1 20 0v8m-24 0h28a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V26a4 4 0 0 1 4-4Z"
    />
  </Svg>
);