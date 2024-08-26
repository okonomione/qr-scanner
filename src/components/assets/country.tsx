import * as React from 'react';
import {Svg, Path, G, Defs, ClipPath} from 'react-native-svg';
export const CountrySvg = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={15}
    fill="none"
    {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#fff"
        d="m12.813 1.875-.1.019-3.338 1.294-3.75-1.313L2.1 3.063a.315.315 0 0 0-.225.3v9.45a.31.31 0 0 0 .313.312l.1-.019 3.337-1.293 3.75 1.312 3.525-1.188a.315.315 0 0 0 .225-.3v-9.45a.31.31 0 0 0-.313-.312Zm-3.438 10-3.75-1.319V3.125l3.75 1.319v7.431Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h15v15H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
