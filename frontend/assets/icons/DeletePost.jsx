/* eslint-disable prettier/prettier */
import * as React from "react"
import { Svg, Path} from "react-native-svg"
export const DeletePost = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3.75 7.5h2.5m0 0h20m-20 0V25a2.5 2.5 0 0 0 2.5 2.5h12.5a2.5 2.5 0 0 0 2.5-2.5V7.5M10 7.5V5a2.5 2.5 0 0 1 2.5-2.5h5A2.5 2.5 0 0 1 20 5v2.5m-7.5 6.25v7.5m5-7.5v7.5"
    />
  </Svg>
)