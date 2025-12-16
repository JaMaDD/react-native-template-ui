import { useDeferredValue, useLayoutEffect, useState, type FC } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { useViewRef } from '../../hooks/view';
import type {
  NumberSlider,
  StringSlider,
  ThemedSliderProps,
} from '../../types/slider';
import type { ThemedTextProps } from '../../types/text';
import type { ThemedViewProps } from '../../types/view';
import {
  SliderCurrentValueDisplayMode,
  SliderThumbSize,
  SliderTrackSize,
} from '../../utils/slider/const';
import AnimatedThemedView from '../view/AnimatedThemedView';
import ThemedView from '../view/ThemedView';

const ThemedText: FC<ThemedTextProps> = require('../text/ThemedText').default;

const ThemedSlider: FC<ThemedSliderProps> = ({
  range,
  steps = 1,
  currentValue,
  currentValueDisplayMode = SliderCurrentValueDisplayMode.None,
  onValueChange,
  trackSize = SliderTrackSize.M,
  trackActiveColor = 'themePri',
  trackActiveProps,
  trackInactiveColor = 'separator',
  trackInactiveProps,
  thumbSize = SliderThumbSize.M,
  thumbColor = 'themePri',
  thumbProps,
  wrapProps,
  ...props
}) => {
  const isNumRange = typeof range[0] === 'number';
  const processedRange = isNumRange ? range.sort() : range;
  const totalSteps = isNumRange
    ? Math.abs(
        (processedRange as NumberSlider['range'])[1] -
          (processedRange as NumberSlider['range'])[0]
      ) / steps
    : processedRange.length - 1;
  const thumbSizeHalf = thumbSize / 2;
  const sliderViewRef = useViewRef();
  const trackViewRef = useViewRef();
  const [sliderWidth, setSliderWidth] = useState<number>();
  const [trackWidth, setTrackWidth] = useState<number>();
  const [stepWidth, setStepWidth] = useState<number>();
  const [selectedVal, setSelectedVal] = useState<number | string | undefined>(
    currentValue
  );
  const deferredSelectedValue = useDeferredValue(selectedVal);
  const xSharedVal = useSharedValue(-(trackWidth ?? 0));

  const trackAnimatedStyle = useAnimatedStyle(
    () => ({ transform: [{ translateX: xSharedVal.get() }] }),
    [trackWidth]
  );
  const thumbAnimatedStyle = useAnimatedStyle(
    () => ({ transform: [{ translateX: xSharedVal.get() - thumbSizeHalf }] }),
    [thumbSizeHalf]
  );
  useLayoutEffect(() => {
    sliderViewRef.current?.measure((_x, _y, w) => {
      setSliderWidth(w);
    });
  }, []);
  useLayoutEffect(() => {
    trackViewRef.current?.measure((_x, _y, w) => {
      const tempWidth = w - thumbSize;
      const tempStepWidth = tempWidth / totalSteps;
      setTrackWidth(tempWidth);
      setStepWidth(tempStepWidth);
      setSelectedVal(currentValue);
      let index = 0;
      if (isNumRange) {
        const numRange = processedRange as NumberSlider['range'];
        const numCurrentValue = currentValue as NumberSlider['currentValue'];
        index = numCurrentValue ? (numCurrentValue - numRange[0]) / steps : 0;
      } else {
        const strRange = processedRange as StringSlider['range'];
        const strCurrentValue = currentValue as StringSlider['currentValue'];
        index = strCurrentValue ? strRange.indexOf(strCurrentValue) : 0;
      }
      xSharedVal.set(-(totalSteps - index) * tempStepWidth);
    });
  }, [currentValue, thumbSize, isNumRange, processedRange, totalSteps]);

  const wrapStyle: ThemedViewProps['style'] = {
    marginHorizontal: thumbSizeHalf,
  };
  const updateSelectedVal = (x: number) => {
    if (!stepWidth) {
      return;
    }

    if (isNumRange) {
      const numRange = processedRange as NumberSlider['range'];
      const numIndex = Math.round(x / stepWidth);
      const tempSelectedVal = numRange[1] - numIndex * steps;
      setSelectedVal(tempSelectedVal);
      onValueChange(tempSelectedVal);
    } else {
      const strRange = processedRange as StringSlider['range'];
      const strIndex = Math.round(x / stepWidth);
      const tempSelectedVal = strRange[totalSteps - strIndex];
      setSelectedVal(tempSelectedVal);
      onValueChange(tempSelectedVal!);
    }
  };
  const updateXSharedVal = (x: number, animated = false) => {
    'worklet';
    const tempX = Math.min(0, Math.max(x, -(trackWidth ?? 0)));
    xSharedVal.set(animated ? withTiming(tempX) : tempX);
    scheduleOnRN(updateSelectedVal, Math.abs(tempX));
  };
  const gesture = Gesture.Simultaneous(
    Gesture.Tap()
      .onTouchesDown(({ allTouches }) => {
        const touch = allTouches[0];
        if (touch && sliderWidth) {
          updateXSharedVal(
            -(sliderWidth - (touch.x + thumbSize + thumbSizeHalf))
          );
        }
      })
      .onTouchesUp(({ allTouches }) => {
        const touch = allTouches[0];
        if (touch && sliderWidth && stepWidth) {
          const nearestStep = Math.round(
            -(sliderWidth - (touch.x + thumbSize + thumbSizeHalf)) / stepWidth
          );
          updateXSharedVal(nearestStep * stepWidth, true);
        }
      }),
    Gesture.Pan()
      .onChange(({ changeX }) => {
        updateXSharedVal(xSharedVal.get() + changeX);
      })
      .onEnd(() => {
        if (stepWidth) {
          const nearestStep = Math.round(xSharedVal.get() / stepWidth);
          updateXSharedVal(nearestStep * stepWidth, true);
        }
      })
  );
  const currentValueComponent = currentValueDisplayMode !==
    SliderCurrentValueDisplayMode.None && (
    <ThemedText marginTop={'s'} {...props}>
      {deferredSelectedValue}
    </ThemedText>
  );

  return (
    <ThemedView ref={sliderViewRef} alignItems={'center'}>
      {currentValueDisplayMode === SliderCurrentValueDisplayMode.Top &&
        currentValueComponent}
      <GestureDetector gesture={gesture}>
        <ThemedView
          ref={trackViewRef}
          alignItems={'center'}
          justifyContent={'center'}
          alignSelf={'stretch'}
          height={thumbSize}
          style={wrapStyle}
          backgroundColor={'themeSec'}
          {...wrapProps}
        >
          <ThemedView
            position={'absolute'}
            width={trackWidth}
            height={trackSize}
            overflow={'hidden'}
            backgroundColor={trackInactiveColor}
            {...trackActiveProps}
          >
            <AnimatedThemedView
              height={trackSize}
              backgroundColor={trackActiveColor}
              style={trackAnimatedStyle}
              {...trackInactiveProps}
            />
          </ThemedView>
          <AnimatedThemedView
            position={'absolute'}
            right={-thumbSizeHalf}
            width={thumbSize}
            aspectRatio={1}
            opacity={0.8}
            backgroundColor={thumbColor}
            style={thumbAnimatedStyle}
            {...thumbProps}
          />
        </ThemedView>
      </GestureDetector>
      {currentValueDisplayMode === SliderCurrentValueDisplayMode.Bottom &&
        currentValueComponent}
    </ThemedView>
  );
};

export default ThemedSlider;
