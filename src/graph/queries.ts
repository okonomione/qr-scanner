import {gql} from '@apollo/client';

export const pagedListingSearchQuery = {
  query: gql`
    query Listings(
      $type: CardType!
      $searchTerm: String
      $hasSold: Boolean
      $offset: Int
      $isCurrentUser: Boolean
      $userId: String
      $filter: [SolrFilter]
    ) {
      listings(
        type: $type
        searchTerm: $searchTerm
        hasSold: $hasSold
        offset: $offset
        isCurrentUser: $isCurrentUser
        userId: $userId
        filter: $filter
      ) {
        numFound
        start
        listings {
          id
          userId
          cardId
          weaknessType
          resistType
          evolutionStage
          imageSrc
          illustrator
          buyItNowPrice
          series
          set
          releaseDate
          condition
          rarity
          title
          year
          number
          name
          imageList {
            name
            path
          }
          shippingType
          internationalShippingCharge
          domesticShippingCharge
          sellerAvatar
          paymentUserName
          purchaseDate
          searchTags
          listingType
          emailAddress
          country
          ts
        }
      }
    }
  `,
  variables: {
    type: 'POKEMON',
    hasSold: false,
    isCurrentUser: false,
    filter: [],
    offset: 0,
  },
};
