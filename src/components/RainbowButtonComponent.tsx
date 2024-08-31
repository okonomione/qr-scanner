import React from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import useColors from '../Infrastructure/useColors';
import {ButtonComponent} from './ButtonComponent';

export function RainbowButton(props: {text: string; onPress: () => void}) {
  const {colors} = useColors();

  const style = StyleSheet.create({
    container: {
      flex: 1,
    },
    innerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',

      height: 35,
      backgroundColor: colors.primaryBackground,
      borderRadius: 15,
      margin: 0,
    },
    textInput: {
      color: colors.textPrimary,
      paddingLeft: 16,
      paddingRight: 16,
    },
    gradient: {
      borderRadius: 16,
      padding: 2,
    },
  });

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={style.gradient}
      colors={['#B8E3EE', '#7F99D0', '#F48265', '#FFF5B8', '#B8DCA2']}>
      <View style={style.innerContainer}>
        <ButtonComponent text={props.text} onPress={props.onPress} />
      </View>
    </LinearGradient>
  );
}
