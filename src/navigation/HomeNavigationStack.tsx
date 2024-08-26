import {Header} from 'react-native/Libraries/NewAppScreen';
import useColors from '../Infrastructure/useColors';
import {Home} from '../views/Home';
import {SearchView} from '../views/Search';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MarketPlaceSearchBar} from '../components/MarketplaceSearchBar';
import {Listing} from '../views/Listing';

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
        name="Listing"
        component={Listing}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.secondaryBackground,
          },
          headerTintColor: colors.textPrimary,
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
