/** @internal */
import type { FC } from 'react';
import { memo } from 'react';
import type { ThemedSliderStepIndicatorProps } from '../../types/slider';
import { sliderStepIndicatorDefaultWidth } from '../../utils/slider/const';
import ThemedView from '../view/ThemedView';

const ThemedSliderStepIndicator: FC<ThemedSliderStepIndicatorProps> = ({
  width = sliderStepIndicatorDefaultWidth,
  height,
  ...props
}) => {
  return (
    <ThemedView
      position={'absolute'}
      width={width}
      height={height}
      backgroundColor={'themePri'}
      {...props}
    />
  );
};

export default memo(ThemedSliderStepIndicator);
