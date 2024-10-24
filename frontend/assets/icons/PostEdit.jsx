/* eslint-disable prettier/prettier */
import * as React from "react";
import { Svg, Path } from "react-native-svg";

export const PostEdit = ({color, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.75 5H5a2.5 2.5 0 0 0-2.5 2.5V25A2.5 2.5 0 0 0 5 27.5h17.5A2.5 2.5 0 0 0 25 25v-8.75M23.125 3.125a2.652 2.652 0 1 1 3.75 3.75L15 18.75 10 20l1.25-5L23.125 3.125Z"
    />
  </Svg>
)