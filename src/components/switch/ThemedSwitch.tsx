import type { FC } from 'react';
import { useThemedSwitch } from '../../hooks/switch';
import type { ThemedSwitchProps } from '../../types/switch';
import { SwitchSize } from '../../utils/theme/const';
import AnimatedThemedPressable from '../button/AnimatedThemedPressable';
import AnimatedThemedView from '../view/AnimatedThemedView';

/**
 * A themed switch component for toggling between enabled and disabled states.
 * Features smooth animations, customizable colors, and configurable sizes.
 * Provides visual feedback through track and thumb animations with spring physics.
 * @param props - Component props of type ThemedSwitchProps
 * @returns JSX element rendering an animated switch
 * @example
 * <ThemedSwitch
 *   enabled={isEnabled}
 *   onPress={(enabled) => setEnabled(enabled)}
 *   size={SwitchSize.M}
 * />
 */
const ThemedSwitch: FC<ThemedSwitchProps> = ({
  onPress,
  enabled,
  size = SwitchSize.M,
  onPressDelayConfig,
  customEnableAnimation,
  customDisableAnimation,
  customColors,
  thumbProps,
  style,
  ...props
}) => {
  const { toggleSwitch, trackAnimatedStyle, thumbAnimatedStyle } =
    useThemedSwitch(
      onPress,
      enabled,
      size,
      onPressDelayConfig,
      customEnableAnimation,
      customDisableAnimation,
      customColors
    );

  return (
    <AnimatedThemedPressable
      onPress={toggleSwitch}
      style={style}
      animatedStyle={trackAnimatedStyle}
      role={'switch'}
      {...props}
    >
      <AnimatedThemedView
        width={size}
        aspectRatio={1}
        animatedStyle={thumbAnimatedStyle}
        {...thumbProps}
      />
    </AnimatedThemedPressable>
  );
};

export default ThemedSwitch;
