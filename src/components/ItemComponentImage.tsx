import React from 'react';
import {Image, Pressable} from 'react-native';
import {config} from '../config/config';

export function ItemComponentImage(props: {
  path: string;
  style: any;
  onPress?: () => void;
}) {
  const url = `${config.assetConfig.imageUrl}/${props.path?.replace(
    'draft',
    'thumbnails',
  )}`;

  return (
    <Pressable onPress={props.onPress}>
      <Image
        loadingIndicatorSource={require('../components/assets/spinner.gif')}
        source={{
          uri: url,
        }}
        style={props.style}
      />
    </Pressable>
  );
}
