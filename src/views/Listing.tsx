import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, TextStyle, View} from 'react-native';
import {AnalyticsService, ListingService} from '../services/listing-service';
import {IListing} from '../data/data';
import {ImageCarousel} from '../components/ImageCarousel';
import {Checkbox, Text} from 'react-native-paper';
import {IconLabelValue, User} from '../components/SearchItemComponent';
import useColors from '../Infrastructure/useColors';
import {currencyFormatter} from '../components/Currency';
import {Divider} from '../components/Divider';
import {CountrySvg} from '../components/assets/country';
import {SvgUri} from 'react-native-svg';
import {config} from '../config/config';
import {MintIcon} from '../components/assets/condition/Mint';
import {AssessTypeIcon} from '../components/assets/condition/AssessType';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {TColors} from '../styles/Theme';
import {LineChart, lineDataItem} from 'react-native-gifted-charts';
import {LoadingRect} from '../components/Skeleton1';

interface ITitleStyle {
  text: TextStyle;
}

const lineColors = ['purple', 'limegreen', 'orange', 'cyan'];

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

const listingStyle = (colors: TColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.primaryBackground,
      color: colors.textPrimary,
      height: '100%',
      width: '100%',
    },
    country: {
      display: 'flex',
      flexDirection: 'row',
      gap: 4,
      alignItems: 'center',
    },
    section: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: 4,
      width: '100%',
      padding: 8,
    },
    description: {
      color: colors.textPrimary,
      fontWeight: '100',
      fontSize: 12,
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
    marketAContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 32,
      shadowColor: colors.black,
      width: '100%',
      backgroundColor: colors.secondaryBackground,
      padding: 6,
    },
    marketAItem: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      flexBasis: '30%',
      gap: 4,
    },
    marketAItemText: {
      fontSize: 20,
      color: colors.textPrimary,
      fontWeight: '700',
    },
    mAindicatorText: {
      fontSize: 10,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    growthContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 4,
      shadowColor: colors.black,
      width: '100%',
      padding: 6,
    },
  });

