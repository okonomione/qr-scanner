import React from 'react';
import {appData} from '../data/data';
import {StyleSheet, View} from 'react-native';
import useColors from '../Infrastructure/useColors';
import {SearchItemComponent} from './SearchItemComponent';

export function SearchItemsComponent() {
  const data = React.useRef(appData);
  const {colors} = useColors();

  const style = StyleSheet.create({
    container: {
      backgroundColor: colors.primaryBackground,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      width: '100%',
    },
  });

  return (
    <View style={style.container}>
      {data.current?.map(item => (
        <React.Fragment key={item.id}>
          <SearchItemComponent
            category={item.series}
            title={item.title ?? item.name}
            subCategory={item.set}
            images={item.imageSrc ?? []}
            amount={item.buyItNowPrice?.toString() ?? ''}
          />
        </React.Fragment>
      ))}
    </View>
  );
}
