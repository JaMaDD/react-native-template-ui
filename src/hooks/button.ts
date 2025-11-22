import { useRestyle } from '@shopify/restyle';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import type { ViewStyle } from 'react-native';
import type {
  AnimatedThemedPressableProps,
  OnPressDelayConfig,
  PressableOnPress,
  PressableStyle,
  ThemedPressableProps,
} from '../types/button';
import type { Timeout } from '../types/react';
import { ButtonScaleRatio, OnPressDelayType } from '../utils/button/const';
import { composeStyles } from '../utils/style/func';
import { themedPressableRestyleFuncs } from '../utils/theme/restyle';

export function useDelayedOnPress(
  onPress: ThemedPressableProps['onPress'],
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

export function useThemedPressable(
  {
    onPress,
    onPressDelayConfig,
    ...props
  }: ThemedPressableProps | AnimatedThemedPressableProps,
  animated = false
) {
  const { themedPressableProps, scaleRatio } = useMemo(() => {
    const tempThemedPressableProps = { ...props };
    let tempScaleRatio: ButtonScaleRatio | undefined;
    if ('scaleRatio' in tempThemedPressableProps) {
      tempScaleRatio = tempThemedPressableProps.scaleRatio;
      delete tempThemedPressableProps.scaleRatio;
    }

    return {
      themedPressableProps: tempThemedPressableProps,
      scaleRatio: tempScaleRatio,
    };
  }, [props]);
  const { style, ...restyle } = useRestyle(
    themedPressableRestyleFuncs,
    themedPressableProps
  );
  const pressableOnPress = useDelayedOnPress(
    onPress ?? undefined,
    onPressDelayConfig
  );

  const styleCb: PressableStyle =
    scaleRatio && !animated
      ? ({ pressed }) =>
          composeStyles<ViewStyle>(
            { transform: [{ scale: pressed ? scaleRatio : 1 }] },
            style
          )
      : style;
  const themedPressable = {
    onPress: pressableOnPress,
    style: styleCb,
    restyle,
  };

  return themedPressable;
}
