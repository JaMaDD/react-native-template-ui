import type { SharedValue } from 'react-native-reanimated';

export type AnimationValue = 0 | 1;

export type AnimationSharedValue = SharedValue<AnimationValue>;

export type CustomAnimation<T = AnimationValue> = (
  sharedValue: AnimationSharedValue,
  toValue: T,
  animationCompletedCallback?: () => void
) => void;
