import type { FC } from 'react';
import type { ThemedIconTextButtonProps } from '../../types/button';
import { ButtonScaleRatio } from '../../utils/button/const';
import ThemedIconText from '../text/ThemedIconText';
import ThemedPressable from './ThemedPressable';

const ThemedIconTextButton: FC<ThemedIconTextButtonProps> = ({
  flip,
  iconTextProps,
  iconName,
  iconSize,
  iconColor,
  iconStyle,
  iconProps,
  text,
  textVariant,
  textFontSize,
  textFontWeight,
  textColor = 'themePri',
  textStyle,
  textProps,
  children,
  ...props
}) => {
  return (
    <ThemedPressable
      scaleRatio={ButtonScaleRatio.Rectangle}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={children ? 'space-between' : 'center'}
      paddingVertical={'s'}
      paddingHorizontal={'m'}
      {...props}
    >
      <ThemedIconText
        iconName={iconName}
        iconSize={iconSize}
        iconColor={iconColor}
        iconStyle={iconStyle}
        iconProps={iconProps}
        text={text}
        textVariant={textVariant}
        textFontSize={textFontSize}
        textFontWeight={textFontWeight}
        textColor={textColor}
        textStyle={textStyle}
        textProps={textProps}
        flip={flip}
        {...iconTextProps}
      />
      {children}
    </ThemedPressable>
  );
};

export default ThemedIconTextButton;
