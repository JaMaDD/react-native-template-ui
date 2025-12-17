import type {
  SliderThumbSize,
  SliderTrackSize,
  SliderValueDisplayMode,
} from '../utils/slider/const';
import type { ThemedTextProps } from './text';
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
  valueTextProps?: Omit<ThemedTextProps, 'children'>;
  valueDescription?: string;
  valueDescriptionTextProps?: Omit<ThemedTextProps, 'children'>;
  wrapProps?: ThemedViewProps;
};

export type ThemedSliderStepIndicatorProps = ThemedViewProps;
