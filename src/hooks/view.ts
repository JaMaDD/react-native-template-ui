import { useRef } from 'react';
import type { View } from 'react-native';

export function useViewRef() {
  return useRef<View>(null);
}
