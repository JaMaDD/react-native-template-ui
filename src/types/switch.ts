import type { SwitchSize } from '../utils/theme/const';
import type {
  AnimatedThemedPressableProps,
  OnPressDelayConfig,
} from './button';
import type { CustomAnimation } from './reanimated';
import type { ThemeColors } from './theme';
import type { AnimatedThemedViewProps } from './view';

/**
 * Custom color configuration for switch component states.
 *
 * Allows customization of colors for both enabled and disabled states.
 *
 * @example
 * ```tsx
 * const colors: CustomSwitchColors = {
 *   border: 'gray',
 *   borderEnabled: 'primary',
 *   background: 'lightgray',
 *   backgroundEnabled: 'primaryLight',
 *   thumb: 'white',
 *   thumbEnabled: 'white'
 * };
 * ```
 */
export type CustomSwitchColors = {
  /** Border color when switch is disabled/off */
  border?: ThemeColors;
  /** Border color when switch is enabled/on */
  borderEnabled?: ThemeColors;
  /** Background color when switch is disabled/off */
  background?: ThemeColors;
  /** Background color when switch is enabled/on */
  backgroundEnabled?: ThemeColors;
  /** Thumb color when switch is disabled/off */
  thumb?: ThemeColors;
  /** Thumb color when switch is enabled/on */
  thumbEnabled?: ThemeColors;
};

/**
 * Props for themed switch component.
 *
 * A toggle switch component with smooth animations and customizable appearance.
 * Supports custom colors, sizes, and animation behaviors for enabled/disabled states.
 *
 * @example
 * ```tsx
 * <ThemedSwitch
 *   enabled={isEnabled}
 *   onPress={(enabled) => setIsEnabled(enabled)}
 *   size="lg"
 *   customColors={{
 *     borderEnabled: 'primary',
 *     backgroundEnabled: 'primaryLight'
 *   }}
 * />
 * ```
 */
export type ThemedSwitchProps = Omit<
  AnimatedThemedPressableProps,
  'onPress' | 'children'
> & {
  /** Callback invoked when switch is toggled, receives new enabled state */
  onPress: (enabled: boolean) => void;
  /** Current enabled/on state of the switch */
  enabled?: boolean;
  /** Size of the switch (predefined size or custom number) */
  size?: SwitchSize | number;
  /** Configuration for debouncing or throttling press events */
  onPressDelayConfig?: OnPressDelayConfig;
  /** Custom animation when enabling the switch (animates to 1) */
  customEnableAnimation?: CustomAnimation<1>;
  /** Custom animation when disabling the switch (animates to 0) */
  customDisableAnimation?: CustomAnimation<0>;
  /** Custom colors for different switch states */
  customColors?: CustomSwitchColors;
  /** Props for the thumb (sliding button) component */
  thumbProps?: AnimatedThemedViewProps;
};
