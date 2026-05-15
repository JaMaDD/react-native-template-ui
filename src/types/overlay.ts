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

/**
 * Base props for overlay components.
 *
 * Provides common functionality for dismissable overlay components like modals, toasts, and alerts.
 */
type OverlayProps = {
  /** Callback invoked when the overlay is dismissed */
  onDismiss: () => void;
  /** Whether the overlay can be dismissed by user interaction (e.g., tapping backdrop) */
  dismissable?: boolean;
};

/**
 * Base result type for overlay dismissal.
 *
 * All overlay dismiss results extend this type with a resultType discriminator.
 */
type OverlayDismissBaseResult = {
  /** Type discriminator for the dismiss result */
  resultType: OverlayDismissResultType;
};

/**
 * Callback handler for overlay dismissal events.
 *
 * Generic type parameter T allows for type-safe dismiss result handling.
 */
export type OverlayOnDismiss<T> = (result: T) => void;

/**
 * Result type when a toast is dismissed.
 *
 * Contains toast-specific information like type, text, and duration.
 */
type OverlayDismissToastResult = OverlayDismissBaseResult &
  Pick<ThemedToastProps, 'type' | 'text' | 'duration'> & {
    resultType: OverlayDismissResultType.Toast;
  };

/**
 * Result type when an alert is dismissed.
 *
 * Contains alert-specific information including which button was pressed.
 */
export type OverlayDismissAlertResult = OverlayDismissBaseResult &
  Pick<AlertProps, 'title' | 'description'> &
  Pick<AlertButtonProps, 'text' | 'type'> & {
    resultType: OverlayDismissResultType.Alert;
  };

/**
 * Result type when an action sheet is dismissed.
 *
 * Contains action sheet-specific information including the selected option.
 *
 * @internal
 */
export type OverlayDismissActionSheetResult = OverlayDismissBaseResult &
  Pick<ActionSheetProps, 'title'> &
  Pick<ActionSheetOption, 'text'> & {
    resultType: OverlayDismissResultType.ActionSheet;
  };

/**
 * Props for themed toast notification component.
 *
 * Toasts are temporary, non-blocking notification messages that appear on screen.
 * Supports customizable appearance, duration, and dismiss behavior.
 *
 * @example
 * ```tsx
 * <ThemedToast
 *   type="success"
 *   text="Operation completed successfully"
 *   duration={3000}
 *   dismissable
 * />
 * ```
 */
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
    /** Visual style of the toast (e.g., 'success', 'error', 'info') */
    type?: ToastType;
    /** Duration in milliseconds before the toast auto-dismisses */
    duration?: ToastDuration;
    /** Callback invoked when the toast is dismissed */
    onDismiss?: OverlayOnDismiss<OverlayDismissToastResult>;
  };

/**
 * Props for themed modal component.
 *
 * Modals are full-screen or centered overlays that block interaction with the underlying content.
 *
 * @example
 * ```tsx
 * <ThemedModal
 *   visible={isVisible}
 *   dismissable
 *   onDismiss={handleDismiss}
 *   contentWrapProps={{ padding: 'lg' }}
 * >
 *   <Text>Modal content</Text>
 * </ThemedModal>
 * ```
 */
export type ThemedModalProps = Partial<OverlayProps> &
  ModalProps & {
    /** Props for the content container wrapper */
    contentWrapProps?: ThemedViewProps;
  };

/**
 * Props for themed loading modal component.
 *
 * Displays a loading indicator in a modal overlay, optionally with descriptive text.
 *
 * @example
 * ```tsx
 * <ThemedLoadingModal
 *   visible={isLoading}
 *   loadingSize="large"
 *   text="Loading data..."
 * />
 * ```
 */
export type ThemedLoadingModalProps = Omit<ThemedModalProps, 'children'> &
  CustomThemedLoadingProps &
  Partial<CustomThemedTextProps>;

/**
 * Context value for alert components.
 *
 * Provides shared state and callbacks for alert button interactions.
 */
export type AlertContextVal = Partial<
  Pick<AlertProps, 'buttonProps'> & {
    /** Callback to dismiss the alert with optional result data */
    onDismiss: (result?: Partial<OverlayDismissAlertResult>) => void;
  }
>;

/**
 * Props for themed alert dialog component.
 *
 * Alerts are modal dialogs that display important information and require user acknowledgment.
 * Supports customizable animations, multiple button groups, and styled content.
 *
 * @example
 * ```tsx
 * <Alert
 *   visible={showAlert}
 *   title="Confirm Action"
 *   description="Are you sure you want to continue?"
 *   buttons={[
 *     [{ text: 'Cancel', type: 'cancel' }],
 *     [{ text: 'Confirm', type: 'default' }]
 *   ]}
 *   onDismiss={handleAlertDismiss}
 * />
 * ```
 */
