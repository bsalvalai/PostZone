/* eslint-disable prettier/prettier */
import * as React from "react"
import { Svg, Path } from "react-native-svg"
export const ConfigEditUserPhoto = ({ color, ...props }) => (
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
      d="M40 42v-4a8 8 0 0 0-8-8H16a8 8 0 0 0-8 8v4m24-28a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
    />
  </Svg>
)
