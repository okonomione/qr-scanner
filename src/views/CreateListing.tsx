import React from 'react';
import {PlaceAdView} from './AppView';

import {RainbowButton} from '../components/RainbowButtonComponent';

export function CreateListing(prop: {navigation: any}) {
  return (
    <PlaceAdView>
      <RainbowButton
        text="Single Card"
        onPress={() => {
          console.log('Create Listing');
          prop.navigation.navigate('Single Listing');
        }}
      />
      <RainbowButton
        text="Mixed Bundle"
        onPress={() => {
          console.log('Create Listing');
          prop.navigation.navigate('Mixed Singles');
        }}
      />
      <RainbowButton
        text="Sealed Single"
        onPress={() => {
          console.log('Create Listing');
          prop.navigation.navigate('Sealed Singles');
        }}
      />
    </PlaceAdView>
  );
}
