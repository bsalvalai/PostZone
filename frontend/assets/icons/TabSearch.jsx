/* eslint-disable prettier/prettier */
import * as React from "react"
import { Path, Svg, Circle } from "react-native-svg"

export const TabSearch = ({color, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={31}
    fill="none"
    {...props}
  >
    <Circle cx={11} cy={11} r={10} stroke= {color} strokeWidth={2} />
    <Path stroke= {color} strokeWidth={2} d="m18 18 13 12" />
  </Svg>
)