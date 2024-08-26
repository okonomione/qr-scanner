import React from 'react';
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
          <LabelValue value={props.userName} label={props.userName} />
        </View>
      </View>
      <LabelValue value={props.footerValue} label={props.footerLabel} />
    </View>
  );
}

export interface KeyValueProps {
  label?: string;
  value?: string;
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

export function LabelValue(props: KeyValueProps) {
  const {colors} = useColors();

  const style = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingTop: 4,
      paddingBottom: 4,
    },
    userName: {
      color: colors.textPrimary,
      fontSize: 12,
    },
  });

  return (
    <View style={style.container}>
      <Text style={style.userName}>{props.label}</Text>
      <Text style={style.userName}>{props.value}</Text>
    </View>
  );
}
