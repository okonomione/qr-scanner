import React from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useColors from './src/Infrastructure/useColors';
import {MaterialBottomTabNavigationOptions} from 'react-native-paper';

interface NavIconProps {
  focused?: boolean;
  color: string;
  size?: number;
  name?: string;
  icon?: any;
}

export const NavIcon = (props: NavIconProps) => {
  const {colors} = useColors();
  const Icon = props.icon;
  return (
    <Icon
      {...props}
      color={!props.focused ? colors.textPrimary : colors.textSecondary}
    />
  );
};

export const homeTabBarIcon = (props: NavIconProps) => {
  return (
    <NavIcon
      focused={props.focused ?? false}
      name="shopping"
      color={props.color}
      icon={MaterialCommunityIcons}
      size={26}
    />
  );
};

export const aboutTabBarIcon = (props: NavIconProps) => (
  <NavIcon
    focused={props.focused ?? false}
    name="information"
    color={props.color}
    size={26}
    icon={MaterialCommunityIcons}
  />
);

export const createListingTabBarIcon = (props: NavIconProps) => (
  <NavIcon
    focused={props.focused ?? false}
    name="plus"
    color={props.color}
    size={26}
    icon={MaterialCommunityIcons}
  />
);

export const profileTabBarIcon = (props: NavIconProps) => (
  <NavIcon
    focused={props.focused ?? false}
    name="account"
    color={props.color}
    size={26}
    icon={MaterialCommunityIcons}
  />
);

export const profileTabBarOptions: MaterialBottomTabNavigationOptions = {
  tabBarIcon: profileTabBarIcon,
};

export const homeTabOptions = {
  tabBarIcon: homeTabBarIcon,
};

export const aboutTabOptions = {
  tabBarIcon: aboutTabBarIcon,
};

export const createListingTabOptions = {
  tabBarIcon: createListingTabBarIcon,
};