export type AlertProps = Omit<OverlayProps, 'onDismiss'> &
  Pick<ModalProps, 'visible'> & {
    /** Custom animation for showing the alert */
    customShowAnimation?: CustomAnimation<1>;
    /** Custom animation for hiding the alert */
    customHideAnimation?: CustomAnimation<0>;
    /** Props for the alert container wrapper */
    wrapProps?: Omit<AnimatedThemedViewProps, 'children'>;
    /** Alert title text (required) */
    title: string;
    /** Props for styling the title text */
    titleTextProps?: Omit<CustomThemedTextProps, 'text'>;
    /** Optional description/message text */
    description?: string;
    /** Props for styling the description text */
    descriptionTextProps?: Omit<CustomThemedTextProps, 'text'>;
    /** Array of button groups, each group is an array of buttons */
    buttons?: AlertButtonProps[][];
    /** Props for the buttons container wrapper */
    buttonsWrapProps?: Omit<ThemedViewProps, 'children'>;
    /** Default props applied to all buttons */
    buttonProps?: Omit<ThemedButtonProps, 'onPress' | 'text'>;
    /** Callback invoked when the alert is dismissed */
    onDismiss?: OverlayOnDismiss<OverlayDismissAlertResult>;
  };

/**
 * Props for alert button groups.
 *
 * Used to render button arrays within alert dialogs.
 */
export type AlertButtonsProps = Pick<
  AlertProps,
  'buttons' | 'buttonsWrapProps'
>;

/**
 * Props for individual alert buttons.
 *
 * Defines the appearance and behavior of buttons within alert dialogs.
 *
 * @example
 * ```tsx
 * const button: AlertButtonProps = {
 *   text: 'OK',
 *   type: 'default',
 *   onPress: () => console.log('OK pressed')
 * };
 * ```
 */
export type AlertButtonProps = Pick<ThemedButtonProps, 'text'> & {
  /** Type of button (e.g., 'default', 'cancel', 'destructive') */
  type?: AlertButtonType;
  /** Callback invoked when the button is pressed */
  onPress?: ThemedButtonProps['onPress'];
  /** Additional props for customizing the button appearance */
  props?: Omit<ThemedButtonProps, 'onPress' | 'text'>;
};

/**
 * Props for themed action sheet component.
 *
 * Action sheets are bottom-sheet style modals that present a set of options or custom content.
 * Supports three modes: options list, custom children with ScrollView, or custom list component.
 * Can be expandable to fill the screen height.
 *
 * @example
 * ```tsx
 * // With options
 * <ActionSheet
 *   title="Choose Action"
 *   options={[
 *     { text: 'Edit', onPress: handleEdit },
 *     { text: 'Delete', onPress: handleDelete }
 *   ]}
 *   expandable
 * />
 *
 * // With custom content
 * <ActionSheet
 *   title="Details"
 *   scrollViewProps={{ ...scrollProps }}
 * >
 *   <CustomContent />
 * </ActionSheet>
 * ```
 */
