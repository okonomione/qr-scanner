import React from 'react';
import {StyleSheet, View} from 'react-native';

export function Divider() {
  const style = StyleSheet.create({
    container: {
      borderBottomColor: '#ffffff30',
      borderBottomWidth: StyleSheet.hairlineWidth,
      width: '100%',
      marginTop: 4,
      marginBottom: 4,
    },
  });

  return <View style={style.container} />;
}
