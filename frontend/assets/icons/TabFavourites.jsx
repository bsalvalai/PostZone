/* eslint-disable prettier/prettier */
import * as React from "react";
import { Svg, Path } from "react-native-svg";

export const TabFavourites = ({color, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={29}
    fill="none"
    {...props}
  >
    <Path
      stroke= {color}
      strokeWidth={2}
      d="m16 3.145 2.644 7.883.229.682h9.186l-6.822 4.802-.61.429.237.707 2.623 7.82-6.911-4.865-.576-.405-.576.405-6.911 4.864 2.623-7.82.237-.706-.61-.43-6.822-4.8h9.187l.228-.683L16 3.145Z"
    />
  </Svg>
);
