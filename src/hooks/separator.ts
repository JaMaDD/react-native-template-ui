import { createElement, type FC } from 'react';
import type { ThemedSeparatorProps } from '../types/separator';
import type { ThemeColors } from '../types/theme';
import { BorderSize } from '../utils/theme/const';

// @internal
let ThemedSeparator: FC<ThemedSeparatorProps> | undefined;

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
