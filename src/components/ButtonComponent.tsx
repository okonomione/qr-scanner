import React from 'react';
import {StyleSheet} from 'react-native';
import useColors from '../Infrastructure/useColors';
import {Pressable} from 'react-native';
import {Text} from 'react-native';

export function ButtonComponent(props: {
  text: string;
  onPress: () => void;
  style?: any;
}) {
  const {colors} = useColors();
  const style = StyleSheet.create({
    button: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: 205,
      borderRadius: 100,
      backgroundColor: colors.secondaryBackground,
      color: colors.textPrimary,
      height: '100%',

      ...props.style,
    },
    buttonText: {
      color: colors.textPrimary,
      width: '100%',
      textAlign: 'center',
    },
  });
  return (
    <Pressable style={style.button} onPress={props.onPress}>
      <Text style={style.buttonText}>{props.text}</Text>
    </Pressable>
  );
}
