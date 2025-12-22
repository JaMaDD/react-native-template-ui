import { memo, useLayoutEffect, type FC } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { useDeferredState } from '../../hooks/react';
import { useThemeSpacing } from '../../hooks/theme';
import type { SliderProps, ThemedSliderProps } from '../../types/slider';
import type { ThemedTextProps } from '../../types/text';
import type { ThemedViewProps } from '../../types/view';
import {
  sliderThumbDefaultSize,
  SliderValueDisplayMode,
} from '../../utils/slider/const';
import ThemedView from '../view/ThemedView';
import Slider from './Slider';

const ThemedText: FC<ThemedTextProps> = require('../text/ThemedText').default;

const MemoThemedText = memo(ThemedText);

const ThemedSlider: FC<ThemedSliderProps> = ({
  defaultValue,
  wrapProps: { paddingHorizontal, px, ...wrapProps } = {},
  valueDisplayMode = SliderValueDisplayMode.None,
  valueDisplayWrapProps,
  valueTextProps,
  valueDescription,
  valueDescriptionTextProps,
  ...props
}) => {
  const { thumbSize } = props;
  const themeSpacing = useThemeSpacing();

  const {
    state: selectedVal,
    setState: setSelectedVal,
    deferredState: deferredSelectedValue,
  } = useDeferredState(defaultValue);
  const selectedValSharedVal = useSharedValue(selectedVal);
  useLayoutEffect(() => {
    selectedValSharedVal.set(selectedVal);
  }, [selectedVal]);

  const thumbSizeHalf = (thumbSize ?? sliderThumbDefaultSize) / 2;
  const wrapStyle: ThemedViewProps['style'] = {
    marginHorizontal:
      typeof paddingHorizontal === 'string'
        ? themeSpacing[paddingHorizontal]
        : typeof px === 'string'
          ? themeSpacing[px]
          : thumbSizeHalf,
  };
  const isValueDisplayModeNone =
    valueDisplayMode === SliderValueDisplayMode.None;
  const isValueDisplayModeTop = valueDisplayMode === SliderValueDisplayMode.Top;
  const isValueDisplayModeBottom =
    valueDisplayMode === SliderValueDisplayMode.Bottom;
  const valueDisplayComponent = !isValueDisplayModeNone && (
    <ThemedView
      flexDirection={'row'}
      alignItems={'center'}
      alignSelf={'stretch'}
      {...valueDisplayWrapProps}
    >
      {!!valueDescription && (
        <MemoThemedText
          variant={'textS'}
          flex={1}
          textAlign={'center'}
          {...valueDescriptionTextProps}
        >
          {valueDescription}
        </MemoThemedText>
      )}
      <MemoThemedText
        variant={'textSBold'}
        flex={1}
        textAlign={'center'}
        {...valueTextProps}
      >
        {deferredSelectedValue}
      </MemoThemedText>
    </ThemedView>
  );
  const sliderProps = {
    ...props,
    setSelectedVal,
    selectedValSharedVal,
  } as SliderProps;

  return (
    <ThemedView
      paddingVertical={'s'}
      gap={'xs'}
      style={wrapStyle}
      {...wrapProps}
    >
      {isValueDisplayModeTop && valueDisplayComponent}
      <Slider {...sliderProps} />
      {isValueDisplayModeBottom && valueDisplayComponent}
    </ThemedView>
  );
};

export default ThemedSlider;
