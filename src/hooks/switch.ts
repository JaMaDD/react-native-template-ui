import { useEffect } from 'react';
import {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  type SharedValue,
} from 'react-native-reanimated';
import type { PressableOnPress } from '../types/button';
import type { AnimationValue } from '../types/reanimated';
import type { ThemedSwitchProps } from '../types/switch';
import { updateSharedValWithTiming } from '../utils/reanimated/func';
import { switchAnimationDuration } from '../utils/switch/const';
import { BorderSize, SwitchSize } from '../utils/theme/const';
import { useDelayedOnPress } from './button';
import { useAnimationSharedVal } from './reanimated';
import { useThemeColors, useThemeSpacing } from './theme';

/** @internal */
export function useThemedSwitch(
  onPress: ThemedSwitchProps['onPress'],
  enabled: ThemedSwitchProps['enabled'] = false,
  size: ThemedSwitchProps['size'] = SwitchSize.M,
  onPressDelayConfig?: ThemedSwitchProps['onPressDelayConfig'],
  customEnableAnimation?: ThemedSwitchProps['customEnableAnimation'],
  customDisableAnimation?: ThemedSwitchProps['customDisableAnimation'],
  customColors?: ThemedSwitchProps['customColors']
) {
  const { xxxs } = useThemeSpacing();
  const colors = useThemeColors();
  const enabledSharedVal = useAnimationSharedVal();
  const pressableOnPress: PressableOnPress = () => {
    onPress(!!enabledSharedVal.get());
  };
  const delayedOnPress = useDelayedOnPress(
    pressableOnPress,
    onPressDelayConfig
  );
  const handleAnimation = (toVal: AnimationValue, cb?: () => void) => {
    if (customEnableAnimation && toVal) {
      customEnableAnimation(enabledSharedVal, toVal, cb);
    } else if (customDisableAnimation && !toVal) {
      customDisableAnimation(enabledSharedVal, toVal, cb);
    } else {
      updateSharedValWithTiming(
        enabledSharedVal as SharedValue<number>,
        toVal,
        { duration: switchAnimationDuration },
        cb
      );
    }
  };
  const toggleSwitch: PressableOnPress = (event) => {
    handleAnimation(enabledSharedVal.get() ? 0 : 1, () => {
      delayedOnPress(event);
    });
  };
  const trackAnimatedStyle = useAnimatedStyle(() => {
    const padding = xxxs;
    const borderWidth = BorderSize.S;
    const borderColor = colors.themePri;

    return {
      width: size * 2 + padding * 2 + borderWidth * 2,
      padding,
      borderWidth,
      borderColor: interpolateColor(
        enabledSharedVal.get(),
        [0, 1],
        [
          customColors?.border ? colors[customColors.border] : borderColor,
          customColors?.borderEnabled
            ? colors[customColors.borderEnabled]
            : borderColor,
        ]
      ),
      backgroundColor: interpolateColor(
        enabledSharedVal.get(),
        [0, 1],
        [
          customColors?.background
            ? colors[customColors.background]
            : colors.background,
          customColors?.backgroundEnabled
            ? colors[customColors.backgroundEnabled]
            : borderColor,
        ]
      ),
    };
  }, [size, customColors, xxxs, colors, enabledSharedVal]);
  const thumbAnimatedStyle = useAnimatedStyle(
    () => ({
      backgroundColor: interpolateColor(
        enabledSharedVal.get(),
        [0, 1],
        [
          customColors?.thumb ? colors[customColors.thumb] : colors.themePri,
          customColors?.thumbEnabled
            ? colors[customColors.thumbEnabled]
            : colors.background,
        ]
      ),
      transform: [
        { translateX: interpolate(enabledSharedVal.get(), [0, 1], [0, size]) },
      ],
    }),
    [size, customColors, colors, enabledSharedVal]
  );
  useEffect(() => {
    handleAnimation(enabled ? 1 : 0);
  }, [enabled]);

  const switchProps = {
    toggleSwitch,
    trackAnimatedStyle,
    thumbAnimatedStyle,
  };

  return switchProps;
}
