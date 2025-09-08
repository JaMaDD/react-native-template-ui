import type { FC } from 'react';
import type { ThemedIconBtnProps } from '../../types/btn';
import { BtnScaleRatio } from '../../utils/btn/const';
import ThemedIcon from '../icon/ThemedIcon';
import ThemedPressable from './ThemedPressable';

const ThemedIconBtn: FC<ThemedIconBtnProps> = ({
  iconName,
  iconSize,
  iconColor,
  iconStyle,
  iconProps,
  ...props
}) => {
  return (
    <ThemedPressable
      scaleRatio={BtnScaleRatio.Square}
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

export default ThemedIconBtn;
