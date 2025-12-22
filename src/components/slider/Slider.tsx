import { useMappingHelper } from '@shopify/flash-list';
import { memo, useLayoutEffect, useState, type FC } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { useWindowDimensionsWidth } from '../../hooks/style';
import { useViewRef } from '../../hooks/view';
import type {
  NumberSlider,
  SliderProps,
  StringSlider,
} from '../../types/slider';
import {
  sliderStepIndicatorDefaultWidth,
  sliderThumbDefaultSize,
  SliderTrackSize,
} from '../../utils/slider/const';
import AnimatedThemedView from '../view/AnimatedThemedView';
import ThemedView from '../view/ThemedView';
import ThemedSliderStepIndicator from './ThemedSliderStepIndicator';

const Slider: FC<SliderProps> = ({
  range,
  steps = 1,
  stepIndicator,
  stepIndicatorProps,
  snapToStepAnimated = true,
  onValueChange,
  sliderWrapProps,
  trackSize = SliderTrackSize.M,
  trackActiveColor = 'themePri',
  trackActiveProps,
  trackInactiveColor = 'separator',
  trackInactiveProps,
  thumbSize = sliderThumbDefaultSize,
  thumbColor = 'themePri',
  thumbProps,
  gestureActivateDuration = 40,
  setSelectedVal,
  selectedValSharedVal,
}) => {
  const windowWidth = useWindowDimensionsWidth();
  const isNumRange = typeof range[0] === 'number';
  const processedRange = isNumRange ? range.sort() : range;
  const totalSteps = isNumRange
    ? Math.abs(
        (processedRange as NumberSlider['range'])[1] -
          (processedRange as NumberSlider['range'])[0]
      ) / steps
    : processedRange.length - 1;
  const thumbSizeHalf = thumbSize / 2;
  const { getMappingKey } = useMappingHelper();
  const trackViewRef = useViewRef();
  const [sliderWidth, setSliderWidth] = useState<number>();
  const [trackWidth, setTrackWidth] = useState<number>();
  const [stepWidth, setStepWidth] = useState<number>();
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
    trackViewRef.current?.measure((_x, _y, w) => {
      const tempWidth = w - thumbSize;
      const tempStepWidth = tempWidth / totalSteps;
      setSliderWidth(w + thumbSize + thumbSizeHalf);
      setTrackWidth(tempWidth);
      setStepWidth(tempStepWidth);
      let index = 0;
      if (isNumRange) {
        const numRange = processedRange as NumberSlider['range'];
        const numCurrentValue =
          selectedValSharedVal?.get() as NumberSlider['defaultValue'];
        index = numCurrentValue ? (numCurrentValue - numRange[0]) / steps : 0;
      } else {
        const strRange = processedRange as StringSlider['range'];
        const strCurrentValue =
          selectedValSharedVal?.get() as StringSlider['defaultValue'];
        index = strCurrentValue ? strRange.indexOf(strCurrentValue) : 0;
      }
      xSharedVal.set(-(totalSteps - index) * tempStepWidth);
    });
  }, [thumbSize, isNumRange, processedRange, totalSteps]);

  const updateSelectedVal = (x: number) => {
    if (!stepWidth) {
      return;
    }

    if (isNumRange) {
      const numRange = processedRange as NumberSlider['range'];
      const numIndex = Math.round(x / stepWidth);
      const tempSelectedVal = numRange[1] - numIndex * steps;
      setSelectedVal?.(tempSelectedVal);
      onValueChange(tempSelectedVal);
    } else {
      const strRange = processedRange as StringSlider['range'];
      const strIndex = Math.round(x / stepWidth);
      const tempSelectedVal = strRange[totalSteps - strIndex];
      setSelectedVal?.(tempSelectedVal);
      onValueChange(tempSelectedVal!);
    }
  };
  const updateXSharedVal = (x: number, animated = false) => {
    'worklet';
    const tempX = Math.min(0, Math.max(x, -(trackWidth ?? 0)));
    xSharedVal.set(animated ? withTiming(tempX) : tempX);
    scheduleOnRN(updateSelectedVal, Math.abs(tempX));
  };
  const touchStart = useSharedValue(0);
  const gesture = Gesture.Simultaneous(
    Gesture.LongPress()
      .minDuration(gestureActivateDuration)
      .maxDistance(windowWidth * 10)
      .shouldCancelWhenOutside(false)
      .onStart(({ x }) => {
        if (sliderWidth) {
          updateXSharedVal(-(sliderWidth - (x + thumbSize + thumbSizeHalf)));
        }
      })
      .onEnd(({ x }) => {
        if (sliderWidth && stepWidth) {
          const nearestStep = Math.round(
            -(sliderWidth - (x + thumbSize + thumbSizeHalf)) / stepWidth
          );
          updateXSharedVal(nearestStep * stepWidth, snapToStepAnimated);
        }
      }),
    Gesture.Pan()
      .manualActivation(true)
      .shouldCancelWhenOutside(false)
      .onBegin(() => {
        touchStart.set(Date.now());
      })
      .onTouchesMove(({}, state) => {
        const timeToCheck = Date.now() - touchStart.get();
        if (timeToCheck >= gestureActivateDuration) {
          state.activate();
        } else {
          state.fail();
        }
      })
      .onChange(({ changeX }) => {
        updateXSharedVal(xSharedVal.get() + changeX);
      })
      .onEnd(() => {
        if (stepWidth) {
          const nearestStep = Math.round(xSharedVal.get() / stepWidth);
          updateXSharedVal(nearestStep * stepWidth, snapToStepAnimated);
        }
      })
  );

  return (
    <GestureDetector gesture={gesture}>
      <ThemedView
        ref={trackViewRef}
        alignItems={'center'}
        justifyContent={'center'}
        alignSelf={'stretch'}
        height={thumbSize}
        {...sliderWrapProps}
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
        {!!stepIndicator &&
          processedRange.map((value, index) => (
            <ThemedSliderStepIndicator
              key={getMappingKey(value, index)}
              left={
                index * (stepWidth ?? 0) +
                thumbSizeHalf -
                sliderStepIndicatorDefaultWidth / 2
              }
              height={thumbSize}
              {...stepIndicatorProps}
            />
          ))}
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
  );
};

export default memo(Slider);
