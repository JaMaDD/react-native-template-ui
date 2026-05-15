import type { SharedValue } from 'react-native-reanimated';
import type {
  SliderThumbSize,
  SliderTrackSize,
  SliderValueDisplayMode,
} from '../utils/slider/const';
import type { SetState } from './react';
import type { ThemedTextProps } from './text';
import type { ThemeColors } from './theme';
import type { AnimatedThemedViewProps, ThemedViewProps } from './view';

/**
 * Configuration for a numeric range slider.
 *
 * Defines a slider that operates on numeric values within a specified range and step count.
 *
 * @example
 * ```tsx
 * const config: NumberSlider = {
 *   range: [0, 100],
 *   steps: 10,
 *   defaultValue: 50
 * };
 * ```
 */
export type NumberSlider = {
  /** Minimum and maximum values [min, max] */
  range: [number, number];
  /** Number of discrete steps between min and max */
  steps: number;
  /** Initial value for the slider */
  defaultValue?: number;
  stepIndicator?: never;
  stepIndicatorProps?: never;
};

/**
 * Configuration for a string-based slider.
 *
 * Defines a slider that operates on predefined string values (e.g., sizes: 'small', 'medium', 'large').
 * Optionally displays step indicators for each value.
 *
 * @example
 * ```tsx
 * const config: StringSlider = {
 *   range: ['XS', 'S', 'M', 'L', 'XL'],
 *   defaultValue: 'M',
 *   stepIndicator: true
 * };
 * ```
 */
export type StringSlider = {
  /** Array of string values to select from */
  range: string[];
  steps?: never;
  /** Initial selected string value */
  defaultValue?: string;
  /** Whether to display visual indicators for each step */
  stepIndicator?: boolean;
  /** Props for customizing step indicator appearance */
  stepIndicatorProps?: ThemedSliderStepIndicatorProps;
};

/**
 * Internal slider component props.
 *
 * Core slider functionality with state management through shared values.
 * Used internally by ThemedSlider component.
 */
export type SliderProps = (NumberSlider | StringSlider) & {
  /** Whether to animate when snapping to steps */
  snapToStepAnimated?: boolean;
  /** Callback invoked when the slider value changes */
  onValueChange: (value: number | string) => void;
  /** Props for the slider container wrapper */
  sliderWrapProps?: ThemedViewProps;
  /** Height/thickness of the slider track */
  trackSize?: SliderTrackSize | number;
  /** Color for the active (filled) portion of the track */
  trackActiveColor?: ThemeColors;
  /** Props for the active track portion */
  trackActiveProps?: ThemedViewProps;
  /** Color for the inactive (unfilled) portion of the track */
  trackInactiveColor?: ThemeColors;
  /** Props for the inactive track portion */
  trackInactiveProps?: AnimatedThemedViewProps;
  /** Size of the draggable thumb/handle */
  thumbSize?: SliderThumbSize | number;
  /** Color of the thumb/handle */
  thumbColor?: ThemeColors;
  /** Props for the thumb component */
  thumbProps?: AnimatedThemedViewProps;
  /** How to display the current value (e.g., 'none', 'above', 'inline') */
  valueDisplayMode?: SliderValueDisplayMode;
  /** Props for the value display container */
  valueDisplayWrapProps?: ThemedViewProps;
  /** Props for the value text */
  valueTextProps?: Omit<ThemedTextProps, 'children'>;
  /** Optional description text shown with the value */
  valueDescription?: string;
  /** Props for the value description text */
  valueDescriptionTextProps?: Omit<ThemedTextProps, 'children'>;
  /** Duration in ms to activate gesture handling */
  gestureActivateDuration?: number;
  /** State setter for the selected value */
  setSelectedVal: SetState<number | string | undefined>;
  /** Shared value for the selected value (used in Reanimated) */
  selectedValSharedVal: SharedValue<number | string | undefined>;
};

/**
 * Props for themed slider component.
 *
 * Public API for the slider component, supports both numeric and string-based ranges.
 * Provides extensive customization options for appearance and behavior.
 *
 * @example
 * ```tsx
 * <ThemedSlider
 *   range={[0, 100]}
 *   steps={20}
 *   defaultValue={50}
 *   onValueChange={(value) => console.log(value)}
 *   trackActiveColor="primary"
 *   thumbSize="lg"
 *   valueDisplayMode="above"
 * />
 * ```
 */
export type ThemedSliderProps = Omit<
  SliderProps,
  'setSelectedVal' | 'selectedValSharedVal'
> & {
  /** Whether to animate when snapping to steps */
  snapToStepAnimated?: boolean;
  /** Callback invoked when the slider value changes */
  onValueChange: (value: number | string) => void;
  /** Props for the outer container wrapper */
  wrapProps?: ThemedViewProps;
};

/**
 * Props for slider step indicators.
 *
 * Customizes the visual markers displayed for each step in a string slider.
 */
export type ThemedSliderStepIndicatorProps = ThemedViewProps;
