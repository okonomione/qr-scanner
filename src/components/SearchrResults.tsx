import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {ISearchResultItem} from '../data/data';
import {SearchItemComponent} from './SearchItemComponent';
import {Spinner} from './Spinner';

export function SearchResults(props: {
  data: ISearchResultItem[];
  isLoading: boolean;
  loadMore: () => void;
}) {
  const style = StyleSheet.create({
    flatList: {
      width: '100%',
    },
  });
  return (
    <>
      <FlatList
        aria-busy={props.isLoading}
        onEndReached={() => props.loadMore()}
        contentContainerStyle={style.flatList}
        data={props.data}
        numColumns={2}
        renderItem={({item}) => (
          <SearchItemComponent
            category={item?.series}
            title={item?.title ?? item?.name}
            subCategory={item?.set}
            images={item?.imageList.map(i => i.path)}
            amount={item?.buyItNowPrice?.toString() ?? '0'}
            subAmount={`${item?.shippingCost?.toString() ?? '0'}`}
            subAmountText={'Shipping'}
            userName={item?.seller ?? 'Unknown'}
            footerLabel={item?.rarity}
            footerValue={item?.number?.toString()}
          />
        )}
      />
      <Spinner isLoading={props.isLoading} />
    </>
  );
}
