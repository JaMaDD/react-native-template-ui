import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { useInsetsStyle, useWindowDimensionsHeight } from '../../hooks/style';
import type { ThemedScreenWrapProps } from '../../types/view';
import { composeStyles } from '../../utils/style/func';
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
  const insetsStyle = useInsetsStyle({
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

  const style = composeStyles<ViewStyle>(themedScreenWrapStyle, insetsStyle);

  return <ThemedView height={height} style={style} {...props} />;
};

export default ThemedScreenWrap;
