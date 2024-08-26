import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, TextStyle, View} from 'react-native';
import {ListingService} from '../services/listing-service';
import {IListing} from '../data/data';
import {ImageCarousel} from '../components/ImageCarousel';
import {Text} from 'react-native-paper';
import {User} from '../components/SearchItemComponent';
import useColors from '../Infrastructure/useColors';
import {currencyFormatter} from '../components/Currency';
import {Divider} from '../components/Divider';
import {CountrySvg} from '../components/assets/country';

interface ITitleStyle {
  text: TextStyle;
}

export function TitleComponent(props: {title: string}) {
  const {colors} = useColors();

  const style: ITitleStyle = {
    text: {
      color: colors.textPrimary,
      fontSize: 24,
      fontWeight: '700',
      letterSpacing: 0.18,
      lineHeight: 24,
    },
  };

  return <Text style={style.text}>{props.title}</Text>;
}

export function Listing(props: any) {
  const {listingId} = props.route.params;
  const [listing, setListing] = React.useState<IListing | undefined>();
  const [imageList, setImageList] = React.useState<string[]>([]);
  const {colors} = useColors();
  const style = StyleSheet.create({
    container: {
      backgroundColor: colors.primaryBackground,
      color: colors.textPrimary,
      height: '100%',
      width: '100%',
    },
    section: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 4,
      width: '100%',
      padding: 8,
    },
    description: {
      color: colors.textPrimary,
      fontWeight: '300',
      width: '100%',
    },
    descriptionTitle: {
      color: colors.textPrimary,
      fontSize: 24,
      fontWeight: '400',
      lineHeight: 24,
      letterSpacing: 0.18,
    },
    text: {
      color: colors.textPrimary,
    },
    imageCarousel: {
      minHeight: 400,
    },
    user: {
      fontSize: 16,
      letterSpacing: 0.15,
      width: 150,
      justifyContent: 'flex-start',
      gap: 4,
    },
    price: {
      fontSize: 34,
      fontWeight: '400',
      lineHeight: 34,
      textAlign: 'right',
      color: colors.textPrimary,
    },
    left: {
      width: '60%',
    },
    right: {
      width: '35%',
    },
    attribute: {
      color: colors.textPrimary,
      flexBasis: '30%',
      flexGrow: 0,
      flexShrink: 0,
    },
    accented: {
      color: colors.accent,
    },
    flexColumn: {
      flexDirection: 'column',
    },
  });

  useEffect(() => {
    if (listingId) {
      getListing();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.route.params]);

  useEffect(() => {
    if (listing) {
      const images: string[] = Object.keys(listing.images ?? {}).map(
        k => `${listing?.images[k].path} `,
      );

      setImageList(images);
    }
  }, [listing]);

  const getListing = async () => {
    if (listingId) {
      const listingService = new ListingService();
      const l = await listingService.getListing(listingId);
      setListing(l);
    }
  };

  return (
    <ScrollView style={style.container}>
      <ImageCarousel images={imageList} style={style.imageCarousel} />
      <View style={style.section}>
        <View style={style.left}>
          <TitleComponent
            title={listing?.card.name ?? listing?.title ?? 'Title'}
          />
          <User
            style={style.user}
            imageUrl={listing?.sellerAvatar}
            userName={listing?.emailAddress?.substring(
              0,
              listing.emailAddress.indexOf('@'),
            )}
          />
          <View style={style.section}>
            <CountrySvg />
            <Text style={style.text}>{listing?.country}</Text>
          </View>
        </View>
        <View style={style.right}>
          <Text style={style.price}>
            {currencyFormatter(listing?.buyItNowPrice)}
          </Text>
        </View>
      </View>
      <Divider />
      <View style={style.section}>
        <Text style={{...style.attribute, ...style.accented}}>
          {listing?.card.series}
        </Text>
        <Text style={style.attribute}>{listing?.card.number}</Text>
        <Text style={style.attribute}>{listing?.grade.grade.title}</Text>
        <Text style={{...style.attribute, ...style.accented}}>
          {listing?.card.set}
        </Text>
        <Text style={style.attribute}>{listing?.card.rarity}</Text>
        <Text style={style.attribute}>{listing?.grade.grade.company}</Text>
      </View>
      <Divider />
      <View style={{...style.section, ...style.flexColumn}}>
        <Text style={style.descriptionTitle}>Description</Text>
        <Text style={style.description}>{listing?.description}</Text>
      </View>
      <View style={{...style.section, ...style.flexColumn}}>
        <Text style={style.descriptionTitle}>Market Analysis</Text>
      </View>
    </ScrollView>
  );
}
