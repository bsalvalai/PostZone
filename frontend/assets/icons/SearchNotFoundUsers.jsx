/* eslint-disable prettier/prettier */
import * as React from "react";
import { Svg, Path } from "react-native-svg";
export const SearchNotFoundUsers = ({ color, ...props }) => (
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
      d="M38 33.8A10 10 0 0 0 36 14h-2.52a16 16 0 1 0-23.24 18M26 22l-8 12h12l-8 12"
    />
  </Svg>
);
