import { useSharedValue } from 'react-native-reanimated';
import type { AnimationValue } from '../types/reanimated';

export function useAnimationSharedVal() {
  return useSharedValue<AnimationValue>(0);
}
