import {Header} from 'react-native/Libraries/NewAppScreen';
import useColors from '../../../../src/Infrastructure/useColors';
import {Home} from '../../../../src/views/Home';
import {SearchView} from '../../../../src/views/Search';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MarketPlaceSearchBar} from '../../../../src/components/MarketplaceSearchBar';

const Stack = createNativeStackNavigator();

export function HomeNavigationStack() {
  const {colors} = useColors();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: Header,
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchView}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.secondaryBackground,
          },
          headerTitle: MarketPlaceSearchBar,
          headerTintColor: colors.textPrimary,
        }}
      />
    </Stack.Navigator>
  );
}
