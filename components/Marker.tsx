import React from 'react';
import { View } from 'react-native';

type MarkerProps = {
  thickness?: number;
  color?: string;
  vertical?: boolean;
  margin?: number;
  length?: number | string;
};

export function Marker({
  thickness = 45,
  color = '#89EB7E',
  vertical = false,
  margin = 0,
  length = '50%',
}: MarkerProps) {
  return (
    <View
      style={{
        position: 'absolute',
        backgroundColor: color,
        top:20,
        ...(vertical
          ? {
              width: thickness,
              height: length,
              marginHorizontal: margin,
            }
          : {
              height: thickness,
              width: length,
              marginVertical: margin,
            }),
      }}
    />
  );
}
