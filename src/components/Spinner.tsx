import {StyleSheet, View, Image} from 'react-native';
import React from 'react';

export function Spinner(props: {isLoading: boolean}) {
  const style = StyleSheet.create({
    spinnerStyle: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
    },
    image: {
      height: 20,
      width: 20,
    },
  });

  return (
    props.isLoading && (
      <View style={style.spinnerStyle}>
        <Image
          source={require('../components/assets/spinner.gif')}
          style={style.image}
        />
      </View>
    )
  );
}
