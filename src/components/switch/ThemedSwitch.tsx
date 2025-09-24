import type { FC } from 'react';
import { useThemedSwitch } from '../../hooks/switch';
import type { ThemedSwitchProps } from '../../types/switch';
import { composeStyles, flattenStyle } from '../../utils/style/func';
import { SwitchSize } from '../../utils/theme/const';
import AnimatedThemedPressable from '../btn/AnimatedThemedPressable';
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

  const switchStyle = flattenStyle(composeStyles(style, trackAnimatedStyle));

  return (
    <AnimatedThemedPressable
      onPress={toggleSwitch}
      style={switchStyle}
      role={'switch'}
      {...props}
    >
      <AnimatedThemedView
        width={size}
        aspectRatio={1}
        style={thumbAnimatedStyle}
        {...thumbProps}
      />
    </AnimatedThemedPressable>
  );
};

export default ThemedSwitch;
