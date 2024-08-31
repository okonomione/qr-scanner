import React from 'react';
import {createContext, useState} from 'react';

export type ColorTheme = {
  primary: string;
  secondary: string;
  textSecondary: string;
  textPrimary: string;
};

// if we decide to use dark and light themes we will need to ammend this.
const sharedColors = {
  primaryBackground: '#1a2329',
  secondaryBackground: '#252d32',
  softText: '#8a8e90',
  accent: '#98fff9',
  accent2: '#ee8f00',
  black: '#000000',
  white: '#FFFFFF',
  // secondaryBackground: '#161d22',
};

type SharedColors = typeof sharedColors;

export type TColors = ColorTheme & SharedColors;

type ColorPalettes = {
  light: TColors;
  dark: TColors;
};

export const Colors: ColorPalettes = {
  dark: {
    primary: '#080811',
    secondary: '#161629',
    textPrimary: sharedColors.white,
    textSecondary: '#67686E',
    ...sharedColors,
  },
  light: {
    primary: '#F8F8F8',
    secondary: '#E4E4E4',
    textPrimary: sharedColors.white,
    textSecondary: '#000',
    ...sharedColors,
  },
};

type ThemeContextType = {
  colors: TColors;
  applyColors: (colors: TColors) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

const ThemeProvider = (props: {children?: JSX.Element}) => {
  const [colors, setColors] = useState(Colors.light);

  const applyColors = (colorTheme: TColors) => {
    setColors(colorTheme);
  };

  return (
    <ThemeContext.Provider value={{applyColors, colors}}>
      {props.children}
    </ThemeContext.Provider>
  );
};
export {ThemeContext, ThemeProvider};
