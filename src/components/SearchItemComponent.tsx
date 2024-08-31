import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import useColors from '../Infrastructure/useColors';
import {ItemComponentImage} from './ItemComponentImage';

export interface SearchItemComponentProps {
  id: string;
  title: string;
  category: string;
  subCategory: string;
  images: string[];
  amount: string;
  subAmount: string;
  subAmountText: string;
  userName: string;
  footerLabel?: string;
  footerValue?: string;
  onPress: <T>(item: T) => void;
}

export function SearchItemComponent(props: SearchItemComponentProps) {
  const {colors} = useColors();

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'AUD',
  });

  const style = StyleSheet.create({
    container: {
      display: 'flex',
      width: '50%',
      padding: 4,
      maxWidth: 250,
      minWidth: 'auto',
    },
    imageContainer: {
      backgroundColor: colors.primaryBackground,
      marginBottom: 4,
    },
    image: {
      resizeMode: 'contain',
      objectFit: 'cover',
      height: 200,
      borderRadius: 3,
    },
    detailsContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: colors.secondaryBackground,
      width: '100%',
      padding: 4,
      borderRadius: 3,
      height: 80,
    },
    text: {
      color: colors.textPrimary,
    },
    title: {
      letterSpacing: 1,
      lineHeight: 24,
      color: colors.textPrimary,
      fontSize: 16,
      fontWeight: 'bold',
      borderBottomColor: colors.textPrimary,
      borderBottomWidth: 1,
      marginBottom: 4,
    },
    category: {
      color: colors.accent,
      fontSize: 14,
    },
    subCategory: {
      color: colors.accent,
      fontSize: 12,
    },
    amount: {
      color: colors.textPrimary,
      fontSize: 12,
      fontWeight: 'bold',
    },
    left: {
      width: '70%',
    },
    right: {
      width: '30%',
      alignItems: 'flex-end',
    },
    subAmount: {
      color: colors.softText,
      fontSize: 10,
    },
    subAmountText: {
      color: colors.softText,
      fontSize: 10,
      lineHeight: 20,
    },
  });

  return (
    <View style={style.container}>
      <View style={style.imageContainer}>
        <ItemComponentImage
          style={style.image}
          path={props.images[0]}
          onPress={() => props.onPress(props.id)}
        />
      </View>
      <Text style={style.title}>{props.title}</Text>
      <View style={style.detailsContainer}>
        <View style={style.left}>
          <Text style={style.category}>{props.category}</Text>
          <Text style={style.subCategory}>{props.subCategory}</Text>
        </View>
        <View style={style.right}>
          <Text style={style.amount}>
            {currencyFormatter.format(+(props.amount ?? 0))}
          </Text>
          <Text style={style.subAmount}>
            {currencyFormatter.format(+(props.subAmount ?? 0))}
          </Text>
          <Text style={style.subAmountText}>{props.subAmountText}</Text>
        </View>
        <View>
          <IconLabelValue
            value={props.userName}
            label={props.userName}
            color="primary"
            flexSpacing="space-between"
            orientation="row"
          />
        </View>
      </View>
      <IconLabelValue
        value={props.footerValue}
        label={props.footerLabel}
        color="primary"
        flexSpacing="space-between"
      />
    </View>
  );
}

export interface LabelValueProp {
  label?: string;
  value?: string;
  icon?: React.JSX.Element;
  color?: ColorTypeProp;
  orientation?: OrientationProp;
  flexSpacing?: FlexSpacingProp;
  style?: any;
}

export interface UserProps {
  imageUrl?: string;
  userName?: string;
  style?: any;
}

export function User(props: UserProps) {
  const {colors} = useColors();

  const style = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      ...props.style,
    },
    image: {
      display: 'flex',
      height: 15,
      width: 15,
      borderRadius: 10,
    },
    userName: {
      display: 'flex',
      alignItems: 'center',
      color: colors.textPrimary,
      fontSize: 16,
      letterSpacing: 0.15,
      width: 150,
      justifyContent: 'flex-start',
      marginTop: 4,
      gap: 4,
      height: 28,
    },
  });

  return (
    <View style={style.container}>
      <Image source={{uri: props.imageUrl}} style={style.image} />
      <Text style={style.userName}>{props.userName}</Text>
    </View>
  );
}

type FlexSpacingProp =
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | undefined;
type ColorTypeProp = 'primary' | 'secondary' | 'accent' | 'soft' | undefined;
type OrientationProp =
  | 'row'
  | 'column'
  | 'row-reverse'
  | 'column-reverse'
  | undefined;

export function IconLabelValue(props: LabelValueProp) {
  const {colors} = useColors();
  const [textColor, setTextColor] = React.useState<string>(
    props.color ?? 'primary',
  );

  useEffect(() => {
    if (props.color === 'primary') {
      setTextColor(colors.textPrimary);
    }

    if (props.color === 'secondary') {
      setTextColor(colors.secondary);
    }
    if (props.color === 'accent') {
      setTextColor(colors.accent);
    }

    if (props.color === 'soft') {
      setTextColor(colors.softText);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.color]);

  const style = StyleSheet.create({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: props.flexSpacing ?? 'flex-start',
      flexDirection: props.orientation ?? 'row',
      gap: 4,
      width: '100%',
      ...props.style,
    },
    label: {
      color: textColor,
      fontSize: 12,
    },
  });

  return (
    <View style={style.container}>
      {props.icon}
      {props.label && (
        <Text numberOfLines={1} ellipsizeMode="tail" style={style.label}>
          {props.label}
        </Text>
      )}
      {props.value && (
        <Text numberOfLines={1} ellipsizeMode="tail" style={style.label}>
          {props.value}
        </Text>
      )}
    </View>
  );
}
