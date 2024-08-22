import React, {useEffect} from 'react';
import {setSearchText} from '../features/search/slice/SearchSlice';
import {useAppSelector, useAppDispatch} from '../store/store';
import {useDebounce} from '../utils/debounce';
import {SearchBar} from './SearchBar';

export function MarketPlaceSearchBar() {
  const selector = useAppSelector(state => state.searchText);
  const [searchString, setSearchString] = React.useState(selector);

  const setSearchState = useDebounce(() => {
    console.log(searchString);
    dispatch(setSearchText(searchString));
  });

  const dispatch = useAppDispatch();

  const onSearchChanged = (text: string) => {
    setSearchString(text);
  };

  useEffect(() => {
    setSearchState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchString]);

  return (
    <SearchBar
      value={searchString}
      onChangeText={text => {
        onSearchChanged(text);
      }}
    />
  );
}
