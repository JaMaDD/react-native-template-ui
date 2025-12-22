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

export type SliderProps = (NumberSlider | StringSlider) & {
  snapToStepAnimated?: boolean;
  onValueChange: (value: number | string) => void;
  sliderWrapProps?: ThemedViewProps;
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
  gestureActivateDuration?: number;
  setSelectedVal: SetState<number | string | undefined>;
  selectedValSharedVal: SharedValue<number | string | undefined>;
};

export type ThemedSliderProps = Omit<
  SliderProps,
  'setSelectedVal' | 'selectedValSharedVal'
> & {
  snapToStepAnimated?: boolean;
  onValueChange: (value: number | string) => void;
  wrapProps?: ThemedViewProps;
};

export type ThemedSliderStepIndicatorProps = ThemedViewProps;
