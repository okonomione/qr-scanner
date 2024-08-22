/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Home} from './src/views/Home';
import {About} from './src/views/About';
import {CreateListing, Profile} from './src/views/CreateListing';
import {Colors, ThemeProvider} from './src/styles/Theme';
import useColors from './src/Infrastructure/useColors';
import {useColorScheme, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import store, {useAppDispatch, useAppSelector} from './src/store/store';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SearchView} from './src/views/Search';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {useDebounce} from './src/utils/debounce';
import {config} from './src/config/config';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: config.serviceConfig.graphEndpoint,
  cache: new InMemoryCache({}),
});

import {
  aboutTabOptions,
  createListingTabOptions,
  homeTabOptions,
  profileTabBarOptions,
} from './NavigationConfig';
import {SearchBar} from './src/components/SearchBar';
import {AppHeader} from './src/components/AppHeader';
import {setSearchText} from './src/features/search/slice/SearchSlice';

global.Buffer = require('buffer').Buffer;

const Tab = createMaterialBottomTabNavigator();

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const {applyColors} = useColors();
  const colorScheme = useColorScheme();

  useEffect(() => {
    applyColors(colorScheme === 'dark' ? Colors.dark : Colors.light);
  }, [applyColors, colorScheme]);

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <MarketPlaceTabs />
        </NavigationContainer>
      </ApolloProvider>
    </Provider>
  );
}

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <RootNavigator />
    </ThemeProvider>
  );
}

export default App;

export function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeTabs" component={MarketPlaceTabs} />
      <Stack.Screen
        name="PlaceAd"
        component={PlaceAdStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileMain" component={Profile} />
    </Stack.Navigator>
  );
}

export function PlaceAdStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PlaceAdMain" component={CreateListing} />
    </Stack.Navigator>
  );
}

export function MarketPlaceTabs() {
  const {colors} = useColors();

  const styles = StyleSheet.create({
    tabBarStyle: {
      height: 75,
      backgroundColor: colors.secondaryBackground,
      color: colors.textPrimary,
      tintColor: colors.textPrimary,
    },
  });

  return (
    <Tab.Navigator
      activeColor={colors.textPrimary}
      inactiveColor={colors.textPrimary}
      barStyle={styles.tabBarStyle}
      screenOptions={{
        tabBarColor: colors.textPrimary,
      }}>
      <Tab.Screen
        name="Marketplace"
        component={HomeNavigationStack}
        options={{...homeTabOptions}}
      />
      <Tab.Screen
        name="PlaceAd"
        component={PlaceAdStack}
        options={createListingTabOptions}
      />
      <Tab.Screen name="About" component={About} options={aboutTabOptions} />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={profileTabBarOptions}
      />
    </Tab.Navigator>
  );
}

const Header = (props: any) => {
  const onSearchPress = () => {
    props.navigation.navigate('Search');
  };

  return <AppHeader onSearchPress={onSearchPress} />;
};

const MarketPlaceSearchBar = () => {
  const selector = useAppSelector(state => state.searchText);
  const [searchString, setSearchString] = React.useState(selector);

  const setSearchState = useDebounce(() => {
    console.log(searchString);
    dispatch(setSearchText(searchString));
  });

  const dispatch = useAppDispatch();

  const onSearchChanged = (text: string) => {
    setSearchString(text);
  };

  useEffect(() => {
    setSearchState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchString]);

  return (
    <SearchBar
      value={searchString}
      onChangeText={text => {
        onSearchChanged(text);
      }}
    />
  );
};

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
