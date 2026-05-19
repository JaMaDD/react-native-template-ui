import { type FC } from 'react';
import { useThemedScreenWrap } from '../../hooks/view';
import type { ThemedScreenWrapProps } from '../../types/view';
import ThemedView from './ThemedView';

/**
 * A themed screen wrapper component for full-screen layouts with lifecycle hooks.
 * Provides a flex:1 container with safe area inset support and optional setup/cleanup effects.
 * Ideal for wrapping entire screen content with consistent spacing and lifecycle management.
 * @param props - Component props of type ThemedScreenWrapProps
 * @returns JSX element rendering a full-screen themed container
 * @example
 * <ThemedScreenWrap
 *   insetTop={true}
 *   insetBottom={true}
 *   effectSetup={() => console.log('screen mounted')}
 *   effectCleanup={() => console.log('screen unmounted')}
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

  return <ThemedView flex={1} style={style} {...props} />;
};

export default ThemedScreenWrap;
