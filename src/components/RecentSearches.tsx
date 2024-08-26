import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import useColors from '../Infrastructure/useColors';

export function RecentSearches() {
  const {colors} = useColors();

  const style = StyleSheet.create({
    container: {
      backgroundColor: colors.primaryBackground,
      height: '100%',
      color: colors.textPrimary,
      padding: 8,
    },
    text: {
      color: colors.textPrimary,
    },
  });

  return (
    <View style={style.container}>
      <Text style={style.text}>Recent Searches</Text>
    </View>
  );
}
