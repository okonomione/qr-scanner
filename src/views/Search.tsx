import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useAppSelector} from '../store/store';
import {RecentSearches} from '../components/RecentSearches';
import {useQuery} from '@apollo/client';
import {ISearchResultItem} from '../data/data';
import {pagedListingSearchQuery} from '../graph/queries';
import {SearchResults} from '../components/SearchrResults';
import useColors from '../Infrastructure/useColors';

export function SearchView() {
  const selector = useAppSelector(state => state.searchText);
  const [showSearchResults, setShowSearchResults] = React.useState(false);
  const {colors} = useColors();
  const style = StyleSheet.create({
    container: {
      backgroundColor: colors.primaryBackground,
    },
  });

  useEffect(() => {
    if (selector.length > 0) {
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  }, [selector]);

  const [d, setData] = React.useState<ISearchResultItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const {data, fetchMore, error} = useQuery(pagedListingSearchQuery.query, {
    variables: pagedListingSearchQuery.variables,
  });

  useEffect(() => {
    setData(data?.listings?.listings ?? '');
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error('error', error);
    }
  }, [error]);

  const loadMore = async () => {
    if (data?.listings?.numFound > d.length) {
      console.log('loading more');
      if (!isLoading) {
        setIsLoading(true);
        const moreData = await fetchMore({
          variables: {offset: d?.length},
        });
        const result = [...d, ...moreData.data.listings.listings];
        setData(result);
        setIsLoading(false);
      }
    }
  };

  return (
    <View style={style.container}>
      {showSearchResults}
      {!showSearchResults ? (
        <RecentSearches />
      ) : (
        <SearchResults data={d} isLoading={isLoading} loadMore={loadMore} />
      )}
    </View>
  );
}
