import { type FC } from 'react';
import type { ThemedSeparatorProps } from '../../types/separator';
import { BorderSize } from '../../utils/theme/const';
import ThemedView from '../view/ThemedView';

/**
 * A themed separator component for creating visual dividers between content sections.
 * Renders as a horizontal or vertical line with customizable thickness and color.
 * Automatically stretches to fill the available space in its parent container.
 * @param props - Component props of type ThemedSeparatorProps
 * @returns JSX element rendering a themed separator line
 * @example
 * <ThemedSeparator
 *   size={BorderSize.S}
 *   backgroundColor="separator"
 * />
 * @example
 * <ThemedSeparator
 *   vertical={true}
 *   size={BorderSize.M}
 *   backgroundColor="border"
 * />
 */
const ThemedSeparator: FC<ThemedSeparatorProps> = ({
  size = BorderSize.S,
  vertical = false,
  backgroundColor = 'separator',
  bg,
  ...props
}) => {
  return (
    <ThemedView
      alignSelf={'stretch'}
      width={vertical ? size : undefined}
      height={vertical ? undefined : size}
      backgroundColor={bg ?? backgroundColor}
      {...props}
    />
  );
};

export default ThemedSeparator;
