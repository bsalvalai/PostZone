/* eslint-disable prettier/prettier */
import * as React from "react";
import { Svg, Path } from "react-native-svg";

export const ConfigEditCoverPhoto = ({ color, ...props }) => (
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
      d="M10 42h28a4 4 0 0 0 4-4V10a4 4 0 0 0-4-4H10a4 4 0 0 0-4 4v28a4 4 0 0 0 4 4Zm0 0 22-22 10 10M20 17a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
  </Svg>
);
