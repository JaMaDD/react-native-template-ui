import { BorderSize } from '../theme/const';

export enum SliderValueDisplayMode {
  None = 'none',
  Top = 'top',
  Bottom = 'bottom',
}

export enum SliderTrackSize {
  S = 8,
  M = 10,
  L = 12,
}

export enum SliderThumbSize {
  S = 20,
  M = 24,
  L = 28,
}

export const sliderThumbDefaultSize = SliderThumbSize.M;

export const sliderStepIndicatorDefaultWidth = BorderSize.M;
