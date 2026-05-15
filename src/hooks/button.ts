import { useRestyle } from '@shopify/restyle';
import { useEffect, useMemo, useRef } from 'react';
import type {
  AnimatedPressableProps,
  AnimatedThemedPressableProps,
  OnPressDelayConfig,
  PressableOnPress,
  PressableProps,
  ThemedPressableProps,
} from '../types/button';
import type { Timeout } from '../types/react';
import { ButtonScaleRatio, OnPressDelayType } from '../utils/button/const';
import { composeStyles } from '../utils/style/func';
import {
  animatedThemedPressableRestyleFuncs,
  themedPressableRestyleFuncs,
} from '../utils/theme/restyle';

/**
 * Hook to wrap an onPress handler with debounce or throttle behavior.
 * @param onPress - The press handler function to be delayed
 * @param onPressDelayConfig - Configuration for delay type (debounce/throttle) and wait time
 * @returns A memoized onPress handler with the configured delay behavior
 * @example
 * const delayedPress = useDelayedOnPress(
 *   () => console.log('Pressed'),
 *   { type: OnPressDelayType.Debounce, wait: 500 }
 * );
 */
export function useDelayedOnPress(
  onPress: PressableOnPress | null,
  onPressDelayConfig?: OnPressDelayConfig
) {
  const onPressTimestamp = useRef(0);
  const debounceTimeout = useRef<Timeout>(undefined);
  const clearDebounceTimeout = () => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
  };
  useEffect(() => {
    return () => {
      clearDebounceTimeout();
    };
  }, []);

  return useMemo<PressableOnPress>(() => {
    const tempOnPress =
      onPress ??
      (() => {
        console.warn('onPress is not defined');
      });
    if (!onPressDelayConfig) {
      return tempOnPress;
    }

    const { type, wait } = onPressDelayConfig;
    switch (type) {
      case OnPressDelayType.Debounce:
        return (event) => {
          clearDebounceTimeout();
          debounceTimeout.current = setTimeout(() => {
            tempOnPress(event);
          }, wait);
        };
      case OnPressDelayType.Throttle:
        return (event) => {
          if (onPressTimestamp.current > Date.now()) {
            return;
          }

          tempOnPress(event);
          onPressTimestamp.current = Date.now() + wait;
        };
      default:
        return tempOnPress;
    }
  }, [
    onPress,
    onPressDelayConfig,
    onPressTimestamp,
    debounceTimeout,
    clearDebounceTimeout,
  ]);
}

/** @internal */
function usePressableProps({
  onPress,
  scaleRatio = ButtonScaleRatio.None,
  onPressDelayConfig,
  style,
}: Pick<
  PressableProps,
  'onPress' | 'scaleRatio' | 'onPressDelayConfig' | 'style'
>) {
  const pressableOnPress = useDelayedOnPress(
    onPress ?? null,
    onPressDelayConfig
  );

  const styleCb: PressableProps['style'] =
    typeof style === 'function' || scaleRatio === ButtonScaleRatio.None
      ? style
      : ({ pressed }) =>
          composeStyles(
            { transform: [{ scale: pressed ? scaleRatio : 1 }] },
            style
          );
  const pressableProps: PressableProps = {
    onPress: pressableOnPress,
    style: styleCb,
  };

  return pressableProps;
}

/**
 * Hook to create themed pressable props with restyle support, scale animation, and delayed press handling.
 * @param props - Themed pressable properties including theme props, onPress, scaleRatio, and onPressDelayConfig
 * @returns Object containing all pressable props with applied theme styles and behaviors
 * @example
 * const pressableProps = useThemedPressable({
 *   backgroundColor: 'themePri',
 *   padding: 'm',
 *   borderRadius: 'm',
 *   onPress: () => console.log('Pressed'),
 *   scaleRatio: ButtonScaleRatio.Small,
 *   onPressDelayConfig: { type: OnPressDelayType.Debounce, wait: 300 }
 * });
 */
export function useThemedPressable({
  onPress,
  scaleRatio,
  onPressDelayConfig,
  ...props
}: ThemedPressableProps) {
  const { style, ...restyle } = useRestyle(themedPressableRestyleFuncs, props);
  const pressableProps = usePressableProps({
    onPress,
    scaleRatio,
    onPressDelayConfig,
    style,
  });

  const themedPressableProps: ThemedPressableProps = {
    ...restyle,
    ...pressableProps,
  };

  return themedPressableProps;
}

/**
 * Hook to create animated themed pressable props with reanimated support and delayed press handling.
 * @param props - Animated themed pressable properties including theme props, onPress, animatedStyle, and onPressDelayConfig
 * @returns Object containing all animated pressable props with applied theme styles, animations, and behaviors
 * @example
 * const animatedStyle = useAnimatedStyle(() => ({
 *   opacity: interpolate(progress.value, [0, 1], [0.5, 1])
 * }));
 * const pressableProps = useAnimatedThemedPressable({
 *   backgroundColor: 'themePri',
 *   padding: 'm',
 *   animatedStyle,
 *   onPress: () => console.log('Pressed'),
 *   onPressDelayConfig: { type: OnPressDelayType.Throttle, wait: 1000 }
 * });
 */
export function useAnimatedThemedPressable({
  onPress,
  onPressDelayConfig,
  animatedStyle,
  ...props
}: AnimatedThemedPressableProps) {
  const { style, ...restyle } = useRestyle(
    animatedThemedPressableRestyleFuncs,
    props
  );
  const pressableProps = usePressableProps({
    onPress,
    scaleRatio: ButtonScaleRatio.None,
    onPressDelayConfig,
    style,
  });

  const animatedThemedPressableProps: Omit<AnimatedPressableProps, 'key'> = {
    ...restyle,
    ...pressableProps,
    style: [pressableProps.style, animatedStyle],
  };

  return animatedThemedPressableProps;
}
