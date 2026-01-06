import React from 'react';
import { View } from 'react-native';

type DividerProps = {
  thickness?: number;
  color?: string;
  vertical?: boolean;
  margin?: number;
  length?: number | string;
};

export function Divider({
  thickness = 3,
  color = 'black',
  vertical = false,
  margin = 8,
  length = '100%',
}: DividerProps) {
  return (
    <View
      style={{
        backgroundColor: color,
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
