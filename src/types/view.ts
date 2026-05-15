import type { BoxProps } from '@shopify/restyle';
import type {
  ComponentProps,
  DependencyList,
  ReactNode,
  RefObject,
} from 'react';
import type {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollViewProps as RNScrollViewProps,
  ScrollView,
  View,
  ViewProps,
} from 'react-native';
import type { AnimatedRef } from 'react-native-reanimated';
import type AnimatedView from '../components/view/AnimatedView';
import type { InsetsStyleConfig } from './style';
import type { Theme } from './theme';

/**
 * RefObject for a React Native View component.
 *
 * Used to store and access view references in React components.
 */
export type ViewRefObj = RefObject<View | null>;

/**
 * RefObject for a React Native ScrollView component.
 *
 * Used to store and access scroll view references for programmatic scrolling.
 */
export type ScrollViewRefObj = RefObject<ScrollView | null>;

/**
 * Animated RefObject for a ScrollView component.
 *
 * Used with Reanimated for animated scroll operations and gesture handling.
 */
export type ScrollViewAnimatedRefObj = AnimatedRef<ScrollView>;

/**
 * Callback handler for scroll events.
 *
 * Invoked when a ScrollView is scrolled, providing scroll position and metrics.
 *
 * @example
 * ```tsx
 * const handleScroll: OnScroll = (event) => {
 *   const offsetY = event.nativeEvent.contentOffset.y;
 *   console.log(`Scrolled to: ${offsetY}`);
 * };
 * ```
 */
export type OnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => void;

/**
 * Callback handler for content size changes.
 *
 * Invoked when a ScrollView's content dimensions change.
 *
 * @example
 * ```tsx
 * const handleContentSizeChange: OnContentSizeChange = (width, height) => {
 *   console.log(`Content size: ${width}x${height}`);
 * };
 * ```
 */
export type OnContentSizeChange = (width: number, height: number) => void;

/**
 * Props for themed view component.
 *
 * Combines React Native ViewProps with Restyle theme-based styling capabilities.
 * The foundation for most container components in the library.
 *
 * @example
 * ```tsx
 * <ThemedView
 *   padding="md"
 *   backgroundColor="surface"
 *   borderRadius="lg"
 * >
 *   <Text>Content</Text>
 * </ThemedView>
 * ```
 */
export type ThemedViewProps = ViewProps &
  BoxProps<Theme> & {
    /** Reference to the underlying View component */
    ref?: ViewRefObj;
  };

/**
 * Props for the AnimatedView component.
 *
 * Inferred from the AnimatedView component implementation for Reanimated support.
 */
export type AnimatedViewProps = ComponentProps<typeof AnimatedView>;

/**
 * Themed view with Reanimated animation support.
 *
 * Merges themed view capabilities with Reanimated animations for complex interactions.
 *
 * @example
 * ```tsx
 * <AnimatedThemedView
 *   padding="md"
 *   animatedStyle={animatedStyles}
 *   entering={FadeIn}
 * >
 *   <Text>Animated Content</Text>
 * </AnimatedThemedView>
 * ```
 */
export type AnimatedThemedViewProps = Omit<ThemedViewProps, 'ref'> &
  Omit<AnimatedViewProps, 'key' | 'style'> & {
    /** Animated style object for Reanimated animations */
    animatedStyle?: AnimatedViewProps['style'];
  };

/**
 * Props for themed screen wrapper component.
 *
 * Extends themed view with safe area inset support and lifecycle hooks.
 * Typically used as the root container for screen components.
 *
 * @example
 * ```tsx
 * <ThemedScreenWrap
 *   insets
 *   insetsPadding="md"
 *   effectSetup={setupAnalytics}
 *   effectCleanup={cleanupAnalytics}
 * >
 *   <ScreenContent />
 * </ThemedScreenWrap>
 * ```
 */
export type ThemedScreenWrapProps = ThemedViewProps &
  InsetsStyleConfig & {
    /** Setup function called in useEffect on mount */
    effectSetup?: () => void;
    /** Cleanup function called in useEffect on unmount */
    effectCleanup?: () => void;
    /** Dependency array for the effect (like useEffect deps) */
    effectDependencies?: DependencyList;
  };

/**
 * Props for ScrollView component with inset support.
 *
 * Extends React Native ScrollViewProps with safe area inset configuration.
 */
export type ScrollViewProps = RNScrollViewProps &
  InsetsStyleConfig & {
    /** Reference to the ScrollView component */
    ref?: ScrollViewRefObj;
  };

/**
 * Themed ScrollView component props.
 *
 * Combines ScrollView functionality with theme-based styling capabilities.
 *
 * @example
 * ```tsx
 * <ThemedScrollView
 *   padding="md"
 *   insets
 *   showsVerticalScrollIndicator={false}
 * >
 *   <Content />
 * </ThemedScrollView>
 * ```
 */
export type ThemedScrollViewProps = ScrollViewProps &
  Omit<ThemedViewProps, 'ref'>;

/**
 * Props with required children.
 *
 * Utility type that ensures children prop is non-nullable.
 * Useful for components that must have children content.
 *
 * @example
 * ```tsx
 * type ButtonProps = PropsWithRequiredChildren<{
 *   onPress: () => void;
 * }>;
 * ```
 */
export type PropsWithRequiredChildren<P = unknown> = P & {
  /** Required non-null children */
  children: NonNullable<ReactNode>;
};
