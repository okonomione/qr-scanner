import React, {useEffect} from 'react';
import {setSearchText} from '../features/search/slice/SearchSlice';
import {useAppSelector, useAppDispatch} from '../store/store';
import {useDebounce} from '../utils/debounce';
import {SearchBar} from './SearchBar';

export function MarketPlaceSearchBar() {
  const selector = useAppSelector(state => state.searchText);
  const [searchString, setSearchString] = React.useState(selector);

  const setSearchState = useDebounce(() => {
    dispatch(setSearchText(searchString));
  });

  const onSearchPress = (text: string) => {
    setSearchString(text);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    setSearchState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchString]);

  return (
    <SearchBar
      value={searchString}
      onSearchPress={(text: string) => {
        console.log(text);
        onSearchPress(text);
      }}
    />
  );
}
