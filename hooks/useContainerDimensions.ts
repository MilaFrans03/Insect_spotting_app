import { useState, useCallback } from 'react';
import { LayoutChangeEvent } from 'react-native';

export function useContainerDimensions() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  }, []);

  return { ...dimensions, onLayout };
}
