import { useDeferredValue, useLayoutEffect, useState, type FC } from 'react';
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
  NumSlider,
  StrSlider,
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
        (processedRange as NumSlider['range'])[1] -
          (processedRange as NumSlider['range'])[0]
      ) / steps
    : processedRange.length - 1;
  const thumbSizeHalf = thumbSize / 2;
  const windowWidth = useWindowDimensionsWidth();
  const viewRef = useViewRef();
  const [width, setWidth] = useState<number>();
  const [stepWidth, setStepWidth] = useState<number>();
  const [selectedVal, setSelectedVal] = useState<number | string | undefined>(
    currentValue
  );
  const deferredSelectedValue = useDeferredValue(selectedVal);
  const xSharedVal = useSharedValue(-(width ?? 0));

  const trackAnimatedStyle = useAnimatedStyle(
    () => ({ transform: [{ translateX: xSharedVal.get() }] }),
    [width]
  );
  const thumbAnimatedStyle = useAnimatedStyle(
    () => ({ transform: [{ translateX: xSharedVal.get() - thumbSizeHalf }] }),
    [thumbSizeHalf]
  );
  useLayoutEffect(() => {
    viewRef.current?.measure((_x, _y, w) => {
      const tempWidth = w - thumbSize;
      const tempStepWidth = tempWidth / totalSteps;
      setWidth(tempWidth);
      setStepWidth(tempStepWidth);
      setSelectedVal(currentValue);
      let index = 0;
      if (isNumRange) {
        const numRange = processedRange as NumSlider['range'];
        const numCurrentValue = currentValue as NumSlider['currentValue'];
        index = numCurrentValue ? (numCurrentValue - numRange[0]) / steps : 0;
      } else {
        const strRange = processedRange as StrSlider['range'];
        const strCurrentValue = currentValue as StrSlider['currentValue'];
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
      const numRange = processedRange as NumSlider['range'];
      const numIndex = Math.round(x / stepWidth);
      setSelectedVal(numRange[1] - numIndex * steps);
    } else {
      const strRange = processedRange as StrSlider['range'];
      const strIndex = Math.round(x / stepWidth);
      setSelectedVal(strRange[totalSteps - strIndex]);
    }
  };
  const updateXSharedVal = (x: number, animated = false) => {
    'worklet';
    const tempX = Math.min(0, Math.max(x, -(width ?? 0)));
    xSharedVal.set(animated ? withTiming(tempX) : tempX);
    scheduleOnRN(updateSelectedVal, Math.abs(tempX));
  };
  const gesture = Gesture.Simultaneous(
    Gesture.Tap()
      .onTouchesDown(({ allTouches }) => {
        const touch = allTouches[0];
        if (touch) {
          updateXSharedVal(
            -(windowWidth - (touch.x + thumbSize + thumbSizeHalf))
          );
        }
      })
      .onTouchesUp(({ allTouches }) => {
        const touch = allTouches[0];
        if (touch && stepWidth) {
          const nearestStep = Math.round(
            -(windowWidth - (touch.x + thumbSize + thumbSizeHalf)) / stepWidth
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
    <ThemedView alignItems={'center'}>
      {currentValueDisplayMode === SliderCurrentValueDisplayMode.Top &&
        currentValueComponent}
      <GestureDetector gesture={gesture}>
        <ThemedView
          ref={viewRef}
          alignItems={'center'}
          justifyContent={'center'}
          alignSelf={'stretch'}
          height={thumbSize}
          style={wrapStyle}
          {...wrapProps}
        >
          <ThemedView
            position={'absolute'}
            width={width}
            height={trackSize}
            overflow={'hidden'}
            backgroundColor={trackInactiveColor}
            {...trackActiveProps}
          >
            <AnimatedThemedView
              width={width}
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
