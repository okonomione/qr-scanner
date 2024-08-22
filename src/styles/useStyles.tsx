import {useMemo} from 'react';
import useColors from '../Infrastructure/useColors';
import {TColors} from './Theme';
import {StyleSheet} from 'react-native';

interface Styles<T extends StyleSheet.NamedStyles<T>> {
  colors: TColors;
  styles: T;
}

export default function <T extends StyleSheet.NamedStyles<T>>(
  createStyle: (colors: TColors) => T,
): Styles<T> {
  const {colors} = useColors();

  return {
    colors: colors,
    styles: useMemo(() => createStyle(colors), [colors, createStyle]),
  };
}
