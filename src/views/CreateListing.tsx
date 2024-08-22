import React from 'react';
import {Text} from 'react-native';
import {PlaceAdView, ProfileView} from './AppView';

export function CreateListing() {
  return (
    <PlaceAdView>
      <Text>Create Listing</Text>
    </PlaceAdView>
  );
}

export function Profile() {
  return (
    <ProfileView>
      <Text>Profile</Text>
    </ProfileView>
  );
}
