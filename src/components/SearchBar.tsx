import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {IconButton} from 'react-native-paper';
import useColors from '../Infrastructure/useColors';

export function SearchBar(props: {
  value?: string;
  onChangeText?: (text: string) => void;
}) {
  const {colors} = useColors();

  const style = StyleSheet.create({
    container: {
      flex: 1,
      width: 50,
    },
    innerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: 35,
      backgroundColor: colors.primaryBackground,
      borderRadius: 15,
      margin: 0,
    },
    textInput: {
      width: '80%',
      color: colors.textPrimary,
      paddingLeft: 16,
      paddingRight: 16,
    },
    gradient: {
      borderRadius: 16,
      padding: 2,
      width: '80%',
    },

    button: {
      width: 40,
    },
  });

  function onChangeText(text: string): void {
    props.onChangeText?.(text);
  }

  return (
    <View style={style.container}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={style.gradient}
        colors={['#B8E3EE', '#7F99D0', '#F48265', '#FFF5B8', '#B8DCA2']}>
        <View style={style.innerContainer}>
          <TextInput
            value={props.value}
            onChangeText={onChangeText}
            style={style.textInput}
            returnKeyType="search"
          />
          <IconButton icon="magnify" onPress={() => {}} style={style.button} />
        </View>
      </LinearGradient>
    </View>
  );
}
