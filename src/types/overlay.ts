import type { ModalProps, ViewStyle } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import type {
  AlertBtnType,
  OverlayDismissResultType,
  ToastDuration,
  ToastType,
} from '../utils/overlay/const';
import type { ThemedBtnProps } from './btn';
import type { ListAnimatedRefObj, ListProps } from './list';
import type { CustomThemedLoadingProps } from './loading';
import type { SetState } from './react';
import type { CustomAnimation } from './reanimated';
import type { InsetsStyleConfig } from './style';
import type { CustomThemedTextProps, ThemedTextProps } from './text';
import type {
  AnimatedThemedViewProps,
  PropsWithRequiredChildren,
  ScrollViewAnimatedRefObj,
  ScrollViewProps,
  ThemedViewProps,
  ViewRefObj,
} from './view';

/** @internal */
type OverlayProps = {
  onDismiss: () => void;
  dismissable?: boolean;
};

/** @internal */
type OverlayDismissBaseResult = {
  resultType: OverlayDismissResultType;
};

/** @internal */
export type OverlayOnDismiss<T> = (result: T) => void;

/** @internal */
type OverlayDismissToastResult = OverlayDismissBaseResult &
  Pick<ThemedToastProps, 'type' | 'text' | 'duration'> & {
    resultType: OverlayDismissResultType.Toast;
  };

/** @internal */
export type OverlayDismissAlertResult = OverlayDismissBaseResult &
  Pick<AlertProps, 'title' | 'desc'> &
  Pick<AlertBtnProps, 'text' | 'type'> & {
    resultType: OverlayDismissResultType.Alert;
  };

/** @internal */
export type OverlayDismissActionSheetResult = OverlayDismissBaseResult &
  Pick<ActionSheetProps, 'title'> &
  Pick<ActionSheetOpt, 'text'> & {
    resultType: OverlayDismissResultType.ActionSheet;
  };

export type ThemedToastProps = Omit<OverlayProps, 'onDismiss'> &
  Omit<AnimatedThemedViewProps, 'children'> &
  CustomThemedTextProps &
  Pick<
    InsetsStyleConfig,
    | 'insetsPadding'
    | 'insetPaddingTop'
    | 'insetPaddingBottom'
    | 'insetPaddingLeft'
    | 'insetPaddingRight'
  > & {
    type?: ToastType;
    duration?: ToastDuration;
    onDismiss?: OverlayOnDismiss<OverlayDismissToastResult>;
  };

export type ThemedModalProps = Partial<OverlayProps> &
  ThemedViewProps & { modalProps?: ModalProps };

export type ThemedLoadingModalProps = Omit<ThemedModalProps, 'children'> &
  CustomThemedLoadingProps &
  Partial<CustomThemedTextProps>;

export type AlertContextVal = Partial<
  Pick<AlertProps, 'btnProps'> & {
    onDismiss: (result?: Partial<OverlayDismissAlertResult>) => void;
  }
>;

export type AlertProps = Omit<OverlayProps, 'onDismiss'> & {
  customShowAnimation?: CustomAnimation<1>;
  customHideAnimation?: CustomAnimation<0>;
  wrapProps?: Omit<ThemedViewProps, 'children'>;
  title: string;
  titleTextProps?: Omit<CustomThemedTextProps, 'text'>;
  desc?: string;
  descTextProps?: Omit<CustomThemedTextProps, 'text'>;
  btns?: AlertBtnProps[][];
  btnsWrapProps?: Omit<ThemedViewProps, 'children'>;
  btnProps?: Omit<ThemedBtnProps, 'onPress' | 'text'>;
  onDismiss?: OverlayOnDismiss<OverlayDismissAlertResult>;
};

export type AlertBtnsProps = Pick<AlertProps, 'btns' | 'btnsWrapProps'>;

