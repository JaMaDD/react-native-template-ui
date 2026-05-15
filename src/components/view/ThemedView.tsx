import type { FC } from 'react';
import type { ThemedViewProps } from '../../types/view';
import Box from './Box';

/**
 * A themed view component that provides theme-aware container styling.
 * Serves as the foundation for layout and composition with automatic theme integration.
 * Supports all standard view props plus theme-based colors, spacing, and layout properties.
 * @param props - Component props of type ThemedViewProps
 * @returns JSX element rendering a themed view container
 * @example
 * <ThemedView
 *   backgroundColor="background"
 *   padding="l"
 *   flexDirection="row"
 * >
 *   <ThemedText>Content</ThemedText>
 * </ThemedView>
 */
const ThemedView: FC<ThemedViewProps> = ({
  backgroundColor = 'background',
  ...props
}) => {
  return (
    <Box
      backgroundColor={backgroundColor}
      accessible={true}
      role={'group'}
      {...props}
    />
  );
};

export default ThemedView;
