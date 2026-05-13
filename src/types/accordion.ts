import type { BorderSize } from '../utils/theme/const';
import type { ThemedPressableProps } from './button';
import type { CustomThemedIconProps } from './icon';
import type { CustomThemedTextProps } from './text';
import type { ThemeColors } from './theme';
import type {
  AnimatedThemedViewProps,
  PropsWithRequiredChildren,
  ThemedViewProps,
} from './view';

export type ThemedAccordionProps = PropsWithRequiredChildren<
  Partial<CustomThemedTextProps> &
    Omit<CustomThemedIconProps, 'iconName'> & {
      borderWidth?: BorderSize;
      borderColor?: ThemeColors;
      wrapProps?: AnimatedThemedViewProps;
      headerWrapProps?: ThemedPressableProps;
      iconNameOpened?: CustomThemedIconProps['iconName'];
      iconNameClosed?: CustomThemedIconProps['iconName'];
      contentWrapProps?: ThemedViewProps;
    }
>;
