import { IconSize } from '@jamadd/react-native-template-icons';
import { createContext } from 'react';
import type {
  ActionSheetContextVal,
  AlertContextVal,
} from '../../types/overlay';
import type { ThemeSpacing, ThemeTextVariants } from '../../types/theme';

/** @internal */
export const overlayMaxWidthPercent = '80%';

export enum OverlayDismissResultType {
  Toast = 'toast',
  Alert = 'alert',
  ActionSheet = 'actionSheet',
}

export const overlayDismissResultDefaultText = 'cancelByUser';

export enum ToastType {
  Top = 'top',
  TopLeft = 'topLeft',
  TopRight = 'topRight',
  Bottom = 'bottom',
  BottomLeft = 'bottomLeft',
  BottomRight = 'bottomRight',
}

export enum ToastDuration {
  Short = 3000,
  Long = 5000,
}

/** @internal */
export const AlertContext = createContext<AlertContextVal>({});

export enum AlertBtnType {
  Primary = 'primary',
  Secondary = 'secondary',
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
export const actionSheetOptListItemPadding: ThemeSpacing = 'm';

/** @internal */
export const actionSheetOptListItemTextVariant: ThemeTextVariants = 'textM';
