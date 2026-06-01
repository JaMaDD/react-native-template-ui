/**
 * Device screen orientation types.
 * Used for responsive layouts and orientation-specific styling.
 *
 * @example
 * ```tsx
 * const orientation = useOrientation();
 * if (orientation === Orientation.Landscape) {
 *   // Apply landscape-specific layout
 * }
 * ```
 */
export enum Orientation {
  /** Portrait orientation - height is greater than width */
  Portrait = 'portrait',
  /** Landscape orientation - width is greater than height */
  Landscape = 'landscape',
}

export enum ShadowDirection {
  Top = 'top',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right',
  All = 'all',
}
