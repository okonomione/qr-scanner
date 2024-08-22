import React from 'react';
import {StyleSheet, View} from 'react-native';

export function Divider() {
  const style = StyleSheet.create({
    container: {
      borderBottomColor: 'black',
      borderBottomWidth: StyleSheet.hairlineWidth,
      width: '100%',
    },
  });

  return <View style={style.container} />;
}
