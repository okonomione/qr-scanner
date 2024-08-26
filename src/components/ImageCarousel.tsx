import React from 'react';
import {StyleSheet, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {ItemComponentImage} from './ItemComponentImage';
import {Dimensions} from 'react-native';

export function ImageCarousel(props: {images: string[]; style?: any}) {
  const w = Dimensions.get('window');

  const style = StyleSheet.create({
    container: {
      ...props.style,
      flex: 1,
    },
    carousel: {
      width: w.width,
    },
    item: {
      flex: 1,
      borderWidth: 1,
      justifyContent: 'center',
    },
    itemImage: {
      height: '100%',
    },
  });

  return (
    <View style={style.container}>
      <Carousel
        style={style.carousel}
        loop
        width={w.width}
        data={props.images ?? []}
        scrollAnimationDuration={1000}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        // onSnapToItem={index => console.log('snapped to', index)}
        renderItem={({index}) => {
          return (
            <View style={style.itemImage}>
              <ItemComponentImage
                path={props.images[index]}
                style={style.itemImage}
              />
            </View>
          );
        }}
      />
    </View>
  );
}
