/* eslint-disable prettier/prettier */
import * as React from "react";
import { Svg, Path } from "react-native-svg";
export const PostComment = ({color, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={28}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeWidth={2}
      d="M1.04 12.182C1.695 3.277 9.864 1.128 13.83 1c1.505.384 8.396.06 10.858 4.667 2.698 5.05.654 12.98-.987 15.666L25.246 26l-5.492-2.333-1.893.414h-5.744C8.151 23.825.383 21.087 1.039 12.18Z"
    />
  </Svg>
);
