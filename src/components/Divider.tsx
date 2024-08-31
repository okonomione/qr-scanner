import React from 'react';
import {StyleSheet, View} from 'react-native';

export function Divider(props: {
  orientation?: 'horizontal' | 'vertical';
  color?: 'light' | 'dark';
}) {
  props.orientation ??= 'horizontal';
  props.color ??= 'light';

  const color = props.color === 'light' ? '#ffffff30' : '#00000030';

  const border =
    props.orientation === 'vertical'
      ? ({
          borderRightColor: color,
          borderRightWidth: 0.8,
          height: '100%',
        } as any)
      : ({
          borderBottomColor: color,
          borderBottomWidth: 1,
          width: '100%',
        } as any);

  const style = StyleSheet.create({
    container: {
      ...border,
      marginTop: 4,
      marginBottom: 4,
    },
  });

  return <View style={style.container} />;
}
