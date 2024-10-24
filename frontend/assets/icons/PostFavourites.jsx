/* eslint-disable prettier/prettier */
import * as React from "react";
import { Svg, Path } from "react-native-svg";
export const PostFavourites = ({color, fill, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={35}
    height={32}
    fill={fill}
    {...props}
  >
    <Path
      stroke={color}
      strokeWidth={2}
      d="m17.5 3.236 2.978 9.165.224.691h10.364l-7.796 5.665-.588.427.224.69 2.978 9.166-7.796-5.665-.588-.427-.588.427-7.796 5.665 2.978-9.165.224-.691-.588-.427-7.796-5.665h10.363l.225-.69L17.5 3.235Z"
    />
  </Svg>
);