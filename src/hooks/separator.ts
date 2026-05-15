import { createElement, type FC } from 'react';
import type { ThemedSeparatorProps } from '../types/separator';
import type { ThemeColors } from '../types/theme';
import { BorderSize } from '../utils/theme/const';

/** @internal */
let ThemedSeparator: FC<ThemedSeparatorProps> | undefined;

/**
 * Hook to create a themed separator element with customizable appearance.
 * @param size - The thickness of the separator (default: BorderSize.S)
 * @param vertical - Whether the separator is vertical (default: false)
 * @param backgroundColor - The background color from theme colors (default: 'separator')
 * @param style - Additional style properties to apply
 * @returns A React element representing the separator
 * @example
 * const separator = useThemedSeparator(
 *   BorderSize.M,
 *   false,
 *   'themePri',
 *   { marginVertical: 'm' }
 * );
 * // Use in JSX: {separator}
 */
export function useThemedSeparator(
  size = BorderSize.S,
  vertical = false,
  backgroundColor: ThemeColors = 'separator',
  style: Omit<
    ThemedSeparatorProps,
    'size' | 'vertical' | 'backgroundColor' | 'bg'
  > = {}
) {
  const props: ThemedSeparatorProps = {
    size,
    vertical,
    backgroundColor,
    ...style,
  };
  ThemedSeparator ??=
    require('../components/separator/ThemedSeparator').default;
  const element = createElement(ThemedSeparator!, props);

  return element;
}
