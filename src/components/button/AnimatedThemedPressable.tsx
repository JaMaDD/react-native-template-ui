import type { FC } from 'react';
import { useAnimatedThemedPressable } from '../../hooks/button';
import type { AnimatedThemedPressableProps } from '../../types/button';
import AnimatedPressable from './AnimatedPressable';

/**
 * A themed animated pressable component that applies theme-aware styling and animations.
 * Combines theme system integration with animated press interactions for smooth visual feedback.
 * @param props - Component props of type AnimatedThemedPressableProps
 * @returns JSX element rendering an animated themed pressable
 * @example
 * <AnimatedThemedPressable
 *   onPress={() => console.log('pressed')}
 *   backgroundColor="themePri"
 *   animatedStyle={{ opacity: 0.8 }}
 * >
 *   <ThemedText>Press Me</ThemedText>
 * </AnimatedThemedPressable>
 */
const AnimatedThemedPressable: FC<AnimatedThemedPressableProps> = (props) => {
  const animatedThemedPressableProps = useAnimatedThemedPressable(props);

  return <AnimatedPressable {...animatedThemedPressableProps} />;
};

export default AnimatedThemedPressable;
