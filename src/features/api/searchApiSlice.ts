import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://collector-spoke-apim.azure-api.net/slr/l/s/listing-search-autocomplete',
  }),
  endpoints: builder => ({
    listingAutoComplete: builder.query({
      query: term => `?term=${term}`,
    }),
  }),
});

export const {useListingAutoCompleteQuery} = searchApi;
