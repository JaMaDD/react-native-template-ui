import type { FC } from 'react';
import { useThemedSwitch } from '../../hooks/switch';
import type { ThemedSwitchProps } from '../../types/switch';
import { SwitchSize } from '../../utils/theme/const';
import AnimatedThemedPressable from '../button/AnimatedThemedPressable';
import AnimatedThemedView from '../view/AnimatedThemedView';

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
