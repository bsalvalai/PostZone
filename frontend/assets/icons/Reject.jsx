/* eslint-disable prettier/prettier */
import * as React from "react";
import { Svg, Path } from "react-native-svg";
export const Reject = ({ color, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={23}
    height={23}
    fill="none"
    {...props}
  >
    <Path stroke={color} strokeWidth={2} d="M22 22 1 1m0 21L21 1" />
  </Svg>
);
