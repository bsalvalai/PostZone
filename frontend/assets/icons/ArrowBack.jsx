/* eslint-disable prettier/prettier */
import * as React from "react";
import { Svg, Path } from "react-native-svg"
export const ArrowBack = ({ color, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={27}
    fill="none"
    {...props}
  >
    <Path stroke={color} strokeWidth={2} d="M17 1 2 13.946 17 26" />
  </Svg>
)