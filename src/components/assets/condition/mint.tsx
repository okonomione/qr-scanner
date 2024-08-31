import React from 'react';
import {G, Mask, Path, Rect, Svg} from 'react-native-svg';

export const MintIcon = () => (
  <Svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <Rect
      x="3.63281"
      y="3.10938"
      width="9.58315"
      height="11.3897"
      rx="2.5"
      stroke="#FFFFFF"
    />
    <Path
      d="M6.05148 3.23209C6.05148 4.73468 4.81508 5.96418 3.27574 5.96418C1.7364 5.96418 0.5 4.73468 0.5 3.23209C0.5 1.7295 1.7364 0.5 3.27574 0.5C4.81508 0.5 6.05148 1.7295 6.05148 3.23209Z"
      stroke="#FFFFFF"
    />
    <Mask
      id="mask0_4333_67069"
      maskUnits="userSpaceOnUse"
      x="2"
      y="1"
      width="10"
      height="12"
      style={{maskType: 'alpha'}}>
      <Rect
        x="3.17969"
        y="2.61719"
        width="7.28126"
        height="8.77362"
        rx="3.64063"
        stroke="black"
        stroke-width="2"
      />
    </Mask>
    <G mask="url(#mask0_4333_67069)">
      <Path
        d="M6.56021 3.494C6.56021 5.13028 5.21583 6.45674 3.55745 6.45674C1.89907 6.45674 0.554688 5.13028 0.554688 3.494C0.554688 1.85772 1.89907 0.53125 3.55745 0.53125C5.21583 0.53125 6.56021 1.85772 6.56021 3.494Z"
        fill="#FFFFFF"
      />
    </G>
  </Svg>
);
