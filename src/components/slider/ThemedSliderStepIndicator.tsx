/** @internal */
import type { FC } from 'react';
import type { ThemedSliderStepIndicatorProps } from '../../types/slider';
import { sliderStepIndicatorDefaultWidth } from '../../utils/slider/const';
import ThemedView from '../view/ThemedView';

/**
 * @internal
 * A visual indicator for slider step positions.
 * Renders small vertical bars along the slider track to mark discrete steps.
 */
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

export default ThemedSliderStepIndicator;
