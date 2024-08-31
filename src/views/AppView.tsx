import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleProp,
  StyleSheet,
  View,
} from 'react-native';
import {ViewStyle} from 'react-native';
import useColors from '../Infrastructure/useColors';

export function AppMainView(props: {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  navigation?: any;
}) {
  const {colors} = useColors();

  const backgroundStyle = {
    backgroundColor: `${colors.primaryBackground}`,
    height: '100%',
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchItems, setSearchItems] = React.useState([]);

  useEffect(() => {
    let isActive = true;

    const fetchItems = async (url: string) => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-cap-tok': 'M0onC@ke1',
            x_q_f: 'Kjoq',
            x_q_re: 'Kjoq',
            x_q_c: '0',
          },
        });

        if (response.status !== 200) {
          console.log('Error fetching items', response);
        }

        const items = await response.json();

        if (isActive) {
          setSearchItems(items.response?.docs);
        }
      } catch (error) {
        console.log('Error fetching items', error);
      }
    };

    fetchItems(
      'https://collector-spoke-apim.azure-api.net/slr/l/s/listing-search',
    );

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <SafeAreaView style={backgroundStyle as any}>
      <StatusBar backgroundColor={colors.primaryBackground} />
      {props.children}
    </SafeAreaView>
  );
}

export function ProfileView(props: {children?: React.ReactNode}) {
  return props.children;
}

export function PlaceAdView(props: {children?: React.ReactNode}) {
  const {colors} = useColors();

  const style = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      gap: 20,
      backgroundColor: colors.primaryBackground,
    },
  });

  return <View style={style.container}>{props.children}</View>;
}
