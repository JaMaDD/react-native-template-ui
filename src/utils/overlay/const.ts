import { IconSize } from '@jamadd/react-native-template-icons';
import { createContext } from 'react';
import type {
  ActionSheetContextVal,
  AlertContextVal,
} from '../../types/overlay';
import type { ThemeSpacing, ThemeTextVariants } from '../../types/theme';

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

export const AlertContext = createContext<AlertContextVal>({});

export enum AlertBtnType {
  Primary = 'primary',
  Secondary = 'secondary',
  Destructive = 'destructive',
}

export const ActionSheetContext = createContext<Partial<ActionSheetContextVal>>(
  {}
);

export const actionSheetOpenDuration = 300;

export const actionSheetSnapDuration = 300;

export const actionSheetDismissDuration = 150;

export const actionSheetMaxHeightRatio = 0.6;

export enum ActionSheetExpandableHeightRatio {
  Top = 0.9,
  Middle = 0.6,
  Bottom = 0.3,
}

export const actionSheetHeaderIconSize: IconSize = IconSize.M;

export const actionSheetHeaderPadding: ThemeSpacing = 'm';

export const actionSheetOptListItemPadding: ThemeSpacing = 'm';

export const actionSheetOptListItemTextVariant: ThemeTextVariants = 'textM';
