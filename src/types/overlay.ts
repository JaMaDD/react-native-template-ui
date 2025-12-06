import type { ModalProps, ViewStyle } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import type {
  AlertButtonType,
  OverlayDismissResultType,
  ToastDuration,
  ToastType,
} from '../utils/overlay/const';
import type { ThemedButtonProps } from './button';
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

type OverlayProps = {
  onDismiss: () => void;
  dismissable?: boolean;
};

type OverlayDismissBaseResult = {
  resultType: OverlayDismissResultType;
};

export type OverlayOnDismiss<T> = (result: T) => void;

type OverlayDismissToastResult = OverlayDismissBaseResult &
  Pick<ThemedToastProps, 'type' | 'text' | 'duration'> & {
    resultType: OverlayDismissResultType.Toast;
  };

export type OverlayDismissAlertResult = OverlayDismissBaseResult &
  Pick<AlertProps, 'title' | 'desc'> &
  Pick<AlertButtonProps, 'text' | 'type'> & {
    resultType: OverlayDismissResultType.Alert;
  };

/** @internal */
export type OverlayDismissActionSheetResult = OverlayDismissBaseResult &
  Pick<ActionSheetProps, 'title'> &
  Pick<ActionSheetOption, 'text'> & {
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
  ModalProps & { contentWrapProps?: ThemedViewProps };

export type ThemedLoadingModalProps = Omit<ThemedModalProps, 'children'> &
  CustomThemedLoadingProps &
  Partial<CustomThemedTextProps>;

export type AlertContextVal = Partial<
  Pick<AlertProps, 'buttonProps'> & {
    onDismiss: (result?: Partial<OverlayDismissAlertResult>) => void;
  }
>;

export type AlertProps = Omit<OverlayProps, 'onDismiss'> &
  Pick<ModalProps, 'visible'> & {
    customShowAnimation?: CustomAnimation<1>;
    customHideAnimation?: CustomAnimation<0>;
    wrapProps?: Omit<ThemedViewProps, 'children'>;
    title: string;
    titleTextProps?: Omit<CustomThemedTextProps, 'text'>;
    desc?: string;
    descTextProps?: Omit<CustomThemedTextProps, 'text'>;
    buttons?: AlertButtonProps[][];
    buttonsWrapProps?: Omit<ThemedViewProps, 'children'>;
    buttonProps?: Omit<ThemedButtonProps, 'onPress' | 'text'>;
    onDismiss?: OverlayOnDismiss<OverlayDismissAlertResult>;
  };

export type AlertButtonsProps = Pick<
  AlertProps,
  'buttons' | 'buttonsWrapProps'
>;

export type AlertButtonProps = Pick<ThemedButtonProps, 'text'> & {
  type?: AlertButtonType;
  onPress?: ThemedButtonProps['onPress'];
  props?: Omit<ThemedButtonProps, 'onPress' | 'text'>;
};

export type ActionSheetProps = (Omit<OverlayProps, 'onDismiss'> &
  Pick<ModalProps, 'visible'> &
  Omit<ActionSheetWrapProps, 'children'> &
  ActionSheetHeaderProps & {
    title?: string;
    expandable?: boolean;
    onDismiss?: OverlayOnDismiss<OverlayDismissActionSheetResult>;
  }) &
  (
    | {
        options: ActionSheetOptions;
        optionListProps?: ActionSheetOptionListProps;
        optionListItemProps?: ActionSheetOptionListItemProps;
        scrollViewProps?: never;
        children?: never;
        listProps?: never;
      }
    | PropsWithRequiredChildren<{
        scrollViewProps?: Omit<ScrollViewProps, 'ref'> & {
          ref?: ScrollViewAnimatedRefObj;
        };
        options?: never;
        optionListProps?: never;
        optionListItemProps?: never;
        listProps?: never;
      }>
    | {
        listProps: Omit<ListProps<any>, 'ref'> & {
          ref?: ListAnimatedRefObj<any>;
        };
        options?: never;
        optionListProps?: never;
        optionListItemProps?: never;
        scrollViewProps?: never;
        children?: never;
      }
  );

export type ActionSheetWrapProps = PropsWithRequiredChildren<{
  wrapViewProps?: Omit<AnimatedThemedViewProps, 'children' | 'style'> & {
    style?: ViewStyle;
  };
  actionSheetVisible: boolean;
}>;

export type ActionSheetHeaderProps = {
  headerShowIcon?: boolean;
  headerWrapProps?: Omit<ThemedViewProps, 'children'>;
  headerTextProps?: Omit<ThemedTextProps, 'children'>;
  headerIconButtonProps?: Omit<ThemedButtonProps, 'onPress'>;
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
export type ActionSheetOptionsProps = ActionSheetProps &
  Required<Pick<ActionSheetProps, 'options'>>;

export type ActionSheetOptionListProps = Omit<
  ListProps<ActionSheetOption>,
  'ref' | 'data' | 'Item' | 'keyExtractor' | 'extraData'
> & {
  ref?: ActionSheetOptionListRefObj;
};

export type ActionSheetOptionListItemProps = Omit<
  ThemedButtonProps,
  'onPress' | 'text'
>;

export type ActionSheetOptionListRefObj = ListAnimatedRefObj<ActionSheetOption>;

/** @internal */
export type ActionSheetOptionListExtraData = {
  optionListItemProps?: ActionSheetOptionListItemProps;
  onDismiss: (text?: string) => void;
};

export type ActionSheetOption = Partial<Pick<ThemedButtonProps, 'onPress'>> & {
  text: string;
  props?: ActionSheetOptionListItemProps;
};

export type ActionSheetOptions = ActionSheetOption[];

/** @internal */
export type ActionSheetScrollViewProps = ActionSheetProps &
  Required<Pick<ActionSheetProps, 'children'>>;

/** @internal */
export type ActionSheetListViewProps = ActionSheetProps &
  Required<Pick<ActionSheetProps, 'listProps'>>;

/** @internal */
export type ActionSheetListViewListRefObj = ListAnimatedRefObj<any>;
