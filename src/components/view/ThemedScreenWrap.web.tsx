import type { FC } from 'react';
import { useWindowDimensionsHeight } from '../../hooks/style';
import { useThemedScreenWrap } from '../../hooks/view';
import type { ThemedScreenWrapProps } from '../../types/view';
import ThemedView from './ThemedView';

/**
 * A themed screen wrapper component for full-screen layouts on web platforms.
 * Provides a height-constrained container with safe area inset support.
 * Automatically adjusts to window dimensions for consistent web layout.
 * @param props - Component props of type ThemedScreenWrapProps
 * @returns JSX element rendering a full-screen themed container
 * @example
 * <ThemedScreenWrap
 *   insetTop={true}
 *   insetBottom={true}
 * >
 *   <ThemedText>Screen content</ThemedText>
 * </ThemedScreenWrap>
 */
const ThemedScreenWrap: FC<ThemedScreenWrapProps> = ({
  effectSetup,
  effectCleanup,
  effectDependencies,
  style: themedScreenWrapStyle,
  insets,
  insetTop,
  insetBottom,
  insetLeft,
  insetRight,
  insetsPadding,
  insetPaddingTop,
  insetPaddingBottom,
  insetPaddingLeft,
  insetPaddingRight,
  ...props
}) => {
  const height = useWindowDimensionsHeight();
  const style = useThemedScreenWrap({
    effectSetup,
    effectCleanup,
    effectDependencies,
    style: themedScreenWrapStyle,
    insets,
    insetTop,
    insetBottom,
    insetLeft,
    insetRight,
    insetsPadding,
    insetPaddingTop,
    insetPaddingBottom,
    insetPaddingLeft,
    insetPaddingRight,
  });

  return <ThemedView height={height} style={style} {...props} />;
};

export default ThemedScreenWrap;
