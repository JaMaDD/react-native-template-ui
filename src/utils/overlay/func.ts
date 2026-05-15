import { use as reactUse } from 'react';
import { getWindowDimensionsHeight } from '../style/func';
import {
  ActionSheetContext,
  ActionSheetExpandableHeightRatio,
  actionSheetMaxHeightRatio,
  AlertContext,
} from './const';

/**
 * Hook to access the Alert context.
 * Provides access to alert state and control functions.
 *
 * @returns The alert context value
 *
 * @example
 * ```tsx
 * const alertContext = getAlertContext();
 * ```
 */
export function getAlertContext() {
  return reactUse(AlertContext);
}

function getActionSheetExpandableHeightByRatio(
  ratio: ActionSheetExpandableHeightRatio
) {
  return getWindowDimensionsHeight() * ratio;
}

/**
 * Calculates the maximum height for an action sheet.
 *
 * @param expandable - Whether the action sheet is expandable (supports multiple height positions)
 * @returns The maximum height in pixels
 *
 * @example
 * ```tsx
 * const maxHeight = getActionSheetMaxHeight(true);
 * ```
 */
export function getActionSheetMaxHeight(expandable: boolean = false) {
  return expandable
    ? getActionSheetExpandableHeightByRatio(
        ActionSheetExpandableHeightRatio.Top
      )
    : getWindowDimensionsHeight() * actionSheetMaxHeightRatio;
}

/**
 * Constrains an action sheet height to not exceed the maximum allowed height.
 *
 * @param height - The desired height in pixels
 * @returns The constrained height in pixels, capped at maximum
 *
 * @example
 * ```tsx
 * const constrainedHeight = getActionSheetHeight(800);
 * ```
 */
export function getActionSheetHeight(height: number) {
  return Math.min(height, getActionSheetMaxHeight());
}

/**
 * Gets the maximum height for an expandable action sheet.
 *
 * @returns The maximum expandable height in pixels (90% of screen height)
 *
 * @example
 * ```tsx
 * const expandableHeight = getActionSheetExpandableHeight();
 * ```
 */
export function getActionSheetExpandableHeight() {
  return getActionSheetMaxHeight(true);
}

/**
 * Gets the initial height for an expandable action sheet when first shown.
 *
 * @returns The initial height in pixels (60% of screen height)
 *
 * @example
 * ```tsx
 * const initialHeight = getActionSheetExpandableInitHeight();
 * ```
 */
export function getActionSheetExpandableInitHeight() {
  return getActionSheetExpandableHeightByRatio(
    ActionSheetExpandableHeightRatio.Middle
  );
}

function getActionSheetDismiss(height: number, currentHeight: number) {
  return height / 2 < currentHeight;
}

function getActionSheetExpandableDismiss(currentHight: number) {
  return (
    currentHight <
    getActionSheetExpandableHeightByRatio(
      ActionSheetExpandableHeightRatio.Bottom
    ) /
      2
  );
}

/**
 * Calculates the snap height for a non-expandable action sheet after user drag gesture ends.
 * Determines whether the sheet should dismiss or snap back to its original height.
 *
 * @param height - The original height of the action sheet in pixels
 * @param currentHeight - The current height after user drag in pixels
 * @param forceDismiss - Whether to force dismissal regardless of current height
 * @returns The target snap height - either the original height (dismissed) or 0 (visible)
 *
 * @example
 * ```tsx
 * const snapHeight = getActionSheetSnapHeight(400, 200, false);
 * // Returns 400 to dismiss if dragged past threshold
 * ```
 */
export function getActionSheetSnapHeight(
  height: number,
  currentHeight: number,
  forceDismiss: boolean
) {
  return forceDismiss || getActionSheetDismiss(height, currentHeight)
    ? height
    : 0;
}

/**
 * Calculates the snap height for an expandable action sheet after user drag gesture ends.
 * Determines which height position (top/middle/bottom) the sheet should snap to, or if it should dismiss.
 *
 * @param currentHight - The current height after user drag in pixels
 * @param forceDismiss - Whether to force dismissal regardless of current height
 * @returns The target snap height - 0 for dismissed, or one of the defined snap positions (90%/60%/30% of screen)
 *
 * @example
 * ```tsx
 * const snapHeight = getActionSheetExpandableSnapHeight(500, false);
 * // Returns closest snap position based on current height
 * ```
 */
export function getActionSheetExpandableSnapHeight(
  currentHight: number,
  forceDismiss: boolean
) {
  if (forceDismiss || getActionSheetExpandableDismiss(currentHight)) {
    return 0;
  }

  const height = getWindowDimensionsHeight();
  const topHeight = getActionSheetExpandableHeightByRatio(
    ActionSheetExpandableHeightRatio.Top
  );
  const middleHeight = getActionSheetExpandableHeightByRatio(
    ActionSheetExpandableHeightRatio.Middle
  );
  const bottomHeight = getActionSheetExpandableHeightByRatio(
    ActionSheetExpandableHeightRatio.Bottom
  );
  if (currentHight > middleHeight) {
    return currentHight >
      (height *
        (ActionSheetExpandableHeightRatio.Top +
          ActionSheetExpandableHeightRatio.Middle)) /
        2
      ? topHeight
      : middleHeight;
  } else if (currentHight > bottomHeight) {
    return currentHight >
      (height *
        (ActionSheetExpandableHeightRatio.Middle +
          ActionSheetExpandableHeightRatio.Bottom)) /
        2
      ? middleHeight
      : bottomHeight;
  } else {
    return bottomHeight;
  }
}

/**
 * Hook to access the ActionSheet context.
 * Provides access to action sheet state and control functions.
 *
 * @returns The action sheet context value
 *
 * @example
 * ```tsx
 * const actionSheetContext = getActionSheetContext();
 * ```
 */
export function getActionSheetContext() {
  return reactUse(ActionSheetContext);
}
