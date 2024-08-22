import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import useColors from '../Infrastructure/useColors';
import {IconButton} from 'react-native-paper';

export interface BaseProps {
  children?: React.ReactNode;
  navigation?: any;
}

export interface AppHeaderProps extends BaseProps {
  onSearchChange: (text: string) => void;
}

export function AppTitle(props: {title?: string; logo?: React.ReactNode}) {
  const {colors} = useColors();

  const Logo = () => props.logo;

  const style = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.textPrimary,
    },
  });

  return (
    <View style={style.container}>
      <Logo />
      <Text style={style.text}>{props.title ?? ''}</Text>
    </View>
  );
}

export function AppHeader(props: any) {
  const {colors} = useColors();

  const style = StyleSheet.create({
    view: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.secondaryBackground,
      color: colors.textPrimary,
      padding: 8,
      height: 50,
    },
    button: {
      color: 'white',
    },
    logo: {
      height: 60,
      width: 60,
      objectFit: 'contain',
    },
  });

  return (
    <View style={style.view}>
      <AppTitle
        title="MarketPlace"
        logo={
          <Image
            source={require('../components/assets/logo.png')}
            style={style.logo}
          />
        }
      />

      <IconButton
        icon="magnify"
        onPress={props.onSearchPress}
        iconColor={colors.textPrimary}
      />
    </View>
  );
}
