import React from 'react';
import {TextInput} from 'react-native';

export function TextField(props: {
  value?: string;
  onChangeText?: (text: string) => void;
}) {
  return <TextInput value={props.value} onChangeText={props.onChangeText} />;
}
