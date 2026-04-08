import { useRestyle } from '@shopify/restyle';
import { useRef } from 'react';
import type { View } from 'react-native';
import type { AnimatedThemedViewProps, AnimatedViewProps } from '../types/view';
import { animatedThemedViewRestyleFuncs } from '../utils/theme/restyle';

export function useViewRef() {
  return useRef<View>(null);
}

export function useAnimatedThemedView({
  animatedStyle,
  ...props
}: AnimatedThemedViewProps) {
  const { style, ...restyle } = useRestyle(
    animatedThemedViewRestyleFuncs,
    props
  );

  const animatedThemedViewProps: AnimatedViewProps = {
    ...restyle,
    style: [style, animatedStyle],
    accessible: true,
    role: 'group',
  };

  return animatedThemedViewProps;
}