export type ActionSheetProps = (Omit<OverlayProps, 'onDismiss'> &
  Omit<ActionSheetWrapProps, 'children'> &
  ActionSheetHeaderProps & {
    /** Optional title text for the action sheet header */
    title?: string;
    /** Whether the action sheet can expand to full screen height */
    expandable?: boolean;
    /** Callback invoked when the action sheet is dismissed */
    onDismiss?: OverlayOnDismiss<OverlayDismissActionSheetResult>;
  }) &
  (
    | {
        /** Array of selectable options */
        options: ActionSheetOptions;
        /** Props for the options list component */
        optionListProps?: ActionSheetOptionListProps;
        /** Props applied to each option item */
        optionListItemProps?: ActionSheetOptionListItemProps;
        scrollViewProps?: never;
        children?: never;
        listProps?: never;
      }
    | PropsWithRequiredChildren<{
        /** Props for the scrollable content wrapper */
        scrollViewProps?: Omit<ScrollViewProps, 'ref'> & {
          ref?: ScrollViewAnimatedRefObj;
        };
        options?: never;
        optionListProps?: never;
        optionListItemProps?: never;
        listProps?: never;
      }>
    | {
        /** Props for custom list component implementation */
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

/**
 * Props for action sheet wrapper component.
 *
 * Controls the visibility and container styling of the action sheet.
 */
export type ActionSheetWrapProps = PropsWithRequiredChildren<
  Pick<ModalProps, 'visible'> & {
    /** Props for the animated wrapper view */
    wrapViewProps?: Omit<AnimatedThemedViewProps, 'children' | 'style'> & {
      style?: ViewStyle;
    };
  }
>;

/**
 * Props for action sheet header configuration.
 *
 * Controls the appearance of the action sheet header including title and close icon.
 */
export type ActionSheetHeaderProps = {
  /** Whether to show the close icon button in the header */
  headerShowIcon?: boolean;
  /** Props for the header container wrapper */
  headerWrapProps?: Omit<ThemedViewProps, 'children'>;
  /** Props for the header title text */
  headerTextProps?: Omit<ThemedTextProps, 'children'>;
  /** Props for the header close icon button */
  headerIconButtonProps?: Omit<ThemedButtonProps, 'onPress'>;
};

/**
 * Context value for action sheet components.
 *
 * Provides shared state and methods for action sheet behavior including expand/collapse,
 * scrolling, and dismiss handling.
 *
 * @internal
 */
export type ActionSheetContextVal = Pick<
  ActionSheetProps,
  'title' | 'expandable' | 'onDismiss' | 'dismissable'
> & {
  /** Reference to the header view for layout calculations */
  headerViewRef: ViewRefObj;
  /** Reference to the scrollable content (either list or scroll view) */
  contentAnimatedRefObj: ListAnimatedRefObj<any> | ScrollViewAnimatedRefObj;
  /** Current height of the action sheet */
  height: number;
  /** Setter for updating the content height */
  setContentHeight?: SetState<number>;
  /** Shared value for Y-axis translation (pan gestures) */
  translateYSharedVal: SharedValue<number>;
  /** Shared value for the current height */
  heightSharedVal: SharedValue<number>;
  /** Shared value for the expandable full height */
  expandableHeightSharedVal: SharedValue<number>;
  /** Shared value for tracking content scroll offset */
  contentOffsetSharedVal: SharedValue<number>;
};

/**
 * Action sheet props variant with required options array.
 *
 * @internal
 */
export type ActionSheetOptionsProps = ActionSheetProps &
  Required<Pick<ActionSheetProps, 'options'>>;

/**
 * Props for the action sheet options list component.
 *
 * Extends list props with action sheet-specific configuration.
 */
export type ActionSheetOptionListProps = Omit<
  ListProps<ActionSheetOption>,
  'ref' | 'data' | 'Item' | 'keyExtractor' | 'extraData'
> & {
  /** Reference to the options list */
  ref?: ActionSheetOptionListRefObj;
};

/**
 * Props for individual action sheet option items.
 *
 * Customizes the appearance of each option button in the list.
 */
export type ActionSheetOptionListItemProps = Omit<
  ThemedButtonProps,
  'onPress' | 'text'
>;

/**
 * Reference type for action sheet option list.
 */
export type ActionSheetOptionListRefObj = ListAnimatedRefObj<ActionSheetOption>;

/**
 * Extra data passed to action sheet option list items.
 *
 * @internal
 */
export type ActionSheetOptionListExtraData = {
  /** Props applied to each option item */
  optionListItemProps?: ActionSheetOptionListItemProps;
  /** Callback to dismiss the action sheet with selected option text */
  onDismiss: (text?: string) => void;
};

/**
 * Configuration for a single action sheet option.
 *
 * Defines the text, optional press handler, and styling for an option.
 *
 * @example
 * ```tsx
 * const option: ActionSheetOption = {
 *   text: 'Share',
 *   onPress: () => handleShare(),
 *   props: { backgroundColor: 'primary' }
 * };
 * ```
 */
export type ActionSheetOption = Partial<Pick<ThemedButtonProps, 'onPress'>> & {
  /** Display text for the option */
  text: string;
  /** Additional props for customizing the option button */
  props?: ActionSheetOptionListItemProps;
};

/**
 * Array of action sheet options.
 */
export type ActionSheetOptions = ActionSheetOption[];

/**
 * Action sheet props variant with required children.
 *
 * @internal
 */
export type ActionSheetScrollViewProps = ActionSheetProps &
  Required<Pick<ActionSheetProps, 'children'>>;

/**
 * Action sheet props variant with required list props.
 *
 * @internal
 */
export type ActionSheetListViewProps = ActionSheetProps &
  Required<Pick<ActionSheetProps, 'listProps'>>;

/**
 * Reference type for action sheet list view.
 *
 * @internal
 */
export type ActionSheetListViewListRefObj = ListAnimatedRefObj<any>;
