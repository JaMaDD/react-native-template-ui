import { use as reactUse } from 'react';
import { getWindowDimensionsHeight } from '../style/func';
import {
  ActionSheetContext,
  ActionSheetExpandableHeightRatio,
  actionSheetMaxHeightRatio,
  AlertContext,
} from './const';

export function getAlertContext() {
  return reactUse(AlertContext);
}

function getActionSheetExpandableHeightByRatio(
  ratio: ActionSheetExpandableHeightRatio
) {
  return getWindowDimensionsHeight() * ratio;
}

export function getActionSheetMaxHeight(expandable: boolean = false) {
  return expandable
    ? getActionSheetExpandableHeightByRatio(
        ActionSheetExpandableHeightRatio.Top
      )
    : getWindowDimensionsHeight() * actionSheetMaxHeightRatio;
}

export function getActionSheetHeight(height: number) {
  return Math.min(height, getActionSheetMaxHeight());
}

export function getActionSheetExpandableHeight() {
  return getActionSheetMaxHeight(true);
}

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

export function getActionSheetSnapHeight(
  height: number,
  currentHeight: number,
  forceDismiss: boolean
) {
  return forceDismiss || getActionSheetDismiss(height, currentHeight)
    ? height
    : 0;
}

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

export function getActionSheetContext() {
  return reactUse(ActionSheetContext);
}
