import { IconSize } from '@jamadd/react-native-template-icons';
import { createContext } from 'react';
import type {
  ActionSheetContextVal,
  AlertContextVal,
} from '../../types/overlay';
import type { ThemeSpacing, ThemeTextVariants } from '../../types/theme';

/** @internal */
export const overlayMaxWidthPercent = '80%';

/**
 * Types of overlay components that can be dismissed.
 * Used to identify which overlay component triggered a dismiss result.
 *
 * @example
 * ```tsx
 * const result = {
 *   type: OverlayDismissResultType.Alert,
 *   text: 'User cancelled'
 * };
 * ```
 */
export enum OverlayDismissResultType {
  /** Toast notification overlay */
  Toast = 'toast',
  /** Alert dialog overlay */
  Alert = 'alert',
  /** Action sheet overlay */
  ActionSheet = 'actionSheet',
  ContextMenu = 'contextMenu',
}

/**
 * Default text returned when an overlay is dismissed by user action.
 * Used as the dismiss result text when no custom text is provided.
 */
export const overlayDismissResultDefaultText = 'cancelByUser';

/**
 * Position types for toast notifications.
 * Determines where on the screen a toast will appear.
 *
 * @example
 * ```tsx
 * showToast({
 *   type: ToastType.TopRight,
 *   message: 'Success!'
 * });
 * ```
 */
export enum ToastType {
  /** Center top of screen */
  Top = 'top',
  /** Top left corner */
  TopLeft = 'topLeft',
  /** Top right corner */
  TopRight = 'topRight',
  /** Center bottom of screen */
  Bottom = 'bottom',
  /** Bottom left corner */
  BottomLeft = 'bottomLeft',
  /** Bottom right corner */
  BottomRight = 'bottomRight',
}

/**
 * Duration constants for toast notifications in milliseconds.
 *
 * @example
 * ```tsx
 * showToast({
 *   message: 'Saved',
 *   duration: ToastDuration.Short
 * });
 * ```
 */
export enum ToastDuration {
  /** Short duration - 3 seconds */
  Short = 3000,
  /** Long duration - 5 seconds */
  Long = 5000,
}

/** @internal */
export const AlertContext = createContext<AlertContextVal>({});

/**
 * Visual styles for alert dialog buttons.
 * Determines the appearance and emphasis level of buttons in alert dialogs.
 *
 * @example
 * ```tsx
 * showAlert({
 *   buttons: [
 *     { text: 'Cancel', type: AlertButtonType.Secondary },
 *     { text: 'Delete', type: AlertButtonType.Destructive }
 *   ]
 * });
 * ```
 */
export enum AlertButtonType {
  /** Primary action button - emphasized appearance */
  Primary = 'primary',
  /** Secondary action button - normal appearance */
  Secondary = 'secondary',
  /** Destructive action button - warning appearance (typically red) */
  Destructive = 'destructive',
}

/** @internal */
export const ActionSheetContext = createContext<Partial<ActionSheetContextVal>>(
  {}
);

/** @internal */
export const actionSheetOpenDuration = 300;

/** @internal */
export const actionSheetSnapDuration = 300;

/** @internal */
export const actionSheetDismissDuration = 150;

/** @internal */
export const actionSheetMaxHeightRatio = 0.6;

/** @internal */
export enum ActionSheetExpandableHeightRatio {
  Top = 0.9,
  Middle = 0.6,
  Bottom = 0.3,
}

/** @internal */
export const actionSheetHeaderIconSize: IconSize = IconSize.M;

/** @internal */
export const actionSheetHeaderPadding: ThemeSpacing = 'm';

/** @internal */
export const actionSheetOptionListItemPadding: ThemeSpacing = 'm';

/** @internal */
export const actionSheetOptionListItemTextVariant: ThemeTextVariants = 'textM';
