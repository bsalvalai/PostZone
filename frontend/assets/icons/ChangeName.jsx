/* eslint-disable prettier/prettier */
import { Svg, Path} from "react-native-svg"
import * as React from "react";
export const ChangeName = ({color, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <Path
      fill={color}
      d="M10.5 30V10.5H3V6h19.5v4.5H15V30h-4.5ZM24 30V18h-4.5v-4.5H33V18h-4.5v12H24Z"
    />
  </Svg>
);

