import type { ViewStyle } from 'react-native';
import type { SwitchSize } from '../utils/theme/const';
import type {
  AnimatedThemedPressableProps,
  OnPressDelayConfig,
} from './button';
import type { CustomAnimation } from './reanimated';
import type { StyleOrStyleProp } from './style';
import type { ThemeColors } from './theme';
import type { AnimatedThemedViewProps } from './view';

export type CustomSwitchColors = {
  border?: ThemeColors;
  borderEnabled?: ThemeColors;
  background?: ThemeColors;
  backgroundEnabled?: ThemeColors;
  thumb?: ThemeColors;
  thumbEnabled?: ThemeColors;
};

export type ThemedSwitchProps = Omit<
  AnimatedThemedPressableProps,
  'onPress' | 'children'
> & {
  onPress: (enabled: boolean) => void;
  enabled?: boolean;
  size?: SwitchSize | number;
  onPressDelayConfig?: OnPressDelayConfig;
  customEnableAnimation?: CustomAnimation<1>;
  customDisableAnimation?: CustomAnimation<0>;
  customColors?: CustomSwitchColors;
  thumbProps?: AnimatedThemedViewProps;
  style?: StyleOrStyleProp<ViewStyle>;
};
