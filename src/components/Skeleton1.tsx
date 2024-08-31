import React from 'react';
import {useRef, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Animated, Easing} from 'react-native';

export const LoadingRect = (props: {
  width?: string | number;
  height?: string | number;
  style?: any;
  color?: 'dark' | 'light';
  children?: React.ReactNode;
  isLoading?: boolean;
}) => {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const sharedAnimationConfig = {
      duration: 1000,
      useNativeDriver: true,
    };
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          ...sharedAnimationConfig,
          toValue: 1,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(pulseAnim, {
          ...sharedAnimationConfig,
          toValue: 0,
          easing: Easing.in(Easing.ease),
        }),
      ]),
    ).start();

    return () => {
      // cleanup
      pulseAnim.stopAnimation();
    };
  }, []);

  const opacityAnim = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.05, 0.15],
  });

  const styles = StyleSheet.create({
    LoadingRect: {
      backgroundColor: props.color === 'dark' ? '#000' : '#fff',
      borderRadius: 5,
      padding: 4,
    },
  });

  if (props.isLoading === false && props.isLoading !== undefined) {
    return <>{props.children}</>;
  }

  return (
    (props.isLoading === undefined || props.isLoading) && (
      <Animated.View
        style={{
          width: props.width,
          height: props.height,
          opacity: opacityAnim,
          ...styles.LoadingRect,
          ...props.style,
        }}>
        {props.children}
      </Animated.View>
    )
  );
};
