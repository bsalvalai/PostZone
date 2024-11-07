/* eslint-disable prettier/prettier */
import * as React from "react";
import { Svg, Path } from "react-native-svg";

export const ConfigEditNotifications = ({ color, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={44}
    height={50}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 46.576C16.858 48.083 19.31 49 22 49c2.69 0 5.142-.917 7-2.424M2.333 38.818c-1.107 0-1.725-1.766-1.056-2.747 1.554-2.278 3.053-5.617 3.053-9.639l.064-5.828C4.394 9.777 12.277 1 22 1c9.867 0 17.865 8.906 17.865 19.893l-.064 5.539c0 4.05 1.448 7.407 2.938 9.685.644.984.024 2.701-1.069 2.701H2.333Z"
    />
  </Svg>
)