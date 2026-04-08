import { useRestyle } from '@shopify/restyle';
import { useCallback, useEffect, useMemo, useRef } from 'react';
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

export function useDelayedOnPress(
  onPress: PressableOnPress | null,
  onPressDelayConfig?: OnPressDelayConfig
) {
  const onPressTimestamp = useRef(0);
  const debounceTimeout = useRef<Timeout>(undefined);
  const clearDebounceTimeout = useCallback(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
  }, [debounceTimeout]);
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
