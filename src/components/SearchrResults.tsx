import React, {useCallback} from 'react';
import {StyleSheet, FlatList, useWindowDimensions} from 'react-native';
import {ISearchResultItem} from '../data/data';
import {SearchItemComponent} from './SearchItemComponent';
import {Spinner} from './Spinner';

export function SearchResults(props: {
  data: ISearchResultItem[];
  isLoading: boolean;
  onItemPressed: <T>(item: T) => void;
  loadMore: () => void;
}) {
  const {width} = useWindowDimensions();

  const style = StyleSheet.create({
    flatList: {
      width: '100%',
    },
  });

  const FList = useCallback(() => {
    let columns = Math.floor(width / 250);
    if (width > 370 && width < 700) {
      columns = 2;
    } else if (width > 701 && width < 850) {
      columns = 3;
    } else if (width > 701 && width < 1200) {
      columns = 5;
    } else {
      columns = 5;
    }
    console.log(width, columns);
    return (
      <>
        <FlatList
          aria-busy={props.isLoading}
          onEndReached={() => props.loadMore()}
          contentContainerStyle={style.flatList}
          data={props.data}
          numColumns={columns}
          renderItem={({item}) => (
            <SearchItemComponent
              id={item?.id}
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
              onPress={props.onItemPressed}
            />
          )}
        />
        <Spinner isLoading={props.isLoading} />
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, props.data]);

  return <FList />;
}
