import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import type { ScrollView, ViewStyle } from 'react-native';
import {
  useNativeGesture,
  usePanGesture,
  useSimultaneousGestures,
} from 'react-native-gesture-handler';
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
  ActionSheetInternalContextVal,
  ActionSheetListViewProps,
  ActionSheetOption,
  ActionSheetOptionListProps,
  ActionSheetOptions,
  ActionSheetScrollViewProps,
  OverlayDismissActionSheetResult,
  OverlayOnDismiss,
} from '../types/overlay';
import type { ScrollViewAnimatedRefObj } from '../types/view';
import {
  ActionSheetContext,
  actionSheetDismissDuration,
  actionSheetHeaderIconSize,
  actionSheetHeaderPaddingKey,
  ActionSheetInternalContext,
  actionSheetOpenDuration,
  actionSheetOptionListItemPaddingKey,
  actionSheetOptionListItemTextVariant,
  actionSheetSnapDuration,
  AlertContext,
  AlertInternalContext,
  overlayDismissResultDefaultText,
  OverlayDismissResultType,
  ToastContext,
} from '../utils/overlay/const';
import {
  getActionSheetExpandableHeight,
  getActionSheetExpandableInitialHeight,
  getActionSheetExpandableSnapHeight,
  getActionSheetHeight,
  getActionSheetSnapHeight,
} from '../utils/overlay/func';
import { updateSharedValWithTiming } from '../utils/reanimated/func';
import { useInsetsStyle, useWindowDimensionsHeight } from './style';
import { useThemeSpacing, useThemeTextVariants } from './theme';
import { useViewRef } from './view';

export function useToastContext() {
  return useContext(ToastContext);
}

/** @internal */
export function useAlertInternalContext() {
  return useContext(AlertInternalContext);
}

export function useAlertContext() {
  return useContext(AlertContext);
}

/** @internal */
export function useActionSheetInternalContext() {
  return useContext(ActionSheetInternalContext);
}

export function useActionSheetContext() {
  return useContext(ActionSheetContext);
}

/** @internal */
function useActionSheet(
  expandable: boolean | undefined,
  maxHeight: number | undefined,
  visible = true
) {
  const windowHeight = useWindowDimensionsHeight();
  const headerViewRef = useViewRef();
  const [actionSheetVisible, setActionSheetVisible] = useState(visible);
  const [height, setHeight] = useState(0);
  const translateYSharedVal = useSharedValue(windowHeight);
  const heightSharedVal = useSharedValue(0);
  const expandableHeightSharedVal = useSharedValue(0);
  useLayoutEffect(() => {
    setActionSheetVisible(visible);
  }, [visible]);
  useEffect(() => {
    if (
      actionSheetVisible &&
      height &&
      translateYSharedVal.get() === windowHeight
    ) {
      const tempHeight = expandable
        ? getActionSheetExpandableInitialHeight(maxHeight)
        : height;
      heightSharedVal.set(tempHeight);
      expandableHeightSharedVal.set(tempHeight);
      translateYSharedVal.set(expandable ? tempHeight : height);
      updateSharedValWithTiming(translateYSharedVal, 0, {
        duration: actionSheetOpenDuration,
      });
    }
  }, [actionSheetVisible, height]);

  const updateHeight = (tempHeight: number) => {
    setHeight(
      expandable
        ? getActionSheetExpandableHeight(maxHeight)
        : getActionSheetHeight(tempHeight, maxHeight)
    );
  };

  return {
    headerViewRef,
    actionSheetVisible,
    height,
    translateYSharedVal,
    heightSharedVal,
    expandableHeightSharedVal,
    updateHeight,
  };
}

