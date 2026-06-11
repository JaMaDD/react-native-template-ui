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

export const shadowDefaultOffset = 5;

export const shadowDefaultBlurRadius = 10;

/** @internal */
export const elementDefaultBoundingClientRect: Omit<DOMRect, 'toJSON'> = {
  width: 0,
  height: 0,
  x: 0,
  y: 0,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};

/** @internal */
export const elementDefaultDOMRect: DOMRect = {
  ...elementDefaultBoundingClientRect,
  toJSON: () => elementDefaultBoundingClientRect,
};

/** @internal */
export enum ElementScreenPosition {
  Upper = 'upper',
  Lower = 'lower',
}