export function Listing(props: any) {
  const {listingId} = props.route.params;
  const [listing, setListing] = React.useState<IListing | undefined>();
  const [imageList, setImageList] = React.useState<string[]>([]);
  const {colors} = useColors();
  const [listingLoading, setListingLoading] = React.useState<boolean>(true);
  const style = listingStyle(colors);

  useEffect(() => {
    if (listingId) {
      setListingLoading(true);
      getListing().finally(() => setListingLoading(false));
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
    <GestureHandlerRootView>
      <ScrollView style={style.container}>
        <ImageCarousel images={imageList} style={style.imageCarousel} />
        <View style={style.section}>
          <LoadingRect isLoading={listingLoading}>
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
              <View style={style.country}>
                <CountrySvg />
                <Text style={style.text}>{listing?.country}</Text>
              </View>
            </View>
          </LoadingRect>
          <LoadingRect isLoading={listingLoading}>
            <View style={style.right}>
              <Text style={style.price}>
                {currencyFormatter(listing?.buyItNowPrice)}
              </Text>
            </View>
          </LoadingRect>
        </View>
        <Divider />
        <View style={style.section}>
          <Text style={{...style.attribute, ...style.accented}}>
            {listing?.card.series}
          </Text>
          <IconLabelValue
            value={listing?.card.number}
            orientation="row"
            flexSpacing="flex-start"
            color="primary"
            style={style.attribute}
            icon={<Text style={{color: colors.primary}}> #</Text>}
          />
          <IconLabelValue
            value={listing?.grade.grade.title}
            orientation="row"
            flexSpacing="flex-start"
            color="primary"
            style={style.attribute}
            icon={<MintIcon />}
          />
          <Text style={{...style.attribute, ...style.accented}}>
            {listing?.card.set}
          </Text>
          <IconLabelValue
            value={listing?.card.rarity}
            orientation="row"
            flexSpacing="flex-start"
            color="primary"
            style={style.attribute}
            icon={
              <SvgUri
                uri={`${config.assetConfig.assetUrl}/double-rare.svg`}
                height={12}
              />
            }
          />
          <IconLabelValue
            value={listing?.grade.grade.company}
            orientation="row"
            flexSpacing="flex-start"
            color="primary"
            style={style.attribute}
            icon={<AssessTypeIcon />}
          />
        </View>
        <Divider />
        <View style={{...style.section, ...style.flexColumn}}>
          <Text style={style.descriptionTitle}>Description</Text>
          <Text style={style.description}>{listing?.description}</Text>
        </View>
        <MarketSummaryComponent
          id={listing?.card.cardId ?? ''}
          // grade={listing?.grade.grade.value ?? 0}
          grade={0}
        />
      </ScrollView>
    </GestureHandlerRootView>
  );
}

export function MarketSummaryComponent(props: {id: string; grade: number}) {
  const {colors} = useColors();
  const style = listingStyle(colors);

  const [fifthPercentile, setFifthPercentile] = React.useState<any>([
    {value: 100, label: ''},
  ]);
  const [avgSold, setAvgSold] = React.useState<any>();
  const [medianSOld, setMedianSold] = React.useState<any>();
  const [ninetyFthPerce, setNinetyFthPerce] = React.useState<any>();
  const [summaryData, setSummaryData] = React.useState<any>();

  useEffect(() => {
    const service = new AnalyticsService();

    if (!props.id) return;

    service.getGraphData(props.id, props.grade).then(data => {
      setAvgSold(
        data.response.docs
          .sort(
            (a: {unix_date: number}, b: {unix_date: number}) =>
              a.unix_date - b.unix_date,
          )
          .map((item: any) => ({
            label: item.month_date,
            value: item.sold_avg_input_3_roll,
          })),
      );

      setMedianSold(
        data.response.docs
          .sort(
            (a: {unix_date: number}, b: {unix_date: number}) =>
              a.unix_date - b.unix_date,
          )
          .map((item: any) => ({
            label: item.month_date,
            value: item.sold_price_median_3_roll,
          })),
      );

      setNinetyFthPerce(
        data.response.docs
          .sort(
            (a: {unix_date: number}, b: {unix_date: number}) =>
              a.unix_date - b.unix_date,
          )
          .map((item: any) => ({
            label: item.month_date,
            value: item.sold_price_95th_percentile_3_roll,
          })),
      );

      setFifthPercentile(
        data.response.docs
          .sort(
            (a: {unix_date: number}, b: {unix_date: number}) =>
              a.unix_date - b.unix_date,
          )
          .map((item: any) => ({
            label: item.month_date,
            value: item.sold_price_5th_percentile_3_roll,
          })),
      );
    });

    service.getSummaryData(props.id, props.grade).then(data => {
      setSummaryData(data.response.docs?.[0]);
    });
  }, [props.grade, props.id]);

  return (
    <View style={{...style.section, ...style.flexColumn}}>
      <Text style={style.descriptionTitle}>Market Analysis</Text>
      <View style={style.marketAContainer}>
        <View style={style.marketAItem}>
          <Text style={style.marketAItemText}>
            {currencyFormatter(summaryData?.sold_price_low_current_months)}
          </Text>
          <Text style={style.mAindicatorText}>Low</Text>
        </View>
        <Divider orientation="vertical" color="light" />
        <View style={style.marketAItem}>
          <Text style={{...style.marketAItemText, color: colors.accent2}}>
            {currencyFormatter(summaryData?.sold_price_median_current_months)}
          </Text>
          <Text style={style.mAindicatorText}>Mid</Text>
        </View>
        <Divider orientation="vertical" color="light" />
        <View style={style.marketAItem}>
          <Text style={style.marketAItemText}>
            {currencyFormatter(summaryData?.sold_price_high_current_months)}
          </Text>
          <Text style={style.mAindicatorText}>High</Text>
        </View>
      </View>
      <Text style={{color: colors.softText, padding: 8}}>
        *Market Analysis Data based on USD Currency
      </Text>

      <View style={style.growthContainer}>
        <GrowthTileComponent
          label="-"
          growthRate="Median Price"
          medianPrice="Growth Rate"
        />
        <GrowthTileComponent
          label="3 Months"
          growthRate={summaryData?.growth_rate_median_3_months}
          medianPrice={currencyFormatter(
            summaryData?.sold_price_median_3_months,
          )}
        />
        <GrowthTileComponent
          label="6 Months"
          growthRate={summaryData?.growth_rate_median_6_months}
          medianPrice={currencyFormatter(
            summaryData?.sold_price_median_6_months,
          )}
        />
        <GrowthTileComponent
          label="1 Year"
          growthRate={summaryData?.growth_rate_median_12_months}
          medianPrice={currencyFormatter(
            summaryData?.sold_price_median_12_months,
          )}
        />
        <GrowthTileComponent
          label="2 Years"
          growthRate={summaryData?.growth_rate_median_all_months}
          medianPrice={currencyFormatter(
            summaryData?.sold_price_median_24_months,
          )}
        />
        <GrowthTileComponent
          label="All Time"
          growthRate={summaryData?.growth_rate_median_all_months}
          medianPrice={currencyFormatter(
            summaryData?.sold_price_median_all_months,
          )}
        />
      </View>
      <View
      // style={{
      //   display: 'flex',
      //   flexDirection: 'row',
      //   width: '100%',
      //   backgroundColor: 'beige',
      // }}
      ></View>
      <MarketDataGraph
        datasets={[
          {name: '5th Percentile', data: fifthPercentile},
          {name: 'Average Sold Price', data: avgSold},
          {name: 'Median Sold Price', data: medianSOld},
          {name: '95th Percentile', data: ninetyFthPerce},
        ]}
      />
    </View>
  );
}

export function GrowthTileComponent(props: {
  label: string;
  growthRate: string;
  medianPrice: string;
}) {
  const {colors} = useColors();

  const style = StyleSheet.create({
    text: {
      color: colors.textPrimary,
      fontSize: 10,
      fontWeight: '700',
      width: '100%',
      textAlign: 'center',
    },
  });

  return (
    <View>
      <Text style={{...style.text, color: colors.accent}}>{props.label}</Text>
      <Text style={style.text}>{props.medianPrice}</Text>
      <Text style={{...style.text, color: colors.softText}}>
        {props.growthRate}
      </Text>
    </View>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function MarketDataGraph(props: {
  datasets: {name: string; data: lineDataItem[]}[];
}) {
  const [cbActive, setCbActive] = React.useState<{[key: string]: boolean}>(
    props.datasets
      .map(d => d.name)
      .reduce((acc, curr) => ({...acc, [curr]: true}), {}),
  );

  const style = StyleSheet.create({
    container: {
      width: '100%',
    },
    axisStyle: {
      color: 'white',
      fontSize: 10,
      letterSpacing: 0.15,
      height: 50,
    },
    checkboxView: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkbox: {
      color: 'white',
      fontSize: 10,
    },
    legend: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
  });

  const [maxValue, setMaxValue] = React.useState<number>(10);

  useEffect(() => {
    // eslint-disable-next-line curly
    if (props.datasets.length === 0) {
      setMaxValue(10);
      return;
    }
    let max = 10;

    max = Math.max(
      ...props.datasets?.flatMap(d => d.data?.map(i => i.value).filter(i => i)),
    );
    isNaN(max) && (max = 10);

    setMaxValue(max);
  }, [props.datasets]);

  console.log(
    props.datasets[0].data
      .filter((i, index) => index % 2 === 0)
      .map(d => d.label ?? ''),
    'xAxisLabelTexts',
  );

  return (
    <View style={style.container}>
      <View style={style.legend}>
        {props.datasets.map((data, index) => (
          <View style={style.checkboxView}>
            <Checkbox
              status={cbActive?.[data.name] ? 'checked' : 'unchecked'}
              color={lineColors[index] ?? 'white'}
              onPress={() => {
                console.log(cbActive, {
                  ...cbActive,
                  [data.name]: !cbActive?.[data.name],
                });
                setCbActive({
                  ...cbActive,
                  [data.name]: !cbActive?.[data.name],
                });
              }}
            />
            <Text style={style.checkbox}>{data.name}</Text>
          </View>
        ))}
      </View>
      <LineChart
        adjustToWidth={true}
        rotateLabel={true}
        xAxisType="date"
        maxValue={maxValue}
        data={props.datasets[0].data}
        data2={props.datasets[1].data}
        data3={props.datasets[2].data}
        data4={props.datasets[3].data}
        xAxisLabelTexts={props.datasets[0].data
          .filter((i, index) => index % 2 === 0)
          .map(d => d.label ?? '')}
        xAxisIndicesHeight={50}
        labelsExtraHeight={50}
        showDataPointLabelOnFocus
        xAxisLabelsVerticalShift={10}
        focusEnabled
        color1={
          cbActive[props.datasets[0].name] ? lineColors[0] : 'transparent'
        }
        color2={
          cbActive[props.datasets[1].name] ? lineColors[1] : 'transparent'
        }
        color3={
          cbActive[props.datasets[2].name] ? lineColors[2] : 'transparent'
        }
        color4={
          cbActive[props.datasets[3].name] ? lineColors[3] : 'transparent'
        }
        textColor1="white"
        xAxisColor={'white'}
        xAxisLabelTextStyle={style.axisStyle}
        yAxisTextStyle={style.axisStyle}
        yAxisThickness={0}
        xAxisThickness={0}
        hideRules
        showDataPointOnFocus
        showTextOnFocus
      />
    </View>
  );
}
