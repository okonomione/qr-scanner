import React, {useEffect} from 'react';

import {AppMainView} from './AppView';

import {useQuery} from '@apollo/client';
import {pagedListingSearchQuery} from '../graph/queries';
import {ISearchResultItem} from '../data/data';
import {SearchResults} from '../components/SearchrResults';

export function Home(props: {navigation: any}) {
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
    <AppMainView {...props}>
      <SearchResults loadMore={loadMore} data={d} isLoading={isLoading} />
    </AppMainView>
  );
}
