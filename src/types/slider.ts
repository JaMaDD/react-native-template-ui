import type {
  SliderCurrentValueDisplayMode,
  SliderThumbSize,
  SliderTrackSize,
} from '../utils/slider/const';
import type { CustomThemedTextProps } from './text';
import type { ThemeColors } from './theme';
import type { AnimatedThemedViewProps, ThemedViewProps } from './view';

/** @internal */
export type NumSlider = {
  range: [number, number];
  steps: number;
  currentValue?: number;
};

/** @internal */
export type StrSlider = {
  range: string[];
  steps?: never;
  currentValue?: string;
};

export type ThemedSliderProps = (NumSlider | StrSlider) &
  Omit<CustomThemedTextProps, 'text'> & {
    currentValueDisplayMode?: SliderCurrentValueDisplayMode;
    trackSize?: SliderTrackSize | number;
    trackActiveColor?: ThemeColors;
    trackActiveProps?: ThemedViewProps;
    trackInactiveColor?: ThemeColors;
    trackInactiveProps?: AnimatedThemedViewProps;
    thumbSize?: SliderThumbSize | number;
    thumbColor?: ThemeColors;
    thumbProps?: AnimatedThemedViewProps;
    wrapProps?: ThemedViewProps;
  };
