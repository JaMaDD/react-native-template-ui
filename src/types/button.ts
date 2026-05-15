import type { ComponentProps, PropsWithChildren } from 'react';
import type {
  GestureResponderEvent,
  PressableProps as RNPressableProps,
} from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import type AnimatedPressable from '../components/button/AnimatedPressable';
import type { ButtonScaleRatio, OnPressDelayType } from '../utils/button/const';
import type { CustomThemedIconProps } from './icon';
import type { CustomThemedTextProps, IconTextProps } from './text';
import type { ThemeViewProps } from './theme';
import type { ThemedViewProps, ViewRefObj } from './view';

/**
 * Handler function for pressable components.
 *
 * Can be either a regular function or a Reanimated shared value containing a function.
 * This allows for both standard and animated press handling.
 */
export type PressableOnPress = (
  event: GestureResponderEvent
) => void | SharedValue<(event: GestureResponderEvent) => void>;

/**
 * Configuration for delaying press event execution.
 *
 * Supports debounce or throttle patterns to control press event frequency.
 *
 * @example
 * ```tsx
 * const config = { type: 'debounce', wait: 300 };
 * ```
 */
export type OnPressDelayConfig<T = OnPressDelayType> = {
  /** Type of delay mechanism (e.g., 'debounce' or 'throttle') */
  type: T;
  /** Wait time in milliseconds before executing the press handler */
  wait: number;
};

/**
 * Enhanced pressable component props with required onPress handler.
 *
 * Extends React Native's PressableProps with additional features like scale animations
 * and press delay configuration.
 */
export type PressableProps = Omit<RNPressableProps, 'onPress'> &
  Required<Pick<RNPressableProps, 'onPress'>> & {
    /** Scale ratio for press animation (predefined or custom number) */
    scaleRatio?: ButtonScaleRatio | number;
    /** Configuration for debouncing or throttling press events */
    onPressDelayConfig?: OnPressDelayConfig;
    /** Ref to the underlying View component */
    ref?: ViewRefObj;
  };

/**
 * Pressable component with theme-aware styling capabilities.
 *
 * Combines pressable functionality with theme-based view properties.
 */
export type ThemedPressableProps = PressableProps & ThemeViewProps;

/**
 * Props for the AnimatedPressable component.
 *
 * Inferred from the AnimatedPressable component implementation.
 */
export type AnimatedPressableProps = ComponentProps<typeof AnimatedPressable>;

/**
 * Themed pressable with Reanimated animation support.
 *
 * Merges themed pressable capabilities with Reanimated animations for complex interactions.
 */
export type AnimatedThemedPressableProps = Omit<
  ThemedPressableProps,
  'ref' | 'scaleRatio'
> &
  Omit<AnimatedPressableProps, 'key' | 'style'> & {
    /** Animated style object for Reanimated animations */
    animatedStyle?: AnimatedPressableProps['style'];
  };

/**
 * Base button props without children constraint.
 *
 * Used as a foundation for specialized button types.
 */
type ButtonProps = PropsWithChildren<Omit<ThemedPressableProps, 'children'>>;

/**
 * Themed button component with text content.
 *
 * A button that displays text with theme-aware styling.
 *
 * @example
 * ```tsx
 * <ThemedButton
 *   text="Click Me"
 *   textColor="primary"
 *   onPress={() => console.log('Pressed')}
 * />
 * ```
 */
export type ThemedButtonProps = ButtonProps & CustomThemedTextProps;

/**
 * Themed button component with icon content.
 *
 * A button that displays an icon with theme-aware styling.
 *
 * @example
 * ```tsx
 * <ThemedIconButton
 *   iconName="heart"
 *   iconColor="error"
 *   onPress={() => console.log('Liked')}
 * />
 * ```
 */
export type ThemedIconButtonProps = ButtonProps & CustomThemedIconProps;

/**
 * Themed button component with both icon and text content.
 *
 * A button that displays an icon alongside text, with optional layout control.
 *
 * @example
 * ```tsx
 * <ThemedIconTextButton
 *   iconName="arrow-right"
 *   text="Continue"
 *   flip={false}
 *   onPress={() => console.log('Continue')}
 * />
 * ```
 */
export type ThemedIconTextButtonProps = PropsWithChildren<
  ButtonProps &
    IconTextProps & {
      /** Additional props for the icon-text container wrapper */
      iconTextProps?: ThemedViewProps;
    }
>;
