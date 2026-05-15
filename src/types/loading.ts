import type { ActivityIndicatorProps } from 'react-native';
import type { ThemeBaseProps, ThemeColorProps } from './theme';

/**
 * Props for the loading/activity indicator component.
 *
 * Extends React Native's ActivityIndicator with theme-aware color support.
 */
export type LoadingProps = Omit<ActivityIndicatorProps, 'color'> & {
  /** Color from theme colors palette for the loading indicator */
  color?: ThemeColorProps['color'];
};

/**
 * Themed loading indicator component props.
 *
 * Combines loading indicator with theme-based spacing, layout, and positioning.
 *
 * @example
 * ```tsx
 * <ThemedLoading
 *   size="large"
 *   color="primary"
 *   padding="md"
 * />
 * ```
 */
export type ThemedLoadingProps = LoadingProps & ThemeBaseProps;

/**
 * Customizable themed loading props with prefixed property names.
 *
 * Useful when embedding loading indicators within other components.
 * All loading-related props are prefixed with 'loading' for clarity.
 *
 * @example
 * ```tsx
 * <Button
 *   loadingSize="small"
 *   loadingColor="white"
 *   loadingProps={{ animating: true }}
 * />
 * ```
 */
export type CustomThemedLoadingProps = {
  /** Size of the loading indicator ('small' or 'large') */
  loadingSize?: ThemedLoadingProps['size'];
  /** Color from theme colors for the loading indicator */
  loadingColor?: ThemedLoadingProps['color'];
  /** Additional loading indicator props (excluding size and color) */
  loadingProps?: Omit<ThemedLoadingProps, 'size' | 'color'>;
};