/** @internal */
export function useActionSheetOnDismiss(force = true) {
  const windowHeight = useWindowDimensionsHeight();
  const {
    title,
    expandable,
    onDismiss,
    maxHeight,
    dismissible,
    height,
    translateYSharedVal,
    heightSharedVal,
    expandableHeightSharedVal,
  } = useActionSheetInternalContext();

  const actionSheetOnDismiss = (text = overlayDismissResultDefaultText) => {
    if (!height || !heightSharedVal || !translateYSharedVal) {
      return;
    }

    const tempTranslateYSharedVal =
      translateYSharedVal ?? makeMutable(windowHeight);
    const toVal = expandable
      ? getActionSheetExpandableSnapHeight(
          heightSharedVal.get(),
          force,
          maxHeight,
          dismissible
        )
      : getActionSheetSnapHeight(
          height,
          translateYSharedVal?.get() ?? windowHeight,
          force,
          dismissible
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

      onDismiss?.({
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
  const {
    expandable,
    translateYSharedVal,
    heightSharedVal,
    contentOffsetSharedVal,
  } = useActionSheetInternalContext();
  const onDismiss = useActionSheetOnDismiss(false);
  const panGesture = usePanGesture({
    activeOffsetY: contentGesture
      ? (contentOffsetSharedVal?.get() ?? 0)
      : [-1, 1],
    onUpdate: ({ changeY }) => {
      if (!contentGesture || !contentOffsetSharedVal?.get()) {
        if (expandable) {
          heightSharedVal?.set(heightSharedVal.get() - changeY);
        } else {
          translateYSharedVal?.set(
            Math.max(translateYSharedVal!.get() + changeY, 0)
          );
        }
      }
    },
    onDeactivate: () => {
      scheduleOnRN(onDismiss);
    },
  });

  return panGesture;
}

/** @internal */
export function useActionSheetHeaderMinHeight() {
  const themeSpacing = useThemeSpacing();

  const actionSheetHeaderMinHeight =
    actionSheetHeaderIconSize + themeSpacing[actionSheetHeaderPaddingKey] * 2;

  return actionSheetHeaderMinHeight;
}

/** @internal */
export function useActionSheetContentGesture() {
  const nativeGesture = useNativeGesture({
    shouldActivateOnStart: true,
    shouldCancelWhenOutside: false,
    cancelsJSResponder: false,
  });
  const gesture = useActionSheetGesture(true);
  const simultaneousGestures = useSimultaneousGestures(nativeGesture, gesture);

  return simultaneousGestures;
}

export function useActionSheetListViewAnimatedRef<T>() {
  return useAnimatedRef<ListRef<T>>();
}

export function useActionSheetScrollViewAnimatedRef() {
  return useAnimatedRef<ScrollView>();
}

/** @internal */
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

/** @internal */
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
  options: ActionSheetOptions,
  optionListProps: ActionSheetOptionListProps | undefined,
  onDismiss: OverlayOnDismiss<OverlayDismissActionSheetResult> | undefined,
  maxHeight: number | undefined,
  dismissible: boolean | undefined,
  visible?: boolean
): ActionSheetInternalContextVal & {
  actionSheetVisible: boolean;
} {
  const {
    headerViewRef,
    actionSheetVisible,
    height,
    translateYSharedVal,
    heightSharedVal,
    expandableHeightSharedVal,
    updateHeight,
  } = useActionSheet(expandable, maxHeight, visible);
  const { listViewListAnimatedRefObj, contentOffsetSharedVal } =
    useActionSheetListViewRefAndOffset<ActionSheetOption>(optionListProps?.ref);

  const { itemSize, insetsStyle } = useActionSheetOptItemSize(optionListProps);
  useLayoutEffect(() => {
    if (!actionSheetVisible) {
      return;
    }

    headerViewRef.current?.measureInWindow((_x, _y, _width, headerHeight) => {
      const contentHeight =
        options.length * itemSize +
        ((insetsStyle.paddingBottom ?? 0) as number);
      updateHeight(headerHeight + contentHeight);
    });
  }, [actionSheetVisible]);

  return {
    title,
    expandable,
    onDismiss,
    maxHeight,
    dismissible,
    headerViewRef,
    contentAnimatedRefObj: listViewListAnimatedRefObj,
    actionSheetVisible,
    height,
    translateYSharedVal,
    heightSharedVal,
    expandableHeightSharedVal,
    contentOffsetSharedVal,
  };
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
  }: ActionSheetOptionListProps = {
    insetBottom: true,
    insetPaddingBottom: 'm',
  }
): {
  itemSize: number;
  insetsStyle: Pick<
    ViewStyle,
    'paddingTop' | 'paddingBottom' | 'paddingLeft' | 'paddingRight'
  >;
} {
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

  return {
    itemSize:
      themeSpacing[actionSheetOptionListItemPaddingKey] * 2 +
      themeTextVariants[actionSheetOptionListItemTextVariant].lineHeight,
    insetsStyle,
  };
}

/** @internal */
export function useActionSheetScrollView(
  title: string | undefined,
  expandable: boolean | undefined,
  scrollViewProps: ActionSheetScrollViewProps['scrollViewProps'] | undefined,
  onDismiss: OverlayOnDismiss<OverlayDismissActionSheetResult> | undefined,
  maxHeight: number | undefined,
  dismissible: boolean | undefined,
  visible?: boolean
): ActionSheetInternalContextVal & {
  actionSheetVisible: boolean;
} {
  const {
    headerViewRef,
    actionSheetVisible,
    height,
    translateYSharedVal,
    heightSharedVal,
    expandableHeightSharedVal,
    updateHeight,
  } = useActionSheet(expandable, maxHeight, visible);
  const { scrollViewAnimatedRefObj, contentOffsetSharedVal } =
    useActionSheetScrollViewRefAndOffset(scrollViewProps?.ref);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  useLayoutEffect(() => {
    if (!actionSheetVisible) {
      return;
    }

    headerViewRef.current?.measureInWindow(
      (_x, _y, _width, headerViewHeight) => {
        setHeaderHeight(headerViewHeight);
      }
    );
  }, [actionSheetVisible]);
  useEffect(() => {
    if (headerHeight && contentHeight) {
      updateHeight(headerHeight + contentHeight);
    }
  }, [headerHeight, contentHeight]);

  return {
    title,
    expandable,
    onDismiss,
    maxHeight,
    dismissible,
    headerViewRef,
    contentAnimatedRefObj: scrollViewAnimatedRefObj,
    actionSheetVisible,
    height,
    setContentHeight,
    translateYSharedVal,
    heightSharedVal,
    expandableHeightSharedVal,
    contentOffsetSharedVal,
  };
}

/** @internal */
export function useActionSheetListView(
  title: string | undefined,
  expandable: boolean | undefined,
  listProps: ActionSheetListViewProps['listProps'] | undefined,
  onDismiss: OverlayOnDismiss<OverlayDismissActionSheetResult> | undefined,
  maxHeight: number | undefined,
  dismissible: boolean | undefined,
  visible?: boolean
): ActionSheetInternalContextVal & {
  actionSheetVisible: boolean;
} {
  const {
    headerViewRef,
    actionSheetVisible,
    height,
    translateYSharedVal,
    heightSharedVal,
    expandableHeightSharedVal,
    updateHeight,
  } = useActionSheet(expandable, maxHeight, visible);
  const { listViewListAnimatedRefObj, contentOffsetSharedVal } =
    useActionSheetListViewRefAndOffset(listProps?.ref);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  useLayoutEffect(() => {
    if (!actionSheetVisible) {
      return;
    }

    headerViewRef.current?.measureInWindow(
      (_x, _y, _width, headerViewHeight) => {
        setHeaderHeight(headerViewHeight);
      }
    );
  }, [actionSheetVisible]);
  useEffect(() => {
    if (headerHeight && contentHeight) {
      updateHeight(headerHeight + contentHeight);
    }
  }, [headerHeight, contentHeight]);

  return {
    title,
    expandable,
    onDismiss,
    maxHeight,
    dismissible,
    headerViewRef,
    contentAnimatedRefObj: listViewListAnimatedRefObj,
    actionSheetVisible,
    height,
    setContentHeight,
    translateYSharedVal,
    heightSharedVal,
    expandableHeightSharedVal,
    contentOffsetSharedVal,
  };
}