export type AlertBtnProps = Pick<ThemedBtnProps, 'text'> & {
  type?: AlertBtnType;
  onPress?: ThemedBtnProps['onPress'];
  props?: Omit<ThemedBtnProps, 'onPress' | 'text'>;
};

export type ActionSheetProps = (Omit<OverlayProps, 'onDismiss'> &
  Omit<ActionSheetWrapProps, 'children'> &
  ActionSheetHeaderProps & {
    title?: string;
    expandable?: boolean;
    onDismiss?: OverlayOnDismiss<OverlayDismissActionSheetResult>;
  }) &
  (
    | {
        opts: ActionSheetOpts;
        optListProps?: ActionSheetOptListProps;
        optListItemProps?: ActionSheetOptListItemProps;
        scrollViewProps?: never;
        children?: never;
        listProps?: never;
      }
    | (PropsWithRequiredChildren & {
        scrollViewProps?: Omit<ScrollViewProps, 'ref'> & {
          ref?: ScrollViewAnimatedRefObj;
        };
        opts?: never;
        optListProps?: never;
        optListItemProps?: never;
        listProps?: never;
      })
    | {
        listProps: Omit<ListProps<any>, 'ref'> & {
          ref?: ListAnimatedRefObj<any>;
        };
        opts?: never;
        optListProps?: never;
        optListItemProps?: never;
        scrollViewProps?: never;
        children?: never;
      }
  );

export type ActionSheetWrapProps = PropsWithRequiredChildren<{
  wrapViewProps?: Omit<AnimatedThemedViewProps, 'children' | 'style'> & {
    style?: ViewStyle;
  };
}>;

export type ActionSheetHeaderProps = {
  headerShowIcon?: boolean;
  headerWrapProps?: Omit<ThemedViewProps, 'children'>;
  headerTextProps?: Omit<ThemedTextProps, 'children'>;
  headerIconBtnProps?: Omit<ThemedBtnProps, 'onPress'>;
};

/** @internal */
export type ActionSheetContextVal = Pick<
  ActionSheetProps,
  'title' | 'expandable' | 'onDismiss' | 'dismissable'
> & {
  headerViewRef: ViewRefObj;
  contentAnimatedRefObj: ListAnimatedRefObj<any> | ScrollViewAnimatedRefObj;
  height: number;
  setContentHeight?: SetState<number>;
  translateYSharedVal: SharedValue<number>;
  heightSharedVal: SharedValue<number>;
  expandableHeightSharedVal: SharedValue<number>;
  contentOffsetSharedVal: SharedValue<number>;
};

/** @internal */
export type ActionSheetOptsProps = ActionSheetProps &
  Required<Pick<ActionSheetProps, 'opts'>>;

export type ActionSheetOptListProps = Omit<
  ListProps<ActionSheetOpt>,
  'ref' | 'data' | 'Item' | 'keyExtractor' | 'extraData'
> & {
  ref?: ActionSheetOptListRefObj;
};

/** @internal */
export type ActionSheetOptListItemProps = Omit<
  ThemedBtnProps,
  'onPress' | 'text'
>;

/** @internal */
export type ActionSheetOptListRefObj = ListAnimatedRefObj<ActionSheetOpt>;

/** @internal */
export type ActionSheetOptListExtraData = {
  optListItemProps?: ActionSheetOptListItemProps;
  onDismiss: (text?: string) => void;
};

export type ActionSheetOpt = Partial<Pick<ThemedBtnProps, 'onPress'>> & {
  text: string;
  props?: ActionSheetOptListItemProps;
};

export type ActionSheetOpts = ActionSheetOpt[];

/** @internal */
export type ActionSheetScrollViewProps = ActionSheetProps &
  Required<Pick<ActionSheetProps, 'children'>>;

/** @internal */
export type ActionSheetListViewProps = ActionSheetProps &
  Required<Pick<ActionSheetProps, 'listProps'>>;

/** @internal */
export type ActionSheetListViewListRefObj = ListAnimatedRefObj<any>;
