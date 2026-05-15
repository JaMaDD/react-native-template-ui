import { useRestyle } from '@shopify/restyle';
import type { FC } from 'react';
import { ScrollView } from 'react-native';
import { useInsetsStyle } from '../../hooks/style';
import type { ThemedScrollViewProps } from '../../types/view';
import { composeStyles } from '../../utils/style/func';
import { themedScrollViewRestyleFuncs } from '../../utils/theme/restyle';

/**
 * A themed scroll view component with safe area inset support.
 * Wraps React Native's ScrollView with theme-aware styling and automatic inset handling.
 * Provides smooth scrolling with optional bottom padding for safe areas.
 * @param props - Component props of type ThemedScrollViewProps
 * @returns JSX element rendering a themed scrollable container
 * @example
 * <ThemedScrollView
 *   insetBottom={true}
 *   insetPaddingBottom="m"
 * >
 *   <ThemedView>
 *     <ThemedText>Scrollable content</ThemedText>
 *   </ThemedView>
 * </ThemedScrollView>
 */
const ThemedScrollView: FC<ThemedScrollViewProps> = ({
  insets,
  insetTop,
  insetBottom = true,
  insetLeft,
  insetRight,
  insetsPadding,
  insetPaddingTop,
  insetPaddingBottom = 'm',
  insetPaddingLeft,
  insetPaddingRight,
  ...props
}) => {
  const { contentContainerStyle: restyleContentContainerStyle, ...restyles } =
    useRestyle(themedScrollViewRestyleFuncs, props);
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

  const contentContainerStyle = composeStyles(
    restyleContentContainerStyle,
    insetsStyle
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={__DEV__}
      showsHorizontalScrollIndicator={__DEV__}
      contentContainerStyle={contentContainerStyle}
      accessible={true}
      role={'group'}
      {...restyles}
    />
  );
};

export default ThemedScrollView;
