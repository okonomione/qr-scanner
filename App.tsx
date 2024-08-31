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
import {CreateListing} from './src/views/CreateListing';
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
import {isTablet} from 'react-native-device-info';
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
import {Listing} from './src/views/Listing';
import {SingleCard} from './src/views/SingleListing';
import {MixedBundle} from './src/views/MixedBundle';
import {SealedSingle} from './src/views/SealedSingle';
import {Profile} from './src/views/Profile';

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
          <MarketplaceNavigationTabs />
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

export function ProfileNavigationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileMain" component={Profile} />
    </Stack.Navigator>
  );
}

export function PlaceAdNavigationStack() {
  const {colors} = useColors();

  const genericOptions = {
    headerShown: true,
    headerStyle: {
      backgroundColor: colors.secondaryBackground,
    },
    headerTintColor: '#fff',
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Create Listing"
        component={CreateListing}
        options={genericOptions}
      />
      <Stack.Screen
        name="Single Listing"
        component={SingleCard}
        options={genericOptions}
      />
      <Stack.Screen
        name="Mixed Singles"
        component={MixedBundle}
        options={genericOptions}
      />
      <Stack.Screen
        name="Sealed Singles"
        component={SealedSingle}
        options={genericOptions}
      />
    </Stack.Navigator>
  );
}

export function MarketplaceNavigationTabs() {
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
        options={homeTabOptions()}
      />
      <Tab.Screen
        name="PlaceAd"
        component={PlaceAdNavigationStack}
        options={createListingTabOptions()}
      />
      <Tab.Screen name="About" component={About} options={aboutTabOptions()} />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigationStack}
        options={profileTabBarOptions()}
      />
      {/* <Tab.Screen
        name="Listing"
        component={Listing}
        options={profileTabBarOptions}
      /> */}
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

  const orientation = isTablet() ? 'all' : 'portrait';
  console.log(orientation);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: Header,
          orientation: orientation,
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
    </Stack.Navigator>
  );
}
