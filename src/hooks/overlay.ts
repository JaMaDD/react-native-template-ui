import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import type { ScrollView } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import {
  makeMutable,
  useAnimatedRef,
  useScrollOffset,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import type { ListAnimatedRefObj, ListRef } from '../types/list';
import type {
  ActionSheetContextVal,
  ActionSheetListViewProps,
  ActionSheetOpt,
  ActionSheetOptListProps,
  ActionSheetOpts,
  ActionSheetScrollViewProps,
  OverlayDismissActionSheetResult,
  OverlayOnDismiss,
} from '../types/overlay';
import type { ScrollViewAnimatedRefObj } from '../types/view';
import {
  ActionSheetContext,
  actionSheetDismissDuration,
  actionSheetHeaderIconSize,
  actionSheetHeaderPadding,
  actionSheetOpenDuration,
  actionSheetOptListItemPadding,
  actionSheetOptListItemTextVariant,
  actionSheetSnapDuration,
  overlayDismissResultDefaultText,
  OverlayDismissResultType,
} from '../utils/overlay/const';
import {
  getActionSheetContext,
  getActionSheetExpandableHeight,
  getActionSheetExpandableInitHeight,
  getActionSheetExpandableSnapHeight,
  getActionSheetHeight,
  getActionSheetSnapHeight,
} from '../utils/overlay/func';
import { updateSharedValWithTiming } from '../utils/reanimated/func';
import { useInsetsStyle, useWindowDimensionsHeight } from './style';
import { useThemeSpacing, useThemeTextVariants } from './theme';
import { useViewRef } from './view';

/** @internal */
export function useActionSheetContext() {
  return useContext(ActionSheetContext);
}

/** @internal */
function useActionSheet() {
  const windowHeight = useWindowDimensionsHeight();
  const headerViewRef = useViewRef();
  const [height, setHeight] = useState(0);
  const translateYSharedVal = useSharedValue(windowHeight);
  const heightSharedVal = useSharedValue(0);
  const expandableHeightSharedVal = useSharedValue(0);
  const { expandable } = getActionSheetContext();
  useEffect(() => {
    if (height && translateYSharedVal.get() === windowHeight) {
      const tempHeight = expandable
        ? getActionSheetExpandableInitHeight()
        : height;
      heightSharedVal.set(tempHeight);
      expandableHeightSharedVal.set(tempHeight);
      translateYSharedVal.set(height);
      updateSharedValWithTiming(translateYSharedVal, 0, {
        duration: actionSheetOpenDuration,
      });
    }
  }, [height]);

  const updateHeight = (tempHeight: number) => {
    setHeight(
      expandable
        ? getActionSheetExpandableHeight()
        : getActionSheetHeight(tempHeight)
    );
  };

  const actionSheet = {
    headerViewRef,
    height,
    translateYSharedVal,
    heightSharedVal,
    expandableHeightSharedVal,
    updateHeight,
  };

  return actionSheet;
}

/** @internal */
export function useActionSheetOnDismiss(force = true) {
  const windowHeight = useWindowDimensionsHeight();
  const {
    title,
    expandable,
    onDismiss,
    height,
    translateYSharedVal,
    heightSharedVal,
    expandableHeightSharedVal,
  } = useActionSheetContext();
  const actionSheetOnDismiss = (text = overlayDismissResultDefaultText) => {
    if (!onDismiss || !height || !heightSharedVal || !translateYSharedVal) {
      return;
    }

    const tempTranslateYSharedVal =
      translateYSharedVal ?? makeMutable(windowHeight);
    const toVal = expandable
      ? getActionSheetExpandableSnapHeight(heightSharedVal.get(), force)
      : getActionSheetSnapHeight(
          height,
          translateYSharedVal?.get() ?? windowHeight,
          force
        );
    const dismissActionSheet = toVal === (expandable ? 0 : height);
    const animationConfig: Parameters<typeof withTiming>['1'] = {
      duration: dismissActionSheet
        ? actionSheetDismissDuration
        : actionSheetSnapDuration,
    };
    const cb = () => {
      if (!dismissActionSheet) {
        expandableHeightSharedVal?.set(toVal);

        return;
      }

      onDismiss({
        resultType: OverlayDismissResultType.ActionSheet,
        title,
        text,
      });
    };
    if (expandable && !dismissActionSheet) {
      updateSharedValWithTiming(heightSharedVal, toVal, animationConfig, cb);
    } else {
      updateSharedValWithTiming(
        tempTranslateYSharedVal,
        dismissActionSheet ? windowHeight : toVal,
        animationConfig,
        cb
      );
    }
  };

  return actionSheetOnDismiss;
}

/** @internal */
export function useActionSheetGesture(contentGesture: boolean = false) {
  const onDismiss = useActionSheetOnDismiss(false);

  const {
    expandable,
    translateYSharedVal,
    heightSharedVal,
    contentOffsetSharedVal,
  } = getActionSheetContext();
  const actionSheetGesture = Gesture.Pan()
    .onChange(({ changeY }) => {
      if (!contentGesture || !contentOffsetSharedVal?.get()) {
        if (expandable) {
          heightSharedVal?.set(heightSharedVal.get() - changeY);
        } else {
          translateYSharedVal?.set(
            Math.max(translateYSharedVal!.get() + changeY, 0)
          );
        }
      }
    })
    .onEnd(() => {
      scheduleOnRN(onDismiss);
    });

  return actionSheetGesture;
}

/** @internal */
export function useActionSheetHeaderMinHeight() {
  const themeSpacing = useThemeSpacing();

  const actionSheetHeaderMinHeight =
    actionSheetHeaderIconSize + themeSpacing[actionSheetHeaderPadding] * 2;

  return actionSheetHeaderMinHeight;
}

/** @internal */
export function useActionSheetContentGesture() {
  const gesture = useActionSheetGesture(true);

  const scrollGesture = Gesture.Native().shouldActivateOnStart(true);
  const { contentOffsetSharedVal } = getActionSheetContext();
  const actionSheetContentGesture = Gesture.Simultaneous(
    scrollGesture,
    gesture.activeOffsetY(contentOffsetSharedVal?.get() ?? 0)
  );

  return actionSheetContentGesture;
}

export function useActionSheetListViewAnimatedRef<T>() {
  return useAnimatedRef<ListRef<T>>();
}

export function useActionSheetScrollViewAnimatedRef() {
  return useAnimatedRef<ScrollView>();
}

/** @interal */
export function useActionSheetListViewRefAndOffset<T>(
  refObj?: ListAnimatedRefObj<T>
) {
  const listViewListAnimatedRefObj = useActionSheetListViewAnimatedRef<T>();
  const contentOffsetSharedVal = useScrollOffset(
    refObj ?? listViewListAnimatedRefObj
  );

  const actionSheetListViewAnimatedRef = {
    listViewListAnimatedRefObj: refObj ?? listViewListAnimatedRefObj,
    contentOffsetSharedVal,
  };

  return actionSheetListViewAnimatedRef;
}

/** @interal */
export function useActionSheetScrollViewRefAndOffset(
  refObj?: ScrollViewAnimatedRefObj
) {
  const scrollViewAnimatedRefObj = useActionSheetScrollViewAnimatedRef();
  const contentOffsetSharedVal = useScrollOffset(
    refObj ?? scrollViewAnimatedRefObj
  );

  const actionSheetScrollViewAnimatedRef = {
    scrollViewAnimatedRefObj: refObj ?? scrollViewAnimatedRefObj,
    contentOffsetSharedVal,
  };

  return actionSheetScrollViewAnimatedRef;
}

/** @internal */
export function useActionSheetOpts(
  title: string | undefined,
  expandable: boolean | undefined,
  opts: ActionSheetOpts,
  optListProps: ActionSheetOptListProps | undefined,
  onDismiss: OverlayOnDismiss<OverlayDismissActionSheetResult> | undefined,
  dismissable: boolean | undefined
) {
  const {
    headerViewRef,
    height,
    translateYSharedVal,
    heightSharedVal,
    expandableHeightSharedVal,
    updateHeight,
  } = useActionSheet();
  const { listViewListAnimatedRefObj, contentOffsetSharedVal } =
    useActionSheetListViewRefAndOffset<ActionSheetOpt>(optListProps?.ref);

  const { itemSize, insetsStyle } = useActionSheetOptItemSize(optListProps);
  useLayoutEffect(() => {
    headerViewRef.current?.measureInWindow((_x, _y, _width, headerHeight) => {
      const contentHeight =
        opts.length * itemSize + ((insetsStyle.paddingBottom ?? 0) as number);
      updateHeight(headerHeight + contentHeight);
    });
  }, []);

  const actionSheetContextVal: ActionSheetContextVal = {
    title,
    expandable,
    onDismiss,
    dismissable,
    headerViewRef,
    contentAnimatedRefObj: listViewListAnimatedRefObj,
    height,
    translateYSharedVal,
    heightSharedVal,
    expandableHeightSharedVal,
    contentOffsetSharedVal,
  };

  return actionSheetContextVal;
}

/** @internal */
export function useActionSheetOptItemSize(
  {
    insets,
    insetTop,
    insetBottom,
    insetLeft,
    insetRight,
    insetsPadding,
    insetPaddingTop,
    insetPaddingBottom,
    insetPaddingLeft,
    insetPaddingRight,
  }: ActionSheetOptListProps = {
    insetBottom: true,
    insetPaddingBottom: 'm',
  }
) {
  const themeSpacing = useThemeSpacing();
  const themeTextVariants = useThemeTextVariants();
  const insetsStyle = useInsetsStyle({
    insets,
    insetTop,
    insetBottom,
    insetLeft,
    insetRight,
    insetsPadding,
    insetPaddingTop,
    insetPaddingBottom,
    insetPaddingLeft,
    insetPaddingRight,
  });

  const actionSheetOptItemSize = {
    itemSize:
      themeSpacing[actionSheetOptListItemPadding] * 2 +
      themeTextVariants[actionSheetOptListItemTextVariant].lineHeight,
    insetsStyle,
  };

  return actionSheetOptItemSize;
}

/** @internal */
export function useActionSheetScrollView(
  title: string | undefined,
  expandable: boolean | undefined,
  scrollViewProps: ActionSheetScrollViewProps['scrollViewProps'] | undefined,
  onDismiss: OverlayOnDismiss<OverlayDismissActionSheetResult> | undefined,
  dismissable: boolean | undefined
) {
  const {
    headerViewRef,
    height,
    translateYSharedVal,
    heightSharedVal,
    expandableHeightSharedVal,
    updateHeight,
  } = useActionSheet();
  const { scrollViewAnimatedRefObj, contentOffsetSharedVal } =
    useActionSheetScrollViewRefAndOffset(scrollViewProps?.ref);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  useLayoutEffect(() => {
    headerViewRef.current?.measureInWindow((_x, _y, _width, height) => {
      setHeaderHeight(height);
    });
  }, []);
  useEffect(() => {
    if (headerHeight && contentHeight) {
      updateHeight(headerHeight + contentHeight);
    }
  }, [headerHeight, contentHeight]);

  const actionSheetContextVal: ActionSheetContextVal = {
    title,
    expandable,
    onDismiss,
    dismissable,
    headerViewRef,
    contentAnimatedRefObj: scrollViewAnimatedRefObj,
    height,
    setContentHeight,
    translateYSharedVal,
    heightSharedVal,
    expandableHeightSharedVal,
    contentOffsetSharedVal,
  };

  return actionSheetContextVal;
}

/** @internal */
export function useActionSheetListView(
  title: string | undefined,
  expandable: boolean | undefined,
  listProps: ActionSheetListViewProps['listProps'] | undefined,
  onDismiss: OverlayOnDismiss<OverlayDismissActionSheetResult> | undefined,
  dismissable: boolean | undefined
) {
  const {
    headerViewRef,
    height,
    translateYSharedVal,
    heightSharedVal,
    expandableHeightSharedVal,
    updateHeight,
  } = useActionSheet();
  const { listViewListAnimatedRefObj, contentOffsetSharedVal } =
    useActionSheetListViewRefAndOffset(listProps?.ref);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  useLayoutEffect(() => {
    headerViewRef.current?.measureInWindow((_x, _y, _width, height) => {
      setHeaderHeight(height);
    });
  }, []);
  useEffect(() => {
    if (headerHeight && contentHeight) {
      updateHeight(headerHeight + contentHeight);
    }
  }, [headerHeight, contentHeight]);

  const actionSheetContextVal: ActionSheetContextVal = {
    title,
    expandable,
    onDismiss,
    dismissable,
    headerViewRef,
    contentAnimatedRefObj: listViewListAnimatedRefObj,
    height,
    setContentHeight,
    translateYSharedVal,
    heightSharedVal,
    expandableHeightSharedVal,
    contentOffsetSharedVal,
  };

  return actionSheetContextVal;
}
