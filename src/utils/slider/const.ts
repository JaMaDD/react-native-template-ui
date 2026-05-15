import { BorderSize } from '../theme/const';

/**
 * Display modes for showing the current slider value.
 * Controls whether and where the value label is displayed.
 *
 * @example
 * ```tsx
 * <Slider
 *   valueDisplayMode={SliderValueDisplayMode.Top}
 *   value={50}
 * />
 * ```
 */
export enum SliderValueDisplayMode {
  /** No value display */
  None = 'none',
  /** Display value above the slider */
  Top = 'top',
  /** Display value below the slider */
  Bottom = 'bottom',
}

/**
 * Size options for the slider track (the rail along which the thumb moves).
 * Values are in pixels representing the track height.
 *
 * @example
 * ```tsx
 * <Slider trackSize={SliderTrackSize.L} />
 * ```
 */
export enum SliderTrackSize {
  /** Small track - 8px height */
  S = 8,
  /** Medium track - 10px height */
  M = 10,
  /** Large track - 12px height */
  L = 12,
}

/**
 * Size options for the slider thumb (the draggable knob).
 * Values are in pixels representing the thumb diameter.
 *
 * @example
 * ```tsx
 * <Slider thumbSize={SliderThumbSize.L} />
 * ```
 */
export enum SliderThumbSize {
  /** Small thumb - 20px diameter */
  S = 20,
  /** Medium thumb - 24px diameter */
  M = 24,
  /** Large thumb - 28px diameter */
  L = 28,
}

/**
 * Default thumb size used when no size is specified.
 * Set to medium (24px).
 */
export const sliderThumbDefaultSize = SliderThumbSize.M;

/**
 * Default width for slider step indicators.
 * Uses medium border size from theme constants.
 */
export const sliderStepIndicatorDefaultWidth = BorderSize.M;
