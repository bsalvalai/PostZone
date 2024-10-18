/* eslint-disable prettier/prettier */
import * as React from "react";
import { Svg, Path } from "react-native-svg";

export const TabNewPost = ({color, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={34}
    height={33}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeWidth={2}
      d="M1 29V4a3 3 0 0 1 3-3h26a3 3 0 0 1 3 3v25a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3ZM17 8v17.5M9 17h16"
    />
  </Svg>
);
