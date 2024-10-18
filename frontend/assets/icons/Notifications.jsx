/* eslint-disable prettier/prettier */
import * as React from "react";
import { Svg, Path } from "react-native-svg";
export const Notifications = ({color, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={36}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M11.333 32.384C12.572 33.389 14.207 34 16 34c1.793 0 3.428-.611 4.667-1.616M2.888 27.212c-.737 0-1.15-1.177-.703-1.832 1.035-1.518 2.035-3.744 2.035-6.425l.043-3.885C4.263 7.85 9.518 2 16 2c6.578 0 11.91 5.938 11.91 13.262l-.043 3.693c0 2.7.966 4.938 1.96 6.457.428.655.015 1.8-.714 1.8H2.888Z"
    />
  </Svg>
)

