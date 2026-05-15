import { type FC } from 'react';
import { Pressable } from 'react-native';
import { useThemedPressable } from '../../hooks/button';
import type { ThemedPressableProps } from '../../types/button';

/**
 * A themed pressable component that applies theme-aware styling to React Native's Pressable.
 * Serves as the foundation for all button components, providing consistent theming and press behavior.
 * Automatically applies theme colors, spacing, and press feedback through the theme system.
 * @param props - Component props of type ThemedPressableProps
 * @returns JSX element rendering a themed pressable
 * @example
 * <ThemedPressable
 *   onPress={() => console.log('pressed')}
 *   padding="m"
 *   backgroundColor="themePri"
 * >
 *   <ThemedText>Custom Button</ThemedText>
 * </ThemedPressable>
 */
const ThemedPressable: FC<ThemedPressableProps> = (props) => {
  const themedPressableProps = useThemedPressable(props);

  return <Pressable {...themedPressableProps} />;
};

export default ThemedPressable;
