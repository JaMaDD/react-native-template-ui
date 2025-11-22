import type { FC } from 'react';
import type { ThemedIconButtonProps } from '../../types/button';
import { ButtonScaleRatio } from '../../utils/button/const';
import ThemedIcon from '../icon/ThemedIcon';
import ThemedPressable from './ThemedPressable';

const ThemedIconButton: FC<ThemedIconButtonProps> = ({
  iconName,
  iconSize,
  iconColor,
  iconStyle,
  iconProps,
  ...props
}) => {
  return (
    <ThemedPressable
      scaleRatio={ButtonScaleRatio.Square}
      alignItems={'center'}
      padding={'s'}
      {...props}
    >
      <ThemedIcon
        name={iconName}
        size={iconSize}
        color={iconColor}
        style={iconStyle}
        {...iconProps}
      />
    </ThemedPressable>
  );
};

export default ThemedIconButton;
