import type {
  SliderThumbSize,
  SliderTrackSize,
  SliderValueDisplayMode,
} from '../utils/slider/const';
import type { CustomThemedTextProps } from './text';
import type { ThemeColors } from './theme';
import type { AnimatedThemedViewProps, ThemedViewProps } from './view';

export type NumberSlider = {
  range: [number, number];
  steps: number;
  defaultValue?: number;
  stepIndicator?: never;
  stepIndicatorProps?: never;
};

export type StringSlider = {
  range: string[];
  steps?: never;
  defaultValue?: string;
  stepIndicator?: boolean;
  stepIndicatorProps?: ThemedSliderStepIndicatorProps;
};

export type ThemedSliderProps = (NumberSlider | StringSlider) & {
  snapToStepAnimated?: boolean;
  onValueChange: (value: number | string) => void;
  trackSize?: SliderTrackSize | number;
  trackActiveColor?: ThemeColors;
  trackActiveProps?: ThemedViewProps;
  trackInactiveColor?: ThemeColors;
  trackInactiveProps?: AnimatedThemedViewProps;
  thumbSize?: SliderThumbSize | number;
  thumbColor?: ThemeColors;
  thumbProps?: AnimatedThemedViewProps;
  valueDisplayMode?: SliderValueDisplayMode;
  valueDisplayWrapProps?: ThemedViewProps;
  valueTextProps?: Omit<CustomThemedTextProps, 'text'>;
  valueDescription?: string;
  valueDescriptionTextProps?: Omit<CustomThemedTextProps, 'text'>;
  wrapProps?: ThemedViewProps;
};

export type ThemedSliderStepIndicatorProps = ThemedViewProps;
