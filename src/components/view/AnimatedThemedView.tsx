import type { FC } from 'react';
import { useAnimatedThemedView } from '../../hooks/view';
import type { AnimatedThemedViewProps } from '../../types/view';
import AnimatedView from './AnimatedView';

/**
 * A themed animated view component that combines theme-aware styling with animations.
 * Applies theme colors, spacing, and layout properties while supporting animated styles.
 * Ideal for views that need to animate position, size, opacity, or transform properties.
 * @param props - Component props of type AnimatedThemedViewProps
 * @returns JSX element rendering an animated themed view
 * @example
 * <AnimatedThemedView
 *   backgroundColor="background"
 *   padding="m"
 *   animatedStyle={{ opacity: fadeAnim }}
 * >
 *   <ThemedText>Animated content</ThemedText>
 * </AnimatedThemedView>
 */
const AnimatedThemedView: FC<AnimatedThemedViewProps> = ({
  backgroundColor = 'background',
  ...props
}) => {
  const animatedThemedViewProps = useAnimatedThemedView({
    backgroundColor,
    ...props,
  });

  return <AnimatedView {...animatedThemedViewProps} />;
};

export default AnimatedThemedView;
