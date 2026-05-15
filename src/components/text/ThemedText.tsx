import type { FC } from 'react';
import type { ThemedTextProps } from '../../types/text';
import Text from './Text';

/**
 * A themed text component that renders text with theme-aware styling.
 * Provides access to predefined text variants, font sizes, colors, and other typography properties.
 * Serves as the base for all text rendering with automatic theme integration.
 * @param props - Component props of type ThemedTextProps
 * @returns JSX element rendering themed text
 * @example
 * <ThemedText
 *   variant="textMBold"
 *   color="themePri"
 * >
 *   Hello World
 * </ThemedText>
 */
const ThemedText: FC<ThemedTextProps> = (props) => <Text {...props} />;

export default ThemedText;
